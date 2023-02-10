import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { DateSelected } from 'src/app/model/date-selected.model';
import { FileParameter } from 'src/app/model/upload.model';
import { ModelSimplify } from 'src/app/model/modelSimplify.model';
import { ModalText } from 'src/app/model/modal-text.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('modelPage') modelPage: ClrWizardPage;
  @ViewChild('parameterPage') parameterPage: ClrWizardPage;
  @ViewChild('datePage') datePage: ClrWizardPage;
  @Input() fileParameter: FileParameter = new FileParameter();
  lgOpen: boolean = false;
  selectedModels: String[] = [];
  parentCount = 0;
  modelList: Array<ModelSimplify>;
  requiredChoice: boolean = false;
  parameterList: Map<string,Array<string>>;
  startdate: Date;
  endDate: Date;
  dateSelected: DateSelected = new DateSelected();
  isModalOpen: boolean = false;
  modalTitle: String;
  modalBody: String;
  modalText: ModalText = new ModalText();
  allModels: any;
  infosFromDownload: any;
  startDateNewExport : Date;

  constructor() {
  }

  ngOnInit(): void {
    if(history.state.response){
      this.onOpenWizardToNewDownload(history.state.response);
    }
  }

  open() {
    this.lgOpen = !this.open;
  }

  onNextModel() {
    this.requiredChoice = false;
  }

  onNextParameter() {
    this.startDateNewExport ? this.requiredChoice = true : this.requiredChoice = false;
  }

  onNextDate() {
    this.dateSelected.startDate = this.startdate;
    this.dateSelected.endDate = this.endDate;
    this.completeUploadModel(
      this.modelList,
      this.parameterList,
      this.dateSelected
    );
  }

  getSelectedModels(selectedItems) {
    if (selectedItems) {
      this.requiredChoice = true;
      this.modelList = selectedItems;
    }
  }

  getSelectedParameters(selectedItems) {
    if (selectedItems) {
      this.requiredChoice = true;
      this.parameterList = selectedItems;
    }
  }

  getStartDate(date) {
    this.startdate = date;
  }

  getEndDate(date) {
    if (this.startdate && date) {
      this.requiredChoice = true;
    }
    this.endDate = date;
  }

  completeUploadModel(
    modelList: ModelSimplify[],
    parameterList: Map<string,string[]>,
    dateSelected: DateSelected
  ) {
    this.fileParameter.model = modelList;
    this.fileParameter.parameter = parameterList;
    this.fileParameter.dateSelected = dateSelected;
  }

  onModalOpen(event) {
    this.wizard.close();
    this.isModalOpen = event;
  }

  closeModal() {
    this.isModalOpen = false;
    window.location.reload();
  }

  onTestText(event) {
    this.modalText = event;
    this.modalTitle = this.modalText.title;
    this.modalBody = this.modalText.body;
  }

  onOpenWizardToNewDownload(file){
    this.lgOpen = true;
    this.infosFromDownload = file;
  }

  openWizard(){
    this.wizard.open();
  }

  getListAllModels(value){
    this.allModels = value;
    this.modelList = [];
    if(!this.infosFromDownload) return;
    this.infosFromDownload.file.models.forEach(v => {
      var namemodel = v.name;
      // Recover models between list of all models and list of model of history
      this.allModels.forEach(model => {
        if(model.name === namemodel){
          this.modelList.push(model);
        };
      });
    });
    //Retrieve all parameters from history
    this.parameterList = this.infosFromDownload.file.parameters;
    //Retrieve start date and end date from history
    this.dateSelected.startDate = this.infosFromDownload.file.startDate;
    this.startDateNewExport = this.infosFromDownload.file.endDate;
  }

}

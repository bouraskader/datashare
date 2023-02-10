import { map } from 'rxjs/operators';
import { Model } from '../../model/model.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/service/backendService';
import { FileHistory } from './../../model/filehistory.model';
import { ModelSimplify } from 'src/app/model/modelSimplify.model';
import { ClrWizard, ClrWizardPage } from '@clr/angular/wizard';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Output() test = new EventEmitter<string>();
  @ViewChild("wizard") wizard: ClrWizard;
  @ViewChild("datePage") datePage: ClrWizardPage;
  histories: Array<FileHistory & { downloading?: boolean }>;
  isModalOpen: boolean = false;
  modalName: string;
  modalList: string[];
  parameters: any[] = [];
  size: number;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.initHistories();
  }

  initHistories() {
    this.backendService.getHistoriesInfo().subscribe((data) => {
      this.histories = data.reverse();
      this.getParameters();
    });
  }

  isAvailable(file: FileHistory): boolean {
    if (!file.isTransferFile) {
      return file.status.toLowerCase() === 'available';
    }
    return false;
  }

  download(file: FileHistory & { downloading?: boolean }) {
    file.downloading = true;
    this.backendService.downloadFile(file.fileName).subscribe({
      next: (response) => {
        if (response !== null && response !== undefined) {
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob([response], { type: 'application/octet-stream' })
          );
          downloadLink.setAttribute('download', file.fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } else
          alert(
            'Failed to download, please refer to your technical team if the problem persists'
          );
        this.initHistories();
      },
      error: (error) => {
        alert(
          'Failed to download, please refer to your technical team if the problem persists'
        );
        this.initHistories();
      },
    });
  }

  showList(name: string, list: string[]) {
    console.log(list)
    console.log(name)
    this.modalList = list;
    this.modalName = name;
    this.isModalOpen = true;
    console.log(this.parameters);
  }

 showModel(name: string, list: ModelSimplify[]) {
    this.showList(name, list.map(x => x.name));
  }

  getParameters(){
    console.log(this.histories)
    if(this.histories){
      for(let item of this.histories){
        this.size = Object.keys(item.parameters).length;
        console.log(this.size)
        for(let [key, value] of Object.entries(item.parameters)){
          var listParam = {
            groupName: key,
            paramName: value,
          };
          //this.size = value.length;
          this.parameters.push(listParam);
        }
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  goto(file: FileHistory){
    this.router.navigate(["/home"], {
      state: {
        response: { file },
      }
    });
  }
}

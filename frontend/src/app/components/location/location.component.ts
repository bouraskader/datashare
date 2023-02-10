import { ModalText } from './../../model/modal-text.model';
import { BackendService } from '../../service/backendService';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileParameter } from 'src/app/model/upload.model';
import { ModalTextEnum } from 'src/app/enum/modal-text-enum';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() fileParameter: FileParameter;
  @Output() textModal = new EventEmitter<any>();
  modalText: ModalText = new ModalText();
  enumModal = ModalTextEnum;
  isTransfertFileToCloud: boolean = false;
  username: String;

  constructor(private api: BackendService) {}

  @Output() openModal = new EventEmitter();

  ngOnInit(): void {
    this.api.getUserDetails().subscribe((data) => {
      this.username = data.preferred_username;
    })
  }

  generateFile(value) {
    this.fileParameter.isTransferFile = value;
    this.fileParameter.username = this.username;
    this.api.generateFile(this.fileParameter).subscribe((res) => {
      console.log(res);
    });
    this.modalTextGenerated(value);


  }

  modalTextGenerated(transferFile) {
    if (transferFile === true) {
      this.openModal.emit(true);
      this.modalText.title = this.enumModal.titleModalSendFile;
      this.modalText.body = this.enumModal.bodyModalSendFile;
      this.textModal.emit(this.modalText);
    } else {
      this.openModal.emit(true);
      this.modalText.title = this.enumModal.titleModalDownloadFile;
      this.modalText.body = this.enumModal.bodyModalDownloadFile;
      this.textModal.emit(this.modalText);
    }
  }
}

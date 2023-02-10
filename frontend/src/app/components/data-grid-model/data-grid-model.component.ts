import { Model } from 'src/app/model/model.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from '../../service/backendService';
import { ModelSimplify } from 'src/app/model/modelSimplify.model';

@Component({
  selector: 'app-data-grid-model',
  templateUrl: './data-grid-model.component.html',
  styleUrls: ['./data-grid-model.component.scss'],
})
export class DataGridModelComponent implements OnInit {
  models: Model[];

  @Output() selectModels = new EventEmitter();
  @Output() listModels = new EventEmitter();
  @Input() set selectedList(value){
    this.selected = value;
  };

  selected: Model[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getModelsInfo().subscribe((data) => {
      this.models = data;
      this.listModels.emit(this.models);
    });
  }

  selectionChanged(value: Model[]) {
    this.selected = value;
    this.selectModels.emit(
      value.map<ModelSimplify>((x) => x as unknown as ModelSimplify)
    );
  }
}

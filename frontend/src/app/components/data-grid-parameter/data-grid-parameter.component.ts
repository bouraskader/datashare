import { map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  ClrDatagridStringFilterInterface,
  ClrSelectedState,
} from '@clr/angular';
import { BackendService } from 'src/app/service/backendService';

export class filterParameter
  implements ClrDatagridStringFilterInterface<string>
{
  property: string;
  constructor(_property: string) {
    this.property = _property;
  }
  accepts(parameter: string, search: string): boolean {
    return '' || parameter.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-data-grid-parameter',
  templateUrl: './data-grid-parameter.component.html',
  styleUrls: ['./data-grid-parameter.component.scss'],
})
export class DataGridParameterComponent implements OnInit {
  parameters: any[] = [];
  parametersTree: any[] = [];
  selectedParameters: Object = {};

  filter = new filterParameter('parameter');

  @Output() selectParameters = new EventEmitter();
  @Input() set selectedList(value){
    this.selectedParameters = value;
  };
  selected: String[] = [];
  total: number;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getParametersInfo().subscribe((data) => {
      this.parameters = data;
      this.parametersTree = new Array();
      for (var key in this.parameters) {
        var treeObject = {
          name: key,
          selected: ClrSelectedState.UNSELECTED,
          items: new Array(),
        };
        for (var item in this.parameters[key]) {
          var parameter = {
            name: this.parameters[key][item],
            selected: ClrSelectedState.UNSELECTED,
          };
          treeObject.items.push(parameter);
        }
        this.parametersTree.push(treeObject);
      }
      if(this.selectedParameters){
        this.getSelectedParametersNewExport(this.selectedParameters, this.parametersTree);
      }
    });
  }

  selectionChanged(value: any) {
    if(!this.selectedParameters){
      this.selectedParameters = {};
    }
    this.parametersTree.forEach((parameterGroup) => {
      if (
        parameterGroup['selected'] == ClrSelectedState.SELECTED ||
        parameterGroup['selected'] == ClrSelectedState.INDETERMINATE
      ) {
        this.selectedParameters[parameterGroup.name] = parameterGroup.items
          .filter(parameter => (parameter['selected'] == ClrSelectedState.SELECTED))
          .map((filtered => filtered.name));
        }
    });
    this.selectParameters.emit(this.selectedParameters);
  }

  getSelectedParametersNewExport(parametersFromExport, parametersTree){
    var parametersOfGroup = [{}];
    for (let key in parametersFromExport) {
      let value = parametersFromExport[key];
      parametersTree.forEach( item => {
        parametersOfGroup.push(item.items);
      })

      parametersOfGroup.forEach(p => {
        for(var i in p){
          var params = p[i];
          value.map(x => {
            if(x === params.name){
              params.selected = 1;
            }
          });
        }
      });
    }
  }

}

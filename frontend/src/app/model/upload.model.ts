import { DateSelected } from './date-selected.model';
import { ModelSimplify } from './modelSimplify.model';

export class FileParameter {
  model: ModelSimplify[];
  parameter: Map<String,string[]>;
  dateSelected: DateSelected;
  isTransferFile: boolean;
  username: String;
}

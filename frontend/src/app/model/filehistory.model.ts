import { ModelSimplify } from "./modelSimplify.model";

export class FileHistory {
  fileName: string;
  user: string;
  startDate: Date;
  endDate: Date;
  models: ModelSimplify[];
  parameters: string[];
  status: string;
  isTransferFile: boolean;
}

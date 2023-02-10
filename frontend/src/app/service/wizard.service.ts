import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  selected: String[];

  constructor() {}

  get data(): String[] {
    return this.selected;
  }

  set data(val: String[]) {
    this.selected = val;
  }
}

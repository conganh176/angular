import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div>Alert: {{ message }}</div>`,
  styles: [
    `
      div {
        border: 1px solid black;
        background-color: salmon;
        padding: 10px;
        font-family: sans-serif;
      }
    `,
  ],
})
export class AlertComponent {
  @Input() message: string = '';
}

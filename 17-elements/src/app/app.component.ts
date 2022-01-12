import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content: SafeHtml | null = null;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    // can be inserted after compiled
    const AlertElement = createCustomElement(AlertComponent, {
      injector: injector,
    });
    customElements.define('my-alert', AlertElement);

    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml("<my-alert message='You are dumb'></my-alert>");
    }, 1000);
  }
}

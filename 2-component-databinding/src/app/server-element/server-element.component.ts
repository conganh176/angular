import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  ContentChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // css encapsulation
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent implements OnInit, OnChanges, AfterViewInit {
  // Input decorator
  @Input('srvElement') element: { type: string; name: string; content: string };

  // access ng-content
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  // Life cycle
  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(): void {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log("Text content of paragraph: ", this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log("Text content of paragraph: ", this.paragraph.nativeElement.textContent);
  }
}

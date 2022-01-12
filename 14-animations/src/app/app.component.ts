import {
  state,
  style,
  trigger,
  transition,
  animate,
  keyframes,
  group,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlight',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal <=> highlight', animate(500)),
    ]),

    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlight',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          'background-color': 'green',
          transform: 'translateX(0) scale(0.5)',
        })
      ),
      transition('normal => highlight', animate(300)),
      transition('highlight => normal', animate(900)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate(
          1000,
          style({
            borderRadius: '50px',
          })
        ),
        animate(500),
      ]),
    ]),

    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),

    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        group([
          animate(
            500,
            style({
              color: 'red',
            })
          ),
          animate(
            500,
            style({
              transform: 'translateX(100px)',
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.state === 'normal'
      ? (this.state = 'highlight')
      : (this.state = 'normal');

    this.wildState === 'normal'
      ? (this.wildState = 'highlight')
      : (this.wildState = 'normal');
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStart(event) {
    console.log(event);
  }

  animationEnd(event) {
    console.log(event);
  }
}

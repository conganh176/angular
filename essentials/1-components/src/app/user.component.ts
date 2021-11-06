import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
})
export class UserComponent {
    @Input() name: any;
    @Output() nameChanged = new EventEmitter<string>();

    onUserInput = (event: any) => {
        // this.name = event.target.value;
        this.nameChanged.emit(event.target.value);
    }
}
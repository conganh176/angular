import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // observable subject, not for using @Output
    activatedEmitter = new Subject<boolean>();
}
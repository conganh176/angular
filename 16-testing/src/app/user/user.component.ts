import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, DataService],
})
export class UserComponent implements OnInit {
  user: { name: string };
  isLoggedIn = false;
  data: string;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {
    this.user = {
      name: '',
    };

    this.data = '';
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.dataService.getDetails().then((data) => {
      this.data = data as string;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import User from 'src/app/models/user';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
  ) { }

  ngOnInit() {
    
  }

}

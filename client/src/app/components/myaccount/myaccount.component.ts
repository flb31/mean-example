import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { MzToastService } from 'ngx-materialize';
import User from 'src/app/models/user';

// ngrx
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { UpdateUser } from '../../actions/user.actions';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
  providers: [
    MzToastService
  ]
})
export class MyaccountComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
    private _toastService: MzToastService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user = this._commonService.getLocal('user.identity');
  }

  onUpdate () {
    this._userService.update(this.user).subscribe(
      response => {
        const res = <any>response;
        const body = JSON.parse(<any>res._body);

        this._toastService.show(body.message, 4000, 'green');
        this._commonService.setLocal('user.identity', this.user);

        // Send data
        this.store.dispatch(new UpdateUser(this.user));

      },

      err => {
        this.showErrorMessage(err);
      }
    );
  }

  public showErrorMessage(err) {
    const errorMessage = <any>err;

    if(errorMessage) {
      const body = JSON.parse(err._body);
      this._toastService.show(body.message, 4000, 'red');
    }
  }

}

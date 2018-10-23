import { Component, OnInit, NgModule } from '@angular/core';
import User from './models/user';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';
import { MzToastService } from 'ngx-materialize';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService,
    CommonService,
    MzToastService
  ]
})

export class AppComponent implements OnInit {
  public title = 'Piratefy';
  public user: User;
  public userSignUp: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
    private _toastService: MzToastService
  ) {
    this.cleanUser();
  }

  ngOnInit() {
    this.identity = this._commonService.getLocal('user.identity');
    this.token = this._commonService.getLocal('user.token');
  }

  public onSignIn() {

    this._userService.signIn(this.user).subscribe( 
      
      
      response => {

          const res = <any>response;
          const body = JSON.parse(<any>res._body);
          const identity = body.user;
          this.identity = identity;

          if(this.identity)  {
            this.processSignIn(this.user);
          } else {
            this._toastService.show(res.message, 4000, 'red');
          }
      },

      err => {
        this.showErrorMessage(err);
      }
    
    );
  }

  public onSignUp() {
    this._userService.signUp(this.userSignUp).subscribe(
      response => {
        const res = <any>response;
        const body = JSON.parse(<any>res._body);
        const identity = body.user;
        this.identity = identity;

        if(this.identity)  {
          this.processSignIn(this.userSignUp);
        } else {
          this._toastService.show(res.message, 4000, 'red');
        }
        
      },

      err => {
        this.showErrorMessage(err);
      }
    );
  }

  public processSignIn(user) {
    this._userService.signIn(user, true).subscribe(

      response => {

        const res = <any>response;
        const body = JSON.parse(<any>res._body);
  
        this.token = body.token;
        
        this._toastService.show('Welcome', 4000, 'green');

        // Set memory
        this._commonService.setLocal('user.identity', this.identity);
        this._commonService.setLocal('user.token', this.token);
        
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

  public onLogout() {
    this._commonService.clearAll();
    this.identity = false;
    this.cleanUser();
  }

  public cleanUser() {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userSignUp = new User('', '', '', '', '', 'ROLE_USER', '');
  }
}

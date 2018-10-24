import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [
    UserService,
    CommonService,
    MzToastService
  ]
})
export class SignInComponent implements OnInit {

  public user: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _toastService: MzToastService,
    private _commonService: CommonService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
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

        // go to play music
        this._router.navigate(['player']); // temporal to my account
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

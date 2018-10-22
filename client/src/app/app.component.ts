import { Component, OnInit } from '@angular/core';
import User from './models/user';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';
import { MzToastService, MzButtonModule, MzInputModule, MzValidationModule, MzInputContainerComponent } from 'ngx-materialize';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService,
    CommonService,
    MzToastService,
    MzInputModule,
    MzButtonModule,
    MzValidationModule,
    MzInputContainerComponent
  ]
})

export class AppComponent implements OnInit {
  public title = 'Piratefy';
  public user: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
    private _toastService: MzToastService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
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
            this._userService.signIn(this.user, true).subscribe(

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
          } else {
            this._toastService.show(res.message, 4000, 'red');
          }
      },

      err => {
        const errorMessage = <any>err;

        if(errorMessage) {
          const body = JSON.parse(err._body);
          this._toastService.show(body.message, 4000, 'red');
        }
      }
    
    );
  }

  public onSubmit() {
    console.log('onSubmit ', this.user);
    // UserService.signUp();
  }
}

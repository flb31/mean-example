import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';

import User from 'src/app/models/user';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  public user: Observable<User>;

  constructor(
    private _commonService: CommonService,
    private store: Store<AppState>,
  ) {
    this.user = this.store.select('user');
  }

  ngOnInit() {}
  
  public onLogout() {
    this._commonService.clearAll();
  }

}

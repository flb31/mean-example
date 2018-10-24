import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  public identity;

  constructor(
    private _commonService: CommonService
  ) { }

  ngOnInit() {
    this.identity = this._commonService.getLocal('user.identity');
  }
  
  public onLogout() {
    this._commonService.clearAll();
    this.identity = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from './core/services/common.service';
import { BroadcastService } from './core/services';
import { BroadcastKeys } from './core/common.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-structure';
  constructor(private commonService: CommonService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.commonService.getRoles().subscribe((response: any) => {
      this.commonService.userRoles = response;
      this.broadcastService.broadcast(BroadcastKeys.userRoles, response)
      this.commonService.getUserRoles();
    });
  }
}

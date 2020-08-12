import { Component, OnInit } from '@angular/core';
import { BroadcastService, HeaderService } from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private broadcastService: BroadcastService, protected headerService: HeaderService) { }

  ngOnInit() {
    this.broadcastService.on(BroadcastKeys.headerSearchValue).subscribe(x => {
      console.log(x);
    });
  }

}

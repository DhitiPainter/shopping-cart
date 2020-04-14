import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { BroadcastKeys } from 'src/app/core/common.constant';
import { AuthService, HeaderService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications = null;
  search = new FormControl('', []);
  constructor(private broadcastService: BroadcastService, private authService: AuthService, protected headerService: HeaderService) { }

  ngOnInit() {
  }

  onSearch() {
    this.broadcastService.broadcast(BroadcastKeys.headerSearchValue, this.search.value);
  }

  logout() {
    this.authService.logout();
  }

}

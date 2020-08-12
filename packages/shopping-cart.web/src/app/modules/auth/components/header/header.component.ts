import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { AuthService, HeaderService } from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications = null;
  search = new FormControl('', []);
  cartItemsCount = 0;
  constructor(
    private router: Router, private broadcastService: BroadcastService, private authService: AuthService,
    protected headerService: HeaderService) {

  }

  ngOnInit() {
    this.cartItemsCount = this.headerService.getCartItemCounts();
    this.broadcastService.on(BroadcastKeys.cartCount).subscribe(() => {
      this.cartItemsCount = this.headerService.getCartItemCounts();
    })
  }

  onSearch() {
    this.broadcastService.broadcast(BroadcastKeys.headerSearchValue, this.search.value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit, ElementRef, ViewChild, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { HeaderService } from 'src/app/core/services';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('250ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('250ms ease-in-out')
      ]),
    ]),
  ]
})
export class SidebarComponent implements OnInit, OnChanges {

  events: string[] = [];
  @Input()opened: boolean;
  @ViewChild('sidenav', {static: false}) sidenav;
  constructor(protected headerService: HeaderService) { }

  ngOnChanges(sub: SimpleChanges) {
    if (sub.opened && sub.opened.currentValue !== sub.opened.previousValue) {
      this.sidenav.toggle();
    }
  }

  ngOnInit() {
    this.opened = this.headerService.showSideBar;
  }

}

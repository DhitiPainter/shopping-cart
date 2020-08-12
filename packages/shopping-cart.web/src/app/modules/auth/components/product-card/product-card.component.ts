import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BroadcastService, HeaderService } from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() description: string;
  @Input() imageSrc: string;
  @Input() categories: any[];
  @Input() isFav = false;
  @Output() makeFav = new EventEmitter<any>();
  @Output() addToCart = new EventEmitter<any>();

  constructor(private broadcastService: BroadcastService, private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  toggleFavorite() {
    this.isFav = !this.isFav;
    this.makeFav.emit({ message: 'marked as fav', fav: this.isFav });
  }

  shop() {
    this.addToCart.emit('added to cart');
    this.headerService.cartCount = this.headerService.cartCount + 1;
    this.broadcastService.broadcast(BroadcastKeys.cartCount);
  }

}

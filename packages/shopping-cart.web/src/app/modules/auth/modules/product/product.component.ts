import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  title = 'Shiba Inu';
  subTitle = 'Dog Breed';
  desc = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
  bred for hunting.`;
  image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  categories = [{ name: 'category1', selected: true }, { name: 'category2', selected: false }];

  constructor() { }

  ngOnInit(): void {
  }

  markFavorite(data) {
    console.log(data);
  }

  addToCart(data) {
    console.log(data);
  }

}

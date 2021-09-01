import { Component } from '@angular/core';

import { Store } from '@ngxs/store';
import { GetAllProducts } from 'src/app/state/products.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'products-frontend';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts())
  }
}

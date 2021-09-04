import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/api/products.api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<Product>();
  products$: Observable<Product[]>;
  displayedColumns = ['name', 'description'];

  private unsubscribe = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) {
    this.products$ = this.store.select(state => state.products.products)
   }

  ngOnInit(): void {
    this.products$.pipe(takeUntil(this.unsubscribe)).subscribe(products => {
      this.dataSource.data = products;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}

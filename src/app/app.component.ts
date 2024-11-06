import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { homeActions } from './store/home'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  private readonly _store = inject(Store);

  ngOnInit() {
    this._store.dispatch(homeActions.getCategories());
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    //this.authService.autoLogin();

    this.store.dispatch(new AuthActions.AutoLogin());
  }
}

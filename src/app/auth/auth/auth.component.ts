import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedInMode: boolean = true;
  isLoading = false;
  error: string = null;
  isErrorOccured = false;
  private closeSub: Subscription;
  private storeSub: Subscription;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private compFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    //let authObs: Observable<AuthResponseData>;
    //this.isLoading = true;

    if (this.isLoggedInMode) {
      //authObs = this.authService.login(email, password);

      this.store.dispatch(
        new AuthActions.LoginStart({
          email: email,
          password: password,
        })
      );
    } else {
      //authObs = this.authService.signUp(email, password);

      this.store.dispatch(
        new AuthActions.SignupStart({
          email: email,
          password: password,
        })
      );
    }

    // authObs.subscribe(responseData => {
    //   console.log(responseData);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // },
    // errMsg => {
    //   this.error = errMsg
    //   this.isErrorOccured = true;
    //   this.showErrorAlert(errMsg);
    //   this.isLoading= false;
    // });

    form.reset();
  }

  onHandleError() {
    //this.error = null;

    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(errMsg: string) {
    const alertFactory =
      this.compFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const compref = hostViewContainerRef.createComponent(alertFactory);
    compref.instance.message = errMsg;
    this.closeSub = compref.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}

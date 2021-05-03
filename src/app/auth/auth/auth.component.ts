import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  
  isLoggedInMode: boolean = true;
  isLoading = false;
  error: string = null;
  isErrorOccured = false;
  private closeSub: Subscription;
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

  constructor(private authService: AuthService,
    private router: Router,
    private compFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoggedInMode) {
      authObs = this.authService.login(email, password);
    } 
    else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, 
    errMsg => {
      this.error = errMsg
      this.isErrorOccured = true;
      this.showErrorAlert(errMsg);
      this.isLoading= false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errMsg: string) {
    const alertFactory = this.compFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const compref = hostViewContainerRef.createComponent(alertFactory);
    compref.instance.message = errMsg;
    this.closeSub = compref.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}

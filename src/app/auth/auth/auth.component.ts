import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  isLoggedInMode: boolean = true;
  isLoading = false;
  error: string = "";
  isErrorOccured = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
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
      this.isLoading= false;
    });

    form.reset();
  }

}

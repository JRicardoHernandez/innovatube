import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged: boolean = false;
  tabAuth: string = 'login';
  // Login
  _loginForm_loading: boolean = false;
  _loginForm_show_password: boolean = false;
  _loginForm_show_repeat_password: boolean = false;
  _loginForm_error: boolean = false;
  _loginForm_error_message: string = "";
  _loginFormGroup!: FormGroup;
  // Register
  _registerForm_loading: boolean = false;
  _registerForm_show_password: boolean = false;
  _registerForm_show_repeat_password: boolean = false;
  _registerForm_error: boolean = false;
  _registerForm_error_message: string = "";
  _registerFormGroup!: FormGroup;
  // Reset Password
  _resetPasswordForm_loading: boolean = false;
  _resetPasswordForm_success: boolean = false;
  _resetPasswordForm_success_message: string = "";
  _resetPasswordForm_error: boolean = false;
  _resetPasswordForm_error_message: string = "";
  _resetPasswordFormGroup!: FormGroup;

  constructor() {
    this.initializeForm();
  }

  initializeForm() {
    this._loginFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.email]), // OK
      password: new FormControl(null, [Validators.required]), // OK
      repeat_password: new FormControl(null, [Validators.required]), // OK
      // remember: new FormControl(null), // OK
    });
    this._registerFormGroup = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.maxLength(15)]), // OK
      name: new FormControl(null, [Validators.required, Validators.maxLength(60)]), // OK
      lastName: new FormControl(null, [Validators.maxLength(60)]), // OK
      email: new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.email]), // OK
      password: new FormControl(null, [Validators.required, Validators.maxLength(16)]), // OK
      repeat_password: new FormControl(null, [Validators.required, Validators.maxLength(16)]), // OK
      // remember: new FormControl(null), // OK
    });
    this._resetPasswordFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.email]), // OK
    });
  }
  
  reset_loginForm() {
    this._loginForm_loading = false;
    this._loginForm_error = false;
    this._loginForm_show_password = false;
    this._loginForm_show_repeat_password = false;
    this._loginForm_error_message = "";
    this._loginFormGroup.reset();
  }
  
  reset_registerForm() {
    this._registerForm_loading = false;
    this._registerForm_error = false;
    this._registerForm_show_password = false;
    this._registerForm_show_repeat_password = false;
    this._registerForm_error_message = "";
    this._registerFormGroup.reset();
  }

  reset_resetPasswordForm() {
    this._resetPasswordForm_loading = false;
    this._resetPasswordForm_success = false;
    this._resetPasswordForm_success_message = "";
    this._resetPasswordForm_error = false;
    this._resetPasswordForm_error_message = "";
    this._resetPasswordFormGroup.reset();
  }

  changeTab(tabName: string) {
    this.tabAuth = tabName;
    this.reset_loginForm();
    this.reset_registerForm();
    this.reset_resetPasswordForm();
  }
  
  change_loginForm_show_password(value: boolean) {
    this._loginForm_show_password = value;
  }

  change_loginForm_show_repeat_password(value: boolean) {
    this._loginForm_show_repeat_password = value;
  }

  change_registerForm_show_password(value: boolean) {
    this._registerForm_show_password = value;
  }

  change_registerForm_show_repeat_password(value: boolean) {
    this._registerForm_show_repeat_password = value;
  }

  login() {

  }

  register() {

  }

  sendResetPassword() {

  }

}

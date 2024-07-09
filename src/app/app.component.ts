import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from './interfaces/user-data.interfaces';
import { AuthService } from './services/auth.service';
import { ILoginResponse } from './interfaces/auth-response.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'InnovaTube';
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
  // Data User
  _user_data: IUser = {} as IUser;
  _user_data_response: any = {};
  _valid_captcha: boolean = false;

  constructor(
    private _AuthService: AuthService
  ) {
    this.initializeForm();
    // this._user_data.name = 'José Ricardo';
    // this._user_data.lastName = 'Hernández Arellano';
    // this._user_data.displayName = this._user_data.name + " " + this._user_data.lastName;
    let email = localStorage.getItem('email');
    email ? this.isLogged = true : this.isLogged = false;
    if (this.isLogged) {
      this.getDataUser();
    }
  }

  initializeForm() {
    this._loginFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(120)]), // OK
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]), // OK
      // remember: new FormControl(null), // OK
    });
    this._registerFormGroup = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]), // OK
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]), // OK
      lastName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(60)]), // OK
      email: new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.email]), // OK
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]), // OK
      repeat_password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]), // OK
      recaptchaReactive:  new FormControl(null, Validators.required)
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
    if (this._loginFormGroup.invalid) {return}
    this._loginForm_loading = true;
    this._AuthService._login(this._loginFormGroup.value)
    .subscribe({
      next: x => this.setDataLogin(x),
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.error,
        });
        this._loginForm_loading = false;
      },
      complete: () => {
        this._loginForm_loading = false;
      }
    });
  }

  setDataLogin(res: ILoginResponse) {
    this._loginForm_loading = false;
    if (!res.userCredential) {
      this._loginForm_error = true;
      this._loginForm_error_message = res.message;
      Swal.fire({
        icon: "error",
        title: "Iniciar Sesión",
        text: res.message
      });
    } else {
      this._user_data_response = res.userCredential;
      localStorage.setItem('accessToken', res.userCredential.user.stsTokenManager.accessToken);
      localStorage.setItem('email', res.userCredential.user.email);
      Swal.fire({
        icon: "success",
        title: "Iniciar Sesión",
        text: res.message
      });
      this.closeModal();
      this.isLogged = true;
    }
  }

  register() {
    if (!this._valid_captcha) {return}
    if (this._registerFormGroup.invalid) {
      this._registerFormGroup.markAllAsTouched();
      return
    }
    if (this._registerFormGroup.value.password != this._registerFormGroup.value.repeat_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas deben coincidir, intenta nuevamente",
      });
      return;
    }
    this._registerForm_loading = true;
    this._user_data = {
      _id: '',
      user: this._registerFormGroup.value.user,
      email: this._registerFormGroup.value.email,
      name: this._registerFormGroup.value.name,
      lastName: this._registerFormGroup.value.lastName,
      displayName: this._registerFormGroup.value.name + " " + this._registerFormGroup.value.lastName,
      registerDate: new Date(),
      updateDate: new Date(),
      status: true
    }
    this._AuthService._register({...this._user_data, password: this._registerFormGroup.value.password})
    .subscribe({
      next: x => this._registerSuccess(x),
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.error,
        });
        this._registerForm_loading = false;
      },
      complete: () => {
        this._registerForm_loading = false;
        this.removeLocalhost();
      }
    });
  }

  _registerSuccess(res: any) {
    Swal.fire({
      icon: "success",
      title: "Registrarse",
      text: res.message
    });
    this.closeModal();
  }

  sendResetPassword() {
    if (this._resetPasswordFormGroup.invalid) {return}
    this._resetPasswordForm_loading = true;
    this._AuthService._reset_password(this._resetPasswordFormGroup.value)
    .subscribe({
      next: x => Swal.fire({
        icon: "success",
        title: "Recuperar Contraseña",
        text: x.message
      }),
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        this._resetPasswordForm_loading = false;
      },
      complete: () => {
        this._resetPasswordForm_loading = false;
        this.removeLocalhost();
        this.closeModal();
      }
    });
  }

  logout() {
    let mail = localStorage.getItem('email');
    this._AuthService._logout({email: mail+""})
    .subscribe({
      next: x => Swal.fire({
        icon: "success",
        title: "Cerra Sesión",
        text: x.message
      }),
      error: err => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      }),
      complete: () => {
        this.removeLocalhost();
        this.isLogged = false;
      }
    });
  }

  removeLocalhost() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  }

  closeModal() {
    let  modal = document.getElementById('modalLoginRegister');
    setTimeout(() => {
      modal?.click();
    }, 500);
  }

  getDataUser() {
    let mail = localStorage.getItem('email');
    this._AuthService._getCurrentUser(mail+"")
    .subscribe({
      next: x => {
        this._user_data = x;
      },
      error: err => {},
      complete: () => {}
    });
  }

  resolved(captchaRes: any) {
    if (!captchaRes) {return}
    this._valid_captcha = false;
    this._AuthService.sendToken(captchaRes)
    .subscribe({
      next: x => {
        Swal.fire({
          icon: "success",
          title: "Captcha",
          text: x.responseDesc
        });
        this._valid_captcha = true;
      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.responseDesc,
        });
      },
      complete: () => {}
    });
 }

}

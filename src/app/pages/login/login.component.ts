import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAuthenticateBody } from 'src/app/core/interfaces/authenticate-body-interface';
import { ILoginResult } from 'src/app/core/interfaces/login-result';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly _TIME_TOASTR_MESSAGES_IN_MILLESECONDS = 4000;

  public today: Date = new Date();
  public formGroup: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _toastrService: ToastrService
  ) {
    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() { }

  public login() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      const parametros: IAuthenticateBody = this.formGroup.value;
      this._authService.login(parametros).subscribe({
        next: (res: ILoginResult) => {
          this._userService.setdataSession(res);
          this._router.navigate(['/']);
        },
        error: (err: any) => {
          this._toastrService.error(err.error && err.error.error ? err.error.error : "Autenticação inválida",
            'Login inválido', {
              timeOut: this._TIME_TOASTR_MESSAGES_IN_MILLESECONDS
            });
        }
      });
    } else {
      this._toastrService.error("Formulário inválido!", 'Erro',  {
        timeOut: this._TIME_TOASTR_MESSAGES_IN_MILLESECONDS
      });
    }
  }

  public checkErrorEmail(): boolean {
    if (this.formGroup.get('email').touched) {
      return this.formGroup.get('email').errors?.required ||
        this.formGroup.get('email').errors?.email ? true : false;
    }

    return false;
  }

  public checkErrorPassword(): boolean {
    if (this.formGroup.get('password').touched) {
      return this.formGroup.get('password').errors?.required ||
        this.formGroup.get('password').errors?.minlength ? true : false;
    }

    return false;
  }

}

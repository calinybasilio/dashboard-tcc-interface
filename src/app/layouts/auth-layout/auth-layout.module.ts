import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { ErroInputModule } from 'src/app/components/erro-input/erro-input.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ErroInputModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [LoginGuard],
})
export class AuthLayoutModule { }

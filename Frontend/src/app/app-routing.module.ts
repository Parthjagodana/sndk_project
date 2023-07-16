import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoAuthGuard } from './guards/noAuth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'signUp',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

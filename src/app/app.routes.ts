import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';
import { BankDetailComponent } from './pages/bank/bank-detail/bank-detail.component';
import { BankStateComponent } from './pages/bank/bank-state/bank-state.component';

export const routes: Routes = [
{ 
    path: "", component: LoginComponent, pathMatch: "full"
},
{
    path: 'auth',
    children: [
        { path: '', component: LoginComponent },
        { path: 'recovery', component: RecoveryComponent },
        { path: 'register', component: RegisterComponent },      
    ]
},
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{
    path: 'bank',
    children: [
        { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        { path: ':id', component: BankDetailComponent, canActivate: [AuthGuard] },
        { path: 'state/:id', component: BankStateComponent, canActivate: [AuthGuard] },
    ]
},
{ path: 'recuperar/:token', component: ChangePasswordComponent },
];
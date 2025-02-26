import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';

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
{ path: 'home', component: HomeComponent},
//{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'recuperar/:token', component: ChangePasswordComponent },
];
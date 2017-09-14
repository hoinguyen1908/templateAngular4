import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../components/login/login.component"
import { MainComponent } from "../components/main/main.component"
import { HomeComponent } from "../components/main/home/home.component"
import { UsersComponent} from "../components/main/users/users.component"
import { TransactionComponent } from "../components/main/transaction/transaction.component"
import {AuthGuard} from "../service/auth/auth-guard.service";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'transactions', component: TransactionComponent },

    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent];

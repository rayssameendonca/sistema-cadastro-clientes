import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustumersListComponent } from './pages/custumers-list/custumers-list.component';
import { CustumersEditComponent } from './pages/custumers-edit/custumers-edit.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customer-list', component: CustumersListComponent },
  { path: 'customer-edit/:id', component: CustumersEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

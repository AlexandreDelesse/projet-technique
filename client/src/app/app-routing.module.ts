import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCampaignComponent } from '@app/views/admin/campaigns/create/create.component';
import { CampaignComponent } from '@app/views/campaigns/campaign.component';
import { PageNotFoundComponentComponent } from '@app/views/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from '@app/views/auth/login/login.component';
import { GuestGuard } from './guards/guest.guard';
import { RegisterComponent } from './views/auth/register/register.component';
import { IndexComponent as AdminHomeComponent } from '@app/views/admin/index/index.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'campaigns/create', component: CreateCampaignComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'campaigns', component: CampaignComponent },
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' }, // Should be a landing page not redirect
  { path: '**', component: PageNotFoundComponentComponent }, // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

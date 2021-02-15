import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignAddFormComponent } from './campaign/campaign-add-form/campaign-add-form.component';
import { Campaign } from './models/Campaign';
import { CampaignComponent } from './campaign/campaign.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '/register', component: Regis},
  { path: 'admin/addCampaignForm', component: CampaignAddFormComponent },
  { path: 'campaigns', component: CampaignComponent },
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' }, // Should be a landing page not redirect
  { path: '**', component: PageNotFoundComponentComponent }, // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

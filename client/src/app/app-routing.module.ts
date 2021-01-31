import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignAddFormComponent} from './campaign/campaign-add-form/campaign-add-form.component';
import {Campaign} from './models/Campaign';
import {CampaignComponent} from './campaign/campaign.component';


const routes: Routes = [
  { path: 'addCampaignForm', component: CampaignAddFormComponent },
  { path: 'home', component: CampaignComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: CampaignComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

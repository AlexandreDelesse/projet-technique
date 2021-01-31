import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CampaignAddFormComponent } from './campaign/campaign-add-form/campaign-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    NavbarComponent,
    CampaignAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

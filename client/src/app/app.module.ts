import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CampaignComponent } from './views/campaigns/campaign.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { CreateCampaignComponent } from './views/admin/campaigns/create/create.component';
import { CampaignService } from './services/campaigns/campaigns.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './views/auth/login/login.component';
import { httpInterceptorProviders } from './interceptors';
import { RegisterComponent } from './views/auth/register/register.component';
import { PasswordConfirmValidatorDirective } from './directives/password-confirm-validator.directive';
import { IndexComponent } from './views/admin/index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    NavbarComponent,
    CreateCampaignComponent,
    PageNotFoundComponentComponent,
    LoginComponent,
    RegisterComponent,
    PasswordConfirmValidatorDirective,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [httpInterceptorProviders, DatePipe, CampaignService],
  bootstrap: [AppComponent],
})
export class AppModule {}

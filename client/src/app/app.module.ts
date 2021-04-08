import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CampaignComponent } from './views/campaigns/campaign.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { CreateCampaignComponent } from './views/dashboard/campaigns/create/create.component';
import { CampaignService } from './services/campaigns/campaigns.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './views/auth/login/login.component';
import { httpInterceptorProviders } from './interceptors';
import { RegisterComponent } from './views/auth/register/register.component';
import { PasswordConfirmValidatorDirective } from './directives/password-confirm-validator.directive';
import { IndexComponent as DashboardIndex } from './views/dashboard/index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './views/dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './views/dashboard/profile/profile.component';
import { AvatarComponent } from './views/dashboard/avatar/avatar.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './views/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlashAlertComponent } from './views/flash-alert/flash-alert.component';
import { SearchFormComponent } from './views/search-form/search-form.component';
import { IndexComponent } from './views/dashboard/campaigns/index/index.component';
import { DataTablesModule } from 'angular-datatables';
import { ShowComponent } from './views/campaigns/show/show.component';

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
    DashboardIndex,
    SidebarComponent,
    ProfileComponent,
    AvatarComponent,
    HomeComponent,
    FooterComponent,
    FlashAlertComponent,
    SearchFormComponent,
    IndexComponent,
    ShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NoopAnimationsModule,
    SweetAlert2Module.forRoot(),
    DataTablesModule,
  ],
  providers: [httpInterceptorProviders, DatePipe, CampaignService],
  bootstrap: [AppComponent],
})
export class AppModule {}

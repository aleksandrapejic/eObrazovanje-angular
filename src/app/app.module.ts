import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { NavComponent } from './nav/nav.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { Routes, RouterModule } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import { StudentManagementComponent } from './management/student-management/student-management.component';
import { ProfessorManagementComponent } from './management/professor-management/professor-management.component';
import { StudijeComponent } from './studije/studije.component';
import { PredmetiListComponent } from './studije/predmeti/predmeti-list/predmeti-list.component';
import { PredmetiItemComponent } from './studije/predmeti/predmeti-item/predmeti-item.component';
import { PrijavaComponent } from './studije/prijava/prijava.component';
import { PredmetiProfileComponent } from './studije/predmeti/predmeti-profile/predmeti-profile.component';
import { UplateManagementComponent } from './management/student-management/uplate-management/uplate-management.component';
import { PredmetiManagementComponent } from './management/predmeti-management/predmeti-management.component';
import { IspitiManagementComponent } from './management/predmeti-management/ispiti-management/ispiti-management.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DokumentDataService } from './service/dokument.data.service';
import { IspitDataService } from './service/ispit.data.service';
import { PredispitneObavezeDataService } from './service/predispitne-obaveze.data.service';
import { PredispitneObavezeSablonDataService } from './service/predispitne-obaveze-sablon.data.service';
import { PredmetDataService } from './service/predmet.data.service';
import { PrijavaDataService } from './service/prijava.data.service';
import { UplataDataService } from './service/uplata.data.service';
import { UserDataService } from './service/user.data.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { DokumentiManagementComponent } from './management/student-management/dokumenti-management/dokumenti-management.component';
import { PredispitneObavezeSablonManagementComponent } from './management/predmeti-management/predispitne-obaveze-sablon-management/predispitne-obaveze-sablon-management.component';
import { PredmetStudentiListComponent } from './studije/predmeti/predmet-studenti-list/predmet-studenti-list.component';
import { PredmetIspitiListComponent } from './studije/predmeti/predmet-ispiti-list/predmet-ispiti-list.component';
import { PredmetStudentiPredispitneObavezeComponent } from './studije/predmeti/predmet-studenti-predispitne-obaveze/predmet-studenti-predispitne-obaveze.component';
import { PredmetIspitiPrijaveComponent } from './studije/predmeti/predmet-ispiti-prijave/predmet-ispiti-prijave.component';
import { AuthenticationService } from './security/authentication.service';
import { CanActivateAuthGuard } from './security/can-activate-auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './security/token-interceptor.service';
import { JwtUtilsService } from './security/jwt-utils.service';
import { 
  RoleGuardService as RoleGuard, RoleGuardService 
} from './security/role-guard.service';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';

export  const appRoutes: Routes = [
  {path: '', redirectTo:"prijava", pathMatch:"full"},
  {path: 'prijava', component: LoginComponent},
  {path: 'profil', component: ProfilesComponent},
  {path: 'administracija', component: ManagementComponent, canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMINISTRATOR'}},
  { path: 'administracija/predmeti', component: PredmetiManagementComponent , canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMINISTRATOR'}},
  { path: 'administracija/studenti', component: StudentManagementComponent , canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMINISTRATOR'}},
  { path: 'administracija/nastavnici', component: ProfessorManagementComponent , canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMINISTRATOR'}},
  {path: 'predmeti', component: PredmetiListComponent , canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'NASTAVNIK'}},
  {path: 'prijava-ispita', component: PrijavaComponent , canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'STUDENT'}}];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfilesComponent,
    LoginComponent,
    ManagementComponent,
    StudentManagementComponent,
    ProfessorManagementComponent,
    StudijeComponent,
    PredmetiListComponent,
    PredmetiItemComponent,
    PrijavaComponent,
    PredmetiProfileComponent,
    UplateManagementComponent,
    PredmetiManagementComponent,
    IspitiManagementComponent,
    DokumentiManagementComponent,
    PredispitneObavezeSablonManagementComponent,
    PredmetStudentiListComponent,
    PredmetIspitiListComponent,
    PredmetStudentiPredispitneObavezeComponent,
    PredmetIspitiPrijaveComponent,
    ErrorDialogComponent,
    
  ],
  imports: [
    BrowserModule, MDBBootstrapModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule,  NgMultiSelectDropDownModule.forRoot(), HttpModule, HttpClientModule, ToastModule, AngularDualListBoxModule
  ],
  providers: [
    DokumentDataService, 
    IspitDataService, 
    PredispitneObavezeDataService, 
    PredispitneObavezeSablonDataService, 
    PredmetDataService, 
    PrijavaDataService, 
    UplataDataService, 
    UserDataService, 
    ToastOptions, 
    ToastsManager,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthenticationService,
    CanActivateAuthGuard,
    RoleGuardService,
    JwtUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

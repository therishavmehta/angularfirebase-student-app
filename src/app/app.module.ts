import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Components
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Router Module
import { AppRoutingModule } from './app-routing.module';

// Toaster for Alert Messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';



@NgModule({
  declarations: [
    AppComponent,
    AddAppointmentComponent,
    AppointmentsListComponent,
    EditAppointmentComponent,
    AdminProfileComponent,
    CreatePatientComponent,
    DoctorDetailsComponent,
    PatientDetailsComponent
  ],
  imports: [
    MaterialModule,
    NgbModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module
    AngularFireDatabaseModule,  // Firebase database module
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,           // Main routing module
    BrowserAnimationsModule,    // Required animations module for Toastr
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule  // NGX pagination module
  ],
  exports: [MaterialModule],
  entryComponents: [AppComponent, AdminProfileComponent, EditAppointmentComponent],
  providers: [],
  bootstrap: [AppComponent, EditAppointmentComponent],

})
export class AppModule { }

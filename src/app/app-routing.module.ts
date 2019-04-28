import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import {DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import {PatientDetailsComponent } from './patient-details/patient-details.component';
// import {AdminProfileComponent} from './admin-profile/admin-profile.component';
// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/view-appointments', pathMatch: 'full' },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'view-appointments', component: AppointmentsListComponent },
  { path: 'edit-appointment/:id', component: EditAppointmentComponent },
  { path: 'doctor-list', component: DoctorDetailsComponent  },
  { path: 'patient-list', component: PatientDetailsComponent  },
  // {path: 'admin-profile', component: AdminProfileComponent}
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

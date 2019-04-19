import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
// import {AdminProfileComponent} from './admin-profile/admin-profile.component';
// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/view-appointments', pathMatch: 'full' },
  { path: 'add-appointment', component: AddStudentComponent },
  { path: 'view-appointments', component: StudentsListComponent },
  { path: 'edit-student/:id', component: EditAppointmentComponent },
  // {path: 'admin-profile', component: AdminProfileComponent}
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

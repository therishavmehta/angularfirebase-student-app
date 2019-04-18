import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Appointment } from './../shared/appointment';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Appointment: Appointment[];                 // Save students data in Student's array.
  hideWhenNoAppointment = false; // Hide students data table when no student.
  noData = false;            // Showing No Student Message, when no student in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    )  { }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    const s = this.crudApi.GetAppointmentsList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Appointment = [];
      data.forEach(item => {
        const a = item.payload.toJSON();
        this.crudApi.getPatients()
        .valueChanges().subscribe(datas => {
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].email.includes(a['patientID'])) {
                a['patient'] = datas[i];
            }
          }
        });
        this.crudApi.getDoctorList().snapshotChanges().subscribe(doctor => {
          doctor.forEach(items => {
          for (let i = 0; i < doctor.length; i++) {
            a['doctorID'] != null ? a['doctor'] = items.payload.toJSON() : a['doctor'] = {employeeName: 'NotAssigned'};
            }
          });
        });
        a['$key'] = item.key;
        console.log(a);
        this.Appointment.push(a as Appointment);
      });
    });
  }

  // Using valueChanges() method to fetch simple list of students data.
// It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {
    this.crudApi.GetAppointmentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      console.log(data[0].patientID);
      if (data.length <= 0) {
        this.hideWhenNoAppointment = false;
        this.noData = true;
      } else {
        this.hideWhenNoAppointment = true;
        this.noData = false;
      }
    });
  }

  // Method to delete student object
  deleteAppointment(appointment) {
    if (window.confirm('Are sure you want to delete this Appointment ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteAppointment(appointment.$key); // Using Delete student API to delete student.
      this.toastr.success(appointment.ailment + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }
}

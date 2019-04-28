import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Appointment } from './../shared/appointment';   //  interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})

export class AppointmentsListComponent implements OnInit {
  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Appointment: Appointment[];                 // Save Appointments data in Appointment's array.
  searchAppointment;
  hideWhenNoAppointment = false; // Hide Appointments data table when no Appointment.
  noData = false;            // Showing No Appointment Message, when no Appointment in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  constructor(
    public crudApi: CrudService, // Inject Appointment CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    )  { }


  ngOnInit() {
    this.dataState(); // Initialize Appointment's list, when component is ready
    const appointmentList = this.crudApi.GetAppointmentsList();
    appointmentList.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Appointment = [];
      data.forEach(appointments => {
        const currentAppointment = appointments.payload.toJSON();
        this.crudApi.getPatients()
            .valueChanges().subscribe(datas => {
                for (let i = 0; i < datas.length; i++) {
                  if(datas[i].email.includes(currentAppointment['patientID'])) {
                   currentAppointment['patient'] = datas[i];
                 }
                }
                if(!currentAppointment['patient']){
                   currentAppointment['patient'] = {name: currentAppointment['patientID']};
                }
            });
        this.crudApi.getDoctorList()
        .snapshotChanges().subscribe(doctor => {
          for (let i = 0; i < doctor.length; i++) {
            if(doctor[i].key.includes(currentAppointment['doctorID'])) {
             currentAppointment['doctor'] = doctor[i].payload.toJSON();
           }
          }
          if(!currentAppointment['doctor']){
             currentAppointment['doctor'] = {employeeName: currentAppointment['doctorID']};
          }
          });
        currentAppointment['$key'] = appointments.key;
        this.Appointment.push(currentAppointment as Appointment);
        });
      });
  }

  // Using valueChanges() method to fetch simple list of Appointments data.
// It updates the state of hideWhenNoAppointment, noData & preLoader variables when any changes occurs in Appointment data list in real-time.
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

  // Method to delete Appointment object
  deleteAppointment(appointment) {
    if (window.confirm('Are sure you want to delete this Appointment ?')) { // Asking from user before Deleting Appointment data.
      this.crudApi.DeleteAppointment(appointment.$key); // Using Delete Appointment API to delete Appointment.
      this.toastr.success(appointment.ailment + ' successfully deleted!'); // Alert message will show up when Appointment successfully deleted.
    }
  }
}

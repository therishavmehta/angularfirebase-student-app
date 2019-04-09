import { Injectable } from '@angular/core';
import { Appointment } from '../shared/appointment';  // Student data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  appointmentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  appointmentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
  AddAppointment(appointment: Appointment) {
    this.appointmentsRef.push({
      ailment: appointment.ailment,
      date: appointment.date,
      doctorID: appointment.doctorID,
      patientID: appointment.patientID
    })
  }

  // Fetch Single Student Object
  GetAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments/' + id);
    return this.appointmentRef;
  }

  // Fetch Students List
  GetAppointmentsList() {
    this.appointmentsRef = this.db.list('appointments');
    return this.appointmentsRef;
  }  

  // Update Student Object
  UpdateAppointment(appointment: Appointment) {
    this.appointmentRef.update({
      ailment: appointment.ailment,
      date: appointment.date,
      doctorID: appointment.doctorID,
      patientID: appointment.patientID
    })
  }  

  // Delete Student Object
  DeleteAppointment(id: string) { 
    this.appointmentRef = this.db.object('appointments/'+id);
    this.appointmentRef.remove();
  }
  
}
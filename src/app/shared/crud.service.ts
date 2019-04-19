import { Injectable } from '@angular/core';
import Schedule from '../shared/schedule';
import { Appointment } from '../shared/appointment';  // Student data type interface class
import { AngularFireDatabase, AngularFireList,
  AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  appointmentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  appointmentRef: AngularFireObject<any>;
  patientRef: AngularFireObject<any>;
  scheduleRef: AngularFireObject<any>;
  adminRef: AngularFireObject<any>;
  doctorRef: AngularFireObject<any>;
  patientName: AngularFireObject<any>;
  patientsRef: AngularFireList<any>;
  doctorsRef: AngularFireList<any>; // Reference to Student object, its an Observable too
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
  AddAppointment(appointment: Appointment) {
    this.appointmentsRef.push({
      ailment: appointment.ailment,
      date: appointment.date,
      doctorID: appointment.doctorID ?appointment.doctorID: "-" ,
      patientID: appointment.patientID,
      status: appointment.status
    });
  }
  addSchedule(schedule: Schedule){
    this.scheduleRef = this.db.object('doctors/' + id + '/schedule');
  }
  getAdmin() {
    this.adminRef = this.db.object('admin/data');
    return this.adminRef;
  }
  getPatientByName(appointment: Appointment) {

  }
  getPatients() {
    this.patientsRef = this.db.list('patients');
    return this.patientsRef;

  }
  getDoctorById(id: string) {
    return this.db.object('doctors/'+id);
  }
  getDoctorList() {
    this.doctorsRef = this.db.list('doctors');
    return this.doctorsRef;
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
   updateDoctorSchelduleNode(id: string) {
     this.doctorRef = this.getDoctorById(id);
     this.scheduleRef = this.doctorRef;
   }
  // Update Student Object
  UpdateAppointment(appointment: Appointment) {
    this.appointmentRef.update({
      doctorID: appointment.doctorID
    });
  }

  // Delete Student Object
  DeleteAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments/' + id);
    this.appointmentRef.remove();
  }
}

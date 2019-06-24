import { Injectable } from '@angular/core';
import Schedule from '../shared/schedule';
import { Appointment } from '../shared/appointment';  // Appointment data type interface class
import {
  AngularFireDatabase, AngularFireList,
  AngularFireObject
} from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  appointmentsRef: AngularFireList<any>;    // Reference to Appointment data list, its an Observable
  appointmentRef: AngularFireObject<any>;
  patientRef: AngularFireObject<any>;
  scheduleRef: AngularFireObject<any>;
  adminRef: AngularFireObject<any>;
  doctorRef: AngularFireObject<any>;
  patientName: AngularFireObject<any>;
  patientsRef: AngularFireList<any>;
  doctorsRef: AngularFireList<any>; // Reference to Appointment object, its an Observable too
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Appointment
  AddAppointment(appointment: Appointment) {
    this.appointmentsRef.push({
      ailment: appointment.ailment,
      creationDate: appointment.creationDate,
      approvedDate: appointment.approvedDate ? appointment.approvedDate : '-',
      doctorID: appointment.doctorID ? appointment.doctorID : '-',
      patientID: appointment.patientID,
      status: Number(appointment.status)
    });
  }
  // addSchedule(schedule: Schedule){
  //   this.scheduleRef = this.db.object('doctors/' + id + '/schedule');
  // }
  getAdmin() {
    this.adminRef = this.db.object('admin/data');
    return this.adminRef;
  }
  getPatientByName(appointment: Appointment) {

  }
  getPatientList() {
    this.patientsRef = this.db.list('patients');
    return this.patientsRef;
  }
  getPatients() {
    this.patientsRef = this.db.list('patients');
    return this.patientsRef;

  }
  getDoctorById(id: string) {
    return this.db.object('doctors/' + id);
  }
  getDoctorList() {
    this.doctorsRef = this.db.list('doctors');
    return this.doctorsRef;
  }

  // Fetch Single Appointment Object
  GetAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments/' + id);
    return this.appointmentRef;
  }

  // Fetch Appointments List
  GetAppointmentsList() {
    this.appointmentsRef = this.db.list('appointments');
    return this.appointmentsRef;
  }
  updateDoctorSchelduleNode(id: string) {
    this.doctorRef = this.getDoctorById(id);
    this.scheduleRef = this.doctorRef;
  }
  // Update Appointment Object
  UpdateAppointment(appointment: Appointment) {
    if (!appointment.doctorID && appointment.status && !appointment.approvedDate) {
      this.appointmentRef.update({
        status: Number(appointment.status)
      });
    } else if (!appointment.status && appointment.doctorID && !appointment.approvedDate) {
      this.appointmentRef.update({
        doctorID: appointment.doctorID
      });
    } else if (!appointment.status && !appointment.doctorID && appointment.approvedDate) {
      this.appointmentRef.update({
        approvedDate: appointment.approvedDate
      });
    } else if (appointment.status && appointment.doctorID && !appointment.approvedDate) {
      this.appointmentRef.update({
        doctorID: appointment.doctorID,
        status: Number(appointment.status)
      });
    } else if (appointment.status && !appointment.doctorID && appointment.approvedDate) {
      this.appointmentRef.update({
        status: Number(appointment.status),
        approvedDate: appointment.approvedDate
      });
    } else if (!appointment.status && appointment.doctorID && appointment.approvedDate) {
      this.appointmentRef.update({
        doctorID: appointment.doctorID,
        approvedDate: appointment.approvedDate
      });
    } else {
      this.appointmentRef.update({
        status: appointment.status,
        doctorID: appointment.doctorID,
        approvedDate: appointment.approvedDate
      });
    }
  }

  // Delete Appointment Object
  DeleteAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments/' + id);
    this.appointmentRef.remove();
  }
}

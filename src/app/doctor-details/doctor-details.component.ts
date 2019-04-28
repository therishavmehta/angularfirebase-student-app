import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import Doctor from './../shared/doctor';   //  interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Doctor: Doctor[];                 // Save Doctors data in Doctor's array.
  searchDoctor;
  hideWhenNoDoctor = false; // Hide Doctors data table when no Doctor.
  noData = false;            // Showing No Doctor Message, when no Doctor in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  constructor(
    public crudApi: CrudService, // Inject Doctor CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    )  { }


  ngOnInit() {
    this.dataState(); // Initialize Doctor's list, when component is ready
    const DoctorList = this.crudApi.getDoctorList();
    DoctorList.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Doctor = [];
      data.forEach(Doctors => {
        const currentDoctor = Doctors.payload.toJSON();
        currentDoctor['$key'] = Doctors.key;
        this.Doctor.push(currentDoctor as Doctor);
        });
      console.log(this.Doctor);
      });
  }

  // Using valueChanges() method to fetch simple list of Doctors data.
// It updates the state of hideWhenNoDoctor, noData & preLoader variables when any changes occurs in Doctor data list in real-time.
  dataState() {
    this.crudApi.getDoctorList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoDoctor = false;
        this.noData = true;
      } else {
        this.hideWhenNoDoctor = true;
        this.noData = false;
      }
    });
  }
}


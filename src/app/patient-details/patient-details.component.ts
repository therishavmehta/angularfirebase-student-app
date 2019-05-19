import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import Patient from './../shared/patient';   //  interface class for Data types.
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Patient: Patient[];                 // Save Patients data in Patient's array.
  searchText;
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl();
 filteredOptions: Observable<string[]>;
  hideWhenNoPatient = false; // Hide Patients data table when no Patient.
  noData = false;            // Showing No Patient Message, when no Patient in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  constructor(
    public crudApi: CrudService, // Inject Patient CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    )  { }


  ngOnInit() {
    this.dataState(); // Initialize Patient's list, when component is ready
    const PatientList = this.crudApi.getPatientList();
    PatientList.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Patient = [];
      data.forEach(Patients => {
        const currentPatient = Patients.payload.toJSON();
        currentPatient['email'] = currentPatient['email'].replace(/,/g, ".");
        currentPatient['$key'] = Patients.key;
        this.Patient.push(currentPatient as Patient);
        });
      });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // Using valueChanges() method to fetch simple list of Patients data.
// It updates the state of hideWhenNoPatient, noData & preLoader variables when any changes occurs in Patient data list in real-time.
  dataState() {
    this.crudApi.getPatientList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoPatient = false;
        this.noData = true;
      } else {
        this.hideWhenNoPatient = true;
        this.noData = false;
      }
    });
  }

}

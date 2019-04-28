import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import Doctor from 'src/app/shared/doctor';
import {startWith, map } from 'rxjs/operators';
import Status from '../shared/status';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to appointment's edit form
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService,
    // options: Status[] = 
    // [{name: "Reject", value: 0},
    // {name: "Pending", value: 1},
    // {name: "Accept", value: 2},
    // ]
           // Toastr service for alert message
  ) { }
  doctorList: Doctor[] = [];
    filteredOptions: Observable<any[]>;
  ngOnInit() {
  //   const s = this.crudApi.getDoctorList();
  //   s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
  //     data.forEach(item => {
  //       const val = item.payload.toJSON();
  //       val['$key'] = item.key;
  //       this.doctorList.push(val as Doctor);
  //       });
  //       console.log(this.doctorList);
  //   });
  //   this.filteredOptions = this.editForm.valueChanges
  // .pipe(
  //   startWith(''),
  //   map(val => this._filter(val))
  // );
  //   console.log(s);
    this.updateAppointmentData();   // Call updateappointmentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetAppointment(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data); // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    });
  }
  _filter(val) {
    if (this.doctorList) {
    return this.doctorList.filter(option =>
    option.employeeName.toLowerCase().includes(val.toLowerCase()));
   }
 }
  // Accessing form control using getters
  get ailment() {
    return this.editForm.get('ailment');
  }

  get date() {
    return this.editForm.get('date');
  }

  get doctorID() {
    return this.editForm.get('doctorID');
  }

  get patientID() {
    return this.editForm.get('patientID');
  }
  get status() {
    return this.editForm.get('status');
  }

  // Contains Reactive Form logic
  updateAppointmentData() {
    this.editForm = this.fb.group({
      ailment: [''],
      date: [''],
      doctorID: [''],
      patientID: [''],
      status: []
    });
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.UpdateAppointment(this.editForm.value);       // Update appointment data using CRUD API
    this.toastr.success(this.editForm.controls['ailment'].value +
     ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-appointments']);               // Navigate to appointment's list page when appointment data is updated
  }

}

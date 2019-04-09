import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  public applicationForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetAppointmentsList();  // Call GetStudentsList() before main form is being called
    this.applicationFormFunction();              // Call student form when component is ready
  }

  // Reactive student form
  applicationFormFunction() {
    this.applicationForm = this.fb.group({
      ailment: ['', [Validators.required, Validators.minLength(2)]],
      date: [''],
      doctorID: ['', [Validators.required,Validators.minLength(2)]],
      patientID: ['', [Validators.required, Validators.minLength(2)]],
      status: ['', Validators.required]
    })  
  }

  // Accessing form control using getters
  get ailment() {
    return this.applicationForm.get('ailment');
  }

  get date() {
    return this.applicationForm.get('date');
  }

  get doctorID() {
    return this.applicationForm.get('doctorID');
  }

  get patientID() {
    return this.applicationForm.get('patientID');
  }  
  get status() {
    return this.applicationForm.get('status');
  }

  // Reset student form's values
  ResetForm() {
    this.applicationForm.reset();
  }  
 
  submitAppointmentData() {
    this.crudApi.AddAppointment(this.applicationForm.value); // Submit student data using CRUD API
    this.toastr.success(this.applicationForm.controls['ailment'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
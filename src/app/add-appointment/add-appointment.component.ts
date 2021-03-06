import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {
  public applicationForm: FormGroup;  // Define FormGroup to Appointment's form
  public final: string;
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.crudApi.GetAppointmentsList();  // Call GetAppointmentsList() before main form is being called
    this.applicationFormFunction();              // Call Appointment form when component is ready
  }

  // Reactive Appointment form
  applicationFormFunction() {
    const sendate = new Date();
    this.final = sendate.getFullYear().toString() + '-' + sendate.getMonth().toString() + '-' + sendate.getDate().toString();
    this.applicationForm = this.fb.group({
      ailment: [''],
      creationDate: [this.final],
      approvedDate: [''],
      doctorID: [''],
      patientID: [''],
      status: []
    });
  }

  // Accessing form control using getters
  get ailment() {
    return this.applicationForm.get('ailment');
  }

  get creationDate() {
    if (this.applicationForm.get('creationDate')) {
      return this.applicationForm.get('creationDate');
    }
    return null;
  }
  get approvedDate() {
    if (this.applicationForm.get('approvedDate')) {
      return this.applicationForm.get('approvedDate');
    }
    return null;
  }

  get doctorID() {
    if (this.applicationForm.get('doctorID')) {
      return this.applicationForm.get('doctorID');
    }
    return null;
  }

  get patientID() {
    if (this.applicationForm.get('patientID')) {
      return this.applicationForm.get('patientID');
    }
    return null;
  }
  get status() {
    if (this.applicationForm.get('status')) {
      return Number(this.applicationForm.get('status'));
    }
    return 1;
  }

  // Reset Appointment form's values
  ResetForm() {
    this.applicationForm.reset();
  }

  submitAppointmentData() {
    console.log(this.applicationForm.value);
    this.crudApi.AddAppointment(this.applicationForm.value); // Submit Appointment data using CRUD API
    this.toastr.success(this.applicationForm.controls['ailment'].value +
      ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
  }
}

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
  public final: string;
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
    var sendate = new Date();
      this.final = sendate.getFullYear().toString() + "-" + sendate.getMonth().toString() + "-" + sendate.getDate().toString();
      console.log(this.final);
    this.applicationForm = this.fb.group({
      ailment: [''],
      date: [this.final],
      doctorID: [''],
      patientID: [''],
      status: ['']
    });
  }

  // Accessing form control using getters
  get ailment() {
    return this.applicationForm.get('ailment');
  }

  get date() {
    if (this.applicationForm.get('date')) {
      return this.applicationForm.get('date');
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
        return this.applicationForm.get('status');
      }
      return 1;
  }

  // Reset student form's values
  ResetForm() {
    this.applicationForm.reset();
  }

  submitAppointmentData() {
    this.crudApi.AddAppointment(this.applicationForm.value); // Submit student data using CRUD API
    this.toastr.success(this.applicationForm.controls['ailment'].value +
    ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
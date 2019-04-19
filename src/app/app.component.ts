import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { CommonModule } from '@angular/common';
import Profile from './shared/profile';
import { CrudService } from './shared/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';
import  { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {MatDialog} from '@angular/material';

// import {MatDialog} from '@angular/material';
// import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	data: Profile;
	constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService,
    // public dialog: MatDialog // Toastr service for alert message
    )  { }
    // openDialog() {
    // const dialogRef = this.dialog.open(AdminProfileComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
	ngOnInit() {
		const profileData = this.crudApi.getAdmin();
		profileData.valueChanges().subscribe(adminProfile => {
			console.log(adminProfile);
			this.data = adminProfile;
		});
	}
}


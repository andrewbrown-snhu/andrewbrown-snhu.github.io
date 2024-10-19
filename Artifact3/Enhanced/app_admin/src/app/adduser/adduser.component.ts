//============================================================================
// Author      : Andrew Brown
// Date        : October 6th, 2024
// Version     : 2.0
// Description : Added New User Component which talks to the AuthenticationService to register a new account
//============================================================================

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {
    // Initialize variables
    addUserForm!: FormGroup;
    submitted:boolean = false;
    success:boolean = false;

    constructor(private fb:FormBuilder, private authService:AuthenticationService) {
        this.addUserForm = this.fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'confirmpassword': ['', Validators.required]
        });
    }

    // Submit the form
    onSubmit() {
        this.submitted = true;

        this.authService.addUser(this.addUserForm.get('email')?.value, this.addUserForm.get('name')?.value, this.addUserForm.get('password')?.value).subscribe({
            next: (data: any) => {
                this.success = true;
            }
        });
    }

    // get the form short name to access the form fields
    get f() { return this.addUserForm.controls; }
}

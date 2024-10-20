//============================================================================
// Author      : Andrew Brown
// Date        : October 6th, 2024
// Version     : 2.0
// Description : Added New User Component which talks to the AuthenticationService to register a new account
//============================================================================

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {
    // Initialize variables
    addUserForm!: FormGroup;
    submitted:boolean = false;
    success:boolean = false;
    passwordInvalid:boolean = false;

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

        if (!this.addUserForm.valid) {
            return;
        }

        if (this.addUserForm.get('password')?.value != this.addUserForm.get('confirmpassword')?.value) {
            this.passwordInvalid = true;
            return;
        } else {
            this.passwordInvalid = false;
        }

        this.authService.addUser(this.addUserForm.get('email')?.value, this.addUserForm.get('name')?.value, this.addUserForm.get('password')?.value).subscribe({
            next: (data: any) => {
                this.success = true;
            }
        });
    }

    // get the form short name to access the form fields
    get f() { return this.addUserForm.controls; }
}

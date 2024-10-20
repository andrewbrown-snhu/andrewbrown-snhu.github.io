//============================================================================
// Author      : Andrew Brown
// Date        : October 6th, 2024
// Version     : 2.0
// Description : Added Account Component which talks to the AuthenticationService to update the profile information
//============================================================================

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { BROWSER_STORAGE } from '../storage';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css'
})
export class AccountComponent {
    // Initialize variables
    profileForm!: FormGroup;
    submitted:boolean = false;
    success:boolean = false;
    passwordInvalid:boolean = false;

    constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private fb:FormBuilder, private authService:AuthenticationService) {
        this.profileForm = this.fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'password': [''],
            'confirmpassword': ['']
        });

        //this.profileForm.get('password')?.valueChanges

        this.retrieveAcctInfo();
    }

    // Get the current user information
    retrieveAcctInfo() {
        let userInfo = this.authService.getCurrentUser();

        this.profileForm.get('name')?.setValue(userInfo.name);
        this.profileForm.get('email')?.setValue(userInfo.email);
    }

    // Submit the form
    onSubmit() {
        this.submitted = true;

        if (!this.profileForm.valid) {
            return;
        }

        if (this.profileForm.get('password')?.value && this.profileForm.get('confirmpassword')?.value
            && this.profileForm.get('password')?.value != this.profileForm.get('confirmpassword')?.value) {
            this.passwordInvalid = true;
            return;
        } else {
            this.passwordInvalid = false;
        }

        this.authService.setUserInfo(this.profileForm.get('email')?.value, this.profileForm.get('name')?.value, this.profileForm.get('password')?.value, this.profileForm.get('confirmpassword')?.value).subscribe({
            next: (data: any) => {
                this.success = true;

                this.profileForm.get('password')?.setValue('');
                this.profileForm.get('confirmpassword')?.setValue('');

                this.storage.setItem('travlr-name', data.name);
                this.storage.setItem('travlr-email', data.email);
            }
        });
    }

    // get the form short name to access the form fields
    get f() { return this.profileForm.controls; }
}

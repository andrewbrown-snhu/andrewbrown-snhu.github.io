//============================================================================
// Author      : Andrew Brown
// Date        : August 18, 2024
// Version     : 1.0
// Description : Allows the user to add a new trip to the database
//============================================================================

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  addForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}

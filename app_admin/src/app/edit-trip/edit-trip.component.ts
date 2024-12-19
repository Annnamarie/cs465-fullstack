import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!:Trip;
  submitted = false;
  message:string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {

    //Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        console.log(value);
        this.trip = value; // Assuming the response is the trip object, not an array.
        // Populate the form with the trip data
        this.editForm.patchValue(value);
        if (!value) {
          this.message = 'No Trip Retrieved';
        } else {
          this.message = 'Trip: ' + tripCode + ' retrieved';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }    
  

  public onSubmit(): void {
    console.log("Form submitted");
    this.submitted = true;
  

    if (this.editForm.valid) {
      console.log("Form is valid. Sending request..");
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    } else {
      console.log('Form is invalid. Please fix errors before submitting.');
    }
  }

  // Get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }
}


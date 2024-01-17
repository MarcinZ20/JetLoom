import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faKey, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  faEnvelope = faEnvelope;
  faKey = faKey;
  faPerson = faPerson;

  public registerForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}

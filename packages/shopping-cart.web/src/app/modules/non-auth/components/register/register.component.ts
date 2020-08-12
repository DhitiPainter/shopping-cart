import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { NonAuthService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.nonAuthService.registerUser(this.registerForm.value).subscribe(response => {
      this.router.navigate(['/login']);
    });
  }

}

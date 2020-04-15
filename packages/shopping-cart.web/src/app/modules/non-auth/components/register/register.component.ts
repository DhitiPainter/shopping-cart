import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NonAuthService, AuthService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private authService: AuthService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email:['', [Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  register() {
    console.log(this.registerForm.value);
  }

}

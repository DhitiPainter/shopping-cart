import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { NonAuthService, AuthService, BroadcastService } from 'src/app/core/services';
import { BroadcastKeys } from 'src/app/core/common.constant';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userRoleId: any;
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  loginForm: FormGroup;
  rolesSub: Subscription;
  roles: any[] = this.commonService.userRoles;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private authService: AuthService,
    private broadcastService: BroadcastService,
    private commonService: CommonService,
    public matDialog: MatDialog) { }

  // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
  ngOnInit() {
    this.rolesSub = this.broadcastService.on(BroadcastKeys.userRoles).subscribe((data: []) => {
      this.roles = data;
    });

    // Create login form
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

  loginUser(form: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.nonAuthService.loginUser(form.value).subscribe(response => {
      this.authService.setAuhToken(response.token);
      window.location.reload();
    });
  }

  openDialogWithoutRef() {
    this.matDialog.open(this.secondDialog);
  }

  clearLocalStorage() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }
}

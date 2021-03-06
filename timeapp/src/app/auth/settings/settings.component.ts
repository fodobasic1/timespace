import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginStart, logout } from '../state/auth.actions';
import { isAuthenticated } from '../state/auth.selector';
import { AuthState } from '../state/auth.state';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loginForm: FormGroup;
  loggedUser: User;
  submitted = false;
  isAuthenticated: Observable<boolean>;
  
  constructor(
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      apiguid: new FormControl('',[Validators.required, Validators.pattern(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/)])
    });
  }

  get f() { return this.loginForm.controls; }

  onLoginSubmit() {
    this.submitted = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const timeapiguid = this.loginForm.value.apiguid;

    this.store.dispatch(loginStart({ username, password, timeapiguid}));
    
  }

  onLogout() {
    this.store.dispatch(logout());
  }

}

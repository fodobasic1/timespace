import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { Employee } from '../core/models/employee.model';
import { AuthService } from '../core/services/auth.service';
import { PresenceService } from '../core/services/presence.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  isAuthenticated: Observable<boolean>;
  presences: Employee[];
  private presenceDate: string;

  constructor(
    private store: Store<AuthState>,
    private presenceService: PresenceService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.presenceDate = this.convertdateToString(new Date());
    this.presenceDate = '2021-11-25T13:38';

    if(this.isAuthenticated && this.authService.authDoubleCheck()) {
      this.presenceService.getEmployeePresence(this.presenceDate).subscribe(data => {
        this.presences = data;
      });
    }
  }

  private convertdateToString(date: Date): string {
    return (
      date.getFullYear().toString() + '-' + 
      ("0" + (date.getMonth() + 1)).slice(-2) + '-' + 
      ("0" + (date.getDate())).slice(-2)) + 'T' + 
      date.toTimeString().slice(0,5);
  }

  onReload() {
    this.presenceService.getEmployeePresence(this.presenceDate).subscribe(data => {
      this.presences = data;
    });
  }

}

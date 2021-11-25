import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getEmployeePresence(presenceDate: string): Observable<Employee[]> {
    return this.getWithOptions('Presence', presenceDate);
  }
}

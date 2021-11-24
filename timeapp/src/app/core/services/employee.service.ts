import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.getAll('/employee');
  }

  insertEmployee(employee: Employee): Observable<Employee> {
    return this.insert('/employee', employee);
  }
}

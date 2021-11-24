import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AuthState } from 'src/app/auth/state/auth.state';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  employees: Employee[];
  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  currentRate = 8;
  allEmployees: Employee[];

  constructor(
    private store: Store<AuthState>,
    private employeeService: EmployeeService) { }


  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);

    if(this.isAuthenticated) {
      this.employeeService.getAllEmployees().subscribe(data => {
        this.employees = data;
        this.collectionSize = data.length;
        this.allEmployees = this.employees;
      });
    }
  }

  search(value: string): void {
    this.employees = this.allEmployees.filter((val) => 
      val.FirstName.includes(value) ||
      val.FirstName.toLowerCase().includes(value) || 
      val.LastName.toLowerCase().includes(value) ||
      val.LastName.includes(value)
      );
    this.collectionSize = this.employees.length;
  }

}

import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AuthState } from 'src/app/auth/state/auth.state';
import { Employee } from 'src/app/core/models/employee.model';
import { AuthService } from 'src/app/core/services/auth.service';
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
  newEmployee: Employee;

  addNewEmployeeForm: FormGroup;

  constructor(
    private store: Store<AuthState>,
    private employeeService: EmployeeService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);

    if(this.isAuthenticated && this.authService.authDoubleCheck()) {
      this.employeeService.getAllEmployees().subscribe(data => {
        this.employees = data;
        this.collectionSize = data.length;
        this.allEmployees = this.employees;
      });

      this.addNewEmployeeForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        email: new FormControl('', [Validators.maxLength(50)]),
        middleName: new FormControl('', [Validators.maxLength(255)]),
        address: new FormControl('', [Validators.maxLength(50)])
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

  get f() { return this.addNewEmployeeForm.controls; }

  onAddSubmit() {
    
    const firstName = this.addNewEmployeeForm.value.firstName;
    const lastName = this.addNewEmployeeForm.value.lastName;
    const email = this.addNewEmployeeForm.value.email;
    const middleName = this.addNewEmployeeForm.value.middleName;
    const address = this.addNewEmployeeForm.value.address;

    const employee = new Employee(firstName, lastName, email, middleName, address);

    this.employeeService.insertEmployee(employee).subscribe(data => {
      this.newEmployee = data;
    }) 
  }

}

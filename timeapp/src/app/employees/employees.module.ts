import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListFilterPipe } from "src/app/core/pipes/listFilter.pipe";
import { EmployeesComponent } from "./employees-list/employees.component";

const routes: Routes = [
    { path: 'users', component: EmployeesComponent }
]

@NgModule({
    declarations: [
        EmployeesComponent,
        ListFilterPipe],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule
    ]
})
export class EmployeesModule {}
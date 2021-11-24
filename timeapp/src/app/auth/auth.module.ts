import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SettingsComponent } from "./settings/settings.component";
import { AuthReducer } from "./state/auth.reducer";
import { AUTH_STATE_NAME } from "./state/auth.selector";

const routes: Routes = [
    { path: 'settings', component: SettingsComponent }
]

 @NgModule({
     declarations: [SettingsComponent],
     imports: [
         BrowserModule,
         CommonModule,
         FormsModule,
         ReactiveFormsModule,
         RouterModule.forChild(routes),
         StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
         EffectsModule.forFeature()
     ]
 })
 export class AuthModule{}
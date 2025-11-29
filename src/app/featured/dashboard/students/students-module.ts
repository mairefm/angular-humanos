import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { SharedModule } from '../../../shared/shared-module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentsForm } from './students-form/students-form';
import { StoreModule } from '@ngrx/store';
import { studentsFeatureKey, studentsReducer } from './store/students.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './store/students.effects';
import { StudentsTable } from './students-table/students-table';


@NgModule({
  declarations: [
    Students,
    StudentsForm,
    StudentsTable
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],

})
export class StudentsModule { }

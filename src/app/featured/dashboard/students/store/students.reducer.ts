import { createReducer, on } from '@ngrx/store';
import { Student } from '../../../../core/services/students/model/Student';
import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: any;
}

export const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

export const studentsReducer = createReducer(
  initialState,

  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    loading: false,
    students,
  })),

  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

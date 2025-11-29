import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsFeatureKey, StudentsState } from './students.reducer';

export const selectStudentsState =
  createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectStudents = createSelector(
  selectStudentsState,
  (state) => state.students
);

export const selectIsLoading = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectStudentsState,
  (state) => state.error
);


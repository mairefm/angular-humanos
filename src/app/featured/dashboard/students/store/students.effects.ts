import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../../../../core/services/students/students';
import { StudentsActions } from './students.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      switchMap(() =>
        this.studentsService.getStudentsForEffect().pipe(
          map((students) =>
            StudentsActions.loadStudentsSuccess({ students })
          ),
          catchError((error) =>
            of(StudentsActions.loadStudentsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) { }
}

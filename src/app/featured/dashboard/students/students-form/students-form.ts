import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { StudentsService } from '../../../../core/services/students/students';
import { Student } from '../../../../core/services/students/model/Student';

import { RootState } from '../../../../core/store';
import { StudentsActions } from '../store/students.actions';
import { studentFormGroup } from './validators';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.css',
})
export class StudentsForm {
  createForm: FormGroup;
  studentId: number | null = null;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private router: Router,
    private store: Store<RootState>
  ) {
    this.createForm = this.fb.group({
      id: [null],
      ...studentFormGroup,
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.studentId = Number(params['id']);
        this.isEditing = true;

        this.studentsService.getStudent(this.studentId).subscribe((student) => {
          if (student) {
            this.createForm.patchValue({
              id: student.id,
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email,
              course: student.course,
              status: student.status,
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: Student = this.createForm.value;

    if (this.isEditing) {
      this.studentsService.updateStudent(payload);
    } else {
      this.studentsService.addStudent(payload);
    }

    this.store.dispatch(StudentsActions.loadStudents());

    this.createForm.reset();
    this.router.navigate(['dashboard', 'students']);
  }

  // 🔽🔽🔽 HELPERS DE VALIDAÇÃO (iguais ao courses-form)

  inputInvalid(controlName: string): boolean {
    const control = this.createForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  inputValid(controlName: string): boolean {
    const control = this.createForm.get(controlName);
    return !!(control && control.valid);
  }

  getError(controlName: string): string {
    const control = this.createForm.get(controlName);

    if (!control) return '';

    if (control.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control.hasError('email')) {
      return 'Email inválido';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    return '';
  }

  onCancel(): void {
    this.router.navigate(['dashboard', 'students']);
  }
}

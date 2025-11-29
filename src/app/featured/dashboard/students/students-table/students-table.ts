import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Student, studentColumns } from '../../../../core/services/students/model/Student';
import { StudentsService } from '../../../../core/services/students/students';
import { RootState } from '../../../../core/store';
import {
  selectStudents,
  selectIsLoading,
  selectError,
} from '../store/students.selectors';
import { StudentsActions } from '../store/students.actions';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.css',
})
export class StudentsTable {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);

  private paginator!: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(p: MatPaginator) {
    if (p) {
      this.paginator = p;
      this.dataSource.paginator = p;
    }
  }

  students$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  private allStudents: Student[] = [];
  selectedStatus: '' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED' = '';
  private searchTerm = '';

  constructor(
    private studentsService: StudentsService,
    private store: Store<RootState>
  ) {
    this.students$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(StudentsActions.loadStudents());

    this.students$.subscribe({
      next: (students) => {
        this.allStudents = students;
        this.applyCombinedFilter();
      },
      error: (err) => console.error('Error loading students', err),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.applyCombinedFilter();
  }


  onStatusFilterChange(status: '' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED') {
    this.selectedStatus = status;
    this.applyCombinedFilter();
  }


  private applyCombinedFilter() {
    let filtered = [...this.allStudents];

    if (this.selectedStatus) {
      filtered = filtered.filter((s) => s.status === this.selectedStatus);
    }

    if (this.searchTerm) {
      filtered = filtered.filter((s) =>
        (s.firstName + ' ' + s.lastName + ' ' + s.email)
          .toLowerCase()
          .includes(this.searchTerm)
      );
    }

    this.dataSource.data = filtered;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteStudent(id: number) {

    this.studentsService.deleteStudent(id);


    this.allStudents = this.allStudents.filter((s) => s.id !== id);


    this.applyCombinedFilter();
  }

}

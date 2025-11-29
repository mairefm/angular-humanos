import { Component, ViewChild } from '@angular/core';
import { Course, courseColumns } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../core/store';
import { Observable } from 'rxjs';
import { selectCourses, selectError, selectIsLoading } from '../store/courses.selectors';
import { CoursesActions } from '../store/courses.actions';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css',
})
export class CoursesTable {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);

  private paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(p: MatPaginator) {
    if (p) {
      this.paginator = p;
      this.dataSource.paginator = p;
    }
  }
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  private allCourses: Course[] = [];
  selectedStatus: string = '';
  private searchTerm: string = '';

  constructor(
    private courseService: CoursesService,
    private store: Store<RootState>
  ) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(CoursesActions.loadCourses());

    this.courses$.subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.applyCombinedFilter();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteCourse(id: number) {
    this.courseService.deleteCourse(id);

    this.allCourses = this.allCourses.filter((c) => c.id !== id);

    this.applyCombinedFilter();
  }


  applyFilter(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.applyCombinedFilter();
  }

  onStatusFilterChange(status: string) {
    this.selectedStatus = status || '';
    this.applyCombinedFilter();
  }

  private applyCombinedFilter() {
    let filtered = [...this.allCourses];

    if (this.selectedStatus) {
      filtered = filtered.filter(
        (c) => c.status === this.selectedStatus
      );
    }

    if (this.searchTerm) {
      filtered = filtered.filter((c) =>
        (c.title + ' ' + c.description)
          .toLowerCase()
          .includes(this.searchTerm)
      );
    }

    this.dataSource.data = filtered;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isFutureCourse(date: string): boolean {
    return new Date(date) > new Date();
  }

  onEnrollStudents(course: Course) {
    console.log('Inscribir alumnas en el curso:', course);
  }
}

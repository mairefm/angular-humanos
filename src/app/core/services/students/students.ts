import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/constants';
import { Student } from './model/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  private studentsUrl = `${API_URL}/students`;

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudentsForEffect() {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  getStudents() {
    this.http.get<Student[]>(this.studentsUrl).subscribe((students) => {
      this.students = students;
      this.studentsSubject.next(students);
    });
  }

  getStudent(id: number) {
    return this.http.get<Student>(`${this.studentsUrl}/${id}`);
  }

  addStudent(student: Student) {
    const last = this.students[this.students.length - 1];
    const newId = last ? String(Number(last.id) + 1) : '1';

    student.id = newId;

    this.http.post<Student>(this.studentsUrl, student).subscribe((created) => {
      this.students.push(created);
      this.studentsSubject.next([...this.students]);
    });
  }

  updateStudent(student: Student) {
    const updatedStudents = this.students.map((s) =>
      s.id === student.id ? student : s
    );

    this.http
      .put<Student>(`${this.studentsUrl}/${student.id}`, student)
      .subscribe(() => {
        this.students = updatedStudents;
        this.studentsSubject.next(updatedStudents);
      });
  }

  deleteStudent(id: number) {
    const updatedStudents = this.students.filter((s) => s.id !== id);

    this.http.delete(`${this.studentsUrl}/${id}`).subscribe(() => {
      this.students = updatedStudents;
      this.studentsSubject.next(updatedStudents);
    });
  }
}

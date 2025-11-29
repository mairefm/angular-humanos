export interface Student {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    course: string;
    status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
}

export const studentColumns = [
    'id',
    'name',
    'email',
    'course',
    'status',
    'actions'
];


import { Validators } from '@angular/forms';

export const studentFormGroup = {
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', [Validators.required]],
    status: ['', [Validators.required]],
};


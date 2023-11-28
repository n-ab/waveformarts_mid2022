import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(allowedExtensions: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // If no file is selected, consider it valid (you can change this behavior if needed)
        }
        const fileExtension = control.value.name.split('.').pop().toLowerCase();
        if (allowedExtensions.indexOf(fileExtension) === -1) {
            return { fileType: true }; // Validation failed
        }
        return null; // Validation passed
    };
}
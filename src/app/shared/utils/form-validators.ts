import { AbstractControl, FormGroup } from '@angular/forms';
export class FormValidators {
    public static equals(valor: string) {
        const validator = (formControl: AbstractControl) => {
            if (!valor) {
                return null;
            }

            if (!formControl.root || !(formControl.root as FormGroup).controls) {
                return null;
            }


            if (formControl.value !== valor) {
                return { equals: valor };
            }
            return null;
        };
        return validator;
    }

    public static equalsTo(otherField: string) {
        const validator = (formControl: AbstractControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo!');
            }

            if (!formControl.root || !(formControl.root as FormGroup).controls) {
                return null;
            }

            const field = (formControl.root as FormGroup).get(otherField);

            if (!field) {
                throw new Error('É necessário informar um campo válido!');
            }

            if (formControl.value !== field.value) {
                return { equalsTo: true };
            }
            return null;
        };
        return validator;
    }

    public static date(formControl: AbstractControl) {
        if (!formControl.root || !(formControl.root as FormGroup).controls) {
            return null;
        }

        if (formControl.value && !(formControl.value instanceof Date)) {
            return { date: true };
        }
        return null;
    }

}

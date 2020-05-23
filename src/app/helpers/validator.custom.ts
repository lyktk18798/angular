import {FormControl, ValidatorFn} from '@angular/forms';

export function oneValueHasToBeChangedValidator(values: { controlName: string, initialValue: string | number | boolean }[]): ValidatorFn {
  return (form: FormControl): { [key: string]: any } => {
    let sameValues: boolean;
    sameValues = values.every(item => {
      return form.value[item.controlName] !== item.initialValue});
    return !sameValues ? {'sameValues': {values: values}} : null;
  };
}

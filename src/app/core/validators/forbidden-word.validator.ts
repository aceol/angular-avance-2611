import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

// export class ForbiddenWordValidatorClass implements Validator {
//     validate(control: AbstractControl): ValidationErrors | null {
//         throw new Error('Method not implemented.');
//     }
//     registerOnValidatorChange?(fn: () => void): void {
//         throw new Error('Method not implemented.');
//     }
// }

export function forbiddenWordValidator(word: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasForbiddenWord = (control.value as string).toLowerCase().includes(word.toLowerCase());
    return hasForbiddenWord
      ? {
          forbiddenWord: {
            value: `Le mot "${word}" est interdit.`,
          },
        }
      : null;
  };
}

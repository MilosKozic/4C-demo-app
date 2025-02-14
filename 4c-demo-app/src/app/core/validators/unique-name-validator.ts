import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueNameValidator {
  constructor(private dataService: DataService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.dataService.isNameUnique(control.value).pipe(
        debounceTime(300), 
        switchMap(isUnique => {
          return isUnique ? of(null) : of({ nameTaken: true });
        }),
        catchError(() => of(null)) 
      );
    };
  }
}

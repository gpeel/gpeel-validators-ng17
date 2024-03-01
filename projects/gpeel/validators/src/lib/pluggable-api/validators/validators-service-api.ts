import {InjectionToken} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {MyMessagesServiceAbstract} from '../messages/messages-service-api';

export abstract class MyValidatorsServiceAbstract {

   abstract min(min: number): ValidatorFn;
   abstract max(min: number): ValidatorFn;
   abstract required(control: AbstractControl): ValidationErrors | null;
   abstract requiredTrue(control: AbstractControl): ValidationErrors | null;
   abstract email(control: AbstractControl): ValidationErrors | null;
   abstract minLength(minLength: number): ValidatorFn;
   abstract maxLength(minLength: number): ValidatorFn;
   abstract pattern(pattern: string | RegExp): ValidatorFn;
   abstract nullValidator(control: AbstractControl): ValidationErrors | null;
}

export const MY_VALIDATORS_SERVICE_API = new InjectionToken<MyMessagesServiceAbstract>('MyValidatorsService');

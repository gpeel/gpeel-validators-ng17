import {Inject, Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {
  DefaultValidatorsService,
  MY_MESSAGES_SERVICE_API,
  MyMessagesServiceAbstract,
  MyValidatorsServiceAbstract
} from '@gpeel/validators';

/**
 * ValidatorsService will be used to define ALL validators in a project.
 * You get inherited standard validators methods : required, minLength ...etc.
 * And
 * You can add your own custom validators here.
 * ALL Validators will use the I18nMessagesService to extract their message from the stored map between which links the
 * validator's error-key and the complete validator message.
 *
 * YOU can take advantage in I18nMessagesService to connect
 * to any i18n framework : ngx-translate or @ngneat/transloco See strategy 5 for an example.
 */
@Injectable()
export class TypicalValidatorsService extends DefaultValidatorsService implements MyValidatorsServiceAbstract {

  /**
   * You don't have to provide the I18nMessagesService, for validators methods here,
   * because here we are passing it directly to the super constructor to set things up.
   * BUT injection with the Token also works fine also (line in comment, with a provider for the token
   * MY_MESSAGES_SERVICE_API)
   */
  constructor(@Inject(MY_MESSAGES_SERVICE_API) private fullMessagesService: MyMessagesServiceAbstract) {
    // constructor(private  fullMessagesService: I18nMessagesService) {
    super(fullMessagesService);
  }

  // Arrow-function required to use this ! by NG
  myCustomValidatorForbiddenName = (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.includes('toto')) {
      // console.log('TOTO!!!!!!!!!!!!!!!!!!!!!!!!');
      // FULL hard coded message here
      // return {myCustomValidator: {msg: 'Toto is forbidden'}};
      // or factorized in I18nCustomMessagesService
      // THIS HERE !!!
      return {forbiddenName: {msg: this.fullMessagesService.getValidationMessageFor('forbiddenName', {forbiddenName: 'toto'})}};
    }
    return null;
  };
}

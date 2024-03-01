import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {UserFormTemplateComponent} from './template-form/user-form-template..component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserFormTemplateComponent],
  template: `
    <user-template-form></user-template-form>
  `
})
export class AppComponent {

}

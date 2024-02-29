import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ErrorMessageComponent} from './my-validators/error-message.component';
import {ReactiveAllComponent} from './reactive-all/reactive-all.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveAllComponent,
    ErrorMessageComponent,
  ],
  template: `
    <reactive-all></reactive-all>
  `
})
export class AppComponent {

}

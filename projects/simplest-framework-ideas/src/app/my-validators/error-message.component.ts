/* eslint-disable */
import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'error-msg',
  standalone:true,
  imports:[CommonModule],
  template: `
    <div *ngIf="mymsgs && (this.control.dirty || this.control.touched)">
      <label *ngFor="let message of mymsgs">{{message}}</label>
    </div>
  `,
  styles: [
    `
      label {
        color: red;
        display: block;
        margin-bottom: 0;
      }
    `
  ],
})
export class ErrorMessageComponent implements OnDestroy, AfterViewInit {

  @Input() control!: AbstractControl;
  subscription!: Subscription;

  mymsgs: string[] = [];

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.subscription = this.control.valueChanges.subscribe(() => {
      this.mymsgs = [];
      console.log('valueChanges');
      if (this.control && this.control.errors) {
        Object.keys(this.control.errors).forEach(key => {
          this.mymsgs.push(this.control.errors![key].msg);
        });
        console.log(this.mymsgs);
      }
    });
  }

}



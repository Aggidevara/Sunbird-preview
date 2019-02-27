import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
enabled = true;
fieldvalue;
email = new FormControl(null, [Validators.email]);
  constructor() { }

  ngOnInit() {
  }
isDisabled(data) {

  console.log(data.target.value);
  this.enabled = !this.enabled;
}
validate(event) {
  console.log(this.email);
  // if (event.target.name === 'email') {
  //   if (_.includes(event.target.value, '@gmail.com')) {
  //     console.log('email');
  //   }
  // }
}
}

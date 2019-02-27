import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RouterModule, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email = new FormControl('', [Validators.required, Validators.email]);
password = new FormControl('', Validators.required);
semail;
spwd;
constructor(public userService: UserService, public route: Router) {

}
getErrorMessage() {
  return this.email.hasError('required') ? 'You must enter a value' :
  this.email.hasError('email') ? 'email is not valid' : '' ;
}

ngOnInit() {
}
  submit() {
      this.userService.getUser().subscribe(data => {
        _.forOwn(data, (value: any) => {
          if (this.email.value === value.email && this.password.value === value.password) {
            this.userService.updateLoginUser(value.email);
            this.route.navigate(['/home']);
          }
        });
      });
     }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUser;
  url = `http://localhost:3002`;
  constructor(public http: HttpClient ) { }
  getUser() {
    return this.http.get(`${this.url}/User`);
  }

  updateLoginUser(user) {
      console.log(user);
      const loginuser = {
        userId: user
      };
    return this.http.post(`${this.url}/login`, loginuser).subscribe(loginu => {
        this.loginUser = loginu;
        console.log(this.loginUser);
    });
  }
  getLoginUser() {
    return this.http.get(`${this.url}/login`);
  }
}

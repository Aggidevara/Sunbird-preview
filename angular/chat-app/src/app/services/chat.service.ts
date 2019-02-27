import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";
import { ContentObserver } from "@angular/cdk/observers";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  url = `http://localhost:3002`;
  user1 = [];
  user2 = [];
  userId;
  constructor(public http: HttpClient, public userService: UserService) {}

  getChat() {
    return this.http.get(`${this.url}/Chat`);
  }
  // updateUserMessage(message) {
  //   const msg = { msg: message };
  //   return this.http.post(`${this.url}/person1`, msg).subscribe(data => {
  //     console.log(data);
  //   });
  // }

  updateChat(message) {
    this.userService.getLoginUser().subscribe((data: any) => {
      console.log(data);
    this.userId = data.userId;
      const userMessage = {
              userId: this.userId,
              msg: message
      };
      this.http.post(`${this.url}/Chat`, userMessage).subscribe(mes => {
        console.log(mes);
      });
    });
  }
}

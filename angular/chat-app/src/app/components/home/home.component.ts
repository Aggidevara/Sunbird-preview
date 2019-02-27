import { Component, OnInit, OnChanges, SimpleChange, AfterContentInit, AfterViewInit, DoCheck, AfterContentChecked, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
message = new FormControl('');
person1Message = [];
userMessage;
loginUser;
showme = false;
person2Message = [];
constructor(public chatService: ChatService,
  public userService: UserService) { }

ngOnInit() {
    this.getMessages();
  }


  getMessages() {
    this.chatService.getChat().subscribe((data: any) => {
      // console.log(data);
      _.forOwn(data, (user: any) => {
        this.userService.getLoginUser().subscribe((loginuser: any) => {
          if (user.userId === loginuser.userId) {
            this.loginUser = loginuser.userId;
            this.person1Message.push(user);
            // console.log(this.loginUser);
            // this.person2Message.push(user.msg);
          } else {
             this.person1Message.push(user);
          }
        });
      });
    });
  }

submit() {
  if (this.message.value === '') {
    alert('please enter message');
  } else {
    this.showme = true;
    this.userMessage = this.message.value;
    this.chatService.updateChat(this.message.value);

  }
}


}


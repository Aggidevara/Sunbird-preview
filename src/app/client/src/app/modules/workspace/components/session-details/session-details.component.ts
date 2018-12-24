import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigService } from '@sunbird/shared';
import { UserService, LearnerService } from '@sunbird/core';
import { pluck } from 'rxjs/operators';
import {AttendanceComponent} from '../attendance/attendance.component';
@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit {
  sessions;
  participants = [];
  userIds = [];
  participantsDetails = [];
  constructor( public dialogRef: MatDialogRef<SessionDetailsComponent>,  @Inject(MAT_DIALOG_DATA) private data,
   private userService: UserService, public learnerService: LearnerService,
  public config: ConfigService, public dialog: MatDialog) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.sessions = this.data.sessionData;
    this.participants = this.sessions.sessionDetails.participants;
    this.userIds = Object.keys(this.participants);
    console.log('participants', this.participants);
    console.log('sedjsfnsbjfnmdgfmer', this.data);
    for (const userId of this.userIds) {
      this.getParticipantsDetails(userId);
    }
    console.log('user details', this.participantsDetails);
  }


  getParticipantsDetails(userId) {
    const option = {
      url: `${this.config.urlConFig.URLS.USER.GET_PROFILE}${userId}`,
      param: this.config.urlConFig.params.userReadParam
    };
    const response = this.learnerService.get(option).pipe(pluck('result', 'response'));
    response.subscribe(data => {
      console.log('data', data);
      this.participantsDetails.push(data);
    }
    );
  }
  openAttendance() {
    const attendanceDialog = this.dialog.open(AttendanceComponent, {
      width: '50%',
      height: '70%',
      data: {
              sessions : this.data.sessionData ,
              }
    });
    attendanceDialog.afterClosed().subscribe(result => {
    });
  }
}

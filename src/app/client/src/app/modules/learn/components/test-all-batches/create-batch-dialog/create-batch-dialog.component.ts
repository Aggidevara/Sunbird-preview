import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBatchService } from '../../../services';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ConfigService, ToasterService } from '@sunbird/shared';
import { UserService, LearnerService } from '@sunbird/core';
import { Subject, of as observableOf, Observable } from 'rxjs';
import * as moment from 'moment';
import {
  FormControl,
  Validators
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
export class DetailModel {
  name: string;
  id: string;
}
@Component({
  selector: 'app-create-batch-dialog',
  templateUrl: './create-batch-dialog.component.html',
  styleUrls: ['./create-batch-dialog.component.css']
})
export class CreateBatchDialogComponent implements OnInit {
  public courseId;
  minDate = new Date();
  mentorsCreatedBy;
  shouldSizeUpdate: boolean;
  breakpoint: number;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  mentorCtrl = new FormControl();
  filteredMentors: Observable<any>;
  mentors = [];
  allMentors = [];
  allMentorsDetails;
  @ViewChild('mentorInput') mentorInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoMentor') matMentorAutocomplete: MatAutocomplete;
  memberCtrl = new FormControl();
  filteredMembers: Observable<any>;
  members = [];
  allMembers = [];
  allMembersDetails;
  events: string[] = [];
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoMember') matMemberAutocomplete: MatAutocomplete;
  serializedDate = new FormControl(new Date().toISOString());
  date = new FormControl(new Date(), [Validators.required]);
  startDate = '';
  endDate = '';
  batchDescriptCtrl = new FormControl('', [Validators.required]);
  batchnameCtrl = new FormControl('', [Validators.required]);
  dateBooleanvalue: Boolean;
  submitbtn: Boolean;
  constructor(
    private route: ActivatedRoute,
    public courseBatchService: CourseBatchService,
    public userService: UserService,
    public learnerService: LearnerService,
    public toasterService: ToasterService,
    public configService: ConfigService,
    public dialogRef: MatDialogRef<CreateBatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shouldSizeUpdate = data.shouldSizeUpdate;
    this.filteredMentors = this.mentorCtrl.valueChanges.pipe(
      startWith(null),
      map((mentor: string | null) =>
        mentor ? this._filterMentor(mentor) : this.allMentors.slice()
      )
    );

    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((member: string | null) =>
        member ? this._filterMember(member) : this.allMembers.slice()
      )
    );
  }

  ngOnInit(): void {
    this.courseId = this.data.courseId;
    console.log('courseId', this.courseId);
    // this.allMentorsDetails = this.data.mentorDetail;
    // this.allMembersDetails = this.data.memberDetail;
    this.allMentors = this.data.mentorDetail;
    this.allMembers = this.data.memberDetail;
    // this.allMembers = _.concat(this.allMentors, this.allMembers);
    this.breakpoint = window.innerWidth <= 550 ? 1 : 1;
    if (this.shouldSizeUpdate) {
      this.updateSize();
    }
  }
  updateSize() {
    this.dialogRef.updateSize('600px', '300px');
  }
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 550 ? 1 : 1;
  }

  addMentor(event: MatChipInputEvent): void {
    if (!this.matMentorAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.mentors.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.mentorCtrl.setValue(null);
    }
  }

  removeMentor(mentor: string): void {
    const index = this.mentors.indexOf(mentor);
    if (index >= 0) {
      this.mentors.splice(index, 1);
    }
  }

  selectedMentor(event: MatAutocompleteSelectedEvent): void {
    this.mentors.push(event.option.value);
    this.mentorInput.nativeElement.value = '';
    this.mentorCtrl.setValue(null);
  }

  private _filterMentor(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMentors.filter(mentor => mentor.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addMember(event: MatChipInputEvent): void {
    if (!this.matMemberAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.members.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.memberCtrl.setValue(null);
    }
  }

  removeMember(member: string): void {
    const index = this.members.indexOf(member);
    console.log('Removed Member ', member);
    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }

  selectedMember(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option);
    this.members.push(event.option.value);
    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
  }

  private _filterMember(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers.filter(member => member.name.toLowerCase().indexOf(filterValue) === 0);
  }
  submit(startDate, endDate) {

    const startDat = moment(startDate).format('YYYY-MM-DD');
    const endDat = endDate && moment(endDate).format('YYYY-MM-DD');
    if (this.date.value > this.serializedDate.value && this.date.value ) {
      this.submitbtn = false;
      this.toasterService.error('End Date should be greater than start date');
    } else {
      this.submitbtn = true;
    }
    const mentorIds = [];
    for (const mentor of this.mentors) {
      mentorIds.push(mentor.id);
    }
    const requestBody = {
      courseId: this.courseId,
      name: this.batchnameCtrl.value,
      description: this.batchDescriptCtrl.value,
      // tslint:disable-next-line:quotemark
      enrollmentType: "open",
      startDate: startDat,
      endDate: endDat || null,
      createdBy: this.userService.userid,
      createdFor: this.userService.userProfile.rootOrg,
      mentors: _.compact(mentorIds)
    };
    console.log('request body', requestBody);
    // const mentorlist = [];
    // mentorlist['createdBy'] = this.userService.userid;
    // mentorlist['createdFor'] = mentorIds;
    // if (mentorIds !== null || mentorIds !== undefined) {
    // this.mentorsCreatedBy.push(mentorlist);
    // }
console.log('mentors list', this.mentorsCreatedBy);
    this.courseBatchService.createBatch(requestBody)
    .subscribe(
      (data) => {

        console.log('data ', data);
        this.toasterService.success('You have successfully created the batch');
      },
      (err) => {
        console.log(err);
        this.toasterService.error('User Doesnt belong to rootOrg, Cannot create batch');
      });
  }
}

import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
categories = [1, 2, 3, 4, 5, 6];
popularcourses = [1, 2];
images = [
// tslint:disable-next-line: max-line-length
  {
    background: 'http://bhip123.bhipglobal-mexico.com/wp-content/uploads/2012/05/y-tu-podrias-destacarte-en-los-negocios-de-internet.jpg',
    name: 'Category'
  },
  {
    background: 'https://cdn5.vectorstock.com/i/1000x1000/40/29/man-icon-with-speech-bubble-vector-12164029.jpg',
    name: 'School'
  },
  {
// tslint:disable-next-line: max-line-length
    background: 'https://c8.alamy.com/comp/MH0DKT/talk-people-icon-in-flat-style-man-with-speech-bubble-illustration-on-white-isolated-background-talk-chat-business-concept-MH0DKT.jpg',
    name: 'College'
  },
  {
// tslint:disable-next-line: max-line-length
    background: 'https://banner2.kisspng.com/20180405/lqq/kisspng-businessperson-management-company-sales-people-cartoon-5ac5a71267e302.6436566815229028024255.jpg',
    name: 'Business'
  },
  {
// tslint:disable-next-line: max-line-length
    background: 'https://previews.123rf.com/images/tanyastock/tanyastock1802/tanyastock180200549/95904041-man-icon-male-human-symbol-user-sign-statistics-chart-chat-speech-bubble-and-contacts-signs-.jpg',
    name: 'Software'
  },
  {
    background: 'https://media.istockphoto.com/vectors/flat-style-vector-illustration-discuss-social-network-news-chat-vector-id1016605900',
    name: 'Hardware'
  }
];
  constructor() { }

  ngOnInit() {
    console.log(this.images);
this.getImages();
  }
getImages() {
_.forEach(this.images, value => {
  console.log(value);
});
}
}

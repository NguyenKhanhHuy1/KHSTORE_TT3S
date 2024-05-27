/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ChatSupport',
  templateUrl: './ChatSupport.component.html',
  styleUrls: ['./ChatSupport.component.css']
})
export class ChatSupportComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  click() {
    window.open('https://www.messenger.com/t/100012467223768', '_blank');
  }
}

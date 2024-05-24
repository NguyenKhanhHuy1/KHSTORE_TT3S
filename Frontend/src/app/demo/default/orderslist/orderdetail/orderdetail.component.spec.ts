/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderdetailComponent } from './orderdetail.component';

describe('OrderdetailComponent', () => {
  let component: OrderdetailComponent;
  let fixture: ComponentFixture<OrderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderdetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

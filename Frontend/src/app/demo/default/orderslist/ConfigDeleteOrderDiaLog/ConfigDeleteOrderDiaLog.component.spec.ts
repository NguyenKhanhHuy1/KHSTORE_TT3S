/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfigDeleteOrderDiaLogComponent } from './ConfigDeleteOrderDiaLog.component';

describe('ConfigDeleteOrderDiaLogComponent', () => {
  let component: ConfigDeleteOrderDiaLogComponent;
  let fixture: ComponentFixture<ConfigDeleteOrderDiaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDeleteOrderDiaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDeleteOrderDiaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

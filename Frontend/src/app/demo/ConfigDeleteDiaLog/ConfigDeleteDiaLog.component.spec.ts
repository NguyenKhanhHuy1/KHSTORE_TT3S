/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfigDeleteDiaLogComponent } from './ConfigDeleteDiaLog.component';

describe('ConfigDeleteDiaLogComponent', () => {
  let component: ConfigDeleteDiaLogComponent;
  let fixture: ComponentFixture<ConfigDeleteDiaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDeleteDiaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDeleteDiaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

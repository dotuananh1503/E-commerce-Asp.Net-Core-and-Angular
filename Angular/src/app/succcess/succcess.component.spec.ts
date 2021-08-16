/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SucccessComponent } from './succcess.component';

describe('SucccessComponent', () => {
  let component: SucccessComponent;
  let fixture: ComponentFixture<SucccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

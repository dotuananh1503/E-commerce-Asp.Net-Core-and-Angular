/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublisherFormComponent } from './publisher-form.component';

describe('PublisherFormComponent', () => {
  let component: PublisherFormComponent;
  let fixture: ComponentFixture<PublisherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

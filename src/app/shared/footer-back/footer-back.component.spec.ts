/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterBackComponent } from './footer-back.component';

describe('FooterBackComponent', () => {
  let component: FooterBackComponent;
  let fixture: ComponentFixture<FooterBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

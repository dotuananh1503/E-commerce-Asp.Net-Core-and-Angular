/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputImgComponent } from './input-img.component';

describe('InputImgComponent', () => {
  let component: InputImgComponent;
  let fixture: ComponentFixture<InputImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

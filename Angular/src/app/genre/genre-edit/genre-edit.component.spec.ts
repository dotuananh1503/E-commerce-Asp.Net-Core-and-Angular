/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenreEditComponent } from './genre-edit.component';

describe('GenreEditComponent', () => {
  let component: GenreEditComponent;
  let fixture: ComponentFixture<GenreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

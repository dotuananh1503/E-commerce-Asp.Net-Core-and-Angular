/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenreFormComponent } from './genre-form.component';

describe('GenreFormComponent', () => {
  let component: GenreFormComponent;
  let fixture: ComponentFixture<GenreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValueNGComponent } from './valueNG.component';

describe('ValueNGComponent', () => {
  let component: ValueNGComponent;
  let fixture: ComponentFixture<ValueNGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueNGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueNGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

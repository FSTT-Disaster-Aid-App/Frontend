import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSeparatorComponent } from './line-separator.component';

describe('LineSeparatorComponent', () => {
  let component: LineSeparatorComponent;
  let fixture: ComponentFixture<LineSeparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineSeparatorComponent]
    });
    fixture = TestBed.createComponent(LineSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

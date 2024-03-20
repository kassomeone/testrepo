import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupValuesComponent } from './lookup-values.component';

describe('LookupValuesComponent', () => {
  let component: LookupValuesComponent;
  let fixture: ComponentFixture<LookupValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LookupValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

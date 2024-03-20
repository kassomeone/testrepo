import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcMappingComponent } from './ic-mapping.component';

describe('IcMappingComponent', () => {
  let component: IcMappingComponent;
  let fixture: ComponentFixture<IcMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

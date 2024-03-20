import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcConfigurationComponent } from './ic-configuration.component';

describe('IcConfigurationComponent', () => {
  let component: IcConfigurationComponent;
  let fixture: ComponentFixture<IcConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

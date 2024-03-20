import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcApiMetadataComponent } from './ic-api-metadata.component';

describe('IcApiMetadataComponent', () => {
  let component: IcApiMetadataComponent;
  let fixture: ComponentFixture<IcApiMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcApiMetadataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcApiMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

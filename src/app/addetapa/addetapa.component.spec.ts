import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddetapaComponent } from './addetapa.component';

describe('AddetapaComponent', () => {
  let component: AddetapaComponent;
  let fixture: ComponentFixture<AddetapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddetapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddetapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecComponent } from './storec.component';

describe('StorecComponent', () => {
  let component: StorecComponent;
  let fixture: ComponentFixture<StorecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

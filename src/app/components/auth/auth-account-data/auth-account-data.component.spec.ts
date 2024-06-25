import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthaccountdataComponent } from './auth-account-data.component';

describe('AuthaccountdataComponent', () => {
  let component: AuthaccountdataComponent;
  let fixture: ComponentFixture<AuthaccountdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthaccountdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthaccountdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedTripNotificationComponent } from './added-trip-notification.component';

describe('AddedTripNotificationComponent', () => {
  let component: AddedTripNotificationComponent;
  let fixture: ComponentFixture<AddedTripNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedTripNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedTripNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

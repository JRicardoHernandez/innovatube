import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInformationViewComponent } from './card-information-view.component';

describe('CardInformationViewComponent', () => {
  let component: CardInformationViewComponent;
  let fixture: ComponentFixture<CardInformationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInformationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInformationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

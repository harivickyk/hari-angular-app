import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeItemComponent } from './receipe-item.component';

describe('ReceipeItemComponent', () => {
  let component: ReceipeItemComponent;
  let fixture: ComponentFixture<ReceipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceipeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

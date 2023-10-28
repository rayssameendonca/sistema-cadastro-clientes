import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustumersListComponent } from './custumers-list.component';

describe('CustumersListComponent', () => {
  let component: CustumersListComponent;
  let fixture: ComponentFixture<CustumersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustumersListComponent],
    });
    fixture = TestBed.createComponent(CustumersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

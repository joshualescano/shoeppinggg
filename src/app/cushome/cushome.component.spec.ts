import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CushomeComponent } from './cushome.component';

describe('CushomeComponent', () => {
  let component: CushomeComponent;
  let fixture: ComponentFixture<CushomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CushomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CushomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

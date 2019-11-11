import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductssComponent } from './productss.component';

describe('ProductssComponent', () => {
  let component: ProductssComponent;
  let fixture: ComponentFixture<ProductssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

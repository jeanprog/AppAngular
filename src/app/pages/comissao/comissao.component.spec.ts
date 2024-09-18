import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissaoComponent } from './comissao.component';

describe('ComissaoComponent', () => {
  let component: ComissaoComponent;
  let fixture: ComponentFixture<ComissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComissaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

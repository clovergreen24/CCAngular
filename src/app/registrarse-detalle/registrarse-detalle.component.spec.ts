import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarseDetalleComponent } from './registrarse-detalle.component';

describe('RegistrarseDetalleComponent', () => {
  let component: RegistrarseDetalleComponent;
  let fixture: ComponentFixture<RegistrarseDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarseDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarseDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

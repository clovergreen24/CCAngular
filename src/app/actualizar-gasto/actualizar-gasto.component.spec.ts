import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarGastoComponent } from './actualizar-gasto.component';

describe('ActualizarGastoComponent', () => {
  let component: ActualizarGastoComponent;
  let fixture: ComponentFixture<ActualizarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarGastoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GraficoVentasComponent } from './grafico-ventas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GraficoVentasComponent', () => {
  let component: GraficoVentasComponent;
  let fixture: ComponentFixture<GraficoVentasComponent>;
  // Mock para ECharts
  const echartsMock = jasmine.createSpyObj('echarts', ['init', 'setOption']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: 'echarts', useValue: echartsMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar las graficas en ngAfterViewInit', fakeAsync(() => {
    spyOn(component as any, 'graficaVentasPorCategoria');
    spyOn(component as any, 'graficoVentasGananciasPorMes');
    spyOn(component as any, 'graficaTotalComprasPorCliente');

    // Act
    component.ngAfterViewInit();
    // Agrega más expectativas según sea necesario
    expect((component as any).graficaVentasPorCategoria).toHaveBeenCalled();
    expect((component as any).graficoVentasGananciasPorMes).toHaveBeenCalled();
    expect((component as any).graficaTotalComprasPorCliente).toHaveBeenCalled();
  }));

  it('debe filtrar categories y llamar graficaVentasPorCategoria en filtrarCategorias', () => {
    (component as any).ventasPorCategoria = [
      { nombre: 'Categoria1' },
      { nombre: 'Categoria2' },
    ];
    (component.categorias as FormControl<string[]>).setValue(['Categoria1']);

    spyOn(component as any, 'graficaVentasPorCategoria');
    fixture.detectChanges();

    // Act
    component.filtrarCategorias();

    // Assert
    expect((component as any).categoriasSeleccionadas).toEqual([
      { nombre: 'Categoria1' },
    ]);
    expect((component as any).graficaVentasPorCategoria).toHaveBeenCalled();
  });
});

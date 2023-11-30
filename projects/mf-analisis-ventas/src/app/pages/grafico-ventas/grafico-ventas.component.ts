import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonsLibService } from '@commons-lib';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { Cliente } from '../../../../../commons-lib/src/lib/interfaces/clientes.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MockCategoria } from '../../../../../commons-lib/src/lib/interfaces/categoria.interface';

@Component({
  selector: 'app-grafico-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './grafico-ventas.component.html',
  styleUrl: './grafico-ventas.component.scss',
})
export class GraficoVentasComponent implements OnInit, AfterViewInit {
  constructor(public commonsLibService: CommonsLibService) {}
  @ViewChild('chartCategoria', { static: true }) chartElement!: ElementRef;
  @ViewChild('chartVentasPeriodo', { static: true })
  chartElementVentas!: ElementRef;
  @ViewChild('chartTotalComprasPorCliente', { static: true })
  chartElementTotalComprasPorCliente!: ElementRef;

  option!: EChartsOption;
  private myChartCategoria: any;
  private myChartVentasPeriodo: any;
  private myChartTotalComprasPorCliente: any;

  private ventasPorCategoria: MockCategoria[] = [];
  // variable que almacena las categorias seleccionadas en el filtro
  private categoriasSeleccionadas: MockCategoria[] = [];
  // lista de categorias para filtrar
  public listaCategorias: string[] = [];
  categorias = new FormControl('');

  ngAfterViewInit() {
    this.myChartCategoria = echarts.init(this.chartElement.nativeElement);
    this.myChartVentasPeriodo = echarts.init(
      this.chartElementVentas.nativeElement
    );
    this.myChartTotalComprasPorCliente = echarts.init(
      this.chartElementTotalComprasPorCliente.nativeElement
    );

    this.graficaVentasPorCategoria();

    this.graficoVentasGananciasPorMes();
    this.graficaTotalComprasPorCliente();
  }
  ngOnInit() {
    this.commonsLibService.ventasPorCategoria$.subscribe((data) => {
      this.ventasPorCategoria = data;
      this.listaCategorias = data.map((d: MockCategoria) => d.nombre);
    });
  }

  filtrarCategorias() {
    this.categoriasSeleccionadas = this.ventasPorCategoria.filter((d: any) => {
      return this.categorias?.value?.includes(d.nombre);
    });
    this.graficaVentasPorCategoria();
  }

  // grafica que muestra el valor de las ventas por categoria
  private graficaVentasPorCategoria(): void {
    this.commonsLibService.ventasPorCategoria.subscribe((data) => {
      const gananciasFiltradas = data
        .filter((d: MockCategoria) => this.listaCategorias.includes(d.nombre))
        .map((d: MockCategoria) => d.gananciasPorVentas);

      const option: EChartsOption = {
        title: {
          text: 'Ventas por categoría',
          subtext: 'Últimos 12 meses',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Ventas'],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:
            this.categoriasSeleccionadas.length > 0
              ? this.categoriasSeleccionadas.map((d: MockCategoria) => d.nombre)
              : data.map((d: MockCategoria) => d.nombre),
        },

        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} $',
          },
        },
        series: [
          {
            name: 'Ventas',
            type: 'bar',
            data:
              this.categoriasSeleccionadas.length > 0
                ? this.categoriasSeleccionadas.map(
                    (d: MockCategoria) => d.gananciasPorVentas
                  )
                : data.map((d: MockCategoria) => d.gananciasPorVentas),
            markPoint: {
              data: [
                { type: 'max', name: 'Máximo' },
                { type: 'min', name: 'Mínimo' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Promedio' }],
            },
          },
        ],
      };

      this.myChartCategoria.setOption(option);
    });
  }

  // grafica que muestra el valor de las ventas por mes y las ganancias
  private graficoVentasGananciasPorMes(): void {
    this.commonsLibService.ventasPorPeriodo.subscribe((data) => {
      const option: EChartsOption = {
        title: {
          text: 'Ventas por mes',
          subtext: 'Últimos 12 meses',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Ventas', 'Ganancias'],
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map((d: any) => d.periodo),
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} $',
          },
        },
        series: [
          {
            name: 'Ventas',
            type: 'line',
            data: data.map((d: any) => d.ventas),
            markPoint: {
              data: [
                { type: 'max', name: 'Máximo' },
                { type: 'min', name: 'Mínimo' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Promedio' }],
            },
          },
          {
            name: 'Ganancias',
            type: 'line',
            data: data.map((d: any) => d.ganancias),
            markPoint: {
              data: [
                { type: 'max', name: 'Máximo' },
                { type: 'min', name: 'Mínimo' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Promedio' }],
            },
          },
        ],
      };

      this.myChartVentasPeriodo.setOption(option);
    });
  }

  // grafica que muestra el total de compras por cliente
  private graficaTotalComprasPorCliente(): void {
    this.commonsLibService.totalComprasPorCliente.subscribe((data) => {
      const option = {
        xAxis: {
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          data: data.map((d: Cliente) => d.nombre),
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            realtimeSort: true,
            name: 'Total compras por cliente',
            type: 'bar',
            data: data.map((d: Cliente) => d.total_productos_comprados),
            label: {
              show: true,
              position: 'right',
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
      };

      this.myChartTotalComprasPorCliente.setOption(option);
    });
  }
}

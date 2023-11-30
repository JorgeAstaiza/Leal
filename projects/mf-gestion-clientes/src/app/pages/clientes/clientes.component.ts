import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { Cliente } from '../../../../../commons-lib/src/lib/interfaces/clientes.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonsLibService } from '@commons-lib';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'nombre',
    'celular',
    'email',
    'direccion',
    'prodComprados',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clientes: Cliente[] = [];
  constructor(
    private router: Router,
    public commonsLibService: CommonsLibService
  ) {
    this.dataSource = new MatTableDataSource(this.clientes);
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // obtiene los clientes almacenados en el servicio mock
  private obtenerClientes() {
    this.commonsLibService.clientes.subscribe((clientes) => {
      this.clientes = clientes;
      this.dataSource = new MatTableDataSource(clientes);
    });
  }

  public eliminarCliente(cliente: Cliente) {
    this.commonsLibService.eliminarCliente(cliente);
    this.obtenerClientes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public editarCliente(cliente: Cliente) {
    // navegacion a la ruta /clientes/editar/:id
    this.router.navigate(['/clientes/crear', cliente.id]);
  }

  // filtrar clientes a partir del input
  public filtrarCliente(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockClientes } from './mocks/clientes.mock';
import { mockCategoriasProductos } from './mocks/categoria.mock';
import { mockDatosVentas } from './mocks/ventas.mock';
import { Cliente } from './interfaces/clientes.interface';
import { MockCategoria } from './interfaces/categoria.interface';
import { MockDatosVentas } from './interfaces/ventas.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonsLibService {
  clientes$ = new BehaviorSubject<Cliente[]>(mockClientes);
  ventasPorCategoria$ = new BehaviorSubject<MockCategoria[]>(
    mockCategoriasProductos
  );
  ventasPorPeriodo$ = new BehaviorSubject<MockDatosVentas[]>(mockDatosVentas);

  constructor() {
    if (localStorage.getItem('clientes')) {
      const storedClientes = localStorage.getItem('clientes');
      if (storedClientes !== null) {
        this.clientes$.next(JSON.parse(storedClientes));
      }
    }
  }

  get clientes() {
    return this.clientes$.asObservable();
  }

  get ventasPorCategoria() {
    return this.ventasPorCategoria$.asObservable();
  }

  get ventasPorPeriodo() {
    return this.ventasPorPeriodo$.asObservable();
  }

  get totalComprasPorCliente() {
    return this.clientes$.asObservable();
  }

  // actualizar cliente
  actualizarCliente(cliente: Cliente) {
    const indexClienteGuardar = this.clientes$.getValue().findIndex((c) => {
      return c.id === cliente.id;
    });
    this.clientes$.getValue()[indexClienteGuardar] = cliente;
    localStorage.setItem('clientes', JSON.stringify(this.clientes$.getValue()));
  }

  // nuevo cliente
  nuevoCliente(cliente: Cliente) {
    this.clientes$.next([...this.clientes$.getValue(), cliente]);
    localStorage.setItem('clientes', JSON.stringify(this.clientes$.getValue()));
  }

  // eliminar cliente
  eliminarCliente(cliente: Cliente) {
    this.clientes$.next(
      this.clientes$.getValue().filter((c) => c.id !== cliente.id)
    );
    localStorage.setItem('clientes', JSON.stringify(this.clientes$.getValue()));
  }
}

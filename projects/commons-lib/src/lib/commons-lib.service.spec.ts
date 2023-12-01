import { TestBed } from '@angular/core/testing';

import { CommonsLibService } from './commons-lib.service';
import { Cliente } from './interfaces/clientes.interface';

describe('CommonsLibService', () => {
  let service: CommonsLibService;
  const clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'John Doe',
      email: 'john@example.com',
      celular: '1234567',
      direccion: 'Street 123',
      total_productos_comprados: 2,
    },
    {
      id: 2,
      nombre: 'Jane Smith',
      email: 'jane@example.com',
      celular: '9876543',
      direccion: 'Avenue 456',
      total_productos_comprados: 3,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonsLibService);
    localStorage.clear();
    service.clientes$.next([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe actualizar un cliente', () => {
    const cliente = {
      id: 1,
      nombre: 'John Doe 2',
      email: 'email@email.com',
      celular: '5236235',
      direccion: 'Avenida 10',
      total_productos_comprados: 4,
    };
    service.clientes$.next(clientes);

    service.actualizarCliente(cliente);

    const clientesActualizados = service.clientes$.getValue();
    const clienteActualizado = clientesActualizados.find(
      (c) => c.id === cliente.id
    );

    expect(clienteActualizado).toEqual(cliente);

    const localStorageClientes = JSON.parse(
      localStorage.getItem('clientes') || '[]'
    );
    expect(localStorageClientes).toEqual(clientesActualizados);
  });

  it('debe agregar un nuevo cliente', () => {
    const cliente = {
      id: 2,
      nombre: 'Jane Smith',
      email: 'jane@example.com',
      celular: '1234567',
      direccion: 'Street 123',
      total_productos_comprados: 2,
    };
    service.nuevoCliente(cliente);

    const updatedClientes = service.clientes$.getValue();
    const addedClient = updatedClientes.find((c) => c.id === cliente.id);

    expect(addedClient).toEqual(cliente);

    // Verifica que se haya almacenado en localStorage
    const localStorageClientes = JSON.parse(
      localStorage.getItem('clientes') || '[]'
    );
    expect(localStorageClientes).toEqual(updatedClientes);
  });

  it('Debe eliminar un cliente', () => {
    const cliente = {
      id: 1,
      nombre: 'John Doe',
      email: 'john@example.com',
      celular: '1234567',
      direccion: 'Street 123',
      total_productos_comprados: 2,
    };

    localStorage.setItem('clientes', JSON.stringify(clientes));
    service.eliminarCliente(cliente);
    const updatedClientesString = localStorage.getItem('clientes');
    const updatedClientes = updatedClientesString
      ? JSON.parse(updatedClientesString)
      : [];
    const deletedCliente = updatedClientes.find(
      (c: any) => c.id === cliente.id
    );
    expect(deletedCliente).toBeUndefined();
  });
});

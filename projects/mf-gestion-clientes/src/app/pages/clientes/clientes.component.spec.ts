import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { Cliente } from '../../../../../commons-lib/src/lib/interfaces/clientes.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockClientes } from '../../../../../commons-lib/src/lib/mocks/clientes.mock';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('deberia de crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia de obtener los clientes mock en el ngOnInit', fakeAsync(() => {
    spyOn(component as any, 'obtenerClientes');
    component.ngOnInit();

    tick();

    expect((component as any).obtenerClientes).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(mockClientes);
    });
  }));

  it('deberia de llamar eliminarCliente', () => {
    const mockLocalCliente: Cliente = {
      id: 1,
      nombre: 'John Doe',
      celular: '1234567890',
      email: 'john@example.com',
      direccion: 'Street 123',
      total_productos_comprados: 5,
    };
    spyOn(component, 'eliminarCliente');

    component.clientes = [mockLocalCliente];
    component.eliminarCliente(mockLocalCliente);

    expect(component.eliminarCliente).toHaveBeenCalledWith(mockLocalCliente);
  });

  it('deberia de navegar a editarCliente', () => {
    const mockCliente: Cliente = {
      id: 1,
      nombre: 'John Doe',
      celular: '1234567890',
      email: 'john@example.com',
      direccion: 'Street 123',
      total_productos_comprados: 5,
    };
    const routerSpy = spyOn((component as any).router, 'navigate');

    component.editarCliente(mockCliente);

    expect(routerSpy).toHaveBeenCalledWith(['/clientes/crear', mockCliente.id]);
  });

  it('deberia de filtrar en base al input', () => {
    const mockClientes: Cliente[] = [
      {
        id: 1,
        nombre: 'John Doe',
        celular: '1234567890',
        email: 'john@example.com',
        direccion: 'Street 123',
        total_productos_comprados: 5,
      },
      {
        id: 2,
        nombre: 'Jane Smith',
        celular: '9876543210',
        email: 'jane@example.com',
        direccion: 'Avenue 456',
        total_productos_comprados: 7,
      },
    ];

    component.dataSource = new MatTableDataSource(mockClientes);
    const event: unknown = { target: { value: 'John' } };
    component.filtrarCliente(event as Event);

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].nombre).toBe('John Doe');
  });
});

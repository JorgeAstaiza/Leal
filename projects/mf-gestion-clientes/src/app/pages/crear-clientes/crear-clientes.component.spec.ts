import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CrearClientesComponent } from './crear-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonsLibService } from '@commons-lib';
import { Cliente } from '../../../../../commons-lib/src/lib/interfaces/clientes.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CrearClientesComponent', () => {
  let component: CrearClientesComponent;
  let fixture: ComponentFixture<CrearClientesComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let commonsLibServiceSpy: jasmine.SpyObj<CommonsLibService>;
  let routerSpy: jasmine.SpyObj<RouterTestingModule>;
  let mockClientes = [
    {
      id: 1,
      nombre: 'Juan Perez',
      celular: '1234567890',
      email: 'juan@example.com',
      direccion: 'Calle 123, Ciudad',
      total_productos_comprados: 1,
    },
    {
      id: 2,
      nombre: 'Maria Rodriguez',
      celular: '9876543210',
      email: 'maria@example.com',
      direccion: 'Avenida 456, Ciudad',
      total_productos_comprados: 7,
    },
  ];

  beforeEach(async () => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    const commonsLibServiceSpyObj = jasmine.createSpyObj('CommonsLibService', [
      'clientes$',
      'actualizarCliente',
      'nuevoCliente',
    ]);
    commonsLibServiceSpyObj.clientes$ = new BehaviorSubject<Cliente[]>(
      mockClientes
    );
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
        { provide: CommonsLibService, useValue: commonsLibServiceSpyObj },
      ],
    }).compileComponents();

    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    commonsLibServiceSpy = TestBed.inject(
      CommonsLibService
    ) as jasmine.SpyObj<CommonsLibService>;
    routerSpy = TestBed.inject(
      RouterTestingModule
    ) as jasmine.SpyObj<RouterTestingModule>;
    fixture = TestBed.createComponent(CrearClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('Debe cargar los clientes', () => {
    component.ngOnInit();
    expect((component as any).mClientes).toEqual(mockClientes);
  });

  it('Debe crear un cliente', () => {
    component.form.patchValue({
      nombre: 'John Doe',
      celular: '1234567890',
      email: 'john@example.com',
      direccion: 'Some Address',
      total_productos_comprados: 5,
    });

    component.crearCliente();

    fixture.detectChanges();
    expect(commonsLibServiceSpy.nuevoCliente).toHaveBeenCalled();

    expect(component.form.invalid).toBeFalse();
  });

  it('Debe actualizar un cliente', () => {
    component.form.patchValue({
      nombre: 'John Doe',
      celular: '1234567890',
      email: 'john@example.com',
      direccion: 'Some Address',
      total_productos_comprados: 5,
    });

    (component as any).idCliente = '1';

    component.crearCliente();

    expect(commonsLibServiceSpy.actualizarCliente).toHaveBeenCalled();

    expect(component.form.invalid).toBeFalse();
  });
});

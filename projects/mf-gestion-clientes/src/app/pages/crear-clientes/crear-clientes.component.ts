import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../../../../commons-lib/src/lib/interfaces/clientes.interface';
import { mockClientes } from '../../../../../commons-lib/src/lib/mocks/clientes.mock';
import {
  ActivatedRoute,
  Router,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-crear-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './crear-clientes.component.html',
  styleUrl: './crear-clientes.component.scss',
})
export class CrearClientesComponent implements OnInit {
  form!: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/;
  private durationInSeconds = 5;
  private mClientes: Cliente[] = [];

  private snackBarRef = inject(MatSnackBar);
  private idCliente!: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public commonsLibService: CommonsLibService
  ) {}

  ngOnInit() {
    this.createForm();
    this.mClientes = this.commonsLibService.clientes$.getValue();
    this.idCliente = this.activeRouter.snapshot.paramMap.get('id');
    if (this.idCliente !== null) {
      const cliente = this.mClientes.find(
        (c) => c.id === Number(this.idCliente)
      );
      if (cliente) {
        this.form.patchValue(cliente as { [key: string]: any });
      }
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      celular: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/[0-9]/),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      direccion: ['', [Validators.required]],
      total_productos_comprados: [
        0,
        [Validators.required, Validators.pattern(/[0-9]/), Validators.min(0)],
      ],
    });
  }

  // crea o actualiza un cliente
  public crearCliente(): void {
    if (this.form.invalid) return;

    if (this.idCliente) {
      // actualizar cliente
      const objCliente: Cliente = {
        ...this.form.value,
        id: Number(this.idCliente),
      };

      this.commonsLibService.actualizarCliente(objCliente);
      this.snackBarRef.open('Cliente actualizado con éxito', 'Cerrar', {
        duration: this.durationInSeconds * 2000,
      });
    } else {
      // crear cliente
      const objCliente: Cliente = {
        ...this.form.value,
        id: this.mClientes.length + 1,
      };
      this.commonsLibService.nuevoCliente(objCliente);
      this.snackBarRef.open('Cliente creado con éxito', 'Cerrar', {
        duration: this.durationInSeconds * 2000,
      });
    }
    this.router.navigate(['/clientes']);
  }
}

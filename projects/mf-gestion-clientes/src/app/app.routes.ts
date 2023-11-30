import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CrearClientesComponent } from './pages/crear-clientes/crear-clientes.component';

export const mf_clientes_routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path: 'crear/:id',
    component: CrearClientesComponent,
  },
  {
    path: 'crear',
    component: CrearClientesComponent,
  },
];

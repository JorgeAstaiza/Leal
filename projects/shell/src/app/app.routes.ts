import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

export const routes: Routes = [
  {
    path: '',
    component: BienvenidaComponent,
  },
  {
    path: 'clientes',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './routes',
      }).then((m) => m.mf_clientes_routes),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './ClientesComponent',
      }).then((m) => m.ClientesComponent),

    children: [
      {
        path: 'crear',
        loadComponent: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './CrearClientesComponent',
          }).then((m) => m.CrearClientesComponent),
      },
      {
        path: 'crear/:id',
        loadComponent: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './CrearClientesComponent',
          }).then((m) => m.CrearClientesComponent),
      },
    ],
  },
  {
    path: 'reportes',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './routes',
      }).then((m) => m.mf_ventas_routes),
  },
  {
    path: 'reportes',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './VentasComponent',
      }).then((m) => m.VentasComponent),
  },
];

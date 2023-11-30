import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { mf_ventas_routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(mf_ventas_routes)],
};

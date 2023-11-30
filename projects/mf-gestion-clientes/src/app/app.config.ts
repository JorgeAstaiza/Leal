import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { mf_clientes_routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(mf_clientes_routes), provideAnimations()],
};

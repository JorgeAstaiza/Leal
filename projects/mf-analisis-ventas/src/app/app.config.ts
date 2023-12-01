import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { mf_ventas_routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(mf_ventas_routes), provideAnimations()],
};

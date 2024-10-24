import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Importar provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};

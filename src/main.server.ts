import { enableProdMode } from '@angular/core';

import { env } from './environments/environment';

if (env.isProduction) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { ngExpressEngine } from "@nguniversal/express-engine";
export { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";


export { renderModule, renderModuleFactory } from '@angular/platform-server';
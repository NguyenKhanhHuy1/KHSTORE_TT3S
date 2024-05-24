import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { registerLicense } from '@syncfusion/ej2-base';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0QHxbf1x0ZFNMYFhbRXRPMyBoS35RckVnW3pednRRR2NUUExz');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

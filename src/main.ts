import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase/compat/app';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

firebase.initializeApp(environment.firebase);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

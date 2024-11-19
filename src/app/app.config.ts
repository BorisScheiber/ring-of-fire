import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-bea0d',
        appId: '1:898797633729:web:e2c5b635574633d95bd440',
        storageBucket: 'ring-of-fire-bea0d.firebasestorage.app',
        apiKey: 'AIzaSyBGDbei4KcungV_zDVEpSWZg0pjT89jbs8',
        authDomain: 'ring-of-fire-bea0d.firebaseapp.com',
        messagingSenderId: '898797633729',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-bea0d',
        appId: '1:898797633729:web:e2c5b635574633d95bd440',
        storageBucket: 'ring-of-fire-bea0d.firebasestorage.app',
        apiKey: 'AIzaSyBGDbei4KcungV_zDVEpSWZg0pjT89jbs8',
        authDomain: 'ring-of-fire-bea0d.firebaseapp.com',
        messagingSenderId: '898797633729',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};

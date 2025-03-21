import {enableProdMode, NgZone} from '@angular/core';

import {getSingleSpaExtraProviders, singleSpaAngular} from 'single-spa-angular';

import {environment} from './environments/environment';
import {singleSpaPropsSubject} from './single-spa/single-spa-props';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {EmptyRouteComponent} from './app/empty-route/empty-route.component';
import {APP_BASE_HREF} from '@angular/common';

if (environment.production) {
  enableProdMode();
}

// const lifecycles = singleSpaAngular({
//   // Aquí usamos la API de Angular para bootstrap de standalone components
//   bootstrapFunction: (singleSpaProps) => {
//     singleSpaPropsSubject.next(singleSpaProps);
//     return bootstrapApplication(AppComponent, {
//       providers: [
//         // Importante inyectar providers de single-spa
//         ...getSingleSpaExtraProviders(),
//       ],
//     });
//   },
//   template: '<app-root />', // Tu componente raíz
//   Router,
//   NavigationStart,
//   NgZone,
// });

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        provideRouter([{path: '', component: EmptyRouteComponent}]),
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
  },
  template: '<app-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

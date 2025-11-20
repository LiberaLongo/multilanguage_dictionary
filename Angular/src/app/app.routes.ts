// Angular/src/app/app.routes.ts

import { Routes } from '@angular/router';

//languages
import { Chinese } from './languages/chinese/chinese';
import { English } from './languages/english/english';
import { French } from './languages/french/french';
import { Italian } from './languages/italian/italian';
import { Japanese } from './languages/japanese/japanese';
import { Russian } from './languages/russian/russian';

export const routes: Routes = [
  //languages
  { path: 'Chinese', component: Chinese },
  { path: 'English', component: English },
  { path: 'French', component: French },
  { path: 'Italian', component: Italian },
  { path: 'Japanese', component: Japanese },
  { path: 'Russian', component: Russian },
];

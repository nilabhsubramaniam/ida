import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import ('./features/welcome/welcome.module').then(m => m.WelcomeModule )
    }
];

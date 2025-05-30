import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'resume-editor',
        canActivate: [authGuard],
        loadChildren: () => import('./features/resume-editor/resume-editor.module').then(m => m.ResumeEditorModule)
    },
    {
        path: 'resume-preview',
        canActivate: [authGuard],
        loadChildren: () => import('./features/resume-preview/resume-preview.module').then(m => m.ResumePreviewModule)
    },
    {
        path: 'resume-theme',
        canActivate: [authGuard],
        loadChildren: () => import('./features/resume-theme/resume-theme.module').then(m => m.ResumeThemeModule)
    },
    {
        path: 'export-resume',
        canActivate: [authGuard],
        loadChildren: () => import('./features/export-resume/export-resume.module').then(m => m.ExportResumeModule)
    },
    {
        path: 'profile-settings',
        canActivate: [authGuard],
        loadChildren: () => import('./features/profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule)
    }
];

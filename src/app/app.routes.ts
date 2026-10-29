import { Routes } from '@angular/router';
import { buildRouteMeta } from '@wawjs/ngx-default';
import { companyProfile } from './feature/company/company.data';

export const routes: Routes = [
	{
		path: '',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/'),
				titleSuffix: '',
			},
		},
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'landing',
		redirectTo: '',
		pathMatch: 'full',
	},
	{
		path: 'login',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/login'),
			},
		},
		loadComponent: () =>
			import('./pages/login/login.component').then((m) => m.LoginComponent),
	},
	{
		path: 'profile',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/profile'),
			},
		},
		loadComponent: () =>
			import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
	},
	{
		path: '**',
		redirectTo: '',
	},
];

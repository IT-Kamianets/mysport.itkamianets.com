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
		path: 'training',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/training'),
			},
		},
		loadComponent: () =>
			import('./pages/training/training.component').then((m) => m.TrainingComponent),
	},
	{
		path: 'orm',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/orm'),
			},
		},
		loadComponent: () =>
			import('./pages/orm/orm.component').then((m) => m.OrmComponent),
	},
	{
		path: 'settings',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/settings'),
			},
		},
		loadComponent: () =>
			import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
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
		path: '**',
		redirectTo: '',
	},
];
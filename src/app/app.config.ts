import {
	APP_INITIALIZER,
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
	buildAbsoluteUrl,
	buildSeoTitleSuffix,
	provideNgxDefaultSeo,
	stripTitleSuffix,
} from '@wawjs/ngx-default';
import { provideNgxCore } from '@wawjs/ngx-core';
import { provideTranslate } from '@wawjs/ngx-translate';
import { provideNgxUi } from '@wawjs/ngx-ui';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { BootstrapService } from './feature/bootstrap/bootstrap.service';
import { companyProfile } from './feature/company/company.data';

const initializeBootstrapData = (bootstrapService: BootstrapService) => () =>
	bootstrapService.initialize();

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideHttpClient(withFetch()),
		provideNgxCore({
			meta: {
				applyFromRoutes: true,
				useTitleSuffix: true,
				defaults: {
					title: stripTitleSuffix(companyProfile.defaultSeo.title, companyProfile.name),
					titleSuffix: buildSeoTitleSuffix(companyProfile),
					description: companyProfile.defaultSeo.description,
					image: buildAbsoluteUrl(
						companyProfile.siteUrl,
						companyProfile.defaultSeo.image,
					),
					robots: companyProfile.defaultSeo.robots,
				},
			},
		}),
		provideNgxDefaultSeo({
			siteUrl: companyProfile.siteUrl,
		}),
		provideNgxUi({
			mode: 'light',
			modes: ['light', 'dark'],
			lightTokens: {
				primary: '#ea580c',
				primaryHover: '#c2410c',
				secondary: '#f97316',
				secondaryHover: '#ea580c',
				bgPrimary: '#ffffff',
				bgSecondary: '#fffaf5',
				bgTertiary: '#ffedd5',
				border: '#fed7aa',
				textPrimary: '#1c1917',
				textSecondary: '#ffffff',
				textMuted: '#9a7b68',
				placeholder: '#b89f8f',
				focusRing: '0 0 0 3px rgba(234, 88, 12, 0.4)',
				shadowSm: '0 1px 3px rgba(234, 88, 12, 0.1)',
				shadowMd: '0 8px 24px rgba(234, 88, 12, 0.12)',
			},
			darkTokens: {
				primary: '#b026ff',
				primaryHover: '#c754ff',
				secondary: '#7928ca',
				secondaryHover: '#9013fe',
				bgPrimary: '#000000',
				bgSecondary: '#0d061a',
				bgTertiary: '#1a0c33',
				border: '#2e1454',
				textPrimary: '#f3ebff',
				textSecondary: '#ffffff',
				textMuted: '#a78bfa',
				placeholder: '#7c5eb8',
				focusRing: '0 0 0 3px rgba(176, 38, 255, 0.6)',
				shadowSm: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(176, 38, 255, 0.25)',
				shadowMd: '0 12px 32px rgba(0, 0, 0, 0.9), 0 0 24px rgba(176, 38, 255, 0.35)',
			},
		}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideTranslate({
			defaultLanguage: environment.defaultLanguage,
			languages: environment.languages,
			folder: '/i18n/',
		}),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeBootstrapData,
			deps: [BootstrapService],
			multi: true,
		},
	],
};

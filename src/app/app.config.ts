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
import { APP_TRANSLATIONS } from './core/i18n/translations';
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
				bgSecondary: '#fff4e8',
				bgTertiary: '#ffe0bb',
				border: '#f97316',
				textPrimary: '#3b1a06',
				textSecondary: '#ffffff',
				textMuted: '#a05a2c',
				placeholder: '#c8895a',
				focusRing: '0 0 0 3px rgba(234, 88, 12, 0.5)',
				shadowSm: '0 1px 3px rgba(234, 88, 12, 0.18)',
				shadowMd: '0 8px 28px rgba(234, 88, 12, 0.22)',
			},
			darkTokens: {
				primary: '#b026ff',
				primaryHover: '#c754ff',
				secondary: '#7928ca',
				secondaryHover: '#9013fe',
				bgPrimary: '#000000',
				bgSecondary: '#0b0017',
				bgTertiary: '#160530',
				border: '#5b21b6',
				textPrimary: '#ecdeff',
				textSecondary: '#ffffff',
				textMuted: '#c084fc',
				placeholder: '#8b5cf6',
				focusRing: '0 0 0 3px rgba(176, 38, 255, 0.7)',
				shadowSm: '0 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(176, 38, 255, 0.35)',
				shadowMd: '0 12px 36px rgba(0,0,0,0.95), 0 0 32px rgba(176, 38, 255, 0.5)',
			},
		}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideTranslate({
			defaultLanguage: environment.defaultLanguage,
			languages: environment.languages,
			folder: '/i18n/',
			translations: APP_TRANSLATIONS,
		}),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeBootstrapData,
			deps: [BootstrapService],
			multi: true,
		},
	],
};

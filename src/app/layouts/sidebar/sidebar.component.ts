import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '@wawjs/ngx-ui';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { NgOptimizedImage } from '@angular/common';
import type { Language } from '@wawjs/ngx-translate';
import type { AppLanguage } from '../../../environments/environment.prod';

interface NavItem {
	icon: string;
	label: string;
	path: string;
	exact: boolean;
}

@Component({
	selector: 'app-sidebar',
	imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	private readonly _themeService = inject(ThemeService);
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);

	protected readonly activeLanguage = this._languageService.language;
	protected readonly currentLanguage = computed(() =>
		_toAppLanguage(this._languageService.getLanguage(this.activeLanguage())),
	);
	protected readonly languages = computed(() =>
		this._languageService.languages().map((l) => _toAppLanguage(l)),
	);

	protected readonly navItems: NavItem[] = [
		{ icon: 'home',          label: 'Головна',      path: '/',           exact: true  },
		{ icon: 'fitness_center',label: 'Тренування',   path: '/training',   exact: false },
		{ icon: 'settings',      label: 'Налаштування', path: '/settings',   exact: false },
		{ icon: 'person',        label: 'Профіль',      path: '/profile',    exact: false },
	];

	protected toggleMode(): void {
		const next = this.mode() === 'dark' ? 'light' : 'dark';
		this._themeService.setMode(next);
	}

	protected async nextLanguage(): Promise<void> {
		const langs = this.languages();
		const idx = langs.findIndex((l) => l.code === this.activeLanguage());
		const next = langs[(idx + 1) % langs.length] ?? langs[0]!;
		await this._translateService.setLanguage(next.code);
	}
}

function _toAppLanguage(language: Language | undefined): AppLanguage {
	const fallback: AppLanguage = {
		code: 'ua',
		name: 'Ukrainian',
		nativeName: 'Українська',
		flagSrc: 'flags/ukraine.svg',
		htmlLang: 'uk',
		population: 35,
	};
	return { ...fallback, ...(language as Partial<AppLanguage> | undefined) };
}

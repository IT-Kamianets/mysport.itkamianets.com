import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService, TranslateDirective, TranslateService } from '@wawjs/ngx-translate';
import { ThemeService } from '@wawjs/ngx-ui';
import type { Language } from '@wawjs/ngx-translate';
import type { AppLanguage } from '../../../environments/environment';
import { CompanyService } from '../../feature/company/company.service';

function _toAppLanguage(language: Language): AppLanguage {
	return {
		code: language.code,
		name: language.name,
		nativeName: language.nativeName ?? language.name,
		flagSrc: '',
		htmlLang: 'en',
		population: 0,
		apiUrl: '',
		companyId: '',
		defaultLanguage: 'en',
		languages: [],
	};
}

@Component({
	selector: 'app-topbar',
	imports: [NgOptimizedImage, RouterLink, TranslateDirective],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
	private readonly _translateService = inject(TranslateService);
	private readonly _themeService = inject(ThemeService);
	private readonly _languageService = inject(LanguageService);
	private readonly _companyService = inject(CompanyService);
	private readonly _router = inject(Router);

	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly languageMenuOpen = signal(false);
	protected readonly languages = computed(() =>
		this._languageService.languages().map((language) => _toAppLanguage(language)),
	);
	protected readonly company = this._companyService.company;
	protected readonly activeLanguage = this._languageService.language;
	protected readonly currentLanguage = computed(() => {
		const lang = this._languageService.getLanguage(this.activeLanguage());
		return lang ? _toAppLanguage(lang) : _toAppLanguage({ code: 'en', name: 'English', nativeName: 'English' });
	});
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);
	protected readonly toggleLabel = computed(() => {
		this.activeLanguage();
		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});
	protected readonly languageMenuLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open language menu')();
	});
	protected readonly languageCycleLabel = computed(() => {
		this.activeLanguage();
		return `${this._translateService.translate('Switch language to')()} ${this.getNextLanguage().nativeName}`;
	});

	protected readonly nextLanguage = computed(() => {
		const languages = this.languages();
		const currentIndex = languages.findIndex((l) => l.code === this.activeLanguage());
		const nextIndex = (currentIndex + 1) % languages.length;
		return languages[nextIndex];
	});

	protected readonly getNextLanguage = this.nextLanguage;

	protected readonly switchLanguage = () => {
		this._languageService.setLanguage(this.activeLanguage());
	};

	protected readonly switchTheme = () => {
		this._themeService.setMode(this.mode() === 'dark' ? 'light' : 'dark');
	};

	protected readonly switchLanguageCycle = () => {
		this._languageService.setLanguage(this.getNextLanguage().code);
	};

	protected readonly switchThemeCycle = () => {
		this._themeService.setMode(this.mode() === 'dark' ? 'light' : 'dark');
	};

	protected readonly switchLanguageLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Switch language to')() +
			` ${this.getNextLanguage().nativeName}`;
	});

	protected readonly switchThemeLabel = computed(() => {
		this.mode();
		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});

	protected readonly switchLanguageMenuLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open language menu')();
	});

	protected readonly switchLanguageMenuAriaLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open language menu')();
	});

	protected readonly switchThemeMenuLabel = computed(() => {
		this.mode();
		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});

	protected readonly switchThemeMenuAriaLabel = computed(() => {
		this.mode();
		return this._translateService.translate(this.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')();
	});

	protected readonly companyMenuOpen = signal(false);
	protected readonly companyMenuLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open company menu')();
	});

	protected readonly companyMenuAriaLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Open company menu')();
	});

	protected readonly companyMenuCloseLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Close company menu')();
	});

	protected readonly companyMenuCloseAriaLabel = computed(() => {
		this.activeLanguage();
		return this._translateService.translate('Close company menu')();
	});

	protected readonly companyMenuToggle = () => {
		this.companyMenuOpen.update((open) => !open);
	};

	protected readonly companyMenuToggleAriaLabel = computed(() => {
		this.activeLanguage();
		return this.companyMenuOpen()
			? this._translateService.translate('Close company menu')()
			: this._translateService.translate('Open company menu')();
	});

	protected readonly companyMenuToggleAriaLive = computed(() => {
		this.activeLanguage();
		return this._translateService.translate(this.companyMenuOpen()
			? 'Company menu closed'
			: 'Company menu opened'
		)();
	});

	protected readonly companyMenuToggleAriaDescribedBy = computed(() => {
		this.activeLanguage();
		return this._translateService.translate(this.companyMenuOpen()
			? 'Company menu closed'
			: 'Company menu opened'
		)();
	});

	protected readonly setLanguage = (language: Language) => {
		this._languageService.setLanguage(language.code);
	};

	protected readonly toggleLanguageMenu = () => {
		this.languageMenuOpen.update((open) => !open);
	};

	protected readonly toggleMode = () => {
		this._themeService.setMode(this.mode() === 'dark' ? 'light' : 'dark');
	};
}
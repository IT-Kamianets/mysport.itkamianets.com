import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { AuthService } from '../../core/services/auth.service';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

interface NavItem {
	icon: string;
	labelKey: string;
	path: string;
	exact: boolean;
}

@Component({
	selector: 'app-sidebar',
	imports: [RouterLink, RouterLinkActive, NgOptimizedImage, AppTranslatePipe],
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	protected readonly authService = inject(AuthService);
	private readonly _translate = inject(TranslateService);
	private readonly _languageService = inject(LanguageService);

	protected readonly navItems = computed<NavItem[]>(() => {
		this._languageService.language();
		return [
			{ icon: 'home', labelKey: 'Головна', path: '/', exact: true },
			{ icon: 'fitness_center', labelKey: 'Тренування', path: '/training', exact: false },
			{ icon: 'settings', labelKey: 'Налаштування', path: '/settings', exact: false },
			{ icon: 'person', labelKey: 'Профіль', path: '/profile', exact: false },
		];
	});
}

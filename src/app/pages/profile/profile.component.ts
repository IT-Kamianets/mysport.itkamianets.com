import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@wawjs/ngx-translate';
import { AuthService } from '../../core/services/auth.service';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

interface StatCard {
	icon: string;
	value: string;
	labelKey: string;
}

@Component({
	selector: 'app-profile',
	imports: [RouterLink, AppTranslatePipe],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	protected readonly authService = inject(AuthService);
	private readonly _languageService = inject(LanguageService);
	protected readonly isLinking = signal(false);

	protected readonly stats = computed<StatCard[]>(() => {
		this._languageService.language();
		return [
			{ icon: 'fitness_center', value: '12', labelKey: 'Тренування' },
			{ icon: 'emoji_events', value: '5', labelKey: 'Досягнення' },
			{ icon: 'local_fire_department', value: '7', labelKey: 'Днів підряд' },
		];
	});

	protected async handleLinkGoogle(): Promise<void> {
		this.isLinking.set(true);
		try {
			await this.authService.linkWithGoogle();
		} finally {
			this.isLinking.set(false);
		}
	}
}

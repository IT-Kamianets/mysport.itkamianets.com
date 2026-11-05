import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@wawjs/ngx-translate';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

interface FeatureCard {
	icon: string;
	titleKey: string;
	descKey: string;
}

@Component({
	selector: 'app-landing',
	imports: [RouterLink, AppTranslatePipe],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
})
export class LandingComponent {
	private readonly _languageService = inject(LanguageService);

	protected readonly cards = computed<FeatureCard[]>(() => {
		this._languageService.language();
		return [
			{
				icon: 'fitness_center',
				titleKey: 'Тренування',
				descKey: this._languageService.language() === 'en'
					? 'Plan and track your workouts in a clean, intuitive format.'
					: 'Плануй та відстежуй свої тренування у зручному форматі.',
			},
			{
				icon: 'emoji_events',
				titleKey: 'Досягнення',
				descKey: this._languageService.language() === 'en'
					? 'Earn rewards and trophies for every completed challenge.'
					: 'Збирай нагороди за кожен виконаний виклик.',
			},
			{
				icon: 'group',
				titleKey: 'Спільнота',
				descKey: this._languageService.language() === 'en'
					? 'Find like-minded athletes and train together with the team.'
					: 'Знаходь однодумців та тренуйся разом із командою.',
			},
		];
	});
}

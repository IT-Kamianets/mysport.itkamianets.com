import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface StatCard {
	icon: string;
	value: string;
	label: string;
}

@Component({
	selector: 'app-profile',
	imports: [RouterLink],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	protected readonly authService = inject(AuthService);
	protected readonly isLinking = signal(false);

	protected readonly stats: StatCard[] = [
		{ icon: 'fitness_center', value: '12', label: 'Тренувань' },
		{ icon: 'emoji_events', value: '5', label: 'Досягнень' },
		{ icon: 'local_fire_department', value: '7', label: 'Днів підряд' },
	];

	protected async handleLinkGoogle(): Promise<void> {
		this.isLinking.set(true);
		try {
			await this.authService.linkWithGoogle();
		} finally {
			this.isLinking.set(false);
		}
	}
}

import { Component, inject } from '@angular/core';
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

	protected readonly stats: StatCard[] = [
		{ icon: 'fitness_center', value: '12', label: 'Тренувань' },
		{ icon: 'emoji_events', value: '5', label: 'Досягнень' },
		{ icon: 'local_fire_department', value: '7', label: 'Днів підряд' },
	];
}

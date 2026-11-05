import { Component } from '@angular/core';

interface StatCard {
	icon: string;
	value: string;
	label: string;
}

@Component({
	selector: 'app-profile',
	imports: [],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	protected readonly stats: StatCard[] = [
		{ icon: 'fitness_center', value: '0', label: 'Тренувань' },
		{ icon: 'emoji_events', value: '0', label: 'Досягнень' },
		{ icon: 'local_fire_department', value: '0', label: 'Днів підряд' },
	];
}

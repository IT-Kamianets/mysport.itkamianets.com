import { Component } from '@angular/core';

interface FeatureCard {
	icon: string;
	title: string;
	desc: string;
}

@Component({
	selector: 'app-landing',
	imports: [],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
})
export class LandingComponent {
	protected readonly cards: FeatureCard[] = [
		{ icon: 'fitness_center', title: 'Тренування', desc: 'Плануй та відстежуй свої тренування у зручному форматі.' },
		{ icon: 'emoji_events', title: 'Досягнення', desc: 'Збирай нагороди за кожен виконаний виклик.' },
		{ icon: 'group', title: 'Спільнота', desc: 'Знаходь однодумців та тренуйся разом із командою.' },
	];
}

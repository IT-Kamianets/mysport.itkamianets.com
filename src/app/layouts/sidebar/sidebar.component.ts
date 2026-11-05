import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

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
	protected readonly authService = inject(AuthService);

	protected readonly navItems: NavItem[] = [
		{ icon: 'home', label: 'Головна', path: '/', exact: true },
		{ icon: 'fitness_center', label: 'Тренування', path: '/training', exact: false },
		{ icon: 'settings', label: 'Налаштування', path: '/settings', exact: false },
		{ icon: 'person', label: 'Профіль', path: '/profile', exact: false },
	];
}

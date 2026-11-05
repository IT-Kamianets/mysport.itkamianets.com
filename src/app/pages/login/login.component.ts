import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-login',
	imports: [RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	protected readonly authService = inject(AuthService);
	private readonly _router = inject(Router);

	protected readonly isGoogleSigningIn = signal(false);
	protected readonly isAnonSigningIn = signal(false);

	protected async handleGoogleSignIn(): Promise<void> {
		this.isGoogleSigningIn.set(true);
		try {
			const user = await this.authService.signInWithGoogle();
			if (user) {
				await this._router.navigate(['/profile']);
			}
		} finally {
			this.isGoogleSigningIn.set(false);
		}
	}

	protected async handleAnonymousSignIn(): Promise<void> {
		this.isAnonSigningIn.set(true);
		try {
			const user = await this.authService.signInAnonymously();
			if (user) {
				await this._router.navigate(['/profile']);
			}
		} finally {
			this.isAnonSigningIn.set(false);
		}
	}

	protected async handleLinkGoogle(): Promise<void> {
		this.isGoogleSigningIn.set(true);
		try {
			const user = await this.authService.linkWithGoogle();
			if (user) {
				await this._router.navigate(['/profile']);
			}
		} finally {
			this.isGoogleSigningIn.set(false);
		}
	}
}

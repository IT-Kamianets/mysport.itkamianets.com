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

	protected readonly isSigningIn = signal(false);

	protected async handleGoogleSignIn(): Promise<void> {
		this.isSigningIn.set(true);
		try {
			const user = await this.authService.signInWithGoogle();
			if (user) {
				await this._router.navigate(['/profile']);
			}
		} finally {
			this.isSigningIn.set(false);
		}
	}
}

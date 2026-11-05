import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
	Auth,
	GoogleAuthProvider,
	User,
	getAuth,
	linkWithPopup,
	onAuthStateChanged,
	signInAnonymously as firebaseSignInAnonymously,
	signInWithPopup,
	signOut as firebaseSignOut,
} from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from '../../../environments/firebase.config';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _platformId = inject(PLATFORM_ID);
	private _app: FirebaseApp | null = null;
	private _auth: Auth | null = null;

	public readonly currentUser = signal<User | null>(null);
	public readonly loading = signal<boolean>(true);
	public readonly error = signal<string | null>(null);
	public readonly successMessage = signal<string | null>(null);

	public readonly isAuthenticated = computed(() => this.currentUser() !== null);
	public readonly isAnonymous = computed(() => this.currentUser()?.isAnonymous ?? false);

	constructor() {
		if (isPlatformBrowser(this._platformId)) {
			this._initFirebase();
		} else {
			this.loading.set(false);
		}
	}

	private _initFirebase(): void {
		try {
			this._app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
			this._auth = getAuth(this._app);

			onAuthStateChanged(this._auth, (user) => {
				this.currentUser.set(user);
				this.loading.set(false);
			});

			isSupported()
				.then((supported) => {
					if (supported && this._app) {
						getAnalytics(this._app);
					}
				})
				.catch(() => {});
		} catch (err: unknown) {
			console.error('Firebase init error:', err);
			this.loading.set(false);
		}
	}

	/**
	 * Sign in with Google provider.
	 * If the current user is anonymous, it will automatically link the account
	 * to prevent losing anonymous user data and progress!
	 */
	public async signInWithGoogle(): Promise<User | null> {
		this.error.set(null);
		this.successMessage.set(null);

		if (!this._auth) {
			this.error.set('Firebase auth is not available');
			return null;
		}

		const user = this.currentUser();
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: 'select_account' });

		// If user is currently anonymous, link their account seamlessly
		if (user && user.isAnonymous) {
			return this.linkWithGoogle();
		}

		try {
			const result = await signInWithPopup(this._auth, provider);
			this.currentUser.set(result.user);
			return result.user;
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Помилка входу через Google';
			this.error.set(message);
			console.error('Google sign in error:', err);
			return null;
		}
	}

	/**
	 * Sign in anonymously (guest mode).
	 */
	public async signInAnonymously(): Promise<User | null> {
		this.error.set(null);
		this.successMessage.set(null);

		if (!this._auth) {
			this.error.set('Firebase auth is not available');
			return null;
		}

		try {
			const result = await firebaseSignInAnonymously(this._auth);
			this.currentUser.set(result.user);
			return result.user;
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Помилка анонімного входу';
			this.error.set(message);
			console.error('Anonymous sign in error:', err);
			return null;
		}
	}

	/**
	 * Link an anonymous session to a Google account without losing progress.
	 */
	public async linkWithGoogle(): Promise<User | null> {
		this.error.set(null);
		this.successMessage.set(null);

		const user = this._auth?.currentUser;
		if (!user) {
			return this.signInWithGoogle();
		}

		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: 'select_account' });

		try {
			const result = await linkWithPopup(user, provider);
			this.currentUser.set(result.user);
			this.successMessage.set('Акаунт успішно об’єднано з Google! Ваш прогрес збережено.');
			return result.user;
		} catch (err: unknown) {
			const authErr = err as { code?: string; message?: string };
			if (authErr?.code === 'auth/credential-already-in-use') {
				// The Google account already exists on another user; sign in to that account directly
				this.error.set(
					'Цей Google-акаунт уже зареєстровано. Виконуємо вхід до існуючого акаунту...',
				);
				try {
					const directResult = await signInWithPopup(this._auth!, provider);
					this.currentUser.set(directResult.user);
					return directResult.user;
				} catch (subErr) {
					console.error('Direct sign in after conflict failed:', subErr);
				}
			} else {
				const message = err instanceof Error ? err.message : 'Помилка зв’язування акаунту';
				this.error.set(message);
				console.error('Link with Google error:', err);
			}
			return null;
		}
	}

	public async signOut(): Promise<void> {
		if (!this._auth) return;
		try {
			await firebaseSignOut(this._auth);
			this.currentUser.set(null);
			this.successMessage.set(null);
			this.error.set(null);
		} catch (err) {
			console.error('Sign out error:', err);
		}
	}
}

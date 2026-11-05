import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
	Auth,
	GoogleAuthProvider,
	User,
	getAuth,
	onAuthStateChanged,
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

	public async signInWithGoogle(): Promise<User | null> {
		this.error.set(null);
		if (!this._auth) {
			this.error.set('Firebase auth is not available');
			return null;
		}

		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: 'select_account' });
			const result = await signInWithPopup(this._auth, provider);
			this.currentUser.set(result.user);
			return result.user;
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Google sign-in error';
			this.error.set(message);
			console.error('Google sign in error:', err);
			return null;
		}
	}

	public async signOut(): Promise<void> {
		if (!this._auth) return;
		try {
			await firebaseSignOut(this._auth);
			this.currentUser.set(null);
		} catch (err) {
			console.error('Sign out error:', err);
		}
	}
}

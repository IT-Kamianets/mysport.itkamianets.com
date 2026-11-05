import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '@wawjs/ngx-ui';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import type { Language } from '@wawjs/ngx-translate';
import type { AppLanguage } from '../../../environments/environment.prod';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-settings',
	imports: [NgOptimizedImage, RouterLink],
	template: `
		<div class="min-h-screen" style="background: var(--c-bg-primary)">
			<div class="mx-auto max-w-[var(--container)] px-4 py-14 sm:px-6">
				<div
					class="relative overflow-hidden rounded-[calc(var(--radius-card)*2)] border-2 border-[var(--c-border)] p-8 shadow-[var(--shadow-md)] sm:p-10"
					style="background: var(--c-bg-secondary)"
				>
					<div class="absolute inset-x-0 top-0 h-1.5" style="background: var(--c-primary)"></div>
					<div
						class="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-20"
						style="background: var(--c-primary)"
					></div>

					<div
						class="inline-flex items-center gap-2 rounded-full border-2 border-[var(--c-border)] bg-[var(--c-bg-tertiary)] px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
						style="color: var(--c-primary)"
					>
						<span class="material-symbols-outlined text-[16px]">settings</span>
						Налаштування
					</div>

					<h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl" style="color: var(--c-text-strong)">
						Налаштування
					</h1>
					<p class="mt-3 max-w-xl text-base leading-relaxed" style="color: var(--c-text-muted)">
						Керуй темою, мовою та параметрами свого акаунту.
					</p>

					<div class="mt-10 grid gap-6 md:grid-cols-2">
						<!-- Theme selection -->
						<div
							class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] p-6 shadow-[var(--shadow-sm)]"
							style="background: var(--c-bg-primary)"
						>
							<div class="flex items-center gap-3">
								<span class="material-symbols-outlined text-[28px]" style="color: var(--c-primary)">palette</span>
								<div>
									<h2 class="text-lg font-bold" style="color: var(--c-text-strong)">Тема оформлення</h2>
									<p class="text-xs" style="color: var(--c-text-muted)">Оберіть кольорову схему інтерфейсу</p>
								</div>
							</div>

							<div class="mt-5 grid grid-cols-2 gap-3">
								<button
									type="button"
									(click)="setTheme('light')"
									class="theme-interactive theme-focus flex flex-col items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 p-4 text-sm font-bold transition-all"
									[style.border-color]="mode() === 'light' ? 'var(--c-primary)' : 'var(--c-border)'"
									[style.background]="mode() === 'light' ? 'var(--c-bg-tertiary)' : 'transparent'"
									[style.color]="mode() === 'light' ? 'var(--c-primary)' : 'var(--c-text)'"
								>
									<span class="material-symbols-outlined text-[28px]">light_mode</span>
									<span>Світла тема</span>
									<span class="text-[11px] font-normal" style="color: var(--c-text-muted)">Білий + Оранжевий</span>
								</button>

								<button
									type="button"
									(click)="setTheme('dark')"
									class="theme-interactive theme-focus flex flex-col items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 p-4 text-sm font-bold transition-all"
									[style.border-color]="mode() === 'dark' ? 'var(--c-primary)' : 'var(--c-border)'"
									[style.background]="mode() === 'dark' ? 'var(--c-bg-tertiary)' : 'transparent'"
									[style.color]="mode() === 'dark' ? 'var(--c-primary)' : 'var(--c-text)'"
								>
									<span class="material-symbols-outlined text-[28px]">dark_mode</span>
									<span>Темна тема</span>
									<span class="text-[11px] font-normal" style="color: var(--c-text-muted)">Чорний + Неон</span>
								</button>
							</div>
						</div>

						<!-- Language selection -->
						<div
							class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] p-6 shadow-[var(--shadow-sm)]"
							style="background: var(--c-bg-primary)"
						>
							<div class="flex items-center gap-3">
								<span class="material-symbols-outlined text-[28px]" style="color: var(--c-primary)">translate</span>
								<div>
									<h2 class="text-lg font-bold" style="color: var(--c-text-strong)">Мова сайту</h2>
									<p class="text-xs" style="color: var(--c-text-muted)">Оберіть зручну мову для взаємодії</p>
								</div>
							</div>

							<div class="mt-5 grid grid-cols-2 gap-3">
								@for (lang of languages(); track lang.code) {
									<button
										type="button"
										(click)="setLanguage(lang.code)"
										class="theme-interactive theme-focus flex flex-col items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 p-4 text-sm font-bold transition-all"
										[style.border-color]="activeLanguage() === lang.code ? 'var(--c-primary)' : 'var(--c-border)'"
										[style.background]="activeLanguage() === lang.code ? 'var(--c-bg-tertiary)' : 'transparent'"
										[style.color]="activeLanguage() === lang.code ? 'var(--c-primary)' : 'var(--c-text)'"
									>
										<img
											class="h-6 w-9 rounded-[4px] border border-black/10 object-cover shadow-sm"
											[alt]="lang.nativeName"
											[ngSrc]="lang.flagSrc"
											width="36"
											height="24"
										/>
										<span>{{ lang.nativeName }}</span>
									</button>
								}
							</div>
						</div>

						<!-- Account quick status -->
						<div
							class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] p-6 shadow-[var(--shadow-sm)] md:col-span-2"
							style="background: var(--c-bg-primary)"
						>
							<div class="flex flex-wrap items-center justify-between gap-4">
								<div class="flex items-center gap-4">
									<div
										class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--c-primary)]"
										style="background: var(--c-bg-tertiary)"
									>
										@if (authService.currentUser()?.photoURL; as photo) {
											<img [src]="photo" alt="Avatar" class="h-full w-full object-cover" />
										} @else {
											<span class="material-symbols-outlined text-[30px]" style="color: var(--c-primary)">person</span>
										}
									</div>

									<div>
										@if (authService.currentUser(); as user) {
											<p class="text-base font-bold" style="color: var(--c-text-strong)">
												{{ user.displayName || 'Користувач' }}
											</p>
											<p class="text-xs" style="color: var(--c-text-muted)">{{ user.email }}</p>
										} @else {
											<p class="text-base font-bold" style="color: var(--c-text-strong)">Гість</p>
											<p class="text-xs" style="color: var(--c-text-muted)">Ви не увійшли в акаунт</p>
										}
									</div>
								</div>

								<div class="flex items-center gap-3">
									@if (authService.currentUser()) {
										<a
											routerLink="/profile"
											class="theme-interactive theme-focus inline-flex h-10 items-center gap-2 rounded-[var(--radius-btn)] border-2 border-[var(--c-primary)] px-5 text-sm font-bold"
											style="color: var(--c-primary)"
										>
											Мій профіль
										</a>
										<button
											type="button"
											(click)="authService.signOut()"
											class="theme-interactive theme-focus inline-flex h-10 items-center gap-2 rounded-[var(--radius-btn)] px-5 text-sm font-bold text-white"
											style="background: var(--c-primary)"
										>
											Вийти
										</button>
									} @else {
										<a
											routerLink="/login"
											class="theme-interactive theme-focus inline-flex h-10 items-center gap-2 rounded-[var(--radius-btn)] px-6 text-sm font-bold text-white"
											style="background: var(--c-primary); box-shadow: 0 4px 14px color-mix(in srgb, var(--c-primary) 50%, transparent)"
										>
											Увійти через Google
										</a>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class SettingsComponent {
	protected readonly authService = inject(AuthService);
	private readonly _themeService = inject(ThemeService);
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly activeLanguage = this._languageService.language;
	protected readonly languages = computed(() =>
		this._languageService.languages().map((l) => _toAppLanguage(l)),
	);

	protected setTheme(mode: 'light' | 'dark'): void {
		this._themeService.setMode(mode);
	}

	protected async setLanguage(code: string): Promise<void> {
		await this._translateService.setLanguage(code);
	}
}

function _toAppLanguage(language: Language | undefined): AppLanguage {
	const fallback: AppLanguage = {
		code: 'ua',
		name: 'Ukrainian',
		nativeName: 'Українська',
		flagSrc: 'flags/ukraine.svg',
		htmlLang: 'uk',
		population: 35,
	};
	return { ...fallback, ...(language as Partial<AppLanguage> | undefined) };
}

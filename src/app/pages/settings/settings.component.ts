import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ThemeService } from '@wawjs/ngx-ui';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';
import { AuthService } from '../../core/services/auth.service';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
	selector: 'app-settings',
	imports: [RouterLink, NgOptimizedImage, AppTranslatePipe],
	template: `
		<div class="min-h-screen py-10 sm:py-14" style="background: var(--c-bg-primary)">
			<div class="mx-auto max-w-4xl px-4 sm:px-6">

				<!-- Header -->
				<div class="mb-8 flex flex-col gap-2">
					<div
						class="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[var(--c-border)] bg-[var(--c-bg-tertiary)] px-3 py-1 text-xs font-bold tracking-widest uppercase"
						style="color: var(--c-primary)"
					>
						<span class="material-symbols-outlined text-[16px]">settings</span>
						<span>{{ 'Налаштування' | appTranslate }}</span>
					</div>
					<h1 class="text-3xl font-black tracking-tight sm:text-4xl" style="color: var(--c-text-strong)">
						{{ 'Налаштування' | appTranslate }}
					</h1>
					<p class="text-sm" style="color: var(--c-text-muted)">
						{{ activeLanguage() === 'en' ? 'Manage your appearance, workout preferences, account, and notifications.' : 'Керуй зовнішнім виглядом, тренуваннями, акаунтом та сповіщеннями.' }}
					</p>
				</div>

				<!-- Success Toast / Status -->
				@if (cacheClearedMessage()) {
					<div class="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-500">
						{{ cacheClearedMessage() }}
					</div>
				}

				<!-- Settings List Container -->
				<div class="flex flex-col gap-8">

					<!-- Group 1: Appearance & Language (Зовнішній вигляд) -->
					<div
						class="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--c-border)] shadow-[var(--shadow-sm)]"
						style="background: var(--c-bg-secondary)"
					>
						<div class="border-b-2 border-[var(--c-border)] px-6 py-4" style="background: var(--c-bg-tertiary)">
							<div class="flex items-center gap-2.5">
								<span class="material-symbols-outlined text-[22px]" style="color: var(--c-primary)">palette</span>
								<h2 class="text-base font-bold" style="color: var(--c-text-strong)">
									{{ 'Зовнішній вигляд' | appTranslate }}
								</h2>
							</div>
						</div>

						<div class="divide-y-2 divide-[var(--c-border)] px-6">
							<!-- Row: Theme -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Тема оформлення' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Choose between light and dark modes' : 'Перемикання між світлим та темним режимами' }}
									</p>
								</div>
								<div class="inline-flex rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] p-1" style="background: var(--c-bg-primary)">
									<button
										type="button"
										(click)="setTheme('light')"
										class="theme-interactive flex items-center gap-2 rounded-[calc(var(--radius-btn)-4px)] px-4 py-1.5 text-xs font-bold transition-all"
										[style.background]="mode() === 'light' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="mode() === 'light' ? '#ffffff' : 'var(--c-text)'"
									>
										<span class="material-symbols-outlined text-[16px]">light_mode</span>
										<span>{{ 'Світла тема' | appTranslate }}</span>
									</button>
									<button
										type="button"
										(click)="setTheme('dark')"
										class="theme-interactive flex items-center gap-2 rounded-[calc(var(--radius-btn)-4px)] px-4 py-1.5 text-xs font-bold transition-all"
										[style.background]="mode() === 'dark' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="mode() === 'dark' ? '#ffffff' : 'var(--c-text)'"
									>
										<span class="material-symbols-outlined text-[16px]">dark_mode</span>
										<span>{{ 'Темна тема' | appTranslate }}</span>
									</button>
								</div>
							</div>

							<!-- Row: Language -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Мова додатку' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Switch interface language instantly' : 'Миттєве перемикання мови сайту' }}
									</p>
								</div>
								<div class="inline-flex rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] p-1" style="background: var(--c-bg-primary)">
									<button
										type="button"
										(click)="setLanguage('ua')"
										class="theme-interactive flex items-center gap-2 rounded-[calc(var(--radius-btn)-4px)] px-4 py-1.5 text-xs font-bold transition-all"
										[style.background]="activeLanguage() === 'ua' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="activeLanguage() === 'ua' ? '#ffffff' : 'var(--c-text)'"
									>
										<img ngSrc="flags/ukraine.svg" alt="UA" width="20" height="14" class="rounded-[2px] object-cover" />
										<span>Українська</span>
									</button>
									<button
										type="button"
										(click)="setLanguage('en')"
										class="theme-interactive flex items-center gap-2 rounded-[calc(var(--radius-btn)-4px)] px-4 py-1.5 text-xs font-bold transition-all"
										[style.background]="activeLanguage() === 'en' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="activeLanguage() === 'en' ? '#ffffff' : 'var(--c-text)'"
									>
										<img ngSrc="flags/united-kingdom.svg" alt="EN" width="20" height="14" class="rounded-[2px] object-cover" />
										<span>English</span>
									</button>
								</div>
							</div>

							<!-- Row: Density -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ activeLanguage() === 'en' ? 'Interface Density' : 'Щільність інтерфейсу' }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Adjust spacing for compact or comfortable view' : 'Зручний або компактний розмір відступів' }}
									</p>
								</div>
								<div class="inline-flex rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] p-1" style="background: var(--c-bg-primary)">
									<button
										type="button"
										(click)="setDensity('comfortable')"
										class="theme-interactive flex items-center gap-1.5 rounded-[calc(var(--radius-btn)-4px)] px-3 py-1.5 text-xs font-bold"
										[style.background]="density() === 'comfortable' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="density() === 'comfortable' ? '#ffffff' : 'var(--c-text)'"
									>
										{{ activeLanguage() === 'en' ? 'Comfortable' : 'Зручна' }}
									</button>
									<button
										type="button"
										(click)="setDensity('compact')"
										class="theme-interactive flex items-center gap-1.5 rounded-[calc(var(--radius-btn)-4px)] px-3 py-1.5 text-xs font-bold"
										[style.background]="density() === 'compact' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="density() === 'compact' ? '#ffffff' : 'var(--c-text)'"
									>
										{{ activeLanguage() === 'en' ? 'Compact' : 'Компактна' }}
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Group 2: Account & Security (Акаунт та безпека) -->
					<div
						class="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--c-border)] shadow-[var(--shadow-sm)]"
						style="background: var(--c-bg-secondary)"
					>
						<div class="border-b-2 border-[var(--c-border)] px-6 py-4" style="background: var(--c-bg-tertiary)">
							<div class="flex items-center gap-2.5">
								<span class="material-symbols-outlined text-[22px]" style="color: var(--c-primary)">shield_person</span>
								<h2 class="text-base font-bold" style="color: var(--c-text-strong)">
									{{ 'Акаунт та безпека' | appTranslate }}
								</h2>
							</div>
						</div>

						<div class="divide-y-2 divide-[var(--c-border)] px-6">
							<!-- Profile Summary Row -->
							<div class="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
								<div class="flex items-center gap-4">
									<div
										class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--c-primary)] shadow-sm"
										style="background: var(--c-bg-tertiary)"
									>
										@if (authService.currentUser()?.photoURL; as photo) {
											<img [src]="photo" alt="Avatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
										} @else if (authService.isAnonymous()) {
											<span class="material-symbols-outlined text-[26px]" style="color: var(--c-primary)">visibility_off</span>
										} @else {
											<span class="material-symbols-outlined text-[26px]" style="color: var(--c-primary)">person</span>
										}
									</div>
									<div>
										@if (authService.currentUser(); as user) {
											<p class="text-sm font-bold" style="color: var(--c-text-strong)">
												{{ user.isAnonymous ? (activeLanguage() === 'en' ? 'Anonymous Guest' : 'Анонімний гість') : (user.displayName || 'Користувач') }}
											</p>
											<p class="text-xs" style="color: var(--c-text-muted)">
												{{ user.isAnonymous ? ('ID: ' + user.uid.substring(0, 8) + '...') : user.email }}
											</p>
										} @else {
											<p class="text-sm font-bold" style="color: var(--c-text-strong)">
												{{ activeLanguage() === 'en' ? 'Guest (Not signed in)' : 'Гість (Не авторизовано)' }}
											</p>
											<p class="text-xs" style="color: var(--c-text-muted)">
												{{ activeLanguage() === 'en' ? 'Sign in to sync your progress' : 'Увійдіть для синхронізації тренувань' }}
											</p>
										}
									</div>
								</div>

								<div class="flex items-center gap-2">
									@if (authService.isAnonymous()) {
										<button
											type="button"
											(click)="linkGoogleAccount()"
											class="theme-interactive theme-focus inline-flex h-9 items-center gap-2 rounded-[var(--radius-btn)] px-4 text-xs font-bold text-white shadow-sm"
											style="background: var(--c-primary)"
										>
											<span class="material-symbols-outlined text-[16px]">link</span>
											<span>{{ 'Зв\'язати з Google' | appTranslate }}</span>
										</button>
										<button
											type="button"
											(click)="authService.signOut()"
											class="theme-interactive inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] px-3 text-xs font-bold"
											style="color: var(--c-text)"
										>
											{{ 'Вийти' | appTranslate }}
										</button>
									} @else if (authService.currentUser()) {
										<button
											type="button"
											(click)="authService.signOut()"
											class="theme-interactive theme-focus inline-flex h-9 items-center gap-2 rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] px-4 text-xs font-bold"
											style="color: var(--c-text-strong)"
										>
											<span class="material-symbols-outlined text-[16px]">logout</span>
											<span>{{ 'Вийти' | appTranslate }}</span>
										</button>
									} @else {
										<a
											routerLink="/login"
											class="theme-interactive theme-focus inline-flex h-9 items-center gap-2 rounded-[var(--radius-btn)] px-5 text-xs font-bold text-white"
											style="background: var(--c-primary)"
										>
											{{ 'Увійти' | appTranslate }}
										</a>
									}
								</div>
							</div>

							<!-- Auto save session toggle -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ activeLanguage() === 'en' ? 'Remember login session' : 'Зберігати сесію входу' }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Stay signed in across browser sessions' : 'Не запитувати вхід повторно при відкритті сайту' }}
									</p>
								</div>
								<button
									type="button"
									(click)="toggleSetting('rememberSession')"
									class="theme-interactive relative h-6 w-11 rounded-full transition-colors"
									[style.background]="settings().rememberSession ? 'var(--c-primary)' : 'var(--c-border)'"
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
										[style.transform]="settings().rememberSession ? 'translateX(12px)' : 'translateX(-10px)'"
									></span>
								</button>
							</div>
						</div>
					</div>

					<!-- Group 3: Workout Preferences (Параметри тренувань) -->
					<div
						class="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--c-border)] shadow-[var(--shadow-sm)]"
						style="background: var(--c-bg-secondary)"
					>
						<div class="border-b-2 border-[var(--c-border)] px-6 py-4" style="background: var(--c-bg-tertiary)">
							<div class="flex items-center gap-2.5">
								<span class="material-symbols-outlined text-[22px]" style="color: var(--c-primary)">fitness_center</span>
								<h2 class="text-base font-bold" style="color: var(--c-text-strong)">
									{{ 'Параметри тренувань' | appTranslate }}
								</h2>
							</div>
						</div>

						<div class="divide-y-2 divide-[var(--c-border)] px-6">
							<!-- Units of measurement -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Одиниці вимірювання' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Used for weight lifting and progress' : 'Для ваги у вправах та відстеження результатів' }}
									</p>
								</div>
								<div class="inline-flex rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] p-1" style="background: var(--c-bg-primary)">
									<button
										type="button"
										(click)="setWeightUnit('kg')"
										class="theme-interactive rounded-[calc(var(--radius-btn)-4px)] px-3 py-1.5 text-xs font-bold"
										[style.background]="settings().weightUnit === 'kg' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="settings().weightUnit === 'kg' ? '#ffffff' : 'var(--c-text)'"
									>
										{{ activeLanguage() === 'en' ? 'Kilograms (kg)' : 'Кілограми (кг)' }}
									</button>
									<button
										type="button"
										(click)="setWeightUnit('lbs')"
										class="theme-interactive rounded-[calc(var(--radius-btn)-4px)] px-3 py-1.5 text-xs font-bold"
										[style.background]="settings().weightUnit === 'lbs' ? 'var(--c-primary)' : 'transparent'"
										[style.color]="settings().weightUnit === 'lbs' ? '#ffffff' : 'var(--c-text)'"
									>
										{{ activeLanguage() === 'en' ? 'Pounds (lbs)' : 'Фунти (lbs)' }}
									</button>
								</div>
							</div>

							<!-- Rest Timer default -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Таймер відпочинку' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Default pause between sets' : 'Стандартний час відпочинку між підходами' }}
									</p>
								</div>
								<div class="inline-flex rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] p-1" style="background: var(--c-bg-primary)">
									@for (timer of [45, 60, 90, 120]; track timer) {
										<button
											type="button"
											(click)="setRestTimer(timer)"
											class="theme-interactive rounded-[calc(var(--radius-btn)-4px)] px-2.5 py-1.5 text-xs font-bold"
											[style.background]="settings().restTimerSeconds === timer ? 'var(--c-primary)' : 'transparent'"
											[style.color]="settings().restTimerSeconds === timer ? '#ffffff' : 'var(--c-text)'"
										>
											{{ timer }}s
										</button>
									}
								</div>
							</div>

							<!-- Sound cues toggle -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Звукові сигнали' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Play audio chime when countdown ends' : 'Сигнал по завершенню таймера відпочинку' }}
									</p>
								</div>
								<button
									type="button"
									(click)="toggleSetting('soundCues')"
									class="theme-interactive relative h-6 w-11 rounded-full transition-colors"
									[style.background]="settings().soundCues ? 'var(--c-primary)' : 'var(--c-border)'"
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
										[style.transform]="settings().soundCues ? 'translateX(12px)' : 'translateX(-10px)'"
									></span>
								</button>
							</div>

							<!-- Auto advance exercise -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ activeLanguage() === 'en' ? 'Auto-advance exercises' : 'Автоперехід до наступної вправи' }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Automatically switch to next exercise after last set' : 'Переходити далі після останнього підходу' }}
									</p>
								</div>
								<button
									type="button"
									(click)="toggleSetting('autoAdvance')"
									class="theme-interactive relative h-6 w-11 rounded-full transition-colors"
									[style.background]="settings().autoAdvance ? 'var(--c-primary)' : 'var(--c-border)'"
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
										[style.transform]="settings().autoAdvance ? 'translateX(12px)' : 'translateX(-10px)'"
									></span>
								</button>
							</div>
						</div>
					</div>

					<!-- Group 4: Notifications (Сповіщення) -->
					<div
						class="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--c-border)] shadow-[var(--shadow-sm)]"
						style="background: var(--c-bg-secondary)"
					>
						<div class="border-b-2 border-[var(--c-border)] px-6 py-4" style="background: var(--c-bg-tertiary)">
							<div class="flex items-center gap-2.5">
								<span class="material-symbols-outlined text-[22px]" style="color: var(--c-primary)">notifications</span>
								<h2 class="text-base font-bold" style="color: var(--c-text-strong)">
									{{ 'Сповіщення' | appTranslate }}
								</h2>
							</div>
						</div>

						<div class="divide-y-2 divide-[var(--c-border)] px-6">
							<!-- Reminders -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Нагадування про тренування' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Receive push alerts before planned workout' : 'Сповіщення перед запланованими тренуваннями' }}
									</p>
								</div>
								<button
									type="button"
									(click)="toggleSetting('workoutReminders')"
									class="theme-interactive relative h-6 w-11 rounded-full transition-colors"
									[style.background]="settings().workoutReminders ? 'var(--c-primary)' : 'var(--c-border)'"
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
										[style.transform]="settings().workoutReminders ? 'translateX(12px)' : 'translateX(-10px)'"
									></span>
								</button>
							</div>

							<!-- Weekly email summary -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Тижневий звіт на Email' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Summary of sets, records, and training streak' : 'Підсумок підходів, ваги та серії тренувань за тиждень' }}
									</p>
								</div>
								<button
									type="button"
									(click)="toggleSetting('weeklySummary')"
									class="theme-interactive relative h-6 w-11 rounded-full transition-colors"
									[style.background]="settings().weeklySummary ? 'var(--c-primary)' : 'var(--c-border)'"
								>
									<span
										class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
										[style.transform]="settings().weeklySummary ? 'translateX(12px)' : 'translateX(-10px)'"
									></span>
								</button>
							</div>
						</div>
					</div>

					<!-- Group 5: Data & Privacy (Дані та конфіденційність) -->
					<div
						class="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--c-border)] shadow-[var(--shadow-sm)]"
						style="background: var(--c-bg-secondary)"
					>
						<div class="border-b-2 border-[var(--c-border)] px-6 py-4" style="background: var(--c-bg-tertiary)">
							<div class="flex items-center gap-2.5">
								<span class="material-symbols-outlined text-[22px]" style="color: var(--c-primary)">database</span>
								<h2 class="text-base font-bold" style="color: var(--c-text-strong)">
									{{ 'Дані та конфіденційність' | appTranslate }}
								</h2>
							</div>
						</div>

						<div class="divide-y-2 divide-[var(--c-border)] px-6">
							<!-- Clear Cache -->
							<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Очистити кеш' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										{{ activeLanguage() === 'en' ? 'Free up local browser storage and temporary assets' : 'Звільнити місце в браузері та скинути тимчасові дані' }}
									</p>
								</div>
								<button
									type="button"
									(click)="clearLocalCache()"
									class="theme-interactive inline-flex h-9 items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] px-4 text-xs font-bold transition-all hover:bg-[var(--c-bg-tertiary)]"
									style="color: var(--c-text-strong)"
								>
									<span class="material-symbols-outlined text-[16px]">cleaning_services</span>
									<span>{{ 'Очистити кеш' | appTranslate }}</span>
								</button>
							</div>

							<!-- Version Info -->
							<div class="flex items-center justify-between py-4">
								<div>
									<p class="text-sm font-bold" style="color: var(--c-text-strong)">
										{{ 'Версія додатку' | appTranslate }}
									</p>
									<p class="text-xs" style="color: var(--c-text-muted)">
										MySport HoReCa Web Platform
									</p>
								</div>
								<span class="rounded-full border-2 border-[var(--c-border)] bg-[var(--c-bg-tertiary)] px-3 py-1 text-xs font-bold" style="color: var(--c-primary)">
									v22.0.1
								</span>
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
	protected readonly density = signal<'comfortable' | 'compact'>('comfortable');
	protected readonly cacheClearedMessage = signal<string | null>(null);

	protected readonly settings = signal({
		rememberSession: true,
		weightUnit: 'kg' as 'kg' | 'lbs',
		restTimerSeconds: 60,
		soundCues: true,
		autoAdvance: true,
		workoutReminders: true,
		weeklySummary: false,
	});

	protected setTheme(mode: 'light' | 'dark'): void {
		this._themeService.setMode(mode);
	}

	protected async setLanguage(code: string): Promise<void> {
		await this._translateService.setLanguage(code);
		await this._languageService.setLanguage(code);
	}

	protected setDensity(density: 'comfortable' | 'compact'): void {
		this.density.set(density);
		document.documentElement.setAttribute('data-density', density);
	}

	protected setWeightUnit(unit: 'kg' | 'lbs'): void {
		this.settings.update((s) => ({ ...s, weightUnit: unit }));
	}

	protected setRestTimer(seconds: number): void {
		this.settings.update((s) => ({ ...s, restTimerSeconds: seconds }));
	}

	protected toggleSetting(key: 'rememberSession' | 'soundCues' | 'autoAdvance' | 'workoutReminders' | 'weeklySummary'): void {
		this.settings.update((s) => ({ ...s, [key]: !s[key] }));
	}

	protected async linkGoogleAccount(): Promise<void> {
		await this.authService.linkWithGoogle();
	}

	protected clearLocalCache(): void {
		try {
			if (typeof window !== 'undefined' && window.localStorage) {
				const keysToKeep = ['app-mode', 'app-language'];
				for (let i = window.localStorage.length - 1; i >= 0; i--) {
					const k = window.localStorage.key(i);
					if (k && !keysToKeep.includes(k)) {
						window.localStorage.removeItem(k);
					}
				}
			}
			const msg = this.activeLanguage() === 'en'
				? 'Cache cleared successfully!'
				: 'Кеш успішно очищено!';
			this.cacheClearedMessage.set(msg);
			setTimeout(() => this.cacheClearedMessage.set(null), 3000);
		} catch (e) {
			console.error(e);
		}
	}
}

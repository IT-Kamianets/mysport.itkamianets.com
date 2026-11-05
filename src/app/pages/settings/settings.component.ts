import { Component } from '@angular/core';

@Component({
	selector: 'app-settings',
	imports: [],
	template: `
		<div class="min-h-screen" style="background: var(--c-bg-primary)">
			<div class="mx-auto max-w-[var(--container)] px-4 py-14 sm:px-6">
				<div
					class="relative overflow-hidden rounded-[calc(var(--radius-card)*2)] border-2 border-[var(--c-border)] p-8 shadow-[var(--shadow-md)] sm:p-10"
					style="background: var(--c-bg-secondary)"
				>
					<div class="absolute inset-x-0 top-0 h-1.5" style="background: var(--c-primary)"></div>
					<div class="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-20" style="background: var(--c-primary)"></div>

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
						Керуй своїм акаунтом та параметрами програми.
					</p>

					<div class="mt-8 grid gap-4 sm:grid-cols-2">
						@for (item of settingGroups; track item.label) {
							<div
								class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] p-5"
								style="background: var(--c-bg-primary)"
							>
								<div class="flex items-center gap-3">
									<span class="material-symbols-outlined text-[28px]" style="color: var(--c-primary)">{{ item.icon }}</span>
									<div>
										<p class="font-bold" style="color: var(--c-text-strong)">{{ item.label }}</p>
										<p class="text-xs" style="color: var(--c-text-muted)">{{ item.desc }}</p>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	`,
})
export class SettingsComponent {
	protected readonly settingGroups = [
		{ icon: 'person', label: 'Акаунт', desc: 'Персональні дані та безпека' },
		{ icon: 'notifications', label: 'Сповіщення', desc: 'Push та email-сповіщення' },
		{ icon: 'palette', label: 'Вигляд', desc: 'Тема, мова, щільність' },
		{ icon: 'lock', label: 'Конфіденційність', desc: 'Доступ та видимість профілю' },
	];
}

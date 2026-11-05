import { Component } from '@angular/core';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
	selector: 'app-training',
	imports: [AppTranslatePipe],
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
						<span class="material-symbols-outlined text-[16px]">fitness_center</span>
						<span>{{ 'Тренування' | appTranslate }}</span>
					</div>

					<h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl" style="color: var(--c-text-strong)">
						{{ 'Мої тренування' | appTranslate }}
					</h1>
					<p class="mt-3 max-w-xl text-base leading-relaxed" style="color: var(--c-text-muted)">
						{{ 'Тут будуть відображатися твої тренування та програми.' | appTranslate }}
					</p>

					<button
						type="button"
						class="theme-interactive theme-focus mt-8 inline-flex h-12 items-center gap-2 rounded-[var(--radius-btn)] px-8 text-sm font-bold text-white"
						style="background: var(--c-primary); box-shadow: 0 4px 20px color-mix(in srgb, var(--c-primary) 55%, transparent)"
					>
						<span class="material-symbols-outlined text-[18px]">add</span>
						<span>{{ 'Додати тренування' | appTranslate }}</span>
					</button>
				</div>
			</div>
		</div>
	`,
})
export class TrainingComponent {}

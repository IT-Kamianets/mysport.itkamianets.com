import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslatePipe } from '../../core/i18n/translate.pipe';

type Formula = 'epley' | 'brzycki' | 'lander' | 'lombardi';

interface Preset {
	name: string;
	weight: number;
	reps: number;
}

@Component({
	selector: 'app-orm',
	standalone: true,
	imports: [FormsModule, DecimalPipe, AppTranslatePipe],
	template: `
		<div class="mx-auto max-w-2xl px-4 py-8 space-y-6">
			<!-- Header -->
			<div class="border-b-2 border-[var(--c-border)] pb-4">
				<h1 class="text-2xl font-black tracking-tight" style="color: var(--c-text-strong)">
					{{ 'Калькулятор ОПМ' | appTranslate }}
				</h1>
				<p class="mt-1 text-sm" style="color: var(--c-text-muted)">
					{{ 'Одноповторний максимум' | appTranslate }}
				</p>
			</div>

			<!-- Card: Inputs -->
			<div class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] bg-[var(--c-bg-secondary)] overflow-hidden">
				<div class="h-1.5" style="background: var(--c-primary)"></div>
				<div class="p-5 space-y-5">

					<!-- Quick presets -->
					<div>
						<p class="mb-2 text-xs font-semibold uppercase tracking-wider" style="color: var(--c-text-muted)">
							{{ 'Швидкий вибір' | appTranslate }}
						</p>
						<div class="flex flex-wrap gap-2">
							@for (preset of presets; track preset.name) {
								<button
									class="rounded-full border-2 px-3 py-1 text-sm font-semibold transition-all"
									[style.borderColor]="'var(--c-border)'"
									[style.background]="'var(--c-bg-primary)'"
									[style.color]="'var(--c-text)'"
									(click)="applyPreset(preset)"
									type="button"
								>{{ preset.name }}</button>
							}
						</div>
					</div>

					<!-- Weight & Reps inputs -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="mb-1 block text-xs font-semibold" style="color: var(--c-text-muted)">
								{{ 'Вага' | appTranslate }} (кг)
							</label>
							<input
								[(ngModel)]="weight"
								type="number"
								min="1"
								max="500"
								class="w-full rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] bg-[var(--c-bg-primary)] px-3 py-2 text-lg font-bold outline-none focus:border-[color:var(--c-primary)]"
								style="color: var(--c-text-strong)"
							/>
						</div>
						<div>
							<label class="mb-1 block text-xs font-semibold" style="color: var(--c-text-muted)">
								{{ 'Повторення' | appTranslate }}
							</label>
							<input
								[(ngModel)]="reps"
								type="number"
								min="1"
								max="36"
								class="w-full rounded-[var(--radius-btn)] border-2 border-[var(--c-border)] bg-[var(--c-bg-primary)] px-3 py-2 text-lg font-bold outline-none focus:border-[color:var(--c-primary)]"
								style="color: var(--c-text-strong)"
							/>
						</div>
					</div>

					<!-- Formula selector -->
					<div>
						<p class="mb-2 text-xs font-semibold uppercase tracking-wider" style="color: var(--c-text-muted)">
							{{ 'Формула' | appTranslate }}
						</p>
						<div class="flex flex-wrap gap-2">
							@for (f of formulaOptions; track f.value) {
								<button
									class="rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-all"
									[style.borderColor]="formula() === f.value ? 'var(--c-primary)' : 'var(--c-border)'"
									[style.background]="formula() === f.value ? 'var(--c-primary)' : 'var(--c-bg-primary)'"
									[style.color]="formula() === f.value ? '#fff' : 'var(--c-text)'"
									(click)="formula.set(f.value)"
									type="button"
								>{{ f.label }}</button>
							}
						</div>
					</div>
				</div>
			</div>

			<!-- Result banner -->
			<div
				class="rounded-[var(--radius-card)] p-5 text-center border-2"
				[style.borderColor]="'var(--c-primary)'"
				style="background: var(--c-bg-secondary)"
			>
				<p class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: var(--c-text-muted)">
					{{ 'Одноповторний максимум' | appTranslate }} ({{ currentFormulaLabel() }})
				</p>
				<p class="text-5xl font-black" style="color: var(--c-primary)">
					{{ orm1rm() | number: '1.1-1' }} кг
				</p>
			</div>

			<!-- Table: Відсотки від ОПМ -->
			<div class="rounded-[var(--radius-card)] border-2 border-[var(--c-border)] bg-[var(--c-bg-secondary)] overflow-hidden">
				<div class="h-1.5" style="background: var(--c-primary)"></div>
				<div class="p-5">
					<p class="mb-3 text-xs font-semibold uppercase tracking-wider" style="color: var(--c-text-muted)">
						{{ 'Відсотки від ОПМ' | appTranslate }}
					</p>
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead>
								<tr class="border-b-2 border-[var(--c-border)]">
									<th class="pb-2 text-left font-semibold" style="color: var(--c-text-muted)">%</th>
									<th class="pb-2 text-right font-semibold" style="color: var(--c-text-muted)">Вага (кг)</th>
									<th class="pb-2 text-right font-semibold" style="color: var(--c-text-muted)">{{ 'Таблиця повторень' | appTranslate }}</th>
								</tr>
							</thead>
							<tbody>
								@for (row of percentageRows(); track row.pct) {
									<tr
										class="border-b border-[var(--c-border)] transition-colors"
										[style.background]="row.pct === 100 ? 'color-mix(in srgb, var(--c-primary) 10%, transparent)' : 'transparent'"
									>
										<td class="py-2 font-bold" [style.color]="row.pct === 100 ? 'var(--c-primary)' : 'var(--c-text-strong)'">
											{{ row.pct }}%
										</td>
										<td class="py-2 text-right font-semibold" style="color: var(--c-text-strong)">
											{{ row.weight | number: '1.1-1' }}
										</td>
										<td class="py-2 text-right" style="color: var(--c-text-muted)">
											~{{ row.approxReps }} повт.
										</td>
									</tr>
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class OrmComponent {
	weight = 100;
	reps = 5;
	formula = signal<Formula>('epley');

	readonly formulaOptions: { value: Formula; label: string }[] = [
		{ value: 'epley', label: 'Epley' },
		{ value: 'brzycki', label: 'Brzycki' },
		{ value: 'lander', label: 'Lander' },
		{ value: 'lombardi', label: 'Lombardi' },
	];

	readonly presets: Preset[] = [
		{ name: 'Жим лежачи', weight: 80, reps: 5 },
		{ name: 'Присідання', weight: 100, reps: 5 },
		{ name: 'Станова тяга', weight: 120, reps: 3 },
		{ name: 'Армійський жим', weight: 60, reps: 6 },
	];

	readonly orm1rm = computed(() => {
		const w = this.weight;
		const r = this.reps;
		if (r <= 0 || w <= 0) return 0;
		switch (this.formula()) {
			case 'epley':
				return w * (1 + r / 30);
			case 'brzycki':
				return r >= 37 ? w : w * (36 / (37 - r));
			case 'lander':
				return (100 * w) / (101.3 - 2.67123 * r);
			case 'lombardi':
				return w * Math.pow(r, 0.1);
		}
	});

	readonly currentFormulaLabel = computed(
		() => this.formulaOptions.find((f) => f.value === this.formula())?.label ?? '',
	);

	readonly percentageRows = computed(() => {
		const max = this.orm1rm();
		const steps = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
		return steps.map((pct) => ({
			pct,
			weight: (max * pct) / 100,
			approxReps: this._approxReps(pct),
		}));
	});

	applyPreset(preset: Preset): void {
		this.weight = preset.weight;
		this.reps = preset.reps;
	}

	private _approxReps(pct: number): number {
		// Approximate reps from % 1RM (Prilepin-inspired table)
		if (pct >= 100) return 1;
		if (pct >= 95) return 2;
		if (pct >= 90) return 3;
		if (pct >= 85) return 4;
		if (pct >= 80) return 5;
		if (pct >= 75) return 6;
		if (pct >= 70) return 8;
		if (pct >= 65) return 10;
		if (pct >= 60) return 12;
		if (pct >= 55) return 15;
		return 20;
	}
}

import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanonicalService } from '@wawjs/ngx-default';
import { LanguageService } from '@wawjs/ngx-translate';
import { ThemeService } from '@wawjs/ngx-ui';
import { environment } from '../environments/environment';
import { FooterComponent } from './layouts/footer/footer.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, TopbarComponent, FooterComponent],
	template: `
		<div class="flex min-h-screen flex-col">
			<app-topbar />
			<main class="flex-1">
				<router-outlet />
			</main>
			<app-footer />
		</div>
	`,
})
export class App {
	private readonly _canonicalService = inject(CanonicalService);
	private readonly _document = inject(DOCUMENT);
	private readonly _languageService = inject(LanguageService);
	private readonly _themeService = inject(ThemeService);

	constructor() {
		this._canonicalService.initialize();

		effect(() => {
			const language = this._languageService.language();
			const htmlLang =
				environment.languages.find((item) => item.code === language)?.htmlLang ?? language;

			if (htmlLang) {
				this._document.documentElement.lang = htmlLang;
			}
		});

		effect(() => {
			const mode = this._themeService.mode();
			const doc = this._document.documentElement;
			if (mode === 'dark') {
				doc.style.setProperty('--c-text', '#ecdeff');
				doc.style.setProperty('--c-text-strong', '#ffffff');
				doc.style.setProperty('--c-highlight', '#d8b4fe');
				doc.style.setProperty('--c-accent', '#c084fc');
				doc.style.setProperty('--c-neon', '#b026ff');
				doc.style.setProperty('--c-stripe', 'rgba(176, 38, 255, 0.08)');
			} else {
				doc.style.setProperty('--c-text', '#3b1a06');
				doc.style.setProperty('--c-text-strong', '#1c0a00');
				doc.style.setProperty('--c-highlight', '#ea580c');
				doc.style.setProperty('--c-accent', '#f97316');
				doc.style.setProperty('--c-neon', '#ff6b2b');
				doc.style.setProperty('--c-stripe', 'rgba(234, 88, 12, 0.07)');
			}
		});
	}
}

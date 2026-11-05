import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService, TranslateService } from '@wawjs/ngx-translate';

@Pipe({
	name: 'appTranslate',
	pure: false,
})
export class AppTranslatePipe implements PipeTransform {
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	transform(key: string): string {
		// Calling language() registers reactive dependency in templates
		this._languageService.language();
		return this._translateService.translate(key)();
	}
}

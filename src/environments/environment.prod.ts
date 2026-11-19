export interface AppLanguage {
	code: string;
	name: string;
	nativeName?: string;
	flagSrc?: string;
	htmlLang?: string;
	population?: number;
	apiUrl?: string;
	companyId?: string;
	defaultLanguage?: string;
	languages?: AppLanguage[];
}

export const environment = {
	languages: [],
	apiUrl: '',
	companyId: '',
	defaultLanguage: 'en',
};
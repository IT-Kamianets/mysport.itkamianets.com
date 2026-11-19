import { companyProfile } from './company.data';
import { CompanyProfile, CompanyCurrency, CompanyStructuredData, SeoMetadata, SeoPageOverride } from './company.interface';

export function _stringOrFallback(value: string | null | undefined, fallback = ''): string {
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

export function _optionalString(value: string | null | undefined): string | undefined {
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

export function _stringArrayOrFallback(value: string[] | null | undefined): string[] {
	return Array.isArray(value)
		? value.filter(
				(entry): entry is string => typeof entry === 'string' && entry.trim().length > 0,
			)
		: [];
}

export function _trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function _phoneHref(phone: string): string {
	const trimmedPhone = phone.trim();

	if (!trimmedPhone) {
		return '';
	}

	const prefix = trimmedPhone.startsWith('+') ? '+' : '';
	const digits = trimmedPhone.replace(/\D/g, '');

	return digits ? `tel:${prefix}${digits}` : '';
}

export function _normalizeCurrency(currency?: Partial<CompanyCurrency>): CompanyCurrency {
	return {
		code: _stringOrFallback(currency?.code),
		icon: _stringOrFallback(currency?.icon),
	};
}

export function _normalizeSeoMetadata(
	raw: Partial<SeoMetadata>,
): {
	title: string;
	description: string;
	keywords: string[];
	author: string;
	robots: string;
	image: string;
	type: string;
	twitterCard: string;
} {
	return {
		title: _stringOrFallback(raw.title),
		description: _stringOrFallback(raw.description),
		keywords: _stringArrayOrFallback(raw.keywords),
		author: _stringOrFallback(raw.author),
		robots: _stringOrFallback(raw.robots),
		image: _stringOrFallback(raw.image),
		type: _stringOrFallback(raw.type),
		twitterCard: _stringOrFallback(raw.twitterCard),
	};
}

export function _normalizePageSeo(pageSeo?: Record<string, SeoPageOverride | undefined>): Record<string, SeoPageOverride> {
	const result: Record<string, SeoPageOverride> = {};
	if (pageSeo) {
		for (const [key, value] of Object.entries(pageSeo)) {
			if (value) {
				result[key] = {
					title: _optionalString(value.title),
					description: _optionalString(value.description),
				};
			}
		}
	}
	return result;
}

export function _normalizeStructuredData(
	raw?: Partial<CompanyStructuredData>,
): CompanyStructuredData {
	return {
		type: _stringOrFallback(raw?.type),
		priceRange: _stringOrFallback(raw?.priceRange),
		servesCuisine: _stringOrFallback(raw?.servesCuisine),
		addressLocality: _optionalString(raw?.addressLocality),
		addressCountry: _optionalString(raw?.addressCountry),
		sameAs: _stringArrayOrFallback(raw?.sameAs),
	};
}

export const EMPTY_COMPANY: CompanyProfile = {
	_id: '',
	name: '',
	title: '',
	description: '',
	image: '',
	siteUrl: '',
	custom: {},
	lang: '',
	locale: '',
	logo: '',
	phone: '',
	email: '',
	address: '',
	currency: {
		code: '',
		icon: '',
	},
	defaultSeo: {
		title: '',
		description: '',
		keywords: [],
		author: '',
		robots: '',
		image: '',
		type: '',
		twitterCard: '',
	},
	pageSeo: {},
	structuredData: {
		type: '',
		priceRange: '',
		servesCuisine: '',
		addressLocality: '',
		addressCountry: '',
		sameAs: [],
		custom: {},
	},
};

export const COMPANY_FALLBACK: CompanyProfile = EMPTY_COMPANY;
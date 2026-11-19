import companyData from '../../../data/company/company.json';
import {
	CompanyCurrency,
	CompanyProfile,
	CompanyStructuredData,
	SeoMetadata,
	SeoPageOverride,
} from './company.interface';
import {
	_stringOrFallback,
	_optionalString,
	_stringArrayOrFallback,
	_trimTrailingSlash,
	_phoneHref,
	_normalizeCurrency,
	_normalizeSeoMetadata,
	_normalizePageSeo,
	_normalizeStructuredData,
} from './company.const';

type RawCompanyProfile = Partial<
	Omit<CompanyProfile, 'currency' | 'defaultSeo' | 'pageSeo' | 'structuredData'>
> & {
	currency?: Partial<CompanyCurrency>;
	defaultSeo?: Partial<SeoMetadata>;
	pageSeo?: Record<string, SeoPageOverride | undefined>;
	structuredData?: Partial<CompanyStructuredData>;
};

const rawCompanyProfile = companyData as RawCompanyProfile;

export const companyProfile: CompanyProfile = {
	_id: _stringOrFallback(rawCompanyProfile._id),
	name: _stringOrFallback(rawCompanyProfile.name, 'Company'),
	title: _stringOrFallback(rawCompanyProfile.title, rawCompanyProfile.name ?? 'Company'),
	description: _stringOrFallback(rawCompanyProfile.description),
	image: _stringOrFallback(rawCompanyProfile.image, rawCompanyProfile.logo ?? '/logo.png'),
	siteUrl: _trimTrailingSlash(
		_stringOrFallback(rawCompanyProfile.siteUrl, 'https://example.com'),
	),
	lang: _stringOrFallback(rawCompanyProfile.lang, 'en'),
	locale: _stringOrFallback(rawCompanyProfile.locale, 'en_US'),
	logo: _stringOrFallback(rawCompanyProfile.logo, rawCompanyProfile.image ?? '/logo.png'),
	phone: _phoneHref(_stringOrFallback(rawCompanyProfile.phone)),
	email: _optionalString(rawCompanyProfile.email),
	address: _stringOrFallback(rawCompanyProfile.address),
	currency: _normalizeCurrency(rawCompanyProfile.currency),
	defaultSeo: _normalizeSeoMetadata(rawCompanyProfile.defaultSeo ?? {}),
	pageSeo: _normalizePageSeo(rawCompanyProfile.pageSeo),
	structuredData: _normalizeStructuredData(rawCompanyProfile.structuredData),
	custom: rawCompanyProfile.custom,
	telegramImage: _optionalString(rawCompanyProfile.telegramImage),
};
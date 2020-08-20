import Config from './config';

const { i18n } = Config;

export const languages = i18n ? i18n.languages.map(item => item.key) : [];
export const defaultLanguage = i18n ? i18n.defaultLanguage : '';

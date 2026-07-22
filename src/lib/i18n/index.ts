// Sélection de la langue des pages publiques via le cookie 'docpro_lang' (défaut : fr).
// Server Components / Route Handlers uniquement (cookies() est asynchrone en Next 15).
import { cookies } from 'next/headers';
import { dictionaries, type Dict, type Lang } from './dictionaries';

export const LANG_COOKIE = 'docpro_lang';

export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === 'en' ? 'en' : 'fr';
}

/** Langue courante + dictionnaire correspondant, en un seul appel. */
export async function getDict(): Promise<{ lang: Lang; t: Dict }> {
  const lang = await getLang();
  return { lang, t: dictionaries[lang] };
}

export { dictionaries, type Dict, type Lang };

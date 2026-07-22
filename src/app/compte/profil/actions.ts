'use server';
// Server Action — mise à jour du profil (compte + profil intelligent CDC §6.2).
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

function clean(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : '';
}

export async function updateProfile(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');

  const name = clean(formData.get('name'));
  const phone = clean(formData.get('phone'));
  const country = clean(formData.get('country')).toUpperCase().slice(0, 2);
  const language = clean(formData.get('language')) || 'fr';

  // Profil intelligent — champs structurés pour le pré-remplissage des documents.
  const existing = (() => {
    try { return user.profileJson ? JSON.parse(user.profileJson) as Record<string, string> : {}; }
    catch { return {}; }
  })();
  const profile = {
    ...existing,
    prenom: clean(formData.get('prenom')),
    nom: clean(formData.get('nom')),
    adresse: clean(formData.get('adresse')),
    ville: clean(formData.get('ville')),
    profession: clean(formData.get('profession')),
    entreprise: clean(formData.get('entreprise')),
  };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: name || user.name,
      phone: phone || null,
      country: country || null,
      language,
      profileJson: JSON.stringify(profile),
    },
  });

  revalidatePath('/compte/profil');
  redirect('/compte/profil?ok=1');
}

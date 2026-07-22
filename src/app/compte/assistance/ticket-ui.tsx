// Helpers d'affichage des tickets d'assistance — partagés client & admin.

export const TICKET_STATUSES = ['ouvert', 'en_cours', 'resolu', 'ferme'] as const;

const STATUS_BADGES: Record<string, { cls: string; label: string }> = {
  ouvert: { cls: 'badge-info', label: 'Ouvert' },
  en_cours: { cls: 'badge-warning', label: 'En cours' },
  resolu: { cls: 'badge-success', label: 'Résolu' },
  ferme: { cls: 'badge-neutral', label: 'Fermé' },
};

export const TICKET_CATEGORIES: Record<string, string> = {
  facturation: 'Facturation',
  technique: 'Technique',
  autre: 'Autre',
};

export function TicketBadge({ status }: { status: string }) {
  const def = STATUS_BADGES[status] ?? { cls: 'badge-neutral', label: status };
  return <span className={`badge ${def.cls}`}>{def.label}</span>;
}

export function ticketCategoryLabel(category: string): string {
  return TICKET_CATEGORIES[category] ?? category;
}

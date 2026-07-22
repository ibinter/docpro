// Génération de fichiers Excel (.xlsx) mini-apps depuis un template Excel.
// Le template stocke un ExcelConfig JSON dans body (champ template.body).
// Les réponses utilisateur (answers) sont injectées dans les cellules marquées {{key}}.

import ExcelJS from 'exceljs';

export interface ExcelSheet {
  name: string;
  title?: string;
  colorHeader?: string; // hex sans #, ex: "1565C0"
  headers: string[];
  rows: (string | number)[][];
  totalsRow?: boolean;
  colWidths?: number[];
}

export interface ExcelConfig {
  sheets: ExcelSheet[];
}

type Answers = Record<string, string>;

/** Parse le JSON ExcelConfig depuis le body du template. */
export function parseExcelConfig(body: string): ExcelConfig | null {
  try {
    const parsed = JSON.parse(body) as ExcelConfig;
    if (Array.isArray(parsed.sheets)) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Injecte les réponses utilisateur dans une valeur de cellule. */
function injectAnswers(value: string | number, answers: Answers): string | number {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => answers[key] ?? '');
}

const HEADER_COLOR = '1565C0'; // bleu IBIG par défaut

/** Génère un Buffer .xlsx depuis config + réponses utilisateur. */
export async function generateExcel(
  config: ExcelConfig,
  answers: Answers,
  docTitle: string,
  templateName: string
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'IBIG DocPro';
  wb.created = new Date();
  wb.title = docTitle;

  for (const sheet of config.sheets) {
    const ws = wb.addWorksheet(sheet.name, {
      pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true },
    });

    const headerColor = sheet.colorHeader ?? HEADER_COLOR;
    const numCols = sheet.headers.length;

    // ── Ligne de titre ──────────────────────────────────────────────────────
    if (sheet.title) {
      ws.mergeCells(1, 1, 1, numCols);
      const titleCell = ws.getCell(1, 1);
      titleCell.value = injectAnswers(sheet.title, answers) as string;
      titleCell.font = { bold: true, size: 14, color: { argb: 'FF' + headerColor } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE3F2FD' } };
      ws.getRow(1).height = 28;
    }

    // Ligne de sous-titre avec nom du doc + date
    const subtitleRow = sheet.title ? 2 : 1;
    ws.mergeCells(subtitleRow, 1, subtitleRow, numCols);
    const sub = ws.getCell(subtitleRow, 1);
    sub.value = `${templateName} — Généré par IBIG DocPro`;
    sub.font = { italic: true, size: 9, color: { argb: 'FF888888' } };
    sub.alignment = { horizontal: 'center' };
    ws.getRow(subtitleRow).height = 16;

    // ── En-têtes de colonnes ────────────────────────────────────────────────
    const headerRow = sheet.title ? 3 : 2;
    for (let c = 0; c < sheet.headers.length; c++) {
      const cell = ws.getCell(headerRow, c + 1);
      cell.value = sheet.headers[c];
      cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + headerColor } };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
        right: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      };
    }
    ws.getRow(headerRow).height = 22;

    // ── Lignes de données ───────────────────────────────────────────────────
    const dataStartRow = headerRow + 1;
    for (let r = 0; r < sheet.rows.length; r++) {
      const rowData = sheet.rows[r];
      const actualRow = dataStartRow + r;
      const isAlt = r % 2 === 1;

      for (let c = 0; c < rowData.length; c++) {
        const cell = ws.getCell(actualRow, c + 1);
        const raw = rowData[c];

        if (typeof raw === 'string' && raw.startsWith('=')) {
          // Formule Excel — remplacer {r} par le numéro de ligne réel
          cell.value = { formula: raw.replace(/\{r\}/g, String(actualRow)) };
          cell.numFmt = raw.includes('%') ? '0.00%' : '#,##0';
        } else {
          cell.value = injectAnswers(raw, answers);
          if (typeof raw === 'number' || (!isNaN(Number(raw)) && raw !== '')) {
            cell.numFmt = '#,##0';
          }
        }

        cell.fill = {
          type: 'pattern', pattern: 'solid',
          fgColor: { argb: isAlt ? 'FFF5F7FA' : 'FFFFFFFF' },
        };
        cell.border = {
          bottom: { style: 'hair', color: { argb: 'FFDDDDDD' } },
          right: { style: 'hair', color: { argb: 'FFDDDDDD' } },
        };
        cell.alignment = { vertical: 'middle', wrapText: true };
      }
      ws.getRow(actualRow).height = 18;
    }

    // ── Ligne de totaux ─────────────────────────────────────────────────────
    if (sheet.totalsRow && sheet.rows.length > 0) {
      const totalRow = dataStartRow + sheet.rows.length;
      const totCell = ws.getCell(totalRow, 1);
      totCell.value = 'TOTAL';
      totCell.font = { bold: true, size: 11 };
      totCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF9C4' } };

      for (let c = 1; c < sheet.headers.length; c++) {
        const cell = ws.getCell(totalRow, c + 1);
        const colLetter = ws.getColumn(c + 1).letter;
        cell.value = {
          formula: `=SUM(${colLetter}${dataStartRow}:${colLetter}${dataStartRow + sheet.rows.length - 1})`,
        };
        cell.numFmt = '#,##0';
        cell.font = { bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF9C4' } };
        cell.border = {
          top: { style: 'medium', color: { argb: 'FF' + headerColor } },
          bottom: { style: 'medium', color: { argb: 'FF' + headerColor } },
        };
      }
      ws.getRow(totalRow).height = 22;
    }

    // ── Largeurs colonnes ───────────────────────────────────────────────────
    for (let c = 0; c < numCols; c++) {
      ws.getColumn(c + 1).width = sheet.colWidths?.[c] ?? (c === 0 ? 32 : 16);
    }

    // Freeze header
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: headerRow, topLeftCell: `A${headerRow + 1}` }];
  }

  // Feuille d'instructions
  const help = wb.addWorksheet('Instructions');
  help.getColumn(1).width = 80;
  const lines = [
    ['IBIG DocPro — Mini-app Excel'],
    [`Document : ${docTitle}`],
    [''],
    ['MODE D\'EMPLOI :'],
    ['1. Remplissez les cellules vides (fond blanc) dans chaque feuille.'],
    ['2. Les cellules en jaune sont des formules automatiques — ne pas modifier.'],
    ['3. Les colonnes en bleu sont des en-têtes — ne pas modifier.'],
    ['4. Vous pouvez ajouter des lignes en copiant le format des lignes existantes.'],
    ['5. Sauvegardez régulièrement votre fichier.'],
    [''],
    ['© IBIG DocPro — docpro.ibigsoft.com'],
  ];
  lines.forEach((line, i) => {
    const cell = help.getCell(i + 1, 1);
    cell.value = line[0];
    if (i === 0) cell.font = { bold: true, size: 14, color: { argb: 'FF' + HEADER_COLOR } };
    else if (i === 3) cell.font = { bold: true, size: 11 };
    else cell.font = { size: 10 };
  });

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

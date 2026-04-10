export type ArchiveEntry = {
  submittedAt: string;
  publicName: string;
  employmentStatus: string;
  employmentStart: string;
  employmentEnd: string;
  position: string;
  grievance: string;
  criminalActivity: string;
  source: string;
};

const PUBLIC_ARCHIVE_CSV_URL = process.env.PUBLIC_GRIEVANCE_ARCHIVE_CSV_URL;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(cell);
      cell = '';
      if (row.some(value => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some(value => value.length > 0)) {
    rows.push(row);
  }

  return rows;
}

function normalizeRow(headers: string[], values: string[]): ArchiveEntry {
  const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));

  return {
    submittedAt: record.submittedAt || record['Submitted At'] || '',
    publicName: record.publicName || record['Public Name'] || 'Anonymous',
    employmentStatus: record.employmentStatus || record['Employment Status'] || '',
    employmentStart: record.employmentStart || record['Employment Start'] || '',
    employmentEnd: record.employmentEnd || record['Employment End'] || '',
    position: record.position || record.Position || '',
    grievance: record.grievance || record.Story || '',
    criminalActivity: record.criminalActivity || record['Potential Criminal Activity'] || '',
    source: record.source || record.Source || 'Public archive',
  };
}

export async function getArchiveEntries(): Promise<ArchiveEntry[]> {
  if (!PUBLIC_ARCHIVE_CSV_URL) {
    return [];
  }

  try {
    const response = await fetch(PUBLIC_ARCHIVE_CSV_URL, {
      next: { revalidate: 60 },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const csv = await response.text();
    const rows = parseCsv(csv);

    if (rows.length < 2) {
      return [];
    }

    const [headers, ...dataRows] = rows;

    return dataRows
      .filter(values => values.some(value => value.trim().length > 0))
      .map(values => normalizeRow(headers, values))
      .reverse();
  } catch {
    return [];
  }
}

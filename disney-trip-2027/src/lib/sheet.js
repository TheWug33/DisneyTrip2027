import { useEffect, useState } from 'react';
import { PUBLISHED_CSV_BASE } from '../config/sheet.js';

// Minimal CSV parser — handles quoted fields, embedded commas, and escaped
// double-quotes ("" -> "). Good enough for Google Sheets' CSV export.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (c === '\r') {
        // skip, \n handles the line break
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

// Converts a parsed CSV (with header row) into an array of objects keyed by
// lower-camel-ish header names, e.g. "Departure Time" -> "departureTime".
function toObjects(rows) {
  if (rows.length === 0) return [];
  const [header, ...body] = rows;
  const keys = header.map((h) =>
    h
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
  );
  return body.map((r) => {
    const obj = {};
    keys.forEach((k, i) => {
      obj[k] = (r[i] ?? '').trim();
    });
    return obj;
  });
}

/**
 * Fetches one tab of the trip Google Sheet by its gid and returns
 * { rows, loading, error }. `rows` is an array of plain objects, one per
 * spreadsheet row, keyed by camelCased header name.
 *
 * In local dev without a deployed /api/sheet function, pass a `fallback`
 * array so the page still renders with placeholder content.
 */
export function useSheetTab(gid, fallback = []) {
  const [rows, setRows] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!gid) {
      setLoading(false);
      return;
    }
    fetch(`${PUBLISHED_CSV_BASE}&gid=${gid}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Sheet fetch failed (${r.status})`);
        return r.text();
      })
      .then((csv) => {
        if (cancelled) return;
        const parsed = toObjects(parseCSV(csv));
        setRows(parsed.length > 0 ? parsed : fallback);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
        setRows(fallback);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gid]);

  return { rows, loading, error };
}

/**
 * For a "key,value" style tab (one setting per row), returns a plain
 * { key: value } object merged over `defaults` — so a sheet that's empty,
 * missing, or only partially filled in still yields a complete object.
 */
export function useKVTab(gid, defaults = {}) {
  const { rows, loading, error } = useSheetTab(gid, []);
  const merged = { ...defaults };
  rows.forEach((r) => {
    if (r.key && r.value) merged[r.key.trim()] = r.value;
  });
  return { values: merged, loading, error };
}

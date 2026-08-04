// Vercel serverless function — proxies a published Google Sheet tab as CSV.
// Keeps the Sheet ID server-side and avoids the browser-side CORS block that
// Google's CSV export endpoint throws when fetched directly from the client.
//
// Usage:  /api/sheet?gid=1234567890
//
// Set SHEET_ID in the Vercel project's Environment Variables (Settings ->
// Environment Variables). See README.md for how to find it.

export default async function handler(req, res) {
  const { gid } = req.query;
  const sheetId = process.env.SHEET_ID;

  if (!sheetId) {
    res.status(500).json({ error: 'SHEET_ID environment variable is not set.' });
    return;
  }
  if (!gid) {
    res.status(400).json({ error: 'Missing required "gid" query parameter.' });
    return;
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Google Sheets responded with ${upstream.status}` });
      return;
    }
    const csv = await upstream.text();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    // Cache for 60s at the edge so a page full of sections doesn't hammer Sheets.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(csv);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch sheet', detail: String(err) });
  }
}

// Base URL for the published trip Google Sheet (File -> Share -> Publish to web).
// Google appends CORS-friendly headers to this endpoint, so the browser can
// fetch it directly -- no serverless proxy required.
// Append "&gid=<tab gid>" to pull a specific tab (see gids.js).
export const PUBLISHED_CSV_BASE =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBwOwfcakPKy3gev9Gs5IYOjfAKYsIG-hV0frwD6E_MUemhqaX-4ARLPGcJv120A/pub?output=csv';

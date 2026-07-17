const volumeNumber = Number.parseInt(process.argv[2] || '', 10);
const keywords = process.argv.slice(3);

if (!volumeNumber || keywords.length === 0) {
  console.error('Usage: node scripts/inspect-volume-source.mjs <volume> <keyword...>');
  process.exit(1);
}

const padded = String(volumeNumber).padStart(3, '0');
const params = new URLSearchParams({
  action: 'parse',
  page: `資治通鑑/卷${padded}`,
  prop: 'wikitext',
  format: 'json',
  origin: '*',
});
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
let response;
for (let attempt = 0; attempt < 8; attempt += 1) {
  response = await fetch(`https://zh.wikisource.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'GuanjianSourceAudit/0.1 (local educational project)' },
  });
  if (response.status !== 429) break;
  const retryAfter = Number.parseInt(response.headers.get('retry-after') || '0', 10);
  await delay(Math.max(retryAfter * 1000, 1500 * (attempt + 1)));
}
if (!response?.ok) throw new Error(`HTTP ${response?.status || 'unknown'}`);
const payload = await response.json();
const lines = (payload.parse?.wikitext?.['*'] || '').split('\n');

function excerptAround(line, keyword, radius = 360) {
  const index = line.indexOf(keyword);
  if (index < 0 || line.length <= radius * 2) return line.trim();

  const from = Math.max(0, index - radius);
  const to = Math.min(line.length, index + keyword.length + radius);
  return `${from > 0 ? '…' : ''}${line.slice(from, to).trim()}${to < line.length ? '…' : ''}`;
}

for (const keyword of keywords) {
  console.log(`\n## ${keyword}`);
  const indexes = lines
    .map((line, index) => (line.includes(keyword) ? index : -1))
    .filter((index) => index >= 0)
    .slice(0, 8);

  if (indexes.length === 0) {
    console.log('(not found)');
    continue;
  }

  for (const index of indexes) {
    const previous = lines[index - 1]?.trim();
    const current = excerptAround(lines[index], keyword);
    const next = lines[index + 1]?.trim();
    console.log([previous, current, next].filter(Boolean).join('\n'));
    console.log('---');
  }
}

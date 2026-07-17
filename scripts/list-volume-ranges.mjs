const from = Number.parseInt(process.argv[2] || '', 10);
const to = Number.parseInt(process.argv[3] || process.argv[2] || '', 10);

if (!from || !to || from > to) {
  console.error('Usage: node scripts/list-volume-ranges.mjs <from> [to]');
  process.exit(1);
}

const digitValues = {
  '〇': '0',
  '零': '0',
  '一': '1',
  '二': '2',
  '三': '3',
  '四': '4',
  '五': '5',
  '六': '6',
  '七': '7',
  '八': '8',
  '九': '9',
};

function parseDigitYear(value) {
  const digits = [...value].map((character) => digitValues[character]).join('');
  return Number.parseInt(digits, 10);
}

function parseRange(volumeNumber, wikitext) {
  const padded = String(volumeNumber).padStart(3, '0');
  const years = [...wikitext.matchAll(/公元([〇零一二三四五六七八九]+)年/g)]
    .map((match) => parseDigitYear(match[1]));
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
  if (uniqueYears.length === 0) return `${padded} missing-year-headings`;
  return `${padded} ${uniqueYears[0]}-${uniqueYears.at(-1)}`;
}

async function loadBatch(volumeNumbers) {
  const titles = volumeNumbers
    .map((volumeNumber) => `資治通鑑/卷${String(volumeNumber).padStart(3, '0')}`)
    .join('|');
  const params = new URLSearchParams({
    action: 'query',
    titles,
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    format: 'json',
    formatversion: '2',
    origin: '*',
  });
  let response;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    response = await fetch(`https://zh.wikisource.org/w/api.php?${params}`, {
      headers: { 'User-Agent': 'GuanjianSourceAudit/0.1 (local educational project)' },
    });
    if (response.status !== 429) break;
    const retryAfter = Number.parseInt(response.headers.get('retry-after') || '0', 10);
    const waitMilliseconds = Math.max(retryAfter * 1000, 1500 * (attempt + 1));
    await new Promise((resolve) => setTimeout(resolve, waitMilliseconds));
  }
  if (!response?.ok) throw new Error(`batch ${volumeNumbers[0]}-${volumeNumbers.at(-1)}: HTTP ${response?.status || 'unknown'}`);
  const payload = await response.json();
  return payload.query.pages.map((page) => {
    const volumeNumber = Number.parseInt(page.title.match(/卷(\d{3})$/)?.[1] || '', 10);
    const wikitext = page.revisions?.[0]?.slots?.main?.content || '';
    return { volumeNumber, line: parseRange(volumeNumber, wikitext) };
  });
}

const volumeNumbers = Array.from({ length: to - from + 1 }, (_, index) => from + index);
const queue = [];
for (let index = 0; index < volumeNumbers.length; index += 20) {
  queue.push(volumeNumbers.slice(index, index + 20));
}
const results = [];

async function worker() {
  while (queue.length > 0) {
    const batch = queue.shift();
    results.push(...await loadBatch(batch));
  }
}

await Promise.all(Array.from({ length: Math.min(2, queue.length) }, () => worker()));
results.sort((a, b) => a.volumeNumber - b.volumeNumber);
for (const result of results) console.log(result.line);

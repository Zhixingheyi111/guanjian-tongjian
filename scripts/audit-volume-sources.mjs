const from = Math.max(1, Number.parseInt(process.argv[2] || '1', 10));
const to = Math.min(294, Number.parseInt(process.argv[3] || '68', 10));
const concurrency = 1;
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function padVolume(number) {
  return String(number).padStart(3, '0');
}

function plainText(value = '') {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/-\{([^}]+)\}-/g, '$1')
    .replace(/&[^;]+;/g, '')
    .trim();
}

async function readVolume(number) {
  const params = new URLSearchParams({
    action: 'parse',
    page: `資治通鑑/卷${padVolume(number)}`,
    prop: 'sections',
    format: 'json',
    origin: '*',
  });
  let response;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    response = await fetch(`https://zh.wikisource.org/w/api.php?${params}`, {
      headers: { 'User-Agent': 'GuanjianSourceAudit/0.1 (local educational project)' },
    });
    if (response.status !== 429) break;
    const retryAfter = Number.parseInt(response.headers.get('retry-after') || '0', 10);
    await delay(Math.max(retryAfter * 1000, 1500 * (attempt + 1)));
  }
  if (!response?.ok) throw new Error(`volume ${number}: HTTP ${response?.status || 'unknown'}`);
  const payload = await response.json();
  if (payload.error) throw new Error(`volume ${number}: ${payload.error.info}`);

  const yearSections = (payload.parse?.sections || [])
    .map((section) => plainText(section.line))
    .filter((line) => /年.*(西元|前)/.test(line));

  return {
    number,
    id: `vol-${padVolume(number)}`,
    firstSection: yearSections[0] || '',
    lastSection: yearSections.at(-1) || '',
    sourceUrl: `https://zh.wikisource.org/zh-hans/資治通鑑/卷${padVolume(number)}`,
  };
}

const numbers = Array.from({ length: to - from + 1 }, (_, index) => from + index);
const results = new Array(numbers.length);
let cursor = 0;

async function worker() {
  while (cursor < numbers.length) {
    const index = cursor;
    cursor += 1;
    results[index] = await readVolume(numbers[index]);
    await delay(700);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, numbers.length) }, worker));

for (const item of results) {
  console.log([
    padVolume(item.number),
    item.firstSection,
    item.lastSection,
    item.sourceUrl,
  ].join('\t'));
}

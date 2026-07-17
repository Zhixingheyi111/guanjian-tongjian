import { defineStory, volumeId } from './buildStory.js';

const CHINESE_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function chineseNumber(number) {
  if (number < 10) return CHINESE_DIGITS[number];
  if (number === 10) return '十';
  if (number < 20) return `十${CHINESE_DIGITS[number % 10]}`;
  const tens = `${CHINESE_DIGITS[Math.floor(number / 10)]}十`;
  return number % 10 ? `${tens}${CHINESE_DIGITS[number % 10]}` : tens;
}

export function defineVolumeGuide(config) {
  const judgment = config.judgment
    ? {
        ...config.judgment,
        id: config.judgment.id || `judgment-${config.id}`,
      }
    : null;
  const method = {
    ...config.method,
    id: config.method.id || `method-${config.id}`,
    scope: 'interpersonal',
    keywords: config.method.keywords || [],
    sourceJudgmentId: judgment?.id || null,
  };

  return defineStory({
    id: config.id,
    order: config.order || config.volumeNumber,
    eventOrder: 1,
    periodId: config.periodId,
    volumeNumber: config.volumeNumber,
    volumeIds: [volumeId(config.volumeNumber)],
    title: config.title,
    subtitle: config.subtitle,
    rangeLabel: config.rangeLabel,
    startYear: config.startYear,
    durationLabel: config.durationLabel || '约6分钟',
    importance: config.importance || '本卷关键故事',
    question: config.question,
    summary: config.summary,
    context: {
      before: config.before,
      now: config.now,
      after: config.after,
    },
    timeline: [
      {
        id: 'key-turn',
        dateLabel: config.dateLabel || config.rangeLabel,
        title: config.passageTitle,
        summary: config.pointSummary,
        turningPoint: config.turningPoint,
        original: config.original,
        vernacular: config.vernacular,
        judgment,
      },
    ],
    outcomes: config.outcomes,
    methods: [method],
    mapIds: config.mapIds || ['han-civilisation-2ce'],
    volumeMeta: {
      number: config.volumeNumber,
      shortTitle: config.shortTitle || `汉纪${chineseNumber(config.volumeNumber - 8)}`,
      era: config.era,
      dynasty: config.dynasty || '汉纪',
      startYear: config.startYear,
      endYear: config.endYear,
      coverage: config.coverage,
      summary: config.volumeSummary || config.summary,
    },
  });
}

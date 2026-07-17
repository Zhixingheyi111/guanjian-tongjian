import { events } from './events.js';
import { judgments } from './judgments.js';
import { methodCategories, methods } from './methods.js';

const topicHints = [
  {
    categoryId: 'people-choice',
    keywords: ['选人', '提拔', '合作', '同事', '朋友', '领导', '下属', '能力', '强势', '可靠', '品格', '信任'],
  },
  {
    categoryId: 'speech-persuasion',
    keywords: ['怎么说', '开口', '说服', '沟通', '解释', '请求', '帮忙', '拒绝', '谈', '表达', '劝'],
  },
  {
    categoryId: 'cooperation-retreat',
    keywords: ['合作', '关系', '冲突', '压力', '让步', '边界', '翻脸', '被逼', '退', '进', '联盟'],
  },
  {
    categoryId: 'self-command',
    keywords: ['情绪', '生气', '忍', '焦虑', '骄傲', '自制', '控制', '冲动', '委屈', '怕'],
  },
];

const byId = (items) => new Map(items.map((item) => [item.id, item]));
const eventById = byId(events);
const judgmentById = byId(judgments);
const categoryById = byId(methodCategories);

function scoreText(problem, values) {
  return values.reduce((score, value) => score + (problem.includes(value) ? 2 : 0), 0);
}

function scoreMethod(problem, method) {
  const categoryHint = topicHints.find((hint) => hint.categoryId === method.categoryId);
  const topicScore = categoryHint ? scoreText(problem, categoryHint.keywords) : 0;
  const methodScore = scoreText(problem, [
    method.title,
    method.problem,
    method.principle,
    method.avoid,
    method.practice,
    ...method.keywords,
  ]);
  return topicScore + methodScore;
}

function selectMethods(problem) {
  const interpersonalMethods = methods.filter((method) => method.scope === 'interpersonal');
  const ranked = interpersonalMethods
    .map((method) => ({ method, score: scoreMethod(problem, method) }))
    .sort((a, b) => b.score - a.score);
  const hasStrongMatch = ranked.some((item) => item.score > 0);

  if (hasStrongMatch) return ranked.slice(0, 3).map((item) => item.method);

  return [
    methods.find((method) => method.id === 'method-shared-risk'),
    methods.find((method) => method.id === 'method-talent-virtue'),
    methods.find((method) => method.id === 'method-coercion-backfire'),
  ].filter(Boolean);
}

function buildRelatedEvent(method) {
  const event = eventById.get(method.sourceEventId);
  const judgment = method.sourceJudgmentId ? judgmentById.get(method.sourceJudgmentId) : null;
  if (!event) return null;
  return {
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    dateLabel: event.dateLabel,
    background: event.background,
    explanation: event.explanation,
    original: event.original,
    judgment: judgment
      ? {
          title: judgment.title,
          original: judgment.original,
          takeaway: judgment.takeaway,
        }
      : null,
  };
}

export function buildConsultationContext(problem) {
  const selectedMethods = selectMethods(problem.trim());
  const relatedEvents = selectedMethods
    .map(buildRelatedEvent)
    .filter(Boolean)
    .filter((event, index, list) => list.findIndex((item) => item.id === event.id) === index);

  return {
    problem: problem.trim(),
    methods: selectedMethods.map((method) => ({
      id: method.id,
      title: method.title,
      category: categoryById.get(method.categoryId)?.name || '处世',
      sourceEventId: method.sourceEventId,
      problem: method.problem,
      principle: method.principle,
      steps: method.steps,
      avoid: method.avoid,
      practice: method.practice,
    })),
    relatedEvents,
  };
}

export function buildLocalConsultation(problem, status = 'local') {
  const context = buildConsultationContext(problem);
  const primaryMethod = context.methods[0];
  const primaryEvent = context.relatedEvents[0];

  return {
    mode: status,
    title: primaryMethod ? primaryMethod.title : '先把事情说清楚，再决定怎么动',
    summary: primaryMethod
      ? `这件事更像“${primaryMethod.category}”问题。先借《通鉴》里的“${primaryEvent?.title || '相关事件'}”看一眼局势。`
      : '这件事需要先分清对方、利害、边界和你真正要保住的东西。',
    category: primaryMethod?.category || '处世',
    context,
    advice: {
      read: primaryEvent
        ? `参照《${primaryEvent.title}》：${primaryEvent.explanation}`
        : '先找一个相似历史局面，再决定今天怎么说。',
      similarity: primaryMethod
        ? `相似之处在于：${primaryMethod.problem}`
        : '相似之处通常在于各方的利害、边界或信任正在发生变化。',
      difference: '历史人物身处权力和生死竞争，你面对的关系、责任与可退出空间可能完全不同。先确认这些差异，再决定能借用哪条原则。',
      steps: primaryMethod?.steps || [
        '先写下对方真正关心的利害。',
        '再写下你的底线和可让步处。',
        '最后只说一个具体请求，不急着一次解决全部问题。',
      ],
      words: [
        '我先说我担心的共同风险，不是要否定你。',
        '这件事我能配合到这里，但再往前会伤到边界。',
        '我们先把下一步做小一点，保留复盘空间。',
      ],
      avoid: primaryMethod ? [primaryMethod.avoid] : ['不要一上来讲道理、压情绪，或把话说死。'],
      reflection: primaryMethod?.practice || '今天先写一句你真正想守住的边界。',
    },
  };
}

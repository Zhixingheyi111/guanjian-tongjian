import { tongjianData } from '../src/data/tongjian/index.js';

const errors = [];
const ids = {
  volumes: new Set(tongjianData.volumes.map((item) => item.id)),
  sections: new Set(tongjianData.sections.map((item) => item.id)),
  events: new Set(tongjianData.events.map((item) => item.id)),
  judgments: new Set(tongjianData.judgments.map((item) => item.id)),
  excerpts: new Set(tongjianData.excerpts.map((item) => item.id)),
  maps: new Set(tongjianData.maps.map((item) => item.id)),
  people: new Set(tongjianData.people.map((item) => item.id)),
  places: new Set(tongjianData.places.map((item) => item.id)),
  themes: new Set(tongjianData.themes.map((item) => item.id)),
  methodCategories: new Set(tongjianData.methodCategories.map((item) => item.id)),
  methods: new Set(tongjianData.methods.map((item) => item.id)),
  periods: new Set(tongjianData.periods.map((item) => item.id)),
  lessons: new Set(tongjianData.lessons.map((item) => item.id)),
  passages: new Set(tongjianData.passages.map((item) => item.id)),
  periodGuides: new Set(tongjianData.periodGuides.map((item) => item.id)),
  periodChapters: new Set(tongjianData.periodChapters.map((item) => item.id)),
  historicalActors: new Set(tongjianData.historicalActors.map((item) => item.id)),
  knowledgeChecks: new Set(tongjianData.knowledgeChecks.map((item) => item.id)),
  historicalSources: new Set(tongjianData.historicalSources.map((item) => item.id)),
};

const collections = {
  volumes: tongjianData.volumes,
  sections: tongjianData.sections,
  events: tongjianData.events,
  judgments: tongjianData.judgments,
  excerpts: tongjianData.excerpts,
  maps: tongjianData.maps,
  people: tongjianData.people,
  places: tongjianData.places,
  themes: tongjianData.themes,
  methodCategories: tongjianData.methodCategories,
  methods: tongjianData.methods,
  periods: tongjianData.periods,
  lessons: tongjianData.lessons,
  passages: tongjianData.passages,
  periodGuides: tongjianData.periodGuides,
  periodChapters: tongjianData.periodChapters,
  historicalActors: tongjianData.historicalActors,
  relationshipEdges: tongjianData.relationshipEdges,
  knowledgeChecks: tongjianData.knowledgeChecks,
  historicalSources: tongjianData.historicalSources,
};

function requireField(item, field, scope) {
  if (item[field] == null || item[field] === '') errors.push(`${scope}:${item.id || 'unknown'} missing ${field}`);
}

function requireRef(setName, id, scope) {
  if (!ids[setName].has(id)) errors.push(`${scope} references missing ${setName}:${id}`);
}

for (const [name, items] of Object.entries(collections)) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) errors.push(`${name} contains duplicate id:${item.id}`);
    seen.add(item.id);
  }
}

for (const volume of tongjianData.volumes) {
  requireField(volume, 'id', 'volume');
  requireField(volume, 'title', 'volume');
  requireField(volume, 'sourceUrl', 'volume');
  volume.lessonIds.forEach((id) => requireRef('lessons', id, `volume:${volume.id}`));
}

for (const period of tongjianData.periods) {
  requireField(period, 'id', 'period');
  requireField(period, 'title', 'period');
  requireField(period, 'rangeLabel', 'period');
  requireField(period, 'summary', 'period');
  period.lessonIds.forEach((id) => requireRef('lessons', id, `period:${period.id}`));
  period.mapIds.forEach((id) => requireRef('maps', id, `period:${period.id}`));
}

for (const source of tongjianData.historicalSources) {
  requireField(source, 'id', 'historicalSource');
  requireField(source, 'title', 'historicalSource');
  requireField(source, 'kind', 'historicalSource');
  requireField(source, 'url', 'historicalSource');
}

for (const guide of tongjianData.periodGuides) {
  requireField(guide, 'id', 'periodGuide');
  requireField(guide, 'title', 'periodGuide');
  requireField(guide, 'thesis', 'periodGuide');
  requireField(guide, 'entry', 'periodGuide');
  requireField(guide, 'exit', 'periodGuide');
  requireField(guide, 'spatial', 'periodGuide');
  requireRef('periods', guide.id, `periodGuide:${guide.id}`);
  guide.sourceIds.forEach((id) => requireRef('historicalSources', id, `periodGuide:${guide.id}`));
  guide.mapIds.forEach((id) => requireRef('maps', id, `periodGuide:${guide.id}`));

  if (!Array.isArray(guide.society) || guide.society.length < 4) {
    errors.push(`periodGuide:${guide.id} requires at least four social-background sections`);
  }
  for (const item of guide.society || []) {
    requireField(item, 'id', `periodGuide:${guide.id}:society`);
    requireField(item, 'title', `periodGuide:${guide.id}:society`);
    requireField(item, 'summary', `periodGuide:${guide.id}:society`);
    requireField(item, 'whyItMatters', `periodGuide:${guide.id}:society`);
    item.sourceIds.forEach((id) => requireRef('historicalSources', id, `periodGuide:${guide.id}:society:${item.id}`));
  }
  if (!Array.isArray(guide.contradictions) || guide.contradictions.length < 3 || guide.contradictions.length > 5) {
    errors.push(`periodGuide:${guide.id} requires three to five contradictions`);
  }
  for (const item of guide.contradictions || []) {
    requireField(item, 'id', `periodGuide:${guide.id}:contradiction`);
    requireField(item, 'title', `periodGuide:${guide.id}:contradiction`);
    requireField(item, 'explanation', `periodGuide:${guide.id}:contradiction`);
    requireField(item, 'result', `periodGuide:${guide.id}:contradiction`);
    if (!Array.isArray(item.sides) || item.sides.length !== 2) {
      errors.push(`periodGuide:${guide.id}:contradiction:${item.id} requires two sides`);
    }
    item.sourceIds.forEach((id) => requireRef('historicalSources', id, `periodGuide:${guide.id}:contradiction:${item.id}`));
  }
}

for (const period of tongjianData.periods) {
  const guides = tongjianData.periodGuides.filter((item) => item.id === period.id);
  const chapters = tongjianData.periodChapters.filter((item) => item.periodId === period.id).sort((a, b) => a.order - b.order);
  const actors = tongjianData.historicalActors.filter((item) => item.periodId === period.id);
  const checks = tongjianData.knowledgeChecks.filter((item) => item.periodId === period.id);
  const coreLessons = tongjianData.lessons.filter((item) => item.periodId === period.id && item.isCore);

  if (guides.length !== 1) errors.push(`period:${period.id} requires exactly one period guide`);
  if (chapters.length < 4 || chapters.length > 7) errors.push(`period:${period.id} requires four to seven chapters`);
  if (actors.length < 6 || actors.length > 12) errors.push(`period:${period.id} requires six to twelve actors`);
  if (checks.length < 4 || checks.length > 6) errors.push(`period:${period.id} requires four to six knowledge checks`);
  if (coreLessons.length === 0 || coreLessons.length > 15) errors.push(`period:${period.id} requires one to fifteen core lessons`);

  for (let index = 0; index < chapters.length; index += 1) {
    const item = chapters[index];
    if (item.order !== index + 1) errors.push(`period:${period.id} chapter order must be continuous`);
    if (index > 0 && item.startYear !== chapters[index - 1].endYear + 1) {
      errors.push(`period:${period.id} chapters must cover a continuous timeline at ${item.id}`);
    }
  }
}

const coreLessonOwners = new Map();
for (const item of tongjianData.periodChapters) {
  requireField(item, 'id', 'periodChapter');
  requireField(item, 'title', 'periodChapter');
  requireField(item, 'rangeLabel', 'periodChapter');
  requireField(item, 'summary', 'periodChapter');
  requireField(item, 'turningPoint', 'periodChapter');
  requireField(item, 'result', 'periodChapter');
  requireRef('periods', item.periodId, `periodChapter:${item.id}`);
  requireRef('maps', item.mapId, `periodChapter:${item.id}`);
  item.actorIds.forEach((id) => requireRef('historicalActors', id, `periodChapter:${item.id}`));
  for (const lessonId of item.coreLessonIds) {
    requireRef('lessons', lessonId, `periodChapter:${item.id}`);
    if (coreLessonOwners.has(lessonId)) {
      errors.push(`core lesson:${lessonId} appears in both ${coreLessonOwners.get(lessonId)} and ${item.id}`);
    }
    coreLessonOwners.set(lessonId, item.id);
  }
}

for (const item of tongjianData.historicalActors) {
  requireField(item, 'id', 'historicalActor');
  requireField(item, 'name', 'historicalActor');
  requireField(item, 'kind', 'historicalActor');
  requireField(item, 'group', 'historicalActor');
  requireField(item, 'role', 'historicalActor');
  requireField(item, 'summary', 'historicalActor');
  requireRef('periods', item.periodId, `historicalActor:${item.id}`);
}

for (const item of tongjianData.relationshipEdges) {
  requireField(item, 'id', 'relationshipEdge');
  requireField(item, 'label', 'relationshipEdge');
  requireField(item, 'type', 'relationshipEdge');
  requireRef('periods', item.periodId, `relationshipEdge:${item.id}`);
  requireRef('historicalActors', item.fromId, `relationshipEdge:${item.id}`);
  requireRef('historicalActors', item.toId, `relationshipEdge:${item.id}`);
  const from = tongjianData.historicalActors.find((actor) => actor.id === item.fromId);
  const to = tongjianData.historicalActors.find((actor) => actor.id === item.toId);
  if (from?.periodId !== item.periodId || to?.periodId !== item.periodId) {
    errors.push(`relationshipEdge:${item.id} must connect actors in ${item.periodId}`);
  }
}

for (const item of tongjianData.knowledgeChecks) {
  requireField(item, 'id', 'knowledgeCheck');
  requireField(item, 'prompt', 'knowledgeCheck');
  requireField(item, 'explanation', 'knowledgeCheck');
  requireRef('periods', item.periodId, `knowledgeCheck:${item.id}`);
  if (!Array.isArray(item.options) || item.options.length < 2 || item.options.length > 4) {
    errors.push(`knowledgeCheck:${item.id} requires two to four options`);
  }
  if (!Number.isInteger(item.answerIndex) || item.answerIndex < 0 || item.answerIndex >= item.options.length) {
    errors.push(`knowledgeCheck:${item.id} has invalid answerIndex`);
  }
}

for (const lesson of tongjianData.lessons) {
  requireField(lesson, 'id', 'lesson');
  requireField(lesson, 'title', 'lesson');
  requireField(lesson, 'question', 'lesson');
  requireField(lesson, 'sourceUrl', 'lesson');
  requireRef('periods', lesson.periodId, `lesson:${lesson.id}`);
  lesson.volumeIds.forEach((id) => requireRef('volumes', id, `lesson:${lesson.id}`));
  lesson.eventIds.forEach((id) => requireRef('events', id, `lesson:${lesson.id}`));
  lesson.methodIds.forEach((id) => requireRef('methods', id, `lesson:${lesson.id}`));
  lesson.mapIds.forEach((id) => requireRef('maps', id, `lesson:${lesson.id}`));
  lesson.peopleIds.forEach((id) => requireRef('people', id, `lesson:${lesson.id}`));
  requireRef('periodChapters', lesson.chapterId, `lesson:${lesson.id}`);
  if (typeof lesson.isCore !== 'boolean') errors.push(`lesson:${lesson.id} requires isCore`);
  if (lesson.isCore && coreLessonOwners.get(lesson.id) !== lesson.chapterId) {
    errors.push(`lesson:${lesson.id} core placement does not match ${lesson.chapterId}`);
  }
  lesson.placeIds.forEach((id) => requireRef('places', id, `lesson:${lesson.id}`));
  for (const point of lesson.timeline) {
    point.passageIds.forEach((id) => requireRef('passages', id, `lesson:${lesson.id}:${point.id}`));
    point.judgmentIds.forEach((id) => requireRef('judgments', id, `lesson:${lesson.id}:${point.id}`));
  }
}

for (const passage of tongjianData.passages) {
  requireField(passage, 'id', 'passage');
  requireField(passage, 'title', 'passage');
  requireField(passage, 'original', 'passage');
  requireField(passage, 'vernacular', 'passage');
  requireField(passage, 'sourceUrl', 'passage');
  requireRef('volumes', passage.volumeId, `passage:${passage.id}`);
  requireRef('events', passage.eventId, `passage:${passage.id}`);
}

for (const section of tongjianData.sections) {
  requireField(section, 'id', 'section');
  requireField(section, 'title', 'section');
  requireRef('volumes', section.volumeId, `section:${section.id}`);
  for (const eventId of section.eventIds) requireRef('events', eventId, `section:${section.id}`);
}

for (const event of tongjianData.events) {
  requireField(event, 'id', 'event');
  requireField(event, 'title', 'event');
  requireField(event, 'original', 'event');
  requireField(event, 'vernacular', 'event');
  requireField(event, 'sourceUrl', 'event');
  requireRef('volumes', event.volumeId, `event:${event.id}`);
  requireRef('sections', event.sectionId, `event:${event.id}`);
  event.peopleIds.forEach((id) => requireRef('people', id, `event:${event.id}`));
  event.placeIds.forEach((id) => requireRef('places', id, `event:${event.id}`));
  event.themeIds.forEach((id) => requireRef('themes', id, `event:${event.id}`));
  event.judgmentIds.forEach((id) => requireRef('judgments', id, `event:${event.id}`));
  event.excerptIds.forEach((id) => requireRef('excerpts', id, `event:${event.id}`));
  event.mapIds.forEach((id) => requireRef('maps', id, `event:${event.id}`));
  if (!Array.isArray(event.lessons) || event.lessons.length === 0) {
    errors.push(`event:${event.id} requires at least one decision lesson`);
  }
}

for (const judgment of tongjianData.judgments) {
  requireField(judgment, 'id', 'judgment');
  requireField(judgment, 'title', 'judgment');
  requireField(judgment, 'original', 'judgment');
  requireField(judgment, 'vernacular', 'judgment');
  requireField(judgment, 'sourceUrl', 'judgment');
  judgment.eventIds.forEach((id) => requireRef('events', id, `judgment:${judgment.id}`));
}

for (const excerpt of tongjianData.excerpts) {
  requireField(excerpt, 'id', 'excerpt');
  requireField(excerpt, 'title', 'excerpt');
  requireField(excerpt, 'original', 'excerpt');
  requireField(excerpt, 'sourceUrl', 'excerpt');
  requireRef('events', excerpt.eventId, `excerpt:${excerpt.id}`);
}

for (const map of tongjianData.maps) {
  requireField(map, 'id', 'map');
  requireField(map, 'title', 'map');
  requireField(map, 'imageUrl', 'map');
  requireField(map, 'sourceUrl', 'map');
  requireField(map, 'license', 'map');
  map.eventIds.forEach((id) => requireRef('events', id, `map:${map.id}`));
  map.lessonIds.forEach((id) => requireRef('lessons', id, `map:${map.id}`));
}

for (const category of tongjianData.methodCategories) {
  requireField(category, 'id', 'methodCategory');
  requireField(category, 'name', 'methodCategory');
  requireField(category, 'scope', 'methodCategory');
  requireField(category, 'summary', 'methodCategory');
  if (!['interpersonal', 'decision'].includes(category.scope)) {
    errors.push(`methodCategory:${category.id} has invalid scope:${category.scope}`);
  }
}

for (const method of tongjianData.methods) {
  requireField(method, 'id', 'method');
  requireField(method, 'title', 'method');
  requireField(method, 'scope', 'method');
  requireField(method, 'problem', 'method');
  requireField(method, 'principle', 'method');
  requireField(method, 'avoid', 'method');
  requireField(method, 'practice', 'method');
  requireRef('methodCategories', method.categoryId, `method:${method.id}`);
  requireRef('events', method.sourceEventId, `method:${method.id}`);
  if (method.sourceJudgmentId) requireRef('judgments', method.sourceJudgmentId, `method:${method.id}`);
  if (!['interpersonal', 'decision'].includes(method.scope)) {
    errors.push(`method:${method.id} has invalid scope:${method.scope}`);
  }
  if (!Array.isArray(method.steps) || method.steps.length < 2) {
    errors.push(`method:${method.id} requires at least two steps`);
  }
}

// All 294 volumes are now a continuous first-pass publication unit.
// Keep this as a release invariant so later edits cannot silently restore placeholders.
for (let number = 1; number <= 294; number += 1) {
  const volume = tongjianData.volumes.find((item) => item.number === number);
  const scope = `completed-volume:${String(number).padStart(3, '0')}`;

  if (!volume) {
    errors.push(`${scope} is missing`);
    continue;
  }
  if (volume.status !== 'curated') errors.push(`${scope} must remain curated`);
  if (volume.coverage === '年代范围尚待逐卷校录') errors.push(`${scope} requires verified coverage`);
  if (volume.summary === '本卷尚未完成史料校录与故事精编。') errors.push(`${scope} cannot use placeholder copy`);

  const lessons = tongjianData.lessons.filter((lesson) => lesson.volumeIds.includes(volume.id));
  if (lessons.length === 0) {
    errors.push(`${scope} requires at least one lesson`);
    continue;
  }

  const passageCount = lessons.flatMap((lesson) => lesson.timeline)
    .reduce((total, point) => total + point.passageIds.length, 0);
  const methodCount = lessons.reduce((total, lesson) => total + lesson.methodIds.length, 0);
  if (passageCount === 0) errors.push(`${scope} requires at least one primary-source passage`);
  if (methodCount === 0) errors.push(`${scope} requires at least one conduct method`);
}

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Data validation passed: ${tongjianData.periods.length} periods, ${tongjianData.volumes.length} volumes, ${tongjianData.lessons.length} lessons, ${tongjianData.events.length} events, ${tongjianData.judgments.length} judgments, ${tongjianData.maps.length} maps, ${tongjianData.methods.length} methods.`,
);

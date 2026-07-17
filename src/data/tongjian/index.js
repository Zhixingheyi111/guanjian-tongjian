import { eras, volumes } from './volumes.js';
import { sections } from './sections.js';
import { events } from './events.js';
import { judgments } from './judgments.js';
import { excerpts } from './excerpts.js';
import { maps } from './maps.js';
import { people } from './people.js';
import { places } from './places.js';
import { themes } from './themes.js';
import { methodCategories, methods } from './methods.js';
import { periods } from './periods.js';
import { lessons } from './lessons.js';
import { passages } from './passages.js';
import {
  historicalActors,
  historicalSources,
  knowledgeChecks,
  periodChapters,
  periodGuides,
  relationshipEdges,
} from './periodStudy.js';

const byId = (items) => new Map(items.map((item) => [item.id, item]));

export const tongjianData = {
  eras,
  volumes,
  sections,
  events,
  judgments,
  excerpts,
  maps,
  people,
  places,
  themes,
  methodCategories,
  methods,
  periods,
  lessons,
  passages,
  periodGuides,
  periodChapters,
  historicalActors,
  relationshipEdges,
  knowledgeChecks,
  historicalSources,
};

export {
  eras,
  volumes,
  sections,
  events,
  judgments,
  excerpts,
  maps,
  people,
  places,
  themes,
  methodCategories,
  methods,
  periods,
  lessons,
  passages,
  periodGuides,
  periodChapters,
  historicalActors,
  relationshipEdges,
  knowledgeChecks,
  historicalSources,
};

export const volumeById = byId(volumes);
export const sectionById = byId(sections);
export const eventById = byId(events);
export const judgmentById = byId(judgments);
export const excerptById = byId(excerpts);
export const mapById = byId(maps);
export const personById = byId(people);
export const placeById = byId(places);
export const themeById = byId(themes);
export const methodCategoryById = byId(methodCategories);
export const methodById = byId(methods);
export const periodById = byId(periods);
export const lessonById = byId(lessons);
export const passageById = byId(passages);
export const periodGuideById = byId(periodGuides);
export const periodChapterById = byId(periodChapters);
export const historicalActorById = byId(historicalActors);
export const historicalSourceById = byId(historicalSources);

export function listVolumes({ era = 'all', query = '' } = {}) {
  const q = query.trim().toLowerCase();
  return volumes.filter((volume) => {
    const eraMatch = era === 'all' || volume.dynasty === era || volume.era === era;
    if (!eraMatch) return false;
    if (!q) return true;
    return [volume.title, volume.shortTitle, volume.summary, volume.coverage, String(volume.number)]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q));
  });
}

export function getVolumeById(id) {
  return volumeById.get(id) || null;
}

export function getSectionById(id) {
  return sectionById.get(id) || null;
}

export function listSectionsByVolume(volumeId) {
  return sections
    .filter((section) => section.volumeId === volumeId)
    .sort((a, b) => a.order - b.order);
}

export function listEventsByVolume(volumeId) {
  return events
    .filter((event) => event.volumeId === volumeId)
    .sort((a, b) => a.order - b.order);
}

export function listEventsBySection(sectionId) {
  return events
    .filter((event) => event.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);
}

export function getEventById(id) {
  return eventById.get(id) || null;
}

export function getJudgmentById(id) {
  return judgmentById.get(id) || null;
}

export function listJudgments() {
  return judgments;
}

export function getExcerptById(id) {
  return excerptById.get(id) || null;
}

export function getMapById(id) {
  return mapById.get(id) || null;
}

export function getPersonById(id) {
  return personById.get(id) || null;
}

export function getPlaceById(id) {
  return placeById.get(id) || null;
}

export function getThemeById(id) {
  return themeById.get(id) || null;
}

export function getMethodCategoryById(id) {
  return methodCategoryById.get(id) || null;
}

export function getMethodById(id) {
  return methodById.get(id) || null;
}

export function getPeriodById(id) {
  return periodById.get(id) || null;
}

export function getLessonById(id) {
  return lessonById.get(id) || null;
}

export function getPassageById(id) {
  return passageById.get(id) || null;
}

export function getPeriodGuide(id) {
  return periodGuideById.get(id) || null;
}

export function getPeriodChapterById(id) {
  return periodChapterById.get(id) || null;
}

export function getHistoricalActorById(id) {
  return historicalActorById.get(id) || null;
}

export function getHistoricalSourceById(id) {
  return historicalSourceById.get(id) || null;
}

export function listPeriods() {
  return [...periods].sort((a, b) => a.order - b.order);
}

export function listLessonsByPeriod(periodId) {
  return lessons
    .filter((lesson) => lesson.periodId === periodId)
    .sort((a, b) => (a.startYear ?? Number.MAX_SAFE_INTEGER) - (b.startYear ?? Number.MAX_SAFE_INTEGER) || a.order - b.order);
}

export function listLessonsByVolume(volumeId) {
  return lessons
    .filter((lesson) => lesson.volumeIds.includes(volumeId))
    .sort((a, b) => (a.startYear ?? Number.MAX_SAFE_INTEGER) - (b.startYear ?? Number.MAX_SAFE_INTEGER) || a.order - b.order);
}

export function listChaptersByPeriod(periodId) {
  return periodChapters
    .filter((item) => item.periodId === periodId)
    .sort((a, b) => a.order - b.order);
}

export function listCoreLessonsByChapter(chapterId) {
  return lessons
    .filter((lesson) => lesson.chapterId === chapterId && lesson.isCore)
    .sort((a, b) => a.coreOrder - b.coreOrder);
}

export function listExtendedLessonsByChapter(chapterId) {
  return lessons
    .filter((lesson) => lesson.chapterId === chapterId && !lesson.isCore)
    .sort((a, b) => (a.startYear ?? Number.MAX_SAFE_INTEGER) - (b.startYear ?? Number.MAX_SAFE_INTEGER) || a.order - b.order);
}

export function listActorsByPeriod(periodId) {
  return historicalActors.filter((item) => item.periodId === periodId);
}

export function listRelationshipsByPeriod(periodId) {
  return relationshipEdges.filter((item) => item.periodId === periodId);
}

export function listKnowledgeChecksByPeriod(periodId) {
  return knowledgeChecks.filter((item) => item.periodId === periodId);
}

export function getLessonByEventId(eventId) {
  return lessons.find((lesson) => lesson.eventIds.includes(eventId)) || null;
}

export function getLessonByMethodId(methodId) {
  const directLesson = lessons.find((lesson) => lesson.methodIds.includes(methodId));
  if (directLesson) return directLesson;
  const method = getMethodById(methodId);
  return method ? getLessonByEventId(method.sourceEventId) : null;
}

export function listMethodCategories({ scope } = {}) {
  if (!scope) return methodCategories;
  return methodCategories.filter((category) => category.scope === scope);
}

export function listMethodsByCategory(categoryId = 'all', { scope } = {}) {
  return methods.filter((method) => {
    const categoryMatch = categoryId === 'all' || method.categoryId === categoryId;
    const scopeMatch = !scope || method.scope === scope;
    return categoryMatch && scopeMatch;
  });
}

export function listInterpersonalMethodCategories() {
  return listMethodCategories({ scope: 'interpersonal' });
}

export function listInterpersonalMethodsByCategory(categoryId = 'all') {
  return listMethodsByCategory(categoryId, { scope: 'interpersonal' });
}

export function listMethodsByEvent(eventId) {
  return methods.filter((method) => method.sourceEventId === eventId);
}

export function getRelatedEventsForMap(mapId) {
  const map = getMapById(mapId);
  if (!map) return [];
  return map.eventIds.map((id) => getEventById(id)).filter(Boolean);
}

export function searchTongjian(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = [];
  const push = (type, item, fields) => {
    const haystack = fields.filter(Boolean).join(' ').toLowerCase();
    if (haystack.includes(q)) results.push({ type, item });
  };

  for (const period of periods) {
    const guide = periodGuideById.get(period.id);
    push('period', period, [
      period.title,
      period.rangeLabel,
      period.summary,
      period.guidingQuestion,
      ...period.keyChanges,
      guide?.thesis,
      guide?.entry,
      guide?.exit,
      guide?.spatial,
      ...(guide?.glossary || []),
      ...(guide?.society || []).flatMap((item) => [item.title, item.summary, item.whyItMatters]),
      ...(guide?.contradictions || []).flatMap((item) => [item.title, item.explanation, item.result, ...item.sides]),
    ]);
  }
  for (const chapter of periodChapters) {
    push('chapter', chapter, [chapter.title, chapter.rangeLabel, chapter.summary, chapter.turningPoint, chapter.result]);
  }
  for (const actor of historicalActors) {
    push('actor', actor, [actor.name, actor.group, actor.role, actor.summary]);
  }
  for (const lesson of lessons) {
    push('lesson', lesson, [lesson.title, lesson.subtitle, lesson.question, lesson.summary, ...lesson.outcomes]);
  }

  for (const volume of volumes) {
    push('volume', volume, [volume.title, volume.shortTitle, volume.summary, volume.coverage]);
  }
  for (const event of events) {
    const relatedPeople = event.peopleIds.map((id) => personById.get(id)?.name).filter(Boolean);
    const relatedPlaces = event.placeIds.map((id) => placeById.get(id)?.name).filter(Boolean);
    const relatedThemes = event.themeIds.map((id) => themeById.get(id)?.name).filter(Boolean);
    const relatedJudgments = event.judgmentIds.map((id) => judgmentById.get(id)?.title).filter(Boolean);
    push('event', event, [
      event.title,
      event.subtitle,
      event.original,
      event.vernacular,
      event.background,
      event.explanation,
      ...relatedPeople,
      ...relatedPlaces,
      ...relatedThemes,
      ...relatedJudgments,
    ]);
  }
  for (const judgment of judgments) {
    push('judgment', judgment, [judgment.title, judgment.original, judgment.vernacular, judgment.explanation]);
  }
  for (const method of methods) {
    if (method.scope !== 'interpersonal') continue;
    const category = methodCategoryById.get(method.categoryId);
    const sourceEvent = eventById.get(method.sourceEventId);
    push('method', method, [
      method.title,
      method.problem,
      method.principle,
      method.avoid,
      method.practice,
      category?.name,
      sourceEvent?.title,
      ...method.steps,
      ...method.keywords,
    ]);
  }
  for (const map of maps) {
    const relatedEvents = map.eventIds.map((id) => eventById.get(id)?.title).filter(Boolean);
    const markers = map.markers.map((marker) => `${marker.label} ${marker.note}`);
    push('map', map, [
      map.title,
      map.period,
      map.yearLabel,
      map.description,
      map.author,
      ...relatedEvents,
      ...markers,
    ]);
  }
  for (const person of people) {
    push('person', person, [person.name, person.role, person.summary]);
  }
  for (const theme of themes) {
    push('theme', theme, [theme.name, theme.summary]);
  }
  return results;
}

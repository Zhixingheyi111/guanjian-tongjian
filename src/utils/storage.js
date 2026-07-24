const KEY_PREFIX = 'tongjian:';
const EVENT_NOTE_PREFIX = `${KEY_PREFIX}note:event:`;
const VOLUME_NOTE_PREFIX = `${KEY_PREFIX}note:volume:`;
const PERIOD_NOTE_PREFIX = `${KEY_PREFIX}note:period:`;
const BOOKMARK_INDEX_KEY = `${KEY_PREFIX}bookmark:index`;
const READ_PROGRESS_KEY = `${KEY_PREFIX}read-progress`;
const LESSON_NOTE_PREFIX = `${KEY_PREFIX}note:lesson:`;
const LESSON_BOOKMARK_INDEX_KEY = `${KEY_PREFIX}bookmark:lesson:index`;
const LEARNING_PROGRESS_KEY = `${KEY_PREFIX}learning-progress`;
const PERIOD_PROGRESS_KEY = `${KEY_PREFIX}period-progress`;

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.error('[storage] read failed', key, error);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('[storage] write failed', key, error);
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('[storage] remove failed', key, error);
  }
}

export function getEventNote(eventId) {
  const note = safeGet(EVENT_NOTE_PREFIX + eventId, '');
  return typeof note === 'string' ? note : '';
}

export function saveEventNote(eventId, note) {
  return safeSet(EVENT_NOTE_PREFIX + eventId, note);
}

export function getVolumeNote(volumeId) {
  const note = safeGet(VOLUME_NOTE_PREFIX + volumeId, '');
  return typeof note === 'string' ? note : '';
}

export function saveVolumeNote(volumeId, note) {
  return safeSet(VOLUME_NOTE_PREFIX + volumeId, note);
}

export function getPeriodNote(periodId) {
  const note = safeGet(PERIOD_NOTE_PREFIX + periodId, '');
  return typeof note === 'string' ? note : '';
}

export function savePeriodNote(periodId, note) {
  return safeSet(PERIOD_NOTE_PREFIX + periodId, note);
}

export function getLessonNote(lessonId, legacyEventIds = []) {
  const note = safeGet(LESSON_NOTE_PREFIX + lessonId, null);
  if (typeof note === 'string') return note;

  return legacyEventIds
    .map((eventId) => getEventNote(eventId).trim())
    .filter(Boolean)
    .join('\n\n');
}

export function saveLessonNote(lessonId, note) {
  return safeSet(LESSON_NOTE_PREFIX + lessonId, note);
}

export function listLessonNotes() {
  const notes = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(LESSON_NOTE_PREFIX)) continue;
      const lessonId = key.slice(LESSON_NOTE_PREFIX.length);
      const note = safeGet(key, '');
      if (typeof note === 'string' && note.trim()) notes.push({ lessonId, note });
    }
  } catch (error) {
    console.error('[storage] enumerate lesson notes failed', error);
  }
  return notes;
}

export function listEventNotes() {
  const notes = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(EVENT_NOTE_PREFIX)) continue;
      const eventId = key.slice(EVENT_NOTE_PREFIX.length);
      const note = getEventNote(eventId);
      if (note.trim()) notes.push({ eventId, note });
    }
  } catch (error) {
    console.error('[storage] enumerate notes failed', error);
  }
  return notes;
}

export function listVolumeNotes() {
  const notes = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(VOLUME_NOTE_PREFIX)) continue;
      const volumeId = key.slice(VOLUME_NOTE_PREFIX.length);
      const note = getVolumeNote(volumeId);
      if (note.trim()) notes.push({ volumeId, note });
    }
  } catch (error) {
    console.error('[storage] enumerate volume notes failed', error);
  }
  return notes;
}

export function listPeriodNotes() {
  const notes = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(PERIOD_NOTE_PREFIX)) continue;
      const periodId = key.slice(PERIOD_NOTE_PREFIX.length);
      const note = getPeriodNote(periodId);
      if (note.trim()) notes.push({ periodId, note });
    }
  } catch (error) {
    console.error('[storage] enumerate period notes failed', error);
  }
  return notes;
}

export function getBookmarks() {
  const ids = safeGet(BOOKMARK_INDEX_KEY, []);
  return Array.isArray(ids) ? ids : [];
}

export function isBookmarked(eventId) {
  return getBookmarks().includes(eventId);
}

export function toggleBookmark(eventId) {
  const bookmarks = getBookmarks();
  const next = bookmarks.includes(eventId)
    ? bookmarks.filter((id) => id !== eventId)
    : [eventId, ...bookmarks];
  safeSet(BOOKMARK_INDEX_KEY, next);
  return next;
}

export function getLessonBookmarks() {
  const ids = safeGet(LESSON_BOOKMARK_INDEX_KEY, []);
  return Array.isArray(ids) ? ids : [];
}

export function isLessonBookmarked(lessonId, legacyEventIds = []) {
  if (getLessonBookmarks().includes(lessonId)) return true;
  const legacyBookmarks = getBookmarks();
  return legacyEventIds.some((eventId) => legacyBookmarks.includes(eventId));
}

export function toggleLessonBookmark(lessonId) {
  const bookmarks = getLessonBookmarks();
  const next = bookmarks.includes(lessonId)
    ? bookmarks.filter((id) => id !== lessonId)
    : [lessonId, ...bookmarks];
  safeSet(LESSON_BOOKMARK_INDEX_KEY, next);
  return next;
}

export function getReadProgress() {
  return safeGet(READ_PROGRESS_KEY, {
    volumeId: 'vol-001',
    eventId: 'san-jia-fen-jin',
    updatedAt: null,
  });
}

export function saveReadProgress(progress) {
  return safeSet(READ_PROGRESS_KEY, {
    ...progress,
    updatedAt: Date.now(),
  });
}

export function getLearningProgress() {
  return safeGet(LEARNING_PROGRESS_KEY, {
    lessonId: 'lesson-jin-collapse',
    timelinePointId: 'choose-zhiyao',
    completedLessonIds: [],
    updatedAt: null,
  });
}

export function saveLearningProgress(progress) {
  const current = getLearningProgress();
  return safeSet(LEARNING_PROGRESS_KEY, {
    ...current,
    ...progress,
    updatedAt: Date.now(),
  });
}

export function getPeriodProgress() {
  return safeGet(PERIOD_PROGRESS_KEY, {
    currentPeriodId: 'warring-states',
    completedGuideIds: [],
    lastSectionByPeriod: {},
    checkAnswersByPeriod: {},
    completedCheckIds: [],
    updatedAt: null,
  });
}

export function savePeriodProgress(progress) {
  const current = getPeriodProgress();
  return safeSet(PERIOD_PROGRESS_KEY, {
    ...current,
    ...progress,
    updatedAt: Date.now(),
  });
}

export function clearAllTongjianLocalData() {
  const keys = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(KEY_PREFIX)) keys.push(key);
    }
    keys.forEach(safeRemove);
  } catch (error) {
    console.error('[storage] clear failed', error);
  }
}

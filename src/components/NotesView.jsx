import { Bookmark, ChevronRight, NotebookPen, Quote } from 'lucide-react';
import {
  getLessonBookmarks,
  getBookmarks,
  listEventNotes,
  listLessonNotes,
  listPeriodNotes,
  listVolumeNotes,
} from '../utils/storage';
import {
  getEventById,
  getLessonByEventId,
  getLessonById,
  getPeriodById,
  getVolumeById,
} from '../data/tongjian';

function NoteRow({ eyebrow, title, text, onClick }) {
  return (
    <button type="button" className="note-row" onClick={onClick}>
      <span>
        <em>{eyebrow}</em>
        <strong>{title}</strong>
        {text && <p>{text}</p>}
      </span>
      <ChevronRight size={18} aria-hidden="true" />
    </button>
  );
}

export default function NotesView({ onOpenLesson, onOpenPeriod, onOpenVolume }) {
  const lessonNotes = listLessonNotes()
    .map(({ lessonId, note }) => ({ lesson: getLessonById(lessonId), note }))
    .filter(({ lesson }) => lesson);

  const legacyEventNotes = listEventNotes()
    .map(({ eventId, note }) => ({ event: getEventById(eventId), lesson: getLessonByEventId(eventId), note }))
    .filter(({ event, lesson }) => event && lesson && !lessonNotes.some((item) => item.lesson.id === lesson.id));

  const volumeNotes = listVolumeNotes()
    .map(({ volumeId, note }) => ({ volume: getVolumeById(volumeId), note }))
    .filter(({ volume }) => volume);

  const periodNotes = listPeriodNotes()
    .map(({ periodId, note }) => ({ period: getPeriodById(periodId), note }))
    .filter(({ period }) => period);

  const savedLessonIds = new Set(getLessonBookmarks());
  getBookmarks().forEach((eventId) => {
    const lesson = getLessonByEventId(eventId);
    if (lesson) savedLessonIds.add(lesson.id);
  });
  const savedLessons = [...savedLessonIds].map((id) => getLessonById(id)).filter(Boolean);
  const noteCount = lessonNotes.length + legacyEventNotes.length + periodNotes.length + volumeNotes.length;

  return (
    <div className="page-stack notes-page">
      <section className="page-intro page-intro--notes">
        <div>
          <span>我的笔记</span>
          <h2>收藏的原文，最后要长成自己的判断</h2>
          <p>这里只保存你主动收藏、摘录和写下的内容。阅读进度留在通鉴时间轴，不再混在笔记里。</p>
        </div>
        <NotebookPen size={39} aria-hidden="true" />
      </section>

      <div className="notes-stats">
        <span><strong>{noteCount}</strong> 篇笔记</span>
        <span><strong>{savedLessons.length}</strong> 个收藏</span>
      </div>

      <section className="notes-section">
        <header><Quote size={18} aria-hidden="true" /><h2>摘录与心得</h2><span>{lessonNotes.length + legacyEventNotes.length}</span></header>
        {lessonNotes.length + legacyEventNotes.length > 0 ? (
          <div className="notes-list">
            {lessonNotes.map(({ lesson, note }) => (
              <NoteRow key={lesson.id} eyebrow={lesson.rangeLabel} title={lesson.title} text={note} onClick={() => onOpenLesson(lesson.id, 'lesson-notes')} />
            ))}
            {legacyEventNotes.map(({ event, lesson, note }) => (
              <NoteRow key={event.id} eyebrow="旧版事件笔记" title={event.title} text={note} onClick={() => onOpenLesson(lesson.id, 'lesson-notes')} />
            ))}
          </div>
        ) : (
          <div className="quiet-empty">读故事时打开随读笔记，或选中原文摘录，内容会自动出现在这里。</div>
        )}
      </section>

      {periodNotes.length > 0 && (
        <section className="notes-section">
          <header><NotebookPen size={18} aria-hidden="true" /><h2>时代导读笔记</h2><span>{periodNotes.length}</span></header>
          <div className="notes-list">
            {periodNotes.map(({ period, note }) => (
              <NoteRow key={period.id} eyebrow={period.rangeLabel} title={period.title} text={note} onClick={() => onOpenPeriod(period.id)} />
            ))}
          </div>
        </section>
      )}

      <section className="notes-section">
        <header><Bookmark size={18} aria-hidden="true" /><h2>收藏的故事</h2><span>{savedLessons.length}</span></header>
        {savedLessons.length > 0 ? (
          <div className="notes-list">
            {savedLessons.map((lesson) => (
              <NoteRow key={lesson.id} eyebrow={lesson.rangeLabel} title={lesson.title} text={lesson.subtitle} onClick={() => onOpenLesson(lesson.id)} />
            ))}
          </div>
        ) : (
          <div className="quiet-empty">在故事课顶部点“收藏”，以后可以从这里直接回看。</div>
        )}
      </section>

      {volumeNotes.length > 0 && (
        <section className="notes-section">
          <header><NotebookPen size={18} aria-hidden="true" /><h2>卷目笔记</h2><span>{volumeNotes.length}</span></header>
          <div className="notes-list">
            {volumeNotes.map(({ volume, note }) => (
              <NoteRow key={volume.id} eyebrow={volume.coverage} title={volume.shortTitle} text={note} onClick={() => onOpenVolume(volume.id)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

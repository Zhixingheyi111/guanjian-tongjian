import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MapPin,
  NotebookPen,
  Quote,
  Scale,
  Users,
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getJudgmentById,
  getLessonById,
  getMapById,
  getMethodById,
  getMethodCategoryById,
  getPassageById,
  getPeriodById,
  getPeriodChapterById,
  getPersonById,
  getPlaceById,
  getVolumeById,
  listChaptersByPeriod,
  listCoreLessonsByChapter,
  listLessonsByPeriod,
  listPeriods,
} from '../data/tongjian';
import { useTextSelection } from '../hooks/useTextSelection';
import {
  getLearningProgress,
  getLessonBookmarks,
  getLessonNote,
  saveLearningProgress,
  saveLessonNote,
  toggleLessonBookmark,
} from '../utils/storage';
import FollowNote from './FollowNote';
import SelectionPopover from './SelectionPopover';
import { BackButton, Tag } from './ui';

function JudgmentBlock({ judgment }) {
  return (
    <article id={`judgment-${judgment.id}`} className="lesson-judgment">
      <header>
        <Quote size={19} aria-hidden="true" />
        <div>
          <span>司马光的判断</span>
          <h4>{judgment.title}</h4>
        </div>
      </header>
      <blockquote>{judgment.original}</blockquote>
      <div className="lesson-judgment__reading">
        <div>
          <strong>白话</strong>
          <p>{judgment.vernacular}</p>
        </div>
        <div>
          <strong>怎么理解</strong>
          <p>{judgment.explanation}</p>
        </div>
      </div>
      <p className="lesson-judgment__takeaway"><Lightbulb size={16} aria-hidden="true" />{judgment.takeaway}</p>
    </article>
  );
}

function PassageBlock({ passage }) {
  return (
    <article className="lesson-passage">
      <span>重点原文 · {passage.title}</span>
      <blockquote>{passage.original}</blockquote>
      <div>
        <strong>白话</strong>
        <p>{passage.vernacular}</p>
      </div>
      <a href={passage.sourceUrl} target="_blank" rel="noreferrer">
        {passage.sourceLabel}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

export default function StoryLesson({ onOpenVolume }) {
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lesson = getLessonById(lessonId);
  const readingRef = useRef(null);
  const [selection, clearSelection] = useTextSelection(readingRef);
  const [noteSeed, setNoteSeed] = useState(0);
  const [bookmarked, setBookmarked] = useState(() => getLessonBookmarks().includes(lessonId));
  const progress = getLearningProgress();
  const [completed, setCompleted] = useState(progress.completedLessonIds.includes(lessonId));

  useEffect(() => {
    if (!lesson) return;
    saveLearningProgress({ lessonId: lesson.id, timelinePointId: lesson.timeline[0]?.id || null });
  }, [lesson]);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  if (!lesson) {
    return (
      <div className="page-stack">
        <BackButton onClick={() => navigate('/tongjian')}>返回时间轴</BackButton>
        <div className="quiet-empty">未找到这一课。</div>
      </div>
    );
  }

  const volumes = lesson.volumeIds.map((id) => getVolumeById(id)).filter(Boolean);
  const maps = lesson.mapIds.map((id) => getMapById(id)).filter(Boolean);
  const people = lesson.peopleIds.map((id) => getPersonById(id)).filter(Boolean);
  const places = lesson.placeIds.map((id) => getPlaceById(id)).filter(Boolean);
  const methods = lesson.methodIds.map((id) => getMethodById(id)).filter(Boolean);
  const period = getPeriodById(lesson.periodId);
  const chapter = getPeriodChapterById(lesson.chapterId);
  const guidedLessons = listPeriods().flatMap((item) => (
    listChaptersByPeriod(item.id).flatMap((chapterItem) => listCoreLessonsByChapter(chapterItem.id))
  ));
  const orderedLessons = lesson.isCore
    ? guidedLessons
    : listPeriods().flatMap((item) => listLessonsByPeriod(item.id));
  const lessonIndex = orderedLessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? orderedLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex >= 0 ? orderedLessons[lessonIndex + 1] : null;

  const appendQuote = (quote) => {
    const current = getLessonNote(lesson.id, lesson.eventIds);
    const divider = current.trim() ? '\n\n' : '';
    saveLessonNote(lesson.id, `${current}${divider}摘录：${quote}`);
    setNoteSeed((value) => value + 1);
    clearSelection();
  };

  const toggleComplete = () => {
    const current = getLearningProgress();
    const completedLessonIds = current.completedLessonIds.includes(lesson.id)
      ? current.completedLessonIds.filter((id) => id !== lesson.id)
      : [...current.completedLessonIds, lesson.id];
    saveLearningProgress({ lessonId: lesson.id, completedLessonIds });
    setCompleted(completedLessonIds.includes(lesson.id));
  };

  const toggleSaved = () => {
    const next = toggleLessonBookmark(lesson.id);
    setBookmarked(next.includes(lesson.id));
  };

  return (
    <div className="reading-layout reading-layout--story">
      <div className="story-lesson">
      <BackButton onClick={() => navigate(-1)}>返回</BackButton>
      <SelectionPopover selection={selection} label="摘录到笔记" onSelect={appendQuote} />

      <header className="story-hero">
        <div className="story-hero__eyebrow">
          <span>{lesson.importance}</span>
          <Tag tone="accent">{lesson.rangeLabel}</Tag>
        </div>
        <h2>{lesson.title}</h2>
        <p className="story-hero__subtitle">{lesson.subtitle}</p>
        <p className="story-hero__summary">{lesson.summary}</p>
        <div className="story-hero__meta">
          <span><Clock3 size={15} aria-hidden="true" />{lesson.durationLabel}</span>
          <button type="button" onClick={() => onOpenVolume(volumes[0]?.id)}><BookOpen size={15} aria-hidden="true" />{volumes[0]?.shortTitle}</button>
          <button type="button" className={bookmarked ? 'is-active' : ''} onClick={toggleSaved}>{bookmarked ? <Check size={15} /> : <NotebookPen size={15} />}{bookmarked ? '已收藏' : '收藏'}</button>
        </div>
      </header>

      <section className="lesson-question">
        <Scale size={23} aria-hidden="true" />
        <div>
          <span>带着一个问题读</span>
          <strong>{lesson.question}</strong>
        </div>
      </section>

      {period && chapter && (
        <section className="lesson-position">
          <div className="lesson-position__route">
            <span>你在历史中的位置</span>
            <strong>{period.title}</strong>
            <ArrowRight size={15} aria-hidden="true" />
            <strong>第 {chapter.order} 章 · {chapter.title}</strong>
          </div>
          <p>{chapter.summary}</p>
          <button type="button" onClick={() => navigate(`/tongjian/period/${period.id}#${chapter.id}`)}>
            回到这一阶段
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </section>
      )}

      <section className="lesson-context">
        <div><span>此前</span><p>{lesson.context.before}</p></div>
        <div><span>此刻</span><p>{lesson.context.now}</p></div>
        <div><span>此后</span><p>{lesson.context.after}</p></div>
      </section>

      {(maps.length > 0 || people.length > 0 || places.length > 0) && <section className="lesson-orientation">
        {maps.map((map) => (
          <figure key={map.id} className="lesson-map">
            <img src={map.imageUrl} alt={map.title} />
            <figcaption>
              <span><MapPin size={15} aria-hidden="true" />空间参照</span>
              <strong>{map.title} · {map.yearLabel}</strong>
              <p>{map.description}</p>
              <a href={map.sourceUrl} target="_blank" rel="noreferrer">地图来源与许可 <ArrowUpRight size={13} /></a>
            </figcaption>
          </figure>
        ))}

        {(people.length > 0 || places.length > 0) && <details className="lesson-cast">
          <summary><Users size={17} aria-hidden="true" />先认清人物与地点</summary>
          <div className="lesson-cast__grid">
            {people.map((person) => (
              <div key={person.id}><strong>{person.name}</strong><span>{person.role}</span><p>{person.summary}</p></div>
            ))}
            {places.map((place) => (
              <div key={place.id}><strong>{place.name}</strong><span>{place.type}</span><p>{place.summary}</p></div>
            ))}
          </div>
        </details>}
      </section>}

      <section ref={readingRef} className="lesson-reading">
        <header className="lesson-section-title">
          <span>一</span>
          <div><h3>故事时间线</h3><p>先看因果，再读原文；司马光的判断放回它所解释的结果后面。</p></div>
        </header>

        <div className="story-timeline">
          {lesson.timeline.map((point, index) => {
            const passages = point.passageIds.map((id) => getPassageById(id)).filter(Boolean);
            const judgments = point.judgmentIds.map((id) => getJudgmentById(id)).filter(Boolean);
            return (
              <article key={point.id} id={point.id} className="story-point">
                <div className="story-point__marker"><span>{index + 1}</span></div>
                <div className="story-point__content">
                  <header><span>{point.dateLabel}</span><h3>{point.title}</h3></header>
                  <p>{point.summary}</p>
                  <div className="story-point__turn"><ArrowRight size={16} aria-hidden="true" /><strong>转折：</strong>{point.turningPoint}</div>
                  {passages.map((passage) => <PassageBlock key={passage.id} passage={passage} />)}
                  {judgments.map((judgment) => <JudgmentBlock key={judgment.id} judgment={judgment} />)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="lesson-outcomes">
        <header className="lesson-section-title">
          <span>二</span>
          <div><h3>这件事改变了什么</h3><p>把故事放回更长的历史里，才知道它为什么值得学。</p></div>
        </header>
        <ol>
          {lesson.outcomes.map((outcome) => <li key={outcome}><CheckCircle2 size={17} aria-hidden="true" />{outcome}</li>)}
        </ol>
      </section>

      <section className="lesson-methods">
        <header className="lesson-section-title">
          <span>三</span>
          <div><h3>用于今天</h3><p>不是套用古人的答案，而是练习看人、看关系、看边界。</p></div>
        </header>
        <div className="lesson-method-list">
          {methods.map((method) => {
            const category = getMethodCategoryById(method.categoryId);
            return (
              <article key={method.id} id={method.id} className="lesson-method">
                <span>{category?.name}</span>
                <h3>{method.title}</h3>
                <p>{method.principle}</p>
                <ol>{method.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <div className="lesson-method__avoid"><AlertCircle size={16} aria-hidden="true" /><span><strong>不要：</strong>{method.avoid}</span></div>
                <div className="lesson-method__practice"><Lightbulb size={16} aria-hidden="true" /><span><strong>今天就能练：</strong>{method.practice}</span></div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="lesson-footer">
        <button type="button" className={completed ? 'complete-button is-complete' : 'complete-button'} onClick={toggleComplete}>
          <CheckCircle2 size={18} aria-hidden="true" />
          {completed ? '已完成本课' : '完成本课'}
        </button>
        <div className="lesson-next">
          {previousLesson ? (
            <button type="button" onClick={() => navigate(`/lesson/${previousLesson.id}`)}><ArrowLeft size={16} />上一课</button>
          ) : (
            <button type="button" onClick={() => navigate(period ? `/tongjian/period/${period.id}#stories` : '/tongjian')}><ArrowLeft size={16} />返回时代主线</button>
          )}
          {nextLesson ? (
            <button type="button" onClick={() => navigate(`/lesson/${nextLesson.id}`)}>下一课：{nextLesson.title}<ArrowRight size={16} /></button>
          ) : (
            <span>核心主线已经读完，可以回到时代导读复习。</span>
          )}
        </div>
      </footer>
      </div>
      <FollowNote
        key={`${lesson.id}-${noteSeed}`}
        contextKey={lesson.id}
        defaultOpen={location.hash === '#lesson-notes' || noteSeed > 0}
        eyebrow="这一课的随读笔记"
        initialValue={getLessonNote(lesson.id, lesson.eventIds)}
        onSave={(note) => saveLessonNote(lesson.id, note)}
        placeholder="记下你的疑问、判断，或这件事与你当下处境的联系。"
        title={lesson.title}
      />
    </div>
  );
}

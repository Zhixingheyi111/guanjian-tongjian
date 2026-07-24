import { ArrowUpRight, BookOpen, Quote, ScrollText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getEventById,
  getJudgmentById,
  getVolumeById,
  listLessonsByVolume,
} from '../data/tongjian';
import { getVolumeNote, saveVolumeNote } from '../utils/storage';
import FollowNote from './FollowNote';
import { BackButton, Tag } from './ui';

export default function VolumeDetail({ onOpenLesson }) {
  const { volumeId } = useParams();
  const navigate = useNavigate();
  const volume = getVolumeById(volumeId);

  if (!volume) {
    return (
      <div className="page-stack">
        <BackButton onClick={() => navigate('/tongjian/volumes')}>返回卷目</BackButton>
        <div className="quiet-empty">未找到这一卷。</div>
      </div>
    );
  }

  const lessons = listLessonsByVolume(volume.id);
  const available = volume.status !== 'placeholder';
  const lessonEvents = lessons.flatMap((lesson) => lesson.eventIds.map((id) => getEventById(id)).filter(Boolean));
  const judgmentEntries = [...new Set(lessonEvents.flatMap((event) => event.judgmentIds))]
    .map((id) => {
      const judgment = getJudgmentById(id);
      const sourceLesson = lessons.find((lesson) =>
        lesson.timeline.some((point) => point.judgmentIds.includes(id)),
      );
      return judgment && sourceLesson ? { judgment, sourceLesson } : null;
    })
    .filter(Boolean);

  return (
    <div className="reading-layout reading-layout--volume">
      <div className="page-stack volume-detail-page">
      <BackButton onClick={() => navigate('/tongjian/volumes')}>返回卷目</BackButton>

      <header className="volume-detail-hero">
        <span>卷 {String(volume.number).padStart(3, '0')}</span>
        <h2>{volume.shortTitle}</h2>
        <p>{volume.coverage}</p>
        <div>
          <Tag tone={available ? 'accent' : 'neutral'}>{available ? '已精编' : '尚未精编'}</Tag>
          <Tag>{volume.dynasty}</Tag>
        </div>
      </header>

      <section className="reference-section">
        <div className="reference-section__title">
          <BookOpen size={19} aria-hidden="true" />
          <h2>这一卷先学什么</h2>
        </div>
        <p>{volume.summary}</p>
        {lessons.length > 0 ? (
          <div className="reference-lesson-list">
            {lessons.map((lesson) => (
              <button key={lesson.id} type="button" onClick={() => onOpenLesson(lesson.id)}>
                <span>{lesson.rangeLabel}</span>
                <strong>{lesson.title}</strong>
                <em>{lesson.subtitle}</em>
              </button>
            ))}
          </div>
        ) : (
          <div className="quiet-empty">这一卷尚未完成史料校录和故事编排，因此不展示空白课程。</div>
        )}
      </section>

      {lessonEvents.length > 0 && <section className="reference-section">
        <div className="reference-section__title">
          <ScrollText size={19} aria-hidden="true" />
          <h2>本卷精选年表</h2>
        </div>
        <ol className="reference-event-list">
          {lessonEvents.sort((a, b) => a.order - b.order).map((event) => (
            <li key={event.id}>
              <span>{event.dateLabel}</span>
              <strong>{event.title}</strong>
              <p>{event.subtitle}</p>
            </li>
          ))}
        </ol>
      </section>}

      {judgmentEntries.length > 0 && <section className="reference-section">
        <div className="reference-section__title">
          <Quote size={19} aria-hidden="true" />
          <h2>本卷臣光曰</h2>
        </div>
        <div className="reference-judgment-list">
          {judgmentEntries.map(({ judgment, sourceLesson }) => (
            <button
              key={judgment.id}
              type="button"
              onClick={() => onOpenLesson(sourceLesson.id, `judgment-${judgment.id}`)}
            >
              <strong>{judgment.title}</strong>
              <p>{judgment.takeaway}</p>
            </button>
          ))}
        </div>
      </section>}

      <a className="source-link" href={volume.sourceUrl} target="_blank" rel="noreferrer">
        <ArrowUpRight size={17} aria-hidden="true" />
        在维基文库核对原书
      </a>
      </div>
      <FollowNote
        key={volume.id}
        contextKey={volume.id}
        eyebrow="这一卷的随读笔记"
        initialValue={getVolumeNote(volume.id)}
        onSave={(note) => saveVolumeNote(volume.id, note)}
        placeholder="记下这一卷的主线、关键人物，或准备回头核对的问题。"
        title={volume.shortTitle}
      />
    </div>
  );
}

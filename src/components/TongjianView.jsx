import { ArrowRight, BookOpenText, CheckCircle2, Clock3, LibraryBig, Route, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getLessonById,
  getPeriodGuide,
  listActorsByPeriod,
  listChaptersByPeriod,
  listCoreLessonsByChapter,
  listPeriods,
} from '../data/tongjian';
import { getLearningProgress, getPeriodProgress } from '../utils/storage';
import VolumesView from './VolumesView';

function TimelineView({ onOpenLesson, onOpenPeriod }) {
  const periods = listPeriods();
  const periodProgress = getPeriodProgress();
  const learningProgress = getLearningProgress();
  const progressLesson = getLessonById(learningProgress.lessonId);
  const currentPeriod = periods.find((item) => item.id === periodProgress.currentPeriodId) || periods[0];
  const currentGuide = getPeriodGuide(currentPeriod.id);

  return (
    <div className="timeline-page timeline-overview">
      <section className="timeline-intro">
        <div>
          <span>前403—959年</span>
          <h2>先懂时代，再进入故事</h2>
          <p>《资治通鉴》被整理成十个连续阶段。每个阶段先讲社会、人物关系与核心矛盾，再用重要故事和原文验证这条历史主线。</p>
        </div>
        <Route size={40} aria-hidden="true" />
      </section>

      <button type="button" className="period-continue" onClick={() => onOpenPeriod(currentPeriod.id)}>
        <span className="period-continue__icon"><BookOpenText size={22} aria-hidden="true" /></span>
        <span>
          <em>继续时代学习</em>
          <strong>{currentGuide?.title}</strong>
          <small>{currentGuide?.thesis}</small>
        </span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      <section className="history-route">
        <header>
          <div><span>历史总览</span><h2>十个阶段，一条连续变化</h2></div>
          <p>点击一个时代，先完成约8分钟导读。</p>
        </header>
        <div className="history-route__list">
          {periods.map((period, index) => {
            const guide = getPeriodGuide(period.id);
            const chapters = listChaptersByPeriod(period.id);
            const actors = listActorsByPeriod(period.id);
            const coreCount = chapters.reduce((sum, chapter) => sum + listCoreLessonsByChapter(chapter.id).length, 0);
            const completed = periodProgress.completedGuideIds?.includes(period.id);
            const checked = periodProgress.completedCheckIds?.includes(period.id);
            return (
              <button key={period.id} type="button" className={completed ? 'history-period is-complete' : 'history-period'} onClick={() => onOpenPeriod(period.id)}>
                <span className="history-period__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="history-period__body">
                  <span className="history-period__meta"><em>{guide.rangeLabel}</em>{completed && <i><CheckCircle2 size={13} />导读完成</i>}</span>
                  <strong>{guide.title}</strong>
                  <p>{guide.thesis}</p>
                  <span className="history-period__question">{period.guidingQuestion}</span>
                  <span className="history-period__counts">
                    <i><Route size={14} />{chapters.length} 阶段</i>
                    <i><Users size={14} />{actors.length} 力量</i>
                    <i><BookOpenText size={14} />{coreCount} 核心故事</i>
                    {checked && <i className="is-checked"><CheckCircle2 size={14} />检查完成</i>}
                  </span>
                </span>
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      {progressLesson && (
        <section className="recent-story">
          <div><Clock3 size={18} /><span><em>上次读到的故事</em><strong>{progressLesson.title}</strong></span></div>
          <button type="button" onClick={() => onOpenLesson(progressLesson.id)}>继续阅读<ArrowRight size={16} /></button>
        </section>
      )}
    </div>
  );
}

export default function TongjianView({ view, onOpenLesson, onOpenVolume, onOpenPeriod }) {
  const navigate = useNavigate();

  return (
    <div className="page-stack tongjian-page">
      <div className="view-switch" aria-label="通鉴浏览方式">
        <button type="button" className={view === 'timeline' ? 'is-active' : ''} onClick={() => navigate('/tongjian')}>
          <Route size={17} aria-hidden="true" />
          历史学习
        </button>
        <button type="button" className={view === 'volumes' ? 'is-active' : ''} onClick={() => navigate('/tongjian/volumes')}>
          <LibraryBig size={17} aria-hidden="true" />
          原书卷目
        </button>
      </div>
      {view === 'volumes' ? (
        <VolumesView onOpenVolume={onOpenVolume} onOpenLesson={onOpenLesson} />
      ) : (
        <TimelineView onOpenLesson={onOpenLesson} onOpenPeriod={onOpenPeriod} />
      )}
    </div>
  );
}

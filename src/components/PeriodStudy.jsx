import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Landmark,
  MapPinned,
  Network,
  Route,
  Scale,
  Users,
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getHistoricalActorById,
  getHistoricalSourceById,
  getMapById,
  getPeriodById,
  getPeriodGuide,
  listActorsByPeriod,
  listChaptersByPeriod,
  listCoreLessonsByChapter,
  listExtendedLessonsByChapter,
  listKnowledgeChecksByPeriod,
  listRelationshipsByPeriod,
} from '../data/tongjian';
import {
  getPeriodNote,
  getPeriodProgress,
  savePeriodNote,
  savePeriodProgress,
} from '../utils/storage';
import FollowNote from './FollowNote';
import { BackButton, Tag } from './ui';

const SECTION_LINKS = [
  ['overview', '全貌'],
  ['society', '社会'],
  ['actors', '人物'],
  ['contradictions', '矛盾'],
  ['chapters', '阶段'],
  ['check', '检查'],
  ['stories', '故事'],
];

function SectionTitle({ number, icon: Icon, eyebrow, title, description }) {
  return (
    <header className="period-study__section-title">
      <span>{number}</span>
      <Icon size={21} aria-hidden="true" />
      <div>
        <em>{eyebrow}</em>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function StoryButton({ lesson, index, onOpen }) {
  return (
    <button type="button" className="period-story-row" onClick={() => onOpen(lesson.id)}>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <em>{lesson.rangeLabel}</em>
        <strong>{lesson.title}</strong>
        <p>{lesson.question}</p>
      </div>
      <ChevronRight size={18} aria-hidden="true" />
    </button>
  );
}

function KnowledgeCheck({ item, selected, onSelect }) {
  const answered = Number.isInteger(selected);
  const correct = selected === item.answerIndex;

  return (
    <article className={answered ? `knowledge-check ${correct ? 'is-correct' : 'is-wrong'}` : 'knowledge-check'}>
      <h3>{item.prompt}</h3>
      <div className="knowledge-check__options">
        {item.options.map((option, index) => {
          const selectedOption = selected === index;
          const correctOption = answered && item.answerIndex === index;
          return (
            <button
              key={option}
              type="button"
              className={`${selectedOption ? 'is-selected' : ''} ${correctOption ? 'is-answer' : ''}`.trim()}
              onClick={() => onSelect(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
              {correctOption && <Check size={16} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="knowledge-check__explanation">
          <strong>{correct ? '理解正确' : '再想一步'}</strong>
          {item.explanation}
        </p>
      )}
    </article>
  );
}

function PeriodStudyContent({ periodId, onOpenLesson }) {
  const location = useLocation();
  const navigate = useNavigate();
  const period = getPeriodById(periodId);
  const guide = getPeriodGuide(periodId);
  const chapters = listChaptersByPeriod(periodId);
  const actors = listActorsByPeriod(periodId);
  const relationships = listRelationshipsByPeriod(periodId);
  const checks = listKnowledgeChecksByPeriod(periodId);
  const maps = (guide?.mapIds || []).map((id) => getMapById(id)).filter(Boolean);
  const sources = (guide?.sourceIds || []).map((id) => getHistoricalSourceById(id)).filter(Boolean);
  const [progress, setProgress] = useState(() => getPeriodProgress());
  const initialAnswers = progress.checkAnswersByPeriod?.[periodId] || {};
  const [answers, setAnswers] = useState(initialAnswers);

  useEffect(() => {
    if (!location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, periodId]);

  const groups = useMemo(() => {
    const result = new Map();
    for (const item of actors) {
      if (!result.has(item.group)) result.set(item.group, []);
      result.get(item.group).push(item);
    }
    return [...result.entries()];
  }, [actors]);

  if (!period || !guide) {
    return (
      <div className="page-stack">
        <BackButton onClick={() => navigate('/tongjian')}>返回历史总览</BackButton>
        <div className="quiet-empty">没有找到这个时代的导读。</div>
      </div>
    );
  }

  const guideCompleted = progress.completedGuideIds?.includes(periodId);
  const answeredCount = checks.filter((item) => Number.isInteger(answers[item.id])).length;
  const correctCount = checks.filter((item) => answers[item.id] === item.answerIndex).length;
  const totalCore = chapters.reduce((sum, item) => sum + listCoreLessonsByChapter(item.id).length, 0);
  const totalExtended = chapters.reduce((sum, item) => sum + listExtendedLessonsByChapter(item.id).length, 0);

  const updateProgress = (next) => {
    const merged = { ...progress, ...next };
    savePeriodProgress(merged);
    setProgress(merged);
  };

  const visitSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateProgress({
      currentPeriodId: periodId,
      lastSectionByPeriod: { ...progress.lastSectionByPeriod, [periodId]: sectionId },
    });
  };

  const completeGuide = () => {
    const completedGuideIds = guideCompleted
      ? progress.completedGuideIds
      : [...(progress.completedGuideIds || []), periodId];
    updateProgress({ currentPeriodId: periodId, completedGuideIds });
  };

  const selectAnswer = (checkId, answerIndex) => {
    const nextAnswers = { ...answers, [checkId]: answerIndex };
    setAnswers(nextAnswers);
    const completedCheckIds = checks.every((item) => Number.isInteger(nextAnswers[item.id]))
      ? [...new Set([...(progress.completedCheckIds || []), periodId])]
      : progress.completedCheckIds || [];
    updateProgress({
      currentPeriodId: periodId,
      checkAnswersByPeriod: {
        ...progress.checkAnswersByPeriod,
        [periodId]: nextAnswers,
      },
      completedCheckIds,
    });
  };

  const openLesson = (lessonId) => {
    updateProgress({ currentPeriodId: periodId, lastSectionByPeriod: { ...progress.lastSectionByPeriod, [periodId]: 'stories' } });
    onOpenLesson(lessonId);
  };

  return (
    <div className="reading-layout reading-layout--period">
      <article className="period-study">
      <BackButton onClick={() => navigate('/tongjian')}>返回历史总览</BackButton>

      <header className="period-study__hero">
        <div className="period-study__hero-meta">
          <span>第 {period.order} 阶段</span>
          <Tag tone={guideCompleted ? 'accent' : 'neutral'}>{guideCompleted ? '导读已完成' : '约8分钟导读'}</Tag>
        </div>
        <h1>{guide.title}</h1>
        <p className="period-study__range">{guide.rangeLabel}</p>
        <p className="period-study__thesis">{guide.thesis}</p>
        <div className="period-study__stats">
          <span><Route size={16} />{chapters.length} 个历史阶段</span>
          <span><Users size={16} />{actors.length} 个关键力量</span>
          <span><BookOpenText size={16} />{totalCore} 篇核心故事</span>
        </div>
      </header>

      <nav className="period-study__nav" aria-label={`${guide.title}学习目录`}>
        {SECTION_LINKS.map(([id, label], index) => (
          <button key={id} type="button" onClick={() => visitSection(id)}>
            <span>{index + 1}</span>{label}
          </button>
        ))}
      </nav>

      <section id="overview" className="period-study__section">
        <SectionTitle number="一" icon={Compass} eyebrow="八分钟看懂这个时代" title="先知道从哪里来，又走向哪里" description="下面的故事都要放回这条大变化中理解。" />
        <div className="period-bookends">
          <div><span>开始以前</span><p>{guide.entry}</p></div>
          <ArrowRight size={22} aria-hidden="true" />
          <div><span>时代结束</span><p>{guide.exit}</p></div>
        </div>
        <div className="period-spatial">
          <MapPinned size={22} aria-hidden="true" />
          <div><span>先建立空间感</span><p>{guide.spatial}</p></div>
        </div>
        <div className="period-map-grid">
          {maps.map((map) => (
            <figure key={map.id}>
              <img src={map.imageUrl} alt={map.title} />
              <figcaption>
                <strong>{map.title}</strong>
                <span>{map.yearLabel}</span>
                <p>{map.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="society" className="period-study__section">
        <SectionTitle number="二" icon={Landmark} eyebrow="社会底色" title="国家怎样运转，普通人承担什么" description="制度、财政、军队与生活共同决定一件事为什么会发生。" />
        <div className="society-list">
          {guide.society.map((item, index) => (
            <article key={item.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.summary}</p><em>为什么重要：{item.whyItMatters}</em></div>
            </article>
          ))}
        </div>
      </section>

      <section id="actors" className="period-study__section">
        <SectionTitle number="三" icon={Network} eyebrow="谁在争什么" title="先认阵营，再认人物" description="人物不是孤立行动；先看他代表哪一股力量、依赖谁、害怕谁。" />
        <div className="actor-groups">
          {groups.map(([group, members]) => (
            <section key={group} className="actor-group">
              <h3>{group}</h3>
              <div>
                {members.map((item) => (
                  <article key={item.id} id={item.id}>
                    <span>{item.kind === 'person' ? '人物' : item.kind === 'polity' ? '政权' : '力量'}</span>
                    <strong>{item.name}</strong>
                    <em>{item.role}</em>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="relationship-list">
          <h3>关键关系</h3>
          {relationships.map((item) => {
            const from = getHistoricalActorById(item.fromId);
            const to = getHistoricalActorById(item.toId);
            return (
              <div key={item.id}>
                <strong>{from?.name}</strong>
                <span><ArrowRight size={14} />{item.label}</span>
                <strong>{to?.name}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contradictions" className="period-study__section">
        <SectionTitle number="四" icon={Scale} eyebrow="核心矛盾" title="这个时代为什么总在重复同类问题" description="具体人物会更换，长期矛盾却会在不同故事中反复出现。" />
        <div className="contradiction-list">
          {guide.contradictions.map((item, index) => (
            <article key={item.id}>
              <header><span>{index + 1}</span><h3>{item.title}</h3></header>
              <div className="contradiction-sides"><strong>{item.sides[0]}</strong><em>与</em><strong>{item.sides[1]}</strong></div>
              <p>{item.explanation}</p>
              <div><ArrowRight size={15} /><span><strong>最后怎样：</strong>{item.result}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="chapters" className="period-study__section">
        <SectionTitle number="五" icon={Route} eyebrow="阶段时间线" title="把几百年拆成可以理解的变化" description="每一章都回答：格局是什么、转折在哪里、下一章为什么会出现。" />
        <div className="period-chapter-timeline">
          {chapters.map((item) => (
            <article key={item.id} id={item.id}>
              <div className="period-chapter-timeline__marker"><span>{item.order}</span></div>
              <div className="period-chapter-timeline__body">
                <header><em>{item.rangeLabel}</em><h3>{item.title}</h3></header>
                <p>{item.summary}</p>
                <dl>
                  <div><dt>关键转折</dt><dd>{item.turningPoint}</dd></div>
                  <div><dt>阶段结果</dt><dd>{item.result}</dd></div>
                </dl>
                <div className="chapter-actors">
                  {item.actorIds.map((id) => <span key={id}>{getHistoricalActorById(id)?.name}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className={guideCompleted ? 'guide-complete is-complete' : 'guide-complete'} onClick={completeGuide}>
          <CheckCircle2 size={19} />
          {guideCompleted ? '时代导读已完成' : '我已经看懂这个时代的基本框架'}
        </button>
      </section>

      <section id="check" className="period-study__section">
        <SectionTitle number="六" icon={CircleHelp} eyebrow="理解检查" title="不是记年份，而是确认因果关系" description="选完立即看到解释；答错不会扣分，可以随时重选。" />
        <div className="knowledge-checks">
          {checks.map((item) => <KnowledgeCheck key={item.id} item={item} selected={answers[item.id]} onSelect={(index) => selectAnswer(item.id, index)} />)}
        </div>
        <div className="knowledge-score">
          <span>{answeredCount}/{checks.length} 已回答</span>
          <strong>{answeredCount === checks.length ? `理解正确 ${correctCount} 题` : '完成后再进入故事，理解会更稳'}</strong>
        </div>
      </section>

      <section id="stories" className="period-study__section period-study__stories">
        <SectionTitle number="七" icon={BookOpenText} eyebrow="核心故事" title="现在用故事验证时代框架" description="核心故事构成必学主线；其余卷级内容仍按阶段保留为延伸阅读。" />
        {chapters.map((item) => {
          const coreLessons = listCoreLessonsByChapter(item.id);
          const extendedLessons = listExtendedLessonsByChapter(item.id);
          return (
            <section key={item.id} className="chapter-stories">
              <header>
                <span>第 {item.order} 章</span>
                <div><h3>{item.title}</h3><p>{item.rangeLabel}</p></div>
                <Tag tone="accent">{coreLessons.length} 篇必学</Tag>
              </header>
              <div className="chapter-stories__core">
                {coreLessons.map((lesson, index) => <StoryButton key={lesson.id} lesson={lesson} index={index} onOpen={openLesson} />)}
              </div>
              {extendedLessons.length > 0 && (
                <details className="chapter-extended">
                  <summary>延伸阅读 · {extendedLessons.length} 篇卷级故事</summary>
                  <div>
                    {extendedLessons.map((lesson) => (
                      <button key={lesson.id} type="button" onClick={() => openLesson(lesson.id)}>
                        <span>{lesson.rangeLabel}</span><strong>{lesson.title}</strong><ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </details>
              )}
            </section>
          );
        })}
        {totalExtended === 0 && <p className="period-study__all-core">这个短时期现有故事都属于核心主线，没有额外延伸层。</p>}
      </section>

      <footer className="period-study__sources">
        <div><Landmark size={18} /><span><strong>资料依据</strong>时代导读为项目自写，事实依据《资治通鉴》及相关正史。</span></div>
        <nav>
          {sources.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={13} /></a>
          ))}
        </nav>
        <button type="button" onClick={() => navigate('/tongjian')}><ArrowLeft size={16} />返回十阶段总览</button>
      </footer>
      </article>
      <FollowNote
        key={period.id}
        contextKey={period.id}
        eyebrow="这个时代的随读笔记"
        initialValue={getPeriodNote(period.id)}
        onSave={(note) => savePeriodNote(period.id, note)}
        placeholder="例如：这个时代最难解决的矛盾是什么？哪些人物关系还没想清楚？"
        title={period.title}
      />
    </div>
  );
}

export default function PeriodStudy({ onOpenLesson }) {
  const { periodId } = useParams();
  return <PeriodStudyContent key={periodId} periodId={periodId} onOpenLesson={onOpenLesson} />;
}

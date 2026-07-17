import { BookOpen, Compass, ListChecks, MapPinned, Quote, Route, ScrollText, Search, UserRound, Users } from 'lucide-react';
import {
  getLessonByEventId,
  getLessonByMethodId,
  events,
  lessons,
  searchTongjian,
} from '../data/tongjian';

const ICONS = {
  period: Compass,
  chapter: Route,
  actor: Users,
  volume: BookOpen,
  lesson: ScrollText,
  event: ScrollText,
  judgment: Quote,
  method: ListChecks,
  map: MapPinned,
  person: UserRound,
  theme: Search,
};

const TYPE_LABELS = {
  period: '历史阶段',
  chapter: '时代章节',
  actor: '时代人物与力量',
  volume: '原书卷目',
  lesson: '故事课',
  event: '历史事件',
  judgment: '臣光曰',
  method: '处世方法',
  map: '地图',
  person: '人物',
  theme: '主题',
};

function resultTitle(result) {
  if (['period', 'chapter', 'volume', 'lesson', 'event', 'judgment', 'method', 'map'].includes(result.type)) return result.item.title;
  return result.item.name;
}

function resultText(result) {
  if (result.type === 'period') return result.item.summary;
  if (result.type === 'chapter') return result.item.summary;
  if (result.type === 'actor') return `${result.item.group} · ${result.item.summary}`;
  if (result.type === 'volume') return result.item.coverage;
  if (result.type === 'lesson') return result.item.question;
  if (result.type === 'event') return result.item.vernacular;
  if (result.type === 'judgment') return result.item.takeaway;
  if (result.type === 'method') return result.item.principle;
  if (result.type === 'map') return result.item.description;
  return result.item.summary;
}

function lessonForResult(result) {
  if (result.type === 'lesson') return result.item;
  if (result.type === 'event') return getLessonByEventId(result.item.id);
  if (result.type === 'judgment') return getLessonByEventId(result.item.eventIds[0]);
  if (result.type === 'method') return getLessonByMethodId(result.item.id);
  if (result.type === 'map') return lessons.find((lesson) => result.item.lessonIds?.includes(lesson.id));
  if (result.type === 'person') {
    const relatedEvent = events.find((event) => event.peopleIds.includes(result.item.id));
    return relatedEvent ? getLessonByEventId(relatedEvent.id) : null;
  }
  if (result.type === 'theme') {
    const relatedEventIds = events.filter((event) => event.themeIds.includes(result.item.id)).map((event) => event.id);
    return lessons.find((lesson) => lesson.eventIds.some((eventId) => relatedEventIds.includes(eventId)));
  }
  return null;
}

export default function SearchResults({ query, onOpenLesson, onOpenVolume, onOpenPeriod, onClose }) {
  const results = searchTongjian(query).slice(0, 24);

  const openResult = (result) => {
    if (result.type === 'period') onOpenPeriod(result.item.id);
    else if (result.type === 'chapter') onOpenPeriod(result.item.periodId, result.item.id);
    else if (result.type === 'actor') onOpenPeriod(result.item.periodId, result.item.id);
    else if (result.type === 'volume') onOpenVolume(result.item.id);
    else {
      const lesson = lessonForResult(result);
      if (lesson) {
        const anchor = result.type === 'method' ? result.item.id : result.type === 'judgment' ? `judgment-${result.item.id}` : '';
        onOpenLesson(lesson.id, anchor);
      }
    }
    onClose();
  };

  return (
    <div className="page-stack search-page">
      <section className="search-heading">
        <div><span>全局搜索</span><h2>“{query}”</h2><p>找到 {results.length} 条相关内容，所有结果都会回到同一套历史故事中。</p></div>
        <button type="button" onClick={onClose}>关闭</button>
      </section>

      {results.length > 0 ? (
        <div className="search-results">
          {results.map((result) => {
            const Icon = ICONS[result.type] || Search;
            return (
              <button key={`${result.type}-${result.item.id}`} type="button" onClick={() => openResult(result)}>
                <Icon size={19} aria-hidden="true" />
                <span>
                  <em>{TYPE_LABELS[result.type] || result.type}</em>
                  <strong>{resultTitle(result)}</strong>
                  <p>{resultText(result)}</p>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="quiet-empty">没有找到匹配内容。可以试试“三家分晋”“智伯”“才德”或“臣光曰”。</div>
      )}
    </div>
  );
}

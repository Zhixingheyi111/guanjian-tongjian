import { ArrowLeft, Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';

export function BackButton({ children = '返回', onClick }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <ArrowLeft size={18} aria-hidden="true" />
      {children}
    </button>
  );
}

export function IconText({ icon: Icon, children }) {
  return (
    <span className="icon-text">
      <Icon size={15} aria-hidden="true" />
      {children}
    </span>
  );
}

export function Tag({ children, tone = 'neutral' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

export function Section({ title, children, action }) {
  return (
    <section className="section">
      <div className="section__header">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function OpenRow({ title, meta, children, onClick }) {
  return (
    <button type="button" className="open-row" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        {meta && <em>{meta}</em>}
        {children}
      </span>
      <ChevronRight size={18} aria-hidden="true" />
    </button>
  );
}

export function BookmarkButton({ active, onClick }) {
  const Icon = active ? BookmarkCheck : Bookmark;
  return (
    <button type="button" className={active ? 'bookmark-button is-active' : 'bookmark-button'} onClick={onClick}>
      <Icon size={18} aria-hidden="true" />
      {active ? '已收藏' : '收藏'}
    </button>
  );
}

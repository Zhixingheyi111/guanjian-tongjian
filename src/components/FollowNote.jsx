import { NotebookPen, X } from 'lucide-react';
import { useId, useState } from 'react';
import NoteEditor from './NoteEditor';

export default function FollowNote({
  contextKey,
  defaultOpen = false,
  eyebrow = '随读笔记',
  initialValue = '',
  onSave,
  placeholder,
  title,
}) {
  const generatedId = useId();
  const panelId = `follow-note-${generatedId.replaceAll(':', '')}`;
  const [open, setOpen] = useState(defaultOpen);
  const [hasNote, setHasNote] = useState(Boolean(initialValue.trim()));

  const handleSave = (note) => {
    setHasNote(Boolean(note.trim()));
    onSave(note);
  };

  return (
    <>
      <button
        type="button"
        className={open ? 'follow-note__scrim is-visible' : 'follow-note__scrim'}
        aria-label="关闭随读笔记"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
      <aside
        id={panelId}
        className={open ? 'follow-note is-open' : 'follow-note'}
        aria-label={`${title}随读笔记`}
      >
        <header className="follow-note__header">
          <div className="follow-note__mark">
            <NotebookPen size={18} aria-hidden="true" />
          </div>
          <div>
            <span>{eyebrow}</span>
            <strong>{title}</strong>
          </div>
          <button
            type="button"
            className="follow-note__close"
            aria-label="关闭随读笔记"
            onClick={() => setOpen(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <p className="follow-note__intro">看到关键因果、人物选择或自己的疑问，就在这里记下来。</p>
        <NoteEditor
          key={contextKey}
          initialValue={initialValue}
          minHeight={240}
          onSave={handleSave}
          placeholder={placeholder}
        />
        <footer className="follow-note__footer">内容自动保存在这台设备，并汇总到“笔记”。</footer>
      </aside>
      <button
        type="button"
        className={hasNote ? 'follow-note__trigger has-note' : 'follow-note__trigger'}
        aria-controls={panelId}
        aria-expanded={open}
        aria-label="打开随读笔记"
        title="随读笔记"
        onClick={() => setOpen(true)}
      >
        <NotebookPen size={21} aria-hidden="true" />
        {hasNote && <span aria-hidden="true" />}
      </button>
    </>
  );
}

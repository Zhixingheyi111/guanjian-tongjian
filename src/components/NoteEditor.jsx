import { useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 450;
const SAVED_HINT_MS = 1400;

export default function NoteEditor({ initialValue = '', minHeight = 130, onSave, placeholder }) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef(null);
  const hintTimer = useRef(null);
  const pendingValue = useRef(null);
  const onSaveRef = useRef(onSave);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(
    () => () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        if (pendingValue.current != null) onSaveRef.current(pendingValue.current);
      }
      if (hintTimer.current) clearTimeout(hintTimer.current);
    },
    [],
  );

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    pendingValue.current = nextValue;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      onSaveRef.current(nextValue);
      pendingValue.current = null;
      setSaved(true);

      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setSaved(false), SAVED_HINT_MS);
    }, DEBOUNCE_MS);
  };

  const flushSave = () => {
    if (pendingValue.current == null) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    onSaveRef.current(pendingValue.current);
    pendingValue.current = null;
    setSaved(true);

    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setSaved(false), SAVED_HINT_MS);
  };

  return (
    <div className="note-editor">
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={flushSave}
        placeholder={placeholder}
        style={{ minHeight }}
      />
      <div className={`note-editor__status ${saved ? 'is-visible' : ''}`} aria-live="polite">已保存</div>
    </div>
  );
}

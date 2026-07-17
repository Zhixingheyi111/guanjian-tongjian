import { useCallback, useEffect, useState } from 'react';

export function useTextSelection(containerRef) {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    let timer = null;

    const readSelection = () => {
      const selected = window.getSelection();
      if (!selected || selected.isCollapsed) {
        setSelection(null);
        return;
      }

      const text = selected.toString().trim();
      if (!text) {
        setSelection(null);
        return;
      }

      if (containerRef?.current && selected.anchorNode && !containerRef.current.contains(selected.anchorNode)) {
        setSelection(null);
        return;
      }

      try {
        const range = selected.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelection({ text, rect });
      } catch {
        setSelection(null);
      }
    };

    const settle = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(readSelection, 90);
    };

    document.addEventListener('selectionchange', readSelection);
    document.addEventListener('mouseup', settle);
    document.addEventListener('touchend', settle, { passive: true });

    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener('selectionchange', readSelection);
      document.removeEventListener('mouseup', settle);
      document.removeEventListener('touchend', settle);
    };
  }, [containerRef]);

  const clearSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, []);

  return [selection, clearSelection];
}

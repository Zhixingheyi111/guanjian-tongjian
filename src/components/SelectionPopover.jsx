export default function SelectionPopover({ selection, label = '摘录', onSelect }) {
  if (!selection) return null;

  const top = Math.max(selection.rect.top - 12, 10);
  const left = selection.rect.left + selection.rect.width / 2;

  return (
    <div className="selection-popover" style={{ top, left }}>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onSelect(selection.text)}>
        {label}
      </button>
      <span aria-hidden="true" />
    </div>
  );
}

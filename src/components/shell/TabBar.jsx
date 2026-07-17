import { BookOpen, HeartHandshake, MessageSquareText, NotebookPen } from 'lucide-react';

const TABS = [
  { id: 'tongjian', label: '通鉴', icon: BookOpen },
  { id: 'consult', label: '问事', icon: MessageSquareText },
  { id: 'methods', label: '处世', icon: HeartHandshake },
  { id: 'notes', label: '笔记', icon: NotebookPen },
];

export default function TabBar({ currentMode, onModeChange }) {
  return (
    <nav className="tab-bar" aria-label="主导航">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = currentMode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={active ? 'tab-bar__item is-active' : 'tab-bar__item'}
            aria-current={active ? 'page' : undefined}
            onClick={() => onModeChange(tab.id)}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

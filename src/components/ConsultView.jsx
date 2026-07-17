import { MessageSquareText, ShieldCheck } from 'lucide-react';
import ConsultPanel from './ConsultPanel';

export default function ConsultView({ onOpenLesson }) {
  return (
    <div className="page-stack consult-page">
      <section className="page-intro page-intro--consult">
        <div>
          <span>问一件事</span>
          <h2>先把局势看清，再决定怎么说、怎么做</h2>
          <p>这里不替你作决定。它会寻找相似的历史局面，指出相同处与不同处，再给出可以实际执行的话和步骤。</p>
        </div>
        <MessageSquareText size={39} aria-hidden="true" />
      </section>

      <div className="consult-boundary">
        <ShieldCheck size={18} aria-hidden="true" />
        <span>历史只能提供参照。涉及法律、医疗、财务或人身安全的问题，应同时寻求相应专业帮助。</span>
      </div>

      <ConsultPanel onOpenLesson={onOpenLesson} />
    </div>
  );
}

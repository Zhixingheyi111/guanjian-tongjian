import { ArrowRight, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import {
  getLessonByEventId,
  getMethodCategoryById,
  listInterpersonalMethodCategories,
  listInterpersonalMethodsByCategory,
} from '../data/tongjian';

export default function MethodsView({ onOpenLesson }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = listInterpersonalMethodCategories();
  const methods = listInterpersonalMethodsByCategory(activeCategory);
  const category = activeCategory === 'all' ? null : getMethodCategoryById(activeCategory);

  return (
    <div className="page-stack methods-page">
      <section className="page-intro page-intro--methods">
        <div>
          <span>为人处世</span>
          <h2>从现实问题，找到值得反复练的方法</h2>
          <p>处世页只做分类索引。具体步骤仍放在它所来自的历史故事中，避免一条道理被重复讲很多遍。</p>
        </div>
        <HeartHandshake size={39} aria-hidden="true" />
      </section>

      <div className="method-filters" role="tablist" aria-label="处世分类">
        <button type="button" className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')}>全部</button>
        {categories.map((item) => (
          <button key={item.id} type="button" className={activeCategory === item.id ? 'is-active' : ''} onClick={() => setActiveCategory(item.id)}>
            {item.name}
          </button>
        ))}
      </div>

      <div className="method-index-heading">
        <strong>{category?.name || '全部方法'}</strong>
        <span>{category?.summary || '按修身、识人、言语和合作四个方向整理。'}</span>
      </div>

      <div className="method-index-list">
        {methods.map((method) => {
          const sourceLesson = getLessonByEventId(method.sourceEventId);
          const methodCategory = getMethodCategoryById(method.categoryId);
          return (
            <article key={method.id} className="method-index-row">
              <div>
                <span>{methodCategory?.name}</span>
                <h3>{method.title}</h3>
                <p>{method.problem}</p>
                <strong>{method.principle}</strong>
              </div>
              {sourceLesson && (
                <button type="button" onClick={() => onOpenLesson(sourceLesson.id, method.id)}>
                  回到历史中看
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

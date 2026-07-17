import { History, Lightbulb, LoaderCircle, MessageSquareText, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { buildLocalConsultation } from '../data/tongjian/consultation';
import { getLessonByEventId } from '../data/tongjian';

const examples = [
  '同事能力很强，但说话总伤人，我要不要继续合作？',
  '朋友一直找我帮忙，我不知道怎么拒绝才不伤关系。',
  '我想说服别人一起做一件事，但对方只看到自己的损失。',
];

function normalizeAdvice(result) {
  return {
    steps: Array.isArray(result.advice?.steps) ? result.advice.steps : [],
    words: Array.isArray(result.advice?.words) ? result.advice.words : [],
    avoid: Array.isArray(result.advice?.avoid) ? result.advice.avoid : [],
  };
}

export default function ConsultPanel({ onOpenLesson }) {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = problem.trim();
    if (trimmed.length < 6) {
      setError('先写 6 个字以上，让我知道事情的大概。');
      return;
    }

    setLoading(true);
    setError('');

    if (import.meta.env.VITE_STATIC_DEPLOYMENT === 'true') {
      setResult(buildLocalConsultation(trimmed, 'local'));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: trimmed }),
      });
      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json') ? await response.json() : {};
      if (!response.ok) throw new Error(payload.error || '参事接口暂时不可用。');
      setResult(payload);
    } catch (requestError) {
      setResult(buildLocalConsultation(trimmed, 'local'));
      setError(requestError.message || 'AI 暂时不可用，已改用本地历史参照。');
    } finally {
      setLoading(false);
    }
  };

  const advice = result ? normalizeAdvice(result) : null;
  const relatedEvents = result?.context?.relatedEvents || [];

  return (
    <div className="consult-panel">
      <form className="consult-form" onSubmit={handleSubmit}>
        <label htmlFor="consult-problem">把你不知道怎么说、怎么做的事写下来</label>
        <textarea
          id="consult-problem"
          value={problem}
          onChange={(event) => setProblem(event.target.value)}
          placeholder="例如：我想拒绝朋友反复找我帮忙，但又怕伤关系。"
          rows={5}
        />
        <div className="consult-examples" aria-label="示例问题">
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => setProblem(example)}>
              {example}
            </button>
          ))}
        </div>
        <div className="consult-actions">
          <span>先照见局势，再决定话怎么说。</span>
          <button type="submit" disabled={loading}>
            {loading ? <LoaderCircle size={16} aria-hidden="true" /> : <MessageSquareText size={16} aria-hidden="true" />}
            {loading ? '分析中' : '参照历史分析'}
          </button>
        </div>
        {error && <p className="consult-error">{error}</p>}
      </form>

      {result && (
        <article className="consult-result">
          <div className="consult-result__header">
            <span>{result.mode === 'ai' ? 'AI 参事' : '本地参照'}</span>
            <strong>{result.title}</strong>
            <p>{result.summary}</p>
          </div>

          <div className="consult-block">
            <History size={18} aria-hidden="true" />
            <div>
              <strong>历史参照</strong>
              <p>{result.advice?.read}</p>
              {relatedEvents.length > 0 && (
                <div className="consult-event-row">
                  {relatedEvents.map((event) => {
                    const sourceLesson = getLessonByEventId(event.id);
                    return (
                      <button key={event.id} type="button" onClick={() => sourceLesson && onOpenLesson(sourceLesson.id)}>
                        读《{sourceLesson?.title || event.title}》
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {(result.advice?.similarity || result.advice?.difference) && (
            <div className="consult-comparison">
              <div><strong>哪里相似</strong><p>{result.advice?.similarity}</p></div>
              <div><strong>哪里不同</strong><p>{result.advice?.difference}</p></div>
            </div>
          )}

          {advice.steps.length > 0 && (
            <div className="consult-block">
              <Lightbulb size={18} aria-hidden="true" />
              <div>
                <strong>可以怎么做</strong>
                <ol>
                  {advice.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {advice.words.length > 0 && (
            <div className="consult-say">
              <strong>可以这样说</strong>
              {advice.words.map((word) => (
                <p key={word}>{word}</p>
              ))}
            </div>
          )}

          {advice.avoid.length > 0 && (
            <div className="consult-avoid">
              <ShieldAlert size={17} aria-hidden="true" />
              <span>{advice.avoid.join(' ')}</span>
            </div>
          )}

          {result.advice?.reflection && (
            <div className="consult-practice">
              <strong>今天先练：</strong>
              {result.advice.reflection}
            </div>
          )}
        </article>
      )}
    </div>
  );
}

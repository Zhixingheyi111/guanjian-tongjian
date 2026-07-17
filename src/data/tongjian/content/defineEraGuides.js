import { defineVolumeGuide } from './defineVolumeGuide.js';

export function defineEraGuides(common, specs) {
  return specs.map((spec) => {
    const [before, now, after] = spec.arc;
    const methodId = spec.methodId || `method-${spec.id}`;

    return defineVolumeGuide({
      ...common,
      ...spec,
      before,
      now,
      after,
      pointSummary: spec.pointSummary || spec.vernacular,
      turningPoint: spec.turningPoint || spec.lesson,
      outcomes: spec.outcomes || [after, `这段历史留下的判断是：${spec.lesson}`],
      method: {
        id: methodId,
        categoryId: spec.categoryId,
        title: spec.methodTitle,
        problem: spec.question,
        principle: spec.lesson,
        steps: spec.steps || [
          '先把已经发生的事实与自己的推测分开。',
          '说明真正要保护的目标、关系或边界。',
          '选择一项可验证、可复盘的下一步。',
        ],
        avoid: spec.avoid,
        practice: spec.practice,
        keywords: spec.keywords || [],
      },
    });
  });
}

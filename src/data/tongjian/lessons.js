import { spineLessons } from './content/index.js';
import { getChapterActorIds, getLessonStudyPlacement } from './periodStudy.js';

const lessonCatalog = [
  {
    id: 'lesson-jin-collapse',
    order: 1,
    periodId: 'warring-states',
    volumeIds: ['vol-001'],
    title: '晋国为什么会分裂',
    subtitle: '从智伯立瑶到三家分晋',
    rangeLabel: '春秋末年至前403年',
    startYear: -403,
    durationLabel: '约12分钟',
    importance: '战国开篇',
    question: '为什么最强的智氏先灭亡，而周天子的一纸册命又改变了天下规则？',
    summary:
      '这不是三个零散故事，而是一条完整因果链：选错继承人，让能力失去约束；恃强索地，把盟友变成潜在敌人；晋阳倒戈，智氏覆灭；五十年后，周天子又把三家掌权正式合法化。',
    context: {
      before: '晋国公室衰弱，实际权力逐渐落入智、赵、韩、魏等卿大夫家族手中。',
      now: '智氏最强，却在继承、待人和联盟上连续犯错；赵、韩、魏由被支配者变成共同胜利者。',
      after: '前403年，周天子册命魏、赵、韩为诸侯，战国政治格局得到正式确认。',
    },
    eventIds: ['zhi-bo-li-yao', 'jinyang-fan-zhi', 'san-jia-fen-jin'],
    timeline: [
      {
        id: 'choose-zhiyao',
        dateLabel: '春秋末年',
        title: '看见才能，却忽略品格下限',
        summary: '智宣子准备让智瑶继承智氏。智果明确指出：智瑶有五项长处，但“不仁”会让所有长处都变成伤人的工具。',
        turningPoint: '第一个被忽略的警告，决定了后来谁来掌握智氏的巨大力量。',
        passageIds: ['passage-zhiyao-choice'],
        judgmentIds: [],
      },
      {
        id: 'demand-land',
        dateLabel: '晋阳之战前',
        title: '连续得手，让智伯把退让误当服从',
        summary: '智伯向各家索地。韩、魏表面退让，实际都在等待他因骄傲而暴露破绽；赵氏拒绝后，冲突全面爆发。',
        turningPoint: '强者每赢一次，都可能同时增加对手联合的理由。',
        passageIds: ['passage-zhibo-demands-land'],
        judgmentIds: [],
      },
      {
        id: 'siege-jinyang',
        dateLabel: '约前455—前453年',
        title: '晋阳被淹，赵氏为什么没有先垮',
        summary: '赵襄子退守晋阳。城中极端困苦，百姓仍未背叛；围城一方的韩、魏却越来越担心智伯胜利后的下一步。',
        turningPoint: '局势表面上由兵力决定，真正改变胜负的却是内部信任和盟友恐惧。',
        passageIds: ['passage-jinyang-siege'],
        judgmentIds: [],
      },
      {
        id: 'alliance-turns',
        dateLabel: '前453年',
        title: '张孟谈把赵氏的危机变成三家的共同危机',
        summary: '张孟谈潜出晋阳，说服韩、魏倒戈。三家反攻并灭掉智氏，晋国权力格局从此不可逆转。',
        turningPoint: '有效说服不是只讲自己的困难，而是让对方看见他也身在局中。',
        passageIds: ['passage-lips-teeth'],
        judgmentIds: ['judgment-caide'],
      },
      {
        id: 'formal-recognition',
        dateLabel: '前403年',
        title: '五十年后，事实被写成新规则',
        summary: '魏、赵、韩掌权已久，周威烈王正式册命三家为诸侯。《资治通鉴》由此开篇，因为司马光关注的不只是胜负，而是最高权威如何处理既成事实。',
        turningPoint: '从“实际如此”到“正式承认”，改变的是后来所有人理解规则的方式。',
        passageIds: ['passage-three-families-recognized'],
        judgmentIds: ['judgment-mingfen'],
      },
    ],
    outcomes: [
      '智氏因继承、待人和联盟判断的连续失误而覆灭。',
      '韩、赵、魏瓜分智氏，成为晋国真正的权力中心。',
      '周天子的册命使三家分晋获得正式名义，战国秩序由此展开。',
      '司马光用“才德”和“名分”给全书立下两把判断历史的尺。',
    ],
    methodIds: ['method-talent-virtue', 'method-shared-risk', 'method-kindness-with-boundary'],
    mapIds: ['warring-states-260-bce'],
    peopleIds: ['zhi-bo', 'zhao-xiangzi', 'zhang-mengtan', 'han-kangzi', 'wei-huanzi', 'zhou-weilie'],
    placeIds: ['jin', 'jinyang', 'luoyi'],
    sourceUrl:
      'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001',
  },
  ...spineLessons,
];

export const lessons = lessonCatalog.map((lesson) => {
  const placement = getLessonStudyPlacement(lesson);
  return {
    ...lesson,
    ...placement,
    actorIds: getChapterActorIds(placement.chapterId),
  };
});

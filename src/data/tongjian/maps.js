import {
  spineEventIdsByMap,
  spineLessonIdsByMap,
  spineMaps,
} from './content/index.js';

const publicBaseUrl = typeof import.meta.env === 'object' ? import.meta.env.BASE_URL : '/';

export const maps = [
  {
    id: 'warring-states-260-bce',
    title: '战国形势图',
    period: '战国',
    yearLabel: '约前260年',
    validFrom: -280,
    validTo: -240,
    precision: 'context-only',
    imageUrl: `${publicBaseUrl}maps/warring-states-260-bce.jpg`,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:EN-WarringStatesAll260BCE.jpg',
    author: 'Philg88',
    license: 'CC BY-SA 3.0 / GFDL',
    description:
      '此图展示战国中后期主要诸侯国格局。卷001事件发生于前403年前后，边界并不完全对应，因此在 App 中作为格局参考，而非精确年代地图。',
    lessonIds: ['lesson-jin-collapse', ...(spineLessonIdsByMap['warring-states-260-bce'] || [])],
    eventIds: ['san-jia-fen-jin', 'zhi-bo-li-yao', 'jinyang-fan-zhi', ...(spineEventIdsByMap['warring-states-260-bce'] || [])],
    markers: [
      { label: '晋', placeId: 'jin', note: '三家分晋发生的旧晋国空间。' },
      { label: '晋阳', placeId: 'jinyang', note: '赵氏据守并反击智氏的关键城邑。' },
      { label: '洛邑', placeId: 'luoyi', note: '周王室所在，册命三家具有名义意义。' },
    ],
  },
  ...spineMaps,
];

import { spineVolumeMetadata } from './content/index.js';

const DYNASTY_RANGES = [
  { label: '周纪', start: 1, end: 5, startYear: -403, endYear: -256 },
  { label: '秦纪', start: 6, end: 8, startYear: -255, endYear: -207 },
  { label: '汉纪', start: 9, end: 68, startYear: -206, endYear: 220 },
  { label: '魏纪', start: 69, end: 78, startYear: 220, endYear: 264 },
  { label: '晋纪', start: 79, end: 118, startYear: 265, endYear: 419 },
  { label: '宋纪', start: 119, end: 134, startYear: 420, endYear: 478 },
  { label: '齐纪', start: 135, end: 144, startYear: 479, endYear: 501 },
  { label: '梁纪', start: 145, end: 166, startYear: 502, endYear: 557 },
  { label: '陈纪', start: 167, end: 176, startYear: 557, endYear: 589 },
  { label: '隋纪', start: 177, end: 184, startYear: 581, endYear: 618 },
  { label: '唐纪', start: 185, end: 265, startYear: 618, endYear: 907 },
  { label: '后梁纪', start: 266, end: 271, startYear: 907, endYear: 923 },
  { label: '后唐纪', start: 272, end: 279, startYear: 923, endYear: 936 },
  { label: '后晋纪', start: 280, end: 285, startYear: 936, endYear: 946 },
  { label: '后汉纪', start: 286, end: 289, startYear: 947, endYear: 950 },
  { label: '后周纪', start: 290, end: 294, startYear: 951, endYear: 959 },
];

function rangeForVolume(number) {
  return DYNASTY_RANGES.find((range) => number >= range.start && number <= range.end);
}

function padVolume(number) {
  return String(number).padStart(3, '0');
}

const curatedVolumes = {
  1: {
    id: 'vol-001',
    number: 1,
    shortTitle: '周纪一',
    title: '卷001 · 周纪一',
    era: '战国初开',
    dynasty: '周纪',
    startYear: -403,
    endYear: -369,
    coverage: '周威烈王二十三年至周安王二十六年',
    summary:
      '《通鉴》开篇不从战场写起，而从周天子命魏、赵、韩为诸侯写起。司马光借此指出名分、制度与权力秩序一旦自坏，天下之乱便有了入口。',
    sourceUrl:
      'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001',
    status: 'curated',
    lessonIds: ['lesson-jin-collapse'],
    featuredEventIds: ['san-jia-fen-jin', 'zhi-bo-li-yao', 'jinyang-fan-zhi'],
    mapIds: ['warring-states-260-bce'],
  },
  ...Object.fromEntries(spineVolumeMetadata.map((volume) => [volume.number, volume])),
};

export const eras = DYNASTY_RANGES.map((range) => range.label);

export const volumes = Array.from({ length: 294 }, (_, index) => {
  const number = index + 1;
  if (curatedVolumes[number]) return curatedVolumes[number];

  const range = rangeForVolume(number);
  return {
    id: `vol-${padVolume(number)}`,
    number,
    shortTitle: `卷${padVolume(number)}`,
    title: `卷${padVolume(number)} · ${range?.label || '资治通鉴'}`,
    era: range?.label || '待补',
    dynasty: range?.label || '待补',
    startYear: range?.startYear || null,
    endYear: range?.endYear || null,
    coverage: '年代范围尚待逐卷校录',
    summary: '本卷尚未完成史料校录与故事精编。',
    sourceUrl: 'https://zh.wikisource.org/wiki/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91',
    status: 'placeholder',
    lessonIds: [],
    featuredEventIds: [],
    mapIds: [],
  };
});

import { volumeId, volumeSource } from './buildStory.js';
import { zhouStories } from './zhou.js';
import { qinStories } from './qin.js';
import { hanStories } from './han.js';
import { westernHanGuides } from './westernHanGuides.js';
import { xinTransitionGuides } from './xinTransitionGuides.js';
import { easternHanEarlyGuides } from './easternHanEarlyGuides.js';
import { easternHanMiddleGuides } from './easternHanMiddleGuides.js';
import { easternHanFinalGuides } from './easternHanFinalGuides.js';
import { threeKingdomsGuides } from './threeKingdomsGuides.js';
import { jinEarlyGuides } from './jinEarlyGuides.js';
import { jinTransitionGuides } from './jinTransitionGuides.js';
import { jinMiddleGuides } from './jinMiddleGuides.js';
import { jinFinalGuides } from './jinFinalGuides.js';
import { liuSongGuides } from './liuSongGuides.js';
import { southernQiGuides } from './southernQiGuides.js';
import { liangEarlyGuides } from './liangEarlyGuides.js';
import { liangFinalGuides } from './liangFinalGuides.js';
import { chenGuides } from './chenGuides.js';
import { suiGuides } from './suiGuides.js';
import { tangFoundingGuides } from './tangFoundingGuides.js';
import { tangGaozongWuGuides } from './tangGaozongWuGuides.js';
import { tangKaiyuanGuides } from './tangKaiyuanGuides.js';
import { tangAnshiGuides } from './tangAnshiGuides.js';
import { tangDezongGuides } from './tangDezongGuides.js';
import { tangXianzongGuides } from './tangXianzongGuides.js';
import { tangLateGuides } from './tangLateGuides.js';
import { tangFallGuides } from './tangFallGuides.js';
import { fiveDynastiesEarlyGuides } from './fiveDynastiesEarlyGuides.js';
import { fiveDynastiesMiddleGuides } from './fiveDynastiesMiddleGuides.js';
import { fiveDynastiesFinalGuides } from './fiveDynastiesFinalGuides.js';

const unique = (items) => [...new Set(items)];
const padVolume = (number) => String(number).padStart(3, '0');
const publicBaseUrl = typeof import.meta.env === 'object' ? import.meta.env.BASE_URL : '/';
const mapAsset = (filename) => `${publicBaseUrl}maps/${filename}`;

export const spineStories = [
  ...zhouStories,
  ...qinStories,
  ...hanStories,
  ...westernHanGuides,
  ...xinTransitionGuides,
  ...easternHanEarlyGuides,
  ...easternHanMiddleGuides,
  ...easternHanFinalGuides,
  ...threeKingdomsGuides,
  ...jinEarlyGuides,
  ...jinTransitionGuides,
  ...jinMiddleGuides,
  ...jinFinalGuides,
  ...liuSongGuides,
  ...southernQiGuides,
  ...liangEarlyGuides,
  ...liangFinalGuides,
  ...chenGuides,
  ...suiGuides,
  ...tangFoundingGuides,
  ...tangGaozongWuGuides,
  ...tangKaiyuanGuides,
  ...tangAnshiGuides,
  ...tangDezongGuides,
  ...tangXianzongGuides,
  ...tangLateGuides,
  ...tangFallGuides,
  ...fiveDynastiesEarlyGuides,
  ...fiveDynastiesMiddleGuides,
  ...fiveDynastiesFinalGuides,
];
export const spineLessons = spineStories.map((bundle) => bundle.lesson);
export const spineEvents = spineStories.map((bundle) => bundle.event);
export const spineSections = spineStories.map((bundle) => bundle.section);
export const spinePassages = spineStories.flatMap((bundle) => bundle.passages);
export const spineJudgments = spineStories.flatMap((bundle) => bundle.judgments);
export const spineMethods = spineStories.flatMap((bundle) => bundle.methods);

const metadataByNumber = new Map(
  spineStories
    .map((bundle) => bundle.story.volumeMeta)
    .filter(Boolean)
    .map((metadata) => [metadata.number, metadata]),
);

export const spineVolumeMetadata = [...metadataByNumber.values()]
  .sort((a, b) => a.number - b.number)
  .map((metadata) => {
    const id = volumeId(metadata.number);
    const relatedStories = spineStories.filter((bundle) => bundle.story.volumeIds.includes(id));

    return {
      ...metadata,
      id,
      title: `卷${padVolume(metadata.number)} · ${metadata.shortTitle}`,
      sourceUrl: volumeSource(metadata.number),
      status: 'curated',
      lessonIds: unique(relatedStories.map((bundle) => bundle.lesson.id)),
      featuredEventIds: unique(relatedStories.map((bundle) => bundle.event.id)),
      mapIds: unique(relatedStories.flatMap((bundle) => bundle.lesson.mapIds)),
    };
  });

export const spineLessonIdsByPeriod = Object.fromEntries(
  unique(spineLessons.map((lesson) => lesson.periodId)).map((periodId) => [
    periodId,
    spineLessons.filter((lesson) => lesson.periodId === periodId).map((lesson) => lesson.id),
  ]),
);

export const spineLessonIdsByMap = Object.fromEntries(
  unique(spineLessons.flatMap((lesson) => lesson.mapIds)).map((mapId) => [
    mapId,
    spineLessons.filter((lesson) => lesson.mapIds.includes(mapId)).map((lesson) => lesson.id),
  ]),
);

export const spineEventIdsByMap = Object.fromEntries(
  unique(spineEvents.flatMap((event) => event.mapIds)).map((mapId) => [
    mapId,
    spineEvents.filter((event) => event.mapIds.includes(mapId)).map((event) => event.id),
  ]),
);

export const spineMaps = [
  {
    id: 'qin-empire-210-bce',
    title: '秦帝国郡县形势图',
    period: '秦',
    yearLabel: '约前210年',
    validFrom: -221,
    validTo: -207,
    precision: 'context-only',
    imageUrl: mapAsset('qin-empire-210-bce.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Qin_empire_210_BCE.png',
    author: 'Yeu Ninje / Itsmine',
    license: 'CC BY-SA 3.0 / GFDL',
    description: '此图展示秦统一后的郡县与交通格局。统一前的故事借它辨认空间方向，不把边界当作事件当年的精确复原。',
    lessonIds: spineLessonIdsByMap['qin-empire-210-bce'] || [],
    eventIds: spineEventIdsByMap['qin-empire-210-bce'] || [],
    markers: [],
  },
  {
    id: 'han-civilisation-2ce',
    title: '汉帝国与交通网络图',
    period: '汉',
    yearLabel: '约公元2年',
    validFrom: -202,
    validTo: 220,
    precision: 'context-only',
    imageUrl: mapAsset('han-civilisation-2ce.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Han_Civilisation_bright_large.jpg',
    author: 'Yeu Ninje',
    license: 'CC BY-SA 3.0 / GFDL',
    description: '此图以西汉末年的疆域、城市与交通为主。汉代各课用它建立整体空间感，不把它当作每个年份的精确边界。',
    lessonIds: spineLessonIdsByMap['han-civilisation-2ce'] || [],
    eventIds: spineEventIdsByMap['han-civilisation-2ce'] || [],
    markers: [],
  },
  {
    id: 'three-kingdoms-262',
    title: '三国鼎立形势图',
    period: '三国',
    yearLabel: '约262年',
    validFrom: 220,
    validTo: 280,
    precision: 'context-only',
    imageUrl: mapAsset('three-kingdoms-262.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Three_Kingdoms.png',
    author: 'SY（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示约262年的魏、蜀、吴疆域与主要城市。其他年份只借它辨认三国相对位置，不把边界视作逐年精确复原。',
    lessonIds: spineLessonIdsByMap['three-kingdoms-262'] || [],
    eventIds: spineEventIdsByMap['three-kingdoms-262'] || [],
    markers: [],
  },
  {
    id: 'western-jin-280',
    title: '西晋统一形势图',
    period: '西晋',
    yearLabel: '约280年',
    validFrom: 265,
    validTo: 316,
    precision: 'context-only',
    imageUrl: mapAsset('western-jin-280.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Western_Jeun_Dynasty_280_CE.png',
    author: 'Ian Kiu',
    license: 'CC BY-SA 3.0 / GFDL',
    description: '此图展示约280年西晋完成统一后的疆域。后续八王之乱与永嘉之祸只借它辨认西晋核心区域，不把边界视作逐年精确复原。',
    lessonIds: spineLessonIdsByMap['western-jin-280'] || [],
    eventIds: spineEventIdsByMap['western-jin-280'] || [],
    markers: [],
  },
  {
    id: 'eastern-jin-376',
    title: '东晋与前秦形势图',
    period: '东晋十六国',
    yearLabel: '约376年',
    validFrom: 317,
    validTo: 420,
    precision: 'context-only',
    imageUrl: mapAsset('eastern-jin-376.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Eastern_Jin_Dynasty_376_CE.png',
    author: 'Ian Kiu',
    license: 'CC BY 3.0 / GFDL',
    description: '此图展示约376年的东晋与前秦，也是淝水之战前夕的南北格局。其他年份只用来建立十六国时期的空间感。',
    lessonIds: spineLessonIdsByMap['eastern-jin-376'] || [],
    eventIds: spineEventIdsByMap['eastern-jin-376'] || [],
    markers: [],
  },
  {
    id: 'northern-southern-500',
    title: '北魏与南齐对峙图',
    period: '南北朝',
    yearLabel: '约500年',
    validFrom: 420,
    validTo: 534,
    precision: 'context-only',
    imageUrl: mapAsset('northern-southern-500.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Northern_and_Southern_Dynasties_2.png',
    author: 'SS（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示约500年的北魏与南齐格局。刘宋和南齐前期课程借它辨认南北对峙的核心区域，不把边界视作每一事件当年的精确复原。',
    lessonIds: spineLessonIdsByMap['northern-southern-500'] || [],
    eventIds: spineEventIdsByMap['northern-southern-500'] || [],
    markers: [],
  },
  {
    id: 'northern-southern-560',
    title: '梁陈与北齐北周形势图',
    period: '南北朝',
    yearLabel: '约560年',
    validFrom: 535,
    validTo: 589,
    precision: 'context-only',
    imageUrl: mapAsset('northern-southern-560.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Northern_and_Southern_Dynasties_560_CE.png',
    author: 'Ian Kiu',
    license: 'CC BY 3.0 / GFDL',
    description: '此图展示约560年的梁陈、北齐、北周及西梁格局。东西魏分裂和陈朝课程借它建立空间关系，不把边界视作每一事件当年的精确复原。',
    lessonIds: spineLessonIdsByMap['northern-southern-560'] || [],
    eventIds: spineEventIdsByMap['northern-southern-560'] || [],
    markers: [],
  },
  {
    id: 'sui-610',
    title: '隋朝统一与行政区划图',
    period: '隋',
    yearLabel: '约610年',
    validFrom: 581,
    validTo: 618,
    precision: 'context-only',
    imageUrl: mapAsset('sui-610.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sui_Dynasty.png',
    author: 'SY（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示约610年隋朝疆域与行政区划。灭陈、征高句丽和隋末起兵等课程借它辨认统一帝国的核心区域与远征距离，不把边界视作逐年精确复原。',
    lessonIds: spineLessonIdsByMap['sui-610'] || [],
    eventIds: spineEventIdsByMap['sui-610'] || [],
    markers: [],
  },
  {
    id: 'tang-742',
    title: '唐朝疆域与道制图',
    period: '唐',
    yearLabel: '约742年',
    validFrom: 618,
    validTo: 755,
    precision: 'context-only',
    imageUrl: mapAsset('tang-742.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:China,_742.svg',
    author: 'Yug',
    license: 'CC BY-SA 3.0',
    description: '此图展示约742年的唐朝疆域与监察区。唐初统一、贞观和开元课程借它辨认帝国核心、边疆与交通方向，不把盛唐边界视作早期每一事件的精确复原。',
    lessonIds: spineLessonIdsByMap['tang-742'] || [],
    eventIds: spineEventIdsByMap['tang-742'] || [],
    markers: [],
  },
  {
    id: 'five-dynasties-923',
    title: '五代十国形势图',
    period: '五代',
    yearLabel: '约923年',
    validFrom: 907,
    validTo: 959,
    precision: 'context-only',
    imageUrl: mapAsset('five-dynasties-923.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Five_Dynasties_Ten_Kingdoms_923_CE.png',
    author: 'Ian Kiu',
    license: 'CC BY 3.0 / GFDL',
    description: '此图展示约923年的五代十国格局，适合辨认中原王朝、契丹与南方诸国的相对位置。五代各卷借它建立整体空间感，不把923年的边界当作五十三年间逐年不变。',
    lessonIds: spineLessonIdsByMap['five-dynasties-923'] || [],
    eventIds: spineEventIdsByMap['five-dynasties-923'] || [],
    markers: [],
  },
  {
    id: 'tang-fanzhen-820',
    title: '唐后期藩镇分布图',
    period: '唐',
    yearLabel: '约820年',
    validFrom: 756,
    validTo: 869,
    precision: 'context-only',
    imageUrl: mapAsset('tang-fanzhen-820.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tang_Fanzhen_820.png',
    author: 'SY（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示约820年的四十八藩镇。安史之乱后至唐末前期课程借它辨认藩镇、关中与河北的结构关系，不把820年的辖区当作逐年不变。',
    lessonIds: spineLessonIdsByMap['tang-fanzhen-820'] || [],
    eventIds: spineEventIdsByMap['tang-fanzhen-820'] || [],
    markers: [],
  },
  {
    id: 'tang-huang-chao',
    title: '黄巢起义进军路线图',
    period: '晚唐',
    yearLabel: '约875—884年',
    validFrom: 870,
    validTo: 884,
    precision: 'context-only',
    imageUrl: mapAsset('tang-huang-chao.png'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Huang_Chao_Uprising.png',
    author: 'SY（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示黄巢起义的主要转战路线，用于庞勋之后、黄巢攻入长安及唐军收复长安课程建立空间顺序。',
    lessonIds: spineLessonIdsByMap['tang-huang-chao'] || [],
    eventIds: spineEventIdsByMap['tang-huang-chao'] || [],
    markers: [],
  },
  {
    id: 'tang-warlords-902',
    title: '唐末军阀割据形势图',
    period: '晚唐',
    yearLabel: '约902年',
    validFrom: 884,
    validTo: 907,
    precision: 'context-only',
    imageUrl: mapAsset('tang-warlords-902.jpg'),
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:End_of_Tang_Warlords.jpg',
    author: 'SY（Wikimedia Commons 用户 Seasonsinthesun）',
    license: 'CC BY-SA 4.0',
    description: '此图展示唐亡前夕主要军阀的控制区域。朱温、李克用、李茂贞及淮南等课程借它理解唐廷被多方强藩包围的格局。',
    lessonIds: spineLessonIdsByMap['tang-warlords-902'] || [],
    eventIds: spineEventIdsByMap['tang-warlords-902'] || [],
    markers: [],
  },
];

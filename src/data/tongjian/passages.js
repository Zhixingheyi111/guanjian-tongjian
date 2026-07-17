import { spinePassages } from './content/index.js';

const VOLUME_ONE_SOURCE =
  'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001';

export const passages = [
  {
    id: 'passage-zhiyao-choice',
    volumeId: 'vol-001',
    eventId: 'zhi-bo-li-yao',
    title: '智果劝阻立瑶',
    original:
      '智宣子将以瑶为后。智果曰：“不如宵也。瑶之贤于人者五，其不逮者一也。”……“如是而甚不仁。夫以其五贤陵人，而以不仁行之，其谁能待之？若果立瑶也，智宗必灭。”弗听。',
    vernacular:
      '智果认为智瑶有五种过人的才能，却有一个致命缺点：不仁。他担心智瑶会凭借才能凌驾、伤害别人，最终拖垮整个智氏。智宣子没有听。',
    sourceLabel: '《资治通鉴》卷001，周威烈王二十三年回溯',
    sourceUrl: VOLUME_ONE_SOURCE,
  },
  {
    id: 'passage-zhibo-demands-land',
    volumeId: 'vol-001',
    eventId: 'jinyang-fan-zhi',
    title: '索地使强者陷入孤立',
    original:
      '智伯请地于韩康子……又求地于魏桓子……智伯又求蔺、皋狼之地于赵襄子，襄子弗与。智伯怒，帅韩、魏之甲以攻赵氏。',
    vernacular:
      '智伯先后向韩、魏、赵索要土地。韩、魏暂时退让，等他因连续得手而更加骄傲；赵氏拒绝后，智伯便裹挟韩、魏共同攻赵。',
    sourceLabel: '《资治通鉴》卷001，周威烈王二十三年回溯',
    sourceUrl: VOLUME_ONE_SOURCE,
  },
  {
    id: 'passage-jinyang-siege',
    volumeId: 'vol-001',
    eventId: 'jinyang-fan-zhi',
    title: '晋阳被围',
    original:
      '三家以国人围而灌之，城不浸者三版。沈灶产蛙，民无叛意。智伯行水，魏桓子御，韩康子骖乘。智伯曰：“吾乃今知水可以亡人国也。”',
    vernacular:
      '晋阳几乎被水淹没，百姓仍没有背叛赵氏。智伯得意于水攻，却没有意识到同行的韩、魏想到的是：同样的水也能淹没自己的城。',
    sourceLabel: '《资治通鉴》卷001，周威烈王二十三年回溯',
    sourceUrl: VOLUME_ONE_SOURCE,
  },
  {
    id: 'passage-lips-teeth',
    volumeId: 'vol-001',
    eventId: 'jinyang-fan-zhi',
    title: '张孟谈说服韩、魏',
    original:
      '赵襄子使张孟谈潜出见二子，曰：“臣闻唇亡则齿寒。今智伯帅韩、魏而攻赵，赵亡则韩、魏为之次矣。”',
    vernacular:
      '张孟谈没有只求韩、魏救赵，而是指出共同风险：赵氏一亡，下一批被智伯吞并的就是韩、魏。两家于是秘密倒戈。',
    sourceLabel: '《资治通鉴》卷001，周威烈王二十三年回溯',
    sourceUrl: VOLUME_ONE_SOURCE,
  },
  {
    id: 'passage-three-families-recognized',
    volumeId: 'vol-001',
    eventId: 'san-jia-fen-jin',
    title: '天子正式册命三家',
    original: '初命晋大夫魏斯、赵籍、韩虔为诸侯。',
    vernacular:
      '到了前403年，周威烈王正式承认魏、赵、韩为诸侯。三家掌权早已成为事实，这次册命则让事实获得了最高名义的认可。',
    sourceLabel: '《资治通鉴》卷001，周威烈王二十三年（前403年）',
    sourceUrl: VOLUME_ONE_SOURCE,
  },
  ...spinePassages,
];

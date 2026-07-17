import { spineEvents } from './content/index.js';

export const events = [
  {
    id: 'san-jia-fen-jin',
    volumeId: 'vol-001',
    sectionId: 'vol-001-wl-23',
    order: 3,
    title: '三家分晋',
    subtitle: '天子命魏、赵、韩为诸侯',
    dateLabel: '周威烈王二十三年（前403年）',
    importance: '纲领事件',
    sourceUrl: 'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001',
    original:
      '初命晋大夫魏斯、赵籍、韩虔为诸侯。臣光曰：臣闻天子之职莫大于礼，礼莫大于分，分莫大于名。',
    originalNote: '节录。完整司马光评论见本事件“臣光曰”。',
    vernacular:
      '周威烈王正式任命晋国大夫魏斯、赵籍、韩虔为诸侯。司马光认为，问题不只是三家夺权，而是周天子亲手把破坏礼制的事实变成合法秩序。',
    background:
      '春秋末年，晋国公室长期衰弱，权力落入卿大夫手中。魏、赵、韩消灭智氏后，实际控制晋地。周天子的册命，使事实上的分裂获得名义上的承认。',
    explanation:
      '《通鉴》以此开篇，是在提醒读者：政治秩序的崩坏常常不是从刀兵开始，而是从名义和制度被迫承认既成事实开始。',
    impacts: [
      '晋国旧秩序被正式拆分，战国七雄格局逐渐成形。',
      '周王室权威进一步空心化，礼法名分失去约束力。',
      '司马光把“名分”作为全书政治判断的第一把尺。',
    ],
    peopleIds: ['zhou-weilie', 'wei-si', 'zhao-ji', 'han-qian', 'sima-guang'],
    placeIds: ['jin', 'luoyi'],
    themeIds: ['mingfen', 'institution', 'power-transition'],
    judgmentIds: ['judgment-mingfen'],
    excerptIds: ['excerpt-mingfen-opening'],
    mapIds: ['warring-states-260-bce'],
    lessons: [
      {
        id: 'san-jia-lesson-1',
        title: '不要让临时妥协变成永久规则',
        situation: '魏、赵、韩已经掌握晋国实权，周天子面前似乎只有承认现实。',
        choice: '册命三家为诸侯，把现实权力转成合法名分。',
        cost: '短期减少冲突，长期却削弱了最高秩序的可信度。',
        principle: '管理组织时，例外可以有，但例外一旦制度化，就会重新定义边界。',
        practice: '遇到破坏规则的强人或团队，先区分“暂时止损”和“公开背书”。',
      },
      {
        id: 'san-jia-lesson-2',
        title: '名义不是虚的，它决定后来者怎么学',
        situation: '三家夺取晋权本是事实，天子册命使事实获得道义包装。',
        choice: '以合法称号覆盖非法过程。',
        cost: '后来者会学习结果，而不是过程中的警告。',
        principle: '组织的奖惩信号比口头价值观更诚实。',
        practice: '晋升、授权、分配利益时，让过程和结果同样经得住复盘。',
      },
      {
        id: 'san-jia-lesson-3',
        title: '最高负责人不能只做橡皮图章',
        situation: '周王室弱，但仍保有象征性的裁决权。',
        choice: '把裁决权用于确认强者要求，而非维护制度底线。',
        cost: '名义权威彻底失去自我解释能力。',
        principle: '位置越高，越不能把“没办法”当作全部理由。',
        practice: '即使资源不足，也要保留可解释、可执行、可重复的最低原则。',
      },
    ],
  },
  {
    id: 'zhi-bo-li-yao',
    volumeId: 'vol-001',
    sectionId: 'vol-001-wl-23',
    order: 1,
    title: '智伯立瑶',
    subtitle: '才胜德，终成祸根',
    dateLabel: '春秋末年（卷001回溯）',
    importance: '识人用人',
    sourceUrl: 'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001',
    original:
      '智宣子将以瑶为后。智果曰：“不如宵也。瑶之贤于人者五，其不逮者一也。”',
    originalNote: '节录。此段为智果劝智宣子慎立继承人。',
    vernacular:
      '智宣子想立智瑶为继承人。智果指出智瑶能力、才艺、果决都过人，但最大的问题是“不仁”。',
    background:
      '智氏在晋国诸卿中势力强大。智瑶才力出众，却骄矜少恩，不能与人长期共处。智果看见了这一点，但智宣子没有采纳。',
    explanation:
      '司马光后来以“才胜德”概括智伯之亡。才能能把人推上高位，但德性决定他能不能在高位上不伤人、不坏事。',
    impacts: [
      '智氏继承人选择埋下失败伏笔。',
      '“才德之辨”成为《通鉴》最重要的用人标准之一。',
      '强势继承若缺少制衡，组织会把个人缺陷放大成集体风险。',
    ],
    peopleIds: ['zhi-xuanzi', 'zhi-bo', 'zhi-guo', 'sima-guang'],
    placeIds: ['jin'],
    themeIds: ['character', 'talent-virtue', 'succession'],
    judgmentIds: ['judgment-caide'],
    excerptIds: ['excerpt-caide'],
    mapIds: ['warring-states-260-bce'],
    lessons: [
      {
        id: 'zhi-bo-lesson-1',
        title: '选人不能只看“能打”',
        situation: '智瑶有仪表、武艺、才艺、文辞、决断五项优势。',
        choice: '忽略“不仁”这个根本缺陷，仍把权力交给他。',
        cost: '能力越强，伤害半径越大。',
        principle: '关键岗位要看能力上限，更要看品格下限。',
        practice: '提拔前问一句：这个人得势以后，会不会更能成事，也更能容人？',
      },
    ],
  },
  {
    id: 'jinyang-fan-zhi',
    volumeId: 'vol-001',
    sectionId: 'vol-001-wl-23',
    order: 2,
    title: '晋阳反智氏',
    subtitle: '联盟从压迫中反转',
    dateLabel: '约前455—前453年',
    importance: '联盟与反噬',
    sourceUrl: 'https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001',
    original:
      '智伯围晋阳，决水灌之。赵襄子使张孟谈潜出，见韩、魏之君曰：“臣闻唇亡则齿寒。”',
    originalNote: '节录。此段写赵氏在危局中离间韩、魏，最终反击智氏。',
    vernacular:
      '智伯联合韩、魏围攻赵氏晋阳，并引水灌城。赵襄子派张孟谈出城游说韩、魏：赵亡以后，下一个受害者就是你们。',
    background:
      '智伯以强势压迫各家割地，又联合韩、魏攻赵。韩、魏表面从命，心中恐惧。晋阳危急时，张孟谈抓住他们的共同风险，说服两家倒戈。',
    explanation:
      '智伯失败不是因为没有盟友，而是因为盟友只因恐惧而聚拢。恐惧能暂时驱使人，却不能形成稳定信任。',
    impacts: [
      '智氏被灭，晋国权力重新洗牌。',
      '魏、赵、韩三家得以并立，最终走向三家分晋。',
      '“唇亡齿寒”成为联盟政治中共同安全的经典表达。',
    ],
    peopleIds: ['zhi-bo', 'zhao-xiangzi', 'zhang-mengtan', 'han-kangzi', 'wei-huanzi'],
    placeIds: ['jinyang', 'jin'],
    themeIds: ['alliance', 'coercion', 'crisis'],
    judgmentIds: ['judgment-caide'],
    excerptIds: ['excerpt-lips-teeth'],
    mapIds: ['warring-states-260-bce'],
    lessons: [
      {
        id: 'jinyang-lesson-1',
        title: '靠压迫形成的同盟，危机中最容易反咬',
        situation: '韩、魏随智伯攻赵，但他们同样害怕智伯坐大。',
        choice: '张孟谈不谈道义，直接指出共同风险。',
        cost: '智伯失去外援，强势围城反变成孤立自己。',
        principle: '合作关系的基础不能只有威胁，还要有可共享的未来。',
        practice: '带团队或谈合作时，少用压服，多让对方看见共同安全和共同收益。',
      },
    ],
  },
  ...spineEvents,
];

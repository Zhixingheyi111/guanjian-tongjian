export const historicalSources = [
  { id: 'source-tongjian', title: '《资治通鉴》', kind: '编年史', url: 'https://zh.wikisource.org/wiki/资治通鑑' },
  { id: 'source-shiji', title: '《史记》', kind: '正史', url: 'https://zh.wikisource.org/wiki/史記' },
  { id: 'source-hanshu', title: '《汉书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/漢書' },
  { id: 'source-houhanshu', title: '《后汉书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/後漢書' },
  { id: 'source-sanguozhi', title: '《三国志》', kind: '正史', url: 'https://zh.wikisource.org/wiki/三國志' },
  { id: 'source-jinshu', title: '《晋书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/晉書' },
  { id: 'source-songshu', title: '《宋书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/宋書' },
  { id: 'source-weishu', title: '《魏书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/魏書' },
  { id: 'source-liangshu', title: '《梁书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/梁書' },
  { id: 'source-chenshu', title: '《陈书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/陳書' },
  { id: 'source-zhoushu', title: '《周书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/周書' },
  { id: 'source-suishu', title: '《隋书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/隋書' },
  { id: 'source-jiutangshu', title: '《旧唐书》', kind: '正史', url: 'https://zh.wikisource.org/wiki/舊唐書' },
  { id: 'source-jiuwudaishi', title: '《旧五代史》', kind: '正史', url: 'https://zh.wikisource.org/wiki/舊五代史' },
];

const section = (id, title, summary, whyItMatters, sourceIds) => ({ id, title, summary, whyItMatters, sourceIds });
const contradiction = (id, title, sides, explanation, result, sourceIds) => ({ id, title, sides, explanation, result, sourceIds });
const actor = (id, name, kind, group, role, summary) => ({ id, name, kind, group, role, summary });
const relation = (id, fromId, toId, type, label) => ({ id, fromId, toId, type, label });
const chapter = (id, periodId, order, title, rangeLabel, startYear, endYear, summary, turningPoint, result, actorIds, coreLessonIds, mapId) => ({
  id, periodId, order, title, rangeLabel, startYear, endYear, summary, turningPoint, result, actorIds, coreLessonIds, mapId,
});
const check = (id, periodId, prompt, options, answerIndex, explanation) => ({ id, periodId, prompt, options, answerIndex, explanation });

const warringActors = [
  actor('actor-warring-zhou', '周王室', 'institution', '名义秩序', '天下共主', '仍保留册命诸侯的名义，却已无力控制各国。'),
  actor('actor-warring-qin', '秦国', 'polity', '变法国', '西方强国', '以变法重组军功、土地和行政，逐步取得兼并优势。'),
  actor('actor-warring-six', '东方六国', 'polity', '竞争诸侯', '秦的主要对手', '既要抵抗秦，也彼此争地，难以维持长期联合。'),
  actor('actor-warring-shangyang', '商鞅', 'person', '变法国', '秦国变法者', '用县制、军功与严法提高秦国动员能力。'),
  actor('actor-warring-zongheng', '纵横家', 'group', '游士', '外交说客', '在合纵与连横之间重新组合国家关系。'),
  actor('actor-warring-shi', '士与客卿', 'group', '游士', '跨国人才', '凭学问、谋略和军功流动于诸国，改变用人边界。'),
  actor('actor-warring-people', '编户齐民', 'group', '社会基础', '纳税与服役者', '国家直接掌握户籍、土地与兵役后，普通人更深地进入国家机器。'),
];

const warringChapters = [
  chapter('warring-old-order', 'warring-states', 1, '三家分晋：旧秩序失效', '前403—前370年', -403, -370, '周天子承认韩、赵、魏为诸侯，说明卿大夫取代旧诸侯已经成为事实。', '名义权威选择承认既成事实，战国由此成为新的政治现实。', '诸侯国不再只靠血缘名分，而要靠组织和实力生存。', ['actor-warring-zhou', 'actor-warring-six', 'actor-warring-shi'], ['lesson-jin-collapse'], 'warring-states-260-bce'),
  chapter('warring-reforms', 'warring-states', 2, '变法竞争：国家开始直接动员社会', '前369—前334年', -369, -334, '魏、楚、秦等国先后整顿法令、军功、赋税与地方行政。', '商鞅变法把信用与严厉执行结合起来，使秦的制度能够连续运转。', '变法把国家做强，也让战争规模和百姓负担同步扩大。', ['actor-warring-qin', 'actor-warring-shangyang', 'actor-warring-people'], ['lesson-shangyang-trust'], 'warring-states-260-bce'),
  chapter('warring-alliances', 'warring-states', 3, '合纵连横：没有永久盟友', '前333—前284年', -333, -284, '诸国在秦的压力下反复联合又反复拆散，外交成为战争之外的第二战场。', '联盟既受共同威胁推动，也被眼前利益和互不信任不断瓦解。', '秦逐渐能够分别施压，东方国家更难形成稳定制衡。', ['actor-warring-qin', 'actor-warring-six', 'actor-warring-zongheng'], ['lesson-zhangyi-deceives-chu', 'lesson-yan-recruits-leyi'], 'warring-states-260-bce'),
  chapter('warring-unification', 'warring-states', 4, '兼并加速：统一前夜', '前283—前221年', -283, -221, '长平以后，各国国力差距进一步扩大，秦从争强走向逐国吞并。', '人才、情报、后勤和君主决断共同决定最后数十年的胜负。', '六国灭亡，周秦之间的多国竞争转为统一帝国。', ['actor-warring-qin', 'actor-warring-six', 'actor-warring-shi', 'actor-warring-people'], ['lesson-changping-replacement', 'lesson-lisi-stops-expulsion', 'lesson-jingke-assassination'], 'warring-states-260-bce'),
];

const qinActors = [
  actor('actor-qin-emperor', '秦始皇与皇帝制度', 'institution', '中央', '最高权力', '以皇帝、郡县和统一法令把天下纳入同一政治结构。'),
  actor('actor-qin-bureaucracy', '秦廷官僚', 'group', '中央', '执行系统', '能高效贯彻命令，却越来越不敢向上报告坏消息。'),
  actor('actor-qin-people', '徭役与戍卒', 'group', '社会基础', '帝国负担者', '承担工程、边防、运输和刑罚，是秦末反抗的社会基础。'),
  actor('actor-qin-xiangyu', '项羽与楚军', 'person', '反秦诸侯', '军事强权', '以巨鹿之战摧毁秦军主力，却难以把胜利转成稳定秩序。'),
  actor('actor-qin-liubang', '刘邦集团', 'person', '汉集团', '竞争者', '善于吸收人才、调整承诺，并把地方支持转化为长期统治。'),
  actor('actor-qin-hanxin', '韩信与汉军将领', 'person', '汉集团', '军事组织者', '用战役和分进合击改变楚汉力量对比。'),
  actor('actor-qin-local', '六国旧势力与地方豪杰', 'group', '地方', '反秦动员者', '借复国名义和地方网络迅速填补秦廷失去的控制。'),
];

const qinChapters = [
  chapter('qin-unification', 'qin-chu-han', 1, '秦完成统一', '前221—前210年', -221, -210, '文字、度量衡、道路与行政趋于统一，皇帝制度确立。', '统一提高了国家能力，却没有建立足够可靠的纠错与继承机制。', '始皇去世后，强大的执行系统迅速被宫廷信息控制利用。', ['actor-qin-emperor', 'actor-qin-bureaucracy', 'actor-qin-people'], ['lesson-qin-unity-and-silence'], 'qin-empire-210-bce'),
  chapter('qin-collapse', 'qin-chu-han', 2, '秦政失控', '前209—前207年', -209, -207, '戍卒起事、地方响应，秦廷仍以严刑和虚假报告理解危机。', '越不允许坏消息出现，中央越无法区分局部动乱与系统崩溃。', '秦军主力覆灭，帝国在极短时间内瓦解。', ['actor-qin-bureaucracy', 'actor-qin-people', 'actor-qin-local', 'actor-qin-xiangyu'], ['lesson-qin-collapse'], 'qin-empire-210-bce'),
  chapter('qin-rebels', 'qin-chu-han', 3, '群雄反秦与重新分封', '前206年', -206, -206, '反秦联盟进入关中后，立刻面对谁来分配土地与名号的问题。', '刘邦克制军纪、保存秦法可用部分，项羽则以军功重新分封天下。', '短暂分封无法解决利益冲突，楚汉战争随即爆发。', ['actor-qin-xiangyu', 'actor-qin-liubang', 'actor-qin-local'], ['lesson-liubang-enters-guan'], 'qin-empire-210-bce'),
  chapter('qin-chuhan-war', 'qin-chu-han', 4, '楚汉相争', '前205—前203年', -205, -203, '项羽拥有战场优势，刘邦则依靠关中、联盟和多路将领持续恢复。', '胜负从单次决战转向后勤、用人、联盟和多战场配合。', '韩信等人切断项羽外援，力量对比逐步逆转。', ['actor-qin-xiangyu', 'actor-qin-liubang', 'actor-qin-hanxin'], ['lesson-hanxin-backwater'], 'han-civilisation-2ce'),
  chapter('qin-han-settlement', 'qin-chu-han', 5, '汉初定局', '前202年', -202, -202, '刘邦联合诸侯击败项羽，重新建立统一王朝。', '刘邦的优势不只是宽厚，而是能让不同人才在同一目标下发挥。', '汉继承秦的统一结构，同时调整统治强度和政治联盟。', ['actor-qin-liubang', 'actor-qin-hanxin', 'actor-qin-local'], ['lesson-liubang-wins-chuhan'], 'han-civilisation-2ce'),
];

const westernHanActors = [
  actor('actor-whan-emperor', '皇帝与中枢', 'institution', '中央', '决策中心', '在丞相、内朝和外戚之间不断调整最高权力的运作方式。'),
  actor('actor-whan-princes', '诸侯王', 'group', '宗室', '地方封国', '汉初拥有较大土地与军政权，七国之乱后逐步被削弱。'),
  actor('actor-whan-officials', '官僚与士人', 'group', '中央', '治理者', '经察举进入政治，在法律、财政和谏诤中承担帝国日常运行。'),
  actor('actor-whan-wudi', '汉武帝集团', 'person', '中央', '扩张者', '强化中央、北击匈奴、拓展郡县，同时显著增加财政与社会负担。'),
  actor('actor-whan-xiongnu', '匈奴', 'polity', '边疆', '北方强敌', '既与汉战争，也通过和亲、互市和内部竞争改变边疆格局。'),
  actor('actor-whan-outer', '外戚家族', 'group', '宫廷', '皇权近亲', '因幼主、后妃和宫廷信任进入中枢，晚期逐步压过常规官僚。'),
  actor('actor-whan-people', '农民、商人与豪强', 'group', '社会基础', '税役与资源提供者', '休养时恢复生产，扩张和土地兼并时则承担更高成本。'),
];

const westernHanChapters = [
  chapter('whan-founding', 'western-han', 1, '高祖、诸吕与功臣秩序', '前202—前180年', -202, -180, '汉廷在异姓诸侯、功臣、宗室和吕氏之间寻找稳定。', '开国联盟能打天下，却必须转化成可继承的政治秩序。', '吕氏被清除，宗室与功臣共同拥立文帝。', ['actor-whan-emperor', 'actor-whan-princes', 'actor-whan-outer'], ['lesson-jibu-stops-retaliation', 'lesson-chenping-endures-lv'], 'han-civilisation-2ce'),
  chapter('whan-wenjing', 'western-han', 2, '文景休养与诸侯问题', '前179—前141年', -179, -141, '轻徭薄赋恢复国力，诸侯王势力却成为中央长期隐患。', '治理强度降低不等于放弃权威，关键是逐步修复社会并处理结构风险。', '七国之乱后，诸侯王的实际军政空间收缩。', ['actor-whan-emperor', 'actor-whan-princes', 'actor-whan-people'], ['lesson-wen-emperor-restraint', 'lesson-seven-states-rebellion'], 'han-civilisation-2ce'),
  chapter('whan-wudi', 'western-han', 3, '武帝重塑帝国', '前140—前87年', -140, -87, '中央集权、财政改革、察举与对外战争同时推进。', '帝国能力达到高点，但持续扩张也透支人口、马匹和财政。', '武帝晚年转向休息，与民更始成为新的政策信号。', ['actor-whan-wudi', 'actor-whan-xiongnu', 'actor-whan-officials', 'actor-whan-people'], ['lesson-zhufuyan-pushes-grace', 'lesson-wudi-mobei', 'lesson-wudi-turns-back'], 'han-civilisation-2ce'),
  chapter('whan-zhaoxuan', 'western-han', 4, '昭宣调整与边疆转变', '前86—前49年', -86, -49, '霍光辅政、宣帝整顿吏治，匈奴内部变化也降低北方压力。', '强势辅政既能稳定幼主，也会留下权力如何退出的问题。', '西汉恢复秩序，边疆由全面战争转向分化与归附。', ['actor-whan-emperor', 'actor-whan-officials', 'actor-whan-xiongnu', 'actor-whan-outer'], ['lesson-suwu-keeps-boundary', 'lesson-huoguang-dismisses-liuhe', 'lesson-huhanye-chooses-survival'], 'han-civilisation-2ce'),
  chapter('whan-decline', 'western-han', 5, '元成以后：宫廷与社会失衡', '前48—8年', -48, 8, '土地兼并、财政困难和宫廷近亲权力逐渐叠加。', '皇帝越依赖私密信任处理公共事务，制度越难纠正宠幸与外戚扩张。', '王莽以道德声望和临时授权逐步取得最高权力。', ['actor-whan-emperor', 'actor-whan-officials', 'actor-whan-outer', 'actor-whan-people'], ['lesson-yuan-emperor-abandons-zhuyai', 'lesson-zhangyu-withholds-truth', 'lesson-wangmang-temporary-power'], 'han-civilisation-2ce'),
];

const easternHanActors = [
  actor('actor-ehan-wangmang', '王莽与新朝官僚', 'person', '新朝', '改制者', '试图以古制重整土地、货币和身份，却频繁改令并失去执行信用。'),
  actor('actor-ehan-guangwu', '光武帝集团', 'person', '东汉中央', '重建者', '依靠地方豪强和旧汉名义重新统一，治理更重恢复与协调。'),
  actor('actor-ehan-gentry', '地方豪强与士族', 'group', '地方', '社会组织者', '拥有土地、宗族和地方影响，是东汉重建的支点也是中央的长期限制。'),
  actor('actor-ehan-outer', '外戚', 'group', '宫廷', '幼主辅政者', '凭皇后家族和辅政身份控制朝政，常与成年皇帝发生权力冲突。'),
  actor('actor-ehan-eunuchs', '宦官', 'group', '宫廷', '皇帝近侍', '帮助皇帝摆脱外戚后又形成新的封闭权力网络。'),
  actor('actor-ehan-scholars', '士人与太学生', 'group', '官僚社会', '公共评价者', '以名节和清议约束政治，党锢后大量被排除出体制。'),
  actor('actor-ehan-regional', '地方军阀', 'group', '地方军队', '汉末竞争者', '在镇压起义和地方自保中拥有军队，最终取代中央。'),
  actor('actor-ehan-people', '农民与流民', 'group', '社会基础', '税役承担者', '灾荒、兼并和行政失效使大量人口离开常规秩序。'),
];

const easternHanChapters = [
  chapter('ehan-xin', 'xin-eastern-han', 1, '王莽改制与新朝崩溃', '9—22年', 9, 22, '土地、货币和官名反复更改，政策目标与现实执行脱节。', '改革越频繁，市场和百姓越难形成稳定预期。', '灾荒与起义叠加，新朝失去地方控制。', ['actor-ehan-wangmang', 'actor-ehan-gentry', 'actor-ehan-people'], ['lesson-wangmang-currency-churn', 'lesson-wangmang-bans-causal-truth'], 'han-civilisation-2ce'),
  chapter('ehan-restoration', 'xin-eastern-han', 2, '光武重建', '23—57年', 23, 57, '刘秀在多方割据中逐步建立联盟、恢复行政和减轻社会压力。', '重建秩序依赖信用、安置降者和与地方力量合作。', '天下重新统一，洛阳成为东汉政治中心。', ['actor-ehan-guangwu', 'actor-ehan-gentry', 'actor-ehan-people'], ['lesson-guangwu-restores-trust', 'lesson-mayuan-rice-map'], 'han-civilisation-2ce'),
  chapter('ehan-stable', 'xin-eastern-han', 3, '明章治理与边疆经营', '58—105年', 58, 105, '中央相对稳定，西域、羌胡与地方治理成为重要议题。', '帝国在边疆不仅靠军队，也依赖信息、互信和长期代理人。', '东汉恢复影响力，但宫廷继承逐渐进入幼主周期。', ['actor-ehan-guangwu', 'actor-ehan-gentry', 'actor-ehan-outer'], ['lesson-banchao-shanshan', 'lesson-dengxun-protects-families'], 'han-civilisation-2ce'),
  chapter('ehan-court', 'xin-eastern-han', 4, '外戚与宦官循环', '106—159年', 106, 159, '幼主需要外戚辅政，成年皇帝又借宦官夺回权力。', '每次清除旧集团都强化新的私人网络，常规官僚更难进入决策。', '梁冀覆灭后，宦官集团迅速取得封侯与权力。', ['actor-ehan-outer', 'actor-ehan-eunuchs', 'actor-ehan-scholars'], ['lesson-yangzhen-four-knows', 'lesson-ligu-duqiao-resist-liangji'], 'han-civilisation-2ce'),
  chapter('ehan-proscription', 'xin-eastern-han', 5, '党锢、黄巾与中央失灵', '160—188年', 160, 188, '士人清议与宦官冲突，灾荒和基层失序扩大。', '朝廷把批评者当敌人后，失去了最有组织的自我修复力量。', '黄巾起义迫使地方自行募兵，军权开始外移。', ['actor-ehan-eunuchs', 'actor-ehan-scholars', 'actor-ehan-people', 'actor-ehan-regional'], ['lesson-party-proscription', 'lesson-luzhi-refuses-bribe'], 'han-civilisation-2ce'),
  chapter('ehan-warlords', 'xin-eastern-han', 6, '军阀竞争与汉亡', '189—220年', 189, 220, '董卓入京后，皇帝成为不同军事集团争夺的政治资源。', '联盟、后勤、用人和地方治理决定军阀能否从战争走向国家。', '曹氏控制北方，孙刘形成南方力量，汉朝名义最终结束。', ['actor-ehan-regional', 'actor-ehan-gentry', 'actor-ehan-people'], ['lesson-hejin-calls-dongzhuo', 'lesson-guandu-choice', 'lesson-red-cliffs-alliance', 'lesson-guan-yu-loses-jingzhou'], 'han-civilisation-2ce'),
];

const threeActors = [
  actor('actor-three-wei', '曹魏', 'polity', '北方', '最大政权', '掌握人口与中原资源，后期权力逐步转入司马氏。'),
  actor('actor-three-shu', '蜀汉', 'polity', '西南', '汉室继承者', '以益州为基础，依靠诸葛亮等人维持组织与北伐。'),
  actor('actor-three-wu', '孙吴', 'polity', '江东', '长江下游政权', '依靠江东士族、水军和长江防线长期立国。'),
  actor('actor-three-sima', '司马氏', 'group', '曹魏中枢', '权臣家族', '从军事与辅政进入最高权力，最终取代曹魏。'),
  actor('actor-three-commanders', '将领与地方集团', 'group', '军政系统', '政权支柱', '忠诚既受名义约束，也取决于资源、任用和继承安排。'),
  actor('actor-three-gentry', '地方士族', 'group', '社会基础', '行政与地方网络', '为政权提供人才与地方秩序，也影响权力分配。'),
];

const threeChapters = [
  chapter('three-formation', 'three-kingdoms', 1, '鼎立形成', '220—229年', 220, 229, '汉魏禅代、蜀汉建立、孙权称帝，三方名义与疆域逐步固定。', '每个政权都要把个人联盟转成可继承的国家结构。', '魏、蜀、吴进入长期对峙。', ['actor-three-wei', 'actor-three-shu', 'actor-three-wu', 'actor-three-commanders'], ['lesson-sunquan-trusts-zhugejin', 'lesson-liubei-entrusts-liushan', 'lesson-masu-fails-at-jieting'], 'three-kingdoms-262'),
  chapter('three-long-war', 'three-kingdoms', 2, '国力与组织的长期竞争', '230—245年', 230, 245, '北伐、防守与边疆作战反复进行，单场胜负难以改变整体差距。', '能否控制节奏、承受损耗并持续用人，比激将和冒险更重要。', '魏保持总体优势，三方都面临继承与内部协调。', ['actor-three-wei', 'actor-three-shu', 'actor-three-wu', 'actor-three-commanders'], ['lesson-simayi-refuses-provocation', 'lesson-yangfu-remonstrates', 'lesson-liufang-sunzi-shape-regency'], 'three-kingdoms-262'),
  chapter('three-sima', 'three-kingdoms', 3, '司马氏控制魏国', '246—261年', 246, 261, '高平陵政变后，曹魏皇帝逐步失去实际权力。', '辅政者掌握军队与任免后，名义君主很难只凭一次行动夺回权力。', '司马氏完成对魏国中枢的控制。', ['actor-three-wei', 'actor-three-sima', 'actor-three-gentry'], ['lesson-caoshuang-surrenders-leverage', 'lesson-feiyi-trusts-newcomers', 'lesson-caomao-attacks-simazhao'], 'three-kingdoms-262'),
  chapter('three-end', 'three-kingdoms', 4, '三国终局', '262—280年', 262, 280, '蜀汉先亡，司马氏代魏建晋，随后灭吴。', '长期战争的终点由人口、组织和内部稳定共同决定。', '西晋重新统一，但三国留下的军政结构问题并未消失。', ['actor-three-sima', 'actor-three-shu', 'actor-three-wu', 'actor-three-gentry'], ['lesson-qiaozhou-argues-for-surrender'], 'three-kingdoms-262'),
];

const jinActors = [
  actor('actor-jin-imperial', '司马氏皇族', 'group', '中央与宗室', '皇权与诸王', '为防权臣而大封宗室，却让诸王拥有介入中央的军政资源。'),
  actor('actor-jin-princes', '地方诸王与军镇', 'group', '宗室军队', '内战力量', '在继承危机中相互征伐，消耗西晋核心。'),
  actor('actor-jin-gentry', '门阀士族', 'group', '东晋朝廷', '政治合作伙伴', '依靠家族声望和地方网络与皇权共治。'),
  actor('actor-jin-northern', '北方诸政权', 'polity', '北方', '竞争者', '由不同族群和军事集团建立，彼此竞争并不断重组。'),
  actor('actor-jin-frontier', '流民与北府军', 'group', '南方军队', '军事基础', '南渡人口和职业军队成为东晋防守、北伐与政变的重要力量。'),
  actor('actor-jin-fuqin', '前秦', 'polity', '北方', '短暂统一者', '苻坚与王猛一度统一北方，淝水失败后迅速分裂。'),
  actor('actor-jin-liuyu', '刘裕集团', 'person', '北府军', '东晋终结者', '凭军功恢复东晋、北伐并最终取代司马氏。'),
];

const jinChapters = [
  chapter('jin-unity', 'two-jin', 1, '西晋统一与内部失衡', '265—289年', 265, 289, '西晋灭吴统一，却以宗室分封、奢侈政治和复杂继承积累风险。', '为防外姓权臣而扩大宗室军权，反而让继承争议能够升级为战争。', '统一没有转成稳固制度，中央在下一代迅速失序。', ['actor-jin-imperial', 'actor-jin-princes', 'actor-jin-gentry'], ['lesson-simayan-empowers-princes', 'lesson-liuyi-compares-emperor-to-huanling'], 'western-jin-280'),
  chapter('jin-collapse', 'two-jin', 2, '八王之乱与永嘉南渡', '290—316年', 290, 316, '皇后、宗室和军镇轮番控制中央，北方社会与边防同时崩解。', '内部战争摧毁了共同权威，也给地方军事集团提供扩张空间。', '洛阳、长安相继陷落，大量人口南迁。', ['actor-jin-imperial', 'actor-jin-princes', 'actor-jin-northern'], ['lesson-jiahou-forges-prince-letter', 'lesson-wangyan-denies-responsibility', 'lesson-zuti-crosses-river'], 'western-jin-280'),
  chapter('jin-east', 'two-jin', 3, '东晋立足与门阀共治', '317—342年', 317, 342, '司马睿在江南建立东晋，王氏等门阀与南北士族共同维持政权。', '皇权、士族和军队彼此需要，也彼此防范。', '东晋守住江南，但王敦、苏峻等内乱暴露权力平衡的脆弱。', ['actor-jin-imperial', 'actor-jin-gentry', 'actor-jin-frontier'], ['lesson-yuliang-ignores-sujun-warnings', 'lesson-taokan-hands-over-cleanly'], 'eastern-jin-376'),
  chapter('jin-northern', 'two-jin', 4, '北方重组与东晋北伐', '343—375年', 343, 375, '北方政权反复兴亡，前秦逐渐统一；东晋权臣也以北伐积累声望。', '战争既为恢复故土，也成为内部权力竞争的工具。', '王猛辅佐前秦统一北方，并留下不要急于攻晋的警告。', ['actor-jin-gentry', 'actor-jin-northern', 'actor-jin-fuqin', 'actor-jin-frontier'], ['lesson-fujian-backs-wangmeng', 'lesson-wangmeng-last-warning'], 'eastern-jin-376'),
  chapter('jin-feishui', 'two-jin', 5, '淝水与北方再分裂', '376—386年', 376, 386, '苻坚以统一北方后的巨大资源南征东晋。', '数量优势无法弥补内部联盟脆弱、指挥失真和过度自信。', '前秦瓦解，东晋延续，北方重新进入多政权竞争。', ['actor-jin-fuqin', 'actor-jin-frontier', 'actor-jin-northern'], ['lesson-fujian-ignores-invasion-warnings', 'lesson-xiean-receives-feishui-news', 'lesson-fujian-falls-after-victories'], 'eastern-jin-376'),
  chapter('jin-liuyu', 'two-jin', 6, '军头政治与刘裕终晋', '387—420年', 387, 420, '孙恩之乱、桓玄篡位和北府将领竞争，使军权成为决定皇位的力量。', '反复倒戈会耗尽信任，稳定军队与行政的人最终取得最高权力。', '刘裕代晋建宋，南朝开始。', ['actor-jin-frontier', 'actor-jin-gentry', 'actor-jin-liuyu'], ['lesson-liulaozhi-loses-all-trust', 'lesson-liuyu-plans-jingkou-uprising', 'lesson-liuyizhen-loses-changan'], 'eastern-jin-376'),
];

const northSouthActors = [
  actor('actor-ns-south', '南朝皇权', 'institution', '南方', '宋齐梁陈', '依托江南财政和士族官僚，却反复受宗室内斗与将领夺权影响。'),
  actor('actor-ns-northwei', '北魏皇权', 'polity', '北方', '北方统一者', '由拓跋氏建立，通过制度调整与迁都治理更广大的农业区域。'),
  actor('actor-ns-gentry', '南北士族与官僚', 'group', '社会精英', '行政与文化网络', '在政权更替中维持地方治理，也影响选官和资源分配。'),
  actor('actor-ns-garrisons', '军镇与边防集团', 'group', '北方军队', '军事基础', '长期承担边防，待遇与政治地位下降后引发六镇起义。'),
  actor('actor-ns-gaoyu', '高欢与宇文泰集团', 'group', '北方两强', '东西政权奠基者', '分别控制东魏、西魏，形成北齐、北周竞争。'),
  actor('actor-ns-houjing', '侯景集团', 'person', '跨境军阀', '梁朝破坏者', '利用北方分裂和梁朝内部松弛发动叛乱。'),
  actor('actor-ns-chen', '陈霸先与陈朝', 'group', '南方军队', '梁后重建者', '平定侯景余波后建立陈朝，在有限资源中维持江南。'),
  actor('actor-ns-sui', '杨坚与隋集团', 'person', '北方统一', '终结分裂者', '继承北周军政资源，灭陈完成统一。'),
];

const northSouthChapters = [
  chapter('ns-liusong', 'north-south', 1, '刘宋：军功立国与宗室相残', '420—478年', 420, 478, '刘裕以军功代晋，后继皇帝却不断以猜疑处理宗室与名将。', '皇权越试图消除所有潜在威胁，越容易摧毁自己的军事与政治支持。', '萧道成掌权，刘宋灭亡。', ['actor-ns-south', 'actor-ns-gentry', 'actor-ns-northwei'], ['lesson-liuyu-hints-at-abdication', 'lesson-wen-emperor-kills-tandaoji'], 'northern-southern-500'),
  chapter('ns-qi', 'north-south', 2, '南齐与北魏迁都', '479—502年', 479, 502, '南齐频繁废立，北魏孝文帝则推动迁洛与制度文化调整。', '改革可以提高整合能力，但隐瞒真实目的和急速改变也会制造反弹。', '南齐被梁取代，北魏进入洛阳时代。', ['actor-ns-south', 'actor-ns-northwei', 'actor-ns-gentry'], ['lesson-lianshi-proposes-equal-fields', 'lesson-xiaowen-forces-luoyang-choice'], 'northern-southern-500'),
  chapter('ns-liang-wei', 'north-south', 3, '梁前期与北魏结构裂缝', '503—523年', 503, 523, '梁朝一度稳定，北魏表面强盛，军镇与中央之间的不平衡却不断扩大。', '财政工程、官僚程序与边防待遇都在检验国家能否看见真实成本。', '北魏六镇危机即将爆发，南北格局进入转折。', ['actor-ns-south', 'actor-ns-northwei', 'actor-ns-garrisons'], ['lesson-fushan-dam-ignores-total-cost'], 'northern-southern-500'),
  chapter('ns-split-wei', 'north-south', 4, '六镇起义与北魏分裂', '524—546年', 524, 546, '边镇起义、河阴之变和军阀竞争使北魏分为东魏、西魏。', '被长期忽视的军镇一旦掌握武力，中央再做形式改革已难恢复信任。', '高欢、宇文泰分别建立新的军政体系。', ['actor-ns-northwei', 'actor-ns-garrisons', 'actor-ns-gaoyu'], ['lesson-northern-wei-reforms-too-late', 'lesson-gaohuan-blocks-retreat-at-hanling', 'lesson-yuwentai-sees-angry-army'], 'northern-southern-500'),
  chapter('ns-houjing', 'north-south', 5, '侯景之乱与梁朝崩溃', '547—557年', 547, 557, '梁朝接纳侯景后未能控制风险，台城和地方力量迅速崩解。', '边防判断、信息过滤和地方军队协调的连续失败，使小规模叛军不断扩大。', '梁朝名存实亡，陈霸先在江南建立新政权。', ['actor-ns-south', 'actor-ns-houjing', 'actor-ns-chen'], ['lesson-liang-accepts-houjing', 'lesson-houjing-grows-from-thousand-to-realm', 'lesson-chenbaxian-supplies-coalition'], 'northern-southern-560'),
  chapter('ns-qi-zhou-chen', 'north-south', 6, '北齐、北周与陈', '558—579年', 558, 579, '北方两国竞争，陈朝守住江南；北齐因内部猜疑自毁名将。', '长期竞争最后不仅比兵力，也比继承、用人和统治纪律。', '北周灭北齐统一北方，却因武帝早逝再遇继承问题。', ['actor-ns-gaoyu', 'actor-ns-chen', 'actor-ns-gentry'], ['lesson-northern-qi-kills-huluguang', 'lesson-zhou-succession-destroys-wudi-work'], 'northern-southern-560'),
  chapter('ns-sui', 'north-south', 7, '隋统一前夜', '580—589年', 580, 589, '杨坚控制北周中枢、建立隋朝，并处理突厥与南陈。', '统一来自北方制度和军力积累，也依赖分化敌人、稳定内部和选择时机。', '隋灭陈，持续近三百年的南北分裂结束。', ['actor-ns-sui', 'actor-ns-chen', 'actor-ns-gaoyu'], ['lesson-zhangsunsheng-maps-turkic-divisions', 'lesson-chen-court-suppresses-river-defense'], 'northern-southern-560'),
];

const suiActors = [
  actor('actor-sui-emperor', '隋文帝与中央官僚', 'person', '中央', '统一与制度建设者', '整顿财政、户籍和行政，建立较强的中央动员能力。'),
  actor('actor-sui-prince', '皇太子与宫廷集团', 'group', '宫廷', '继承竞争者', '杨勇、杨广及支持者围绕储位展开信息和形象竞争。'),
  actor('actor-sui-yangdi', '隋炀帝集团', 'person', '中央', '工程与远征推动者', '以强大国力推动运河、营建和战争，却压缩社会恢复空间。'),
  actor('actor-sui-officials', '关陇官僚与将领', 'group', '军政精英', '国家执行者', '帮助统一，也在继承、远征和隋末起兵中决定力量归属。'),
  actor('actor-sui-people', '农民、役夫与戍卒', 'group', '社会基础', '国家负担者', '同时承担工程、运输、兵役与粮食征发。'),
  actor('actor-sui-rebels', '地方起义与割据者', 'group', '地方', '隋末竞争者', '由逃役者、地方豪杰和军队组成，在中央失控后迅速扩大。'),
  actor('actor-sui-tang', '李渊与唐集团', 'person', '关陇集团', '新王朝建立者', '利用既有官僚军队与地方联盟进入长安。'),
];

const suiChapters = [
  chapter('sui-unity', 'sui', 1, '统一南北与开皇治理', '581—599年', 581, 599, '隋继承北周制度并灭陈，重新整合户籍、财政和地方行政。', '军事统一之后仍需让新地区相信新规则，而非只依靠胜利者。', '国家人口与财政恢复，为大规模工程提供基础。', ['actor-sui-emperor', 'actor-sui-officials', 'actor-sui-people'], ['lesson-sui-unification-without-local-trust', 'lesson-gao-jiong-honest-words-create-enmity'], 'sui-610'),
  chapter('sui-succession', 'sui', 2, '宫廷继承与权力转移', '600—607年', 600, 607, '太子废立、文帝去世和杨广即位都伴随信息控制。', '当继承主要靠私下证明忠诚，公开制度就容易被宫廷执行者改写。', '炀帝控制中央，开始更主动地使用国家能力。', ['actor-sui-prince', 'actor-sui-yangdi', 'actor-sui-officials'], ['lesson-yangsu-builds-case-against-prince-yong', 'lesson-yangguang-controls-deathbed-information'], 'sui-610'),
  chapter('sui-overreach', 'sui', 3, '工程、远征与民力透支', '608—615年', 608, 615, '运河、东都与高句丽战争在短期内集中消耗人力物力。', '强大执行力若缺少停止机制，会把每次失败都变成更大投入的理由。', '逃役、兵变和起义扩大，中央命令逐渐离开现实。', ['actor-sui-yangdi', 'actor-sui-officials', 'actor-sui-people', 'actor-sui-rebels'], ['lesson-sui-command-needs-approval-for-every-move', 'lesson-yangxuangan-chooses-visible-target'], 'sui-610'),
  chapter('sui-collapse', 'sui', 4, '隋末崩溃与唐兴', '616—618年', 616, 618, '各地武装并起，李渊从太原进入关中。', '新力量能否约束军队、保存行政和吸收投降者，决定谁能接管帝国。', '隋亡，唐朝建立，但全国统一仍需继续完成。', ['actor-sui-rebels', 'actor-sui-tang', 'actor-sui-people'], ['lesson-liyuan-wins-surrenders-with-restraint', 'lesson-liyuan-sets-rules-after-taking-changan'], 'sui-610'),
];

const tangActors = [
  actor('actor-tang-emperor', '唐皇帝与中枢官僚', 'institution', '中央', '最高决策系统', '在三省六部、宰相和近侍之间不断调整决策与执行。'),
  actor('actor-tang-aristocracy', '关陇集团与士族', 'group', '政治精英', '早期统治基础', '提供开国人才和婚姻网络，随后科举与新官僚逐步扩大来源。'),
  actor('actor-tang-frontier', '边将与节度使', 'group', '地方军队', '边疆与地方权力', '早期承担边防，安史以后部分藩镇拥有长期军政财政权。'),
  actor('actor-tang-eunuchs', '宦官与神策军', 'group', '宫廷军队', '皇帝近卫', '安史以后掌握禁军和宫廷出入，能够影响继承与宰相。'),
  actor('actor-tang-tax', '财政使职与盐铁系统', 'institution', '财政网络', '帝国供给者', '户籍崩坏后，两税、盐税和转运成为维持中央的关键。'),
  actor('actor-tang-neighbors', '突厥、吐蕃、回鹘与南诏', 'polity', '边疆', '外部力量', '既是战争对手，也可能是盟友和贸易伙伴。'),
  actor('actor-tang-people', '农民、商人、军户与流民', 'group', '社会基础', '税役与市场参与者', '盛世扩张、战争破坏和税制变化都最终落实到他们的生活。'),
  actor('actor-tang-warlords', '晚唐军阀', 'group', '地方军队', '王朝终结者', '在平乱与自保中扩大地盘，最终把皇帝置于多方控制之下。'),
];

const tangChapters = [
  chapter('tang-founding', 'tang', 1, '创业、统一与贞观', '618—649年', 618, 649, '唐从关中出发平定各地，并在太宗时期建立开放谏诤与稳定行政。', '开国战争结束后，能否重用旧敌、兑现命令和克制扩张决定治理质量。', '唐完成统一，形成较有弹性的中央与边疆秩序。', ['actor-tang-emperor', 'actor-tang-aristocracy', 'actor-tang-neighbors'], ['lesson-taizong-uses-former-enemy-weizheng', 'lesson-weizheng-blocks-underage-conscription'], 'tang-742'),
  chapter('tang-gaowu', 'tang', 2, '高宗、武周与继承重组', '650—705年', 650, 705, '宫廷、外戚、官僚和告密政治围绕皇位与用人持续重组。', '个人能力可以突破旧边界，但封闭信息与酷吏也会制造普遍恐惧。', '武后还政于李氏，唐朝恢复名号。', ['actor-tang-emperor', 'actor-tang-aristocracy', 'actor-tang-eunuchs'], ['lesson-gaozong-replaces-empress-wang', 'lesson-di-renjie-argues-for-luling-prince'], 'tang-742'),
  chapter('tang-kaiyuan', 'tang', 3, '开元盛世与结构隐患', '706—755年', 706, 755, '玄宗消除多重宫廷权力，早期整顿行政，后期决策逐渐被少数近臣过滤。', '盛世中的边防扩张和封闭汇报，使风险在看似稳定时集中。', '安禄山起兵，帝国进入决定性转折。', ['actor-tang-emperor', 'actor-tang-frontier', 'actor-tang-aristocracy', 'actor-tang-neighbors'], ['lesson-xuanzong-breaks-dual-power', 'lesson-li-linfu-replaces-open-remonstrance'], 'tang-742'),
  chapter('tang-anshi', 'tang', 4, '安史之乱与帝国转型', '756—779年', 756, 779, '两京陷落、地方军队扩张，唐依靠将领、盟友与财政重建勉强延续。', '危机中信息、统一指挥与军纪往往比名义兵力更关键。', '中央收复核心地区，却无法恢复战前的户籍、军制和地方控制。', ['actor-tang-emperor', 'actor-tang-frontier', 'actor-tang-eunuchs', 'actor-tang-neighbors', 'actor-tang-people'], ['lesson-frontline-truth-is-executed-at-tong-pass', 'lesson-nine-commanders-without-one-commander', 'lesson-guo-ziyi-meets-uighurs-unarmed'], 'tang-fanzhen-820'),
  chapter('tang-fanzhen', 'tang', 5, '藩镇、财政与德宗困局', '780—805年', 780, 805, '两税法重建财政，河北战争、泾原兵变又暴露中央兑现与分配能力不足。', '中央既需要地方军队，又担心其独立，奖惩失当会把合作者重新推向对立。', '唐廷保住长安和中央名义，但更依赖财政使职与禁军。', ['actor-tang-frontier', 'actor-tang-tax', 'actor-tang-eunuchs', 'actor-tang-people'], ['lesson-yang-yan-rebuilds-tax-basis', 'lesson-jingyuan-mutiny-after-empty-promises'], 'tang-fanzhen-820'),
  chapter('tang-xianzong', 'tang', 6, '削藩、中兴与宦官权力', '806—846年', 806, 846, '宪宗一度削平强藩，继承与禁军权力却更深地进入宦官网络。', '军事成功若没有同步建立继承和监督机制，成果容易在下一轮权力交接中流失。', '甘露之变失败，外廷难以夺回禁军与宫廷控制。', ['actor-tang-emperor', 'actor-tang-frontier', 'actor-tang-eunuchs', 'actor-tang-tax'], ['lesson-li-su-turns-defectors-into-local-knowledge', 'lesson-ganlu-plot-ignores-abort-signals'], 'tang-fanzhen-820'),
  chapter('tang-fall', 'tang', 7, '晚唐起义、军阀与唐亡', '847—907年', 847, 907, '财政压力、换防失信和地方治理失败引发大规模起义，平乱者又成长为新军阀。', '朝廷无法裁断强者冲突后，政治从规则竞争退回武力竞争。', '朱温控制并废除唐廷，五代开始。', ['actor-tang-frontier', 'actor-tang-warlords', 'actor-tang-eunuchs', 'actor-tang-people'], ['lesson-tong-pass-defended-by-paper-strength', 'lesson-zhu-wen-kills-emperor-then-purges-court'], 'tang-warlords-902'),
];

const fiveActors = [
  actor('actor-five-central', '中原五代皇权', 'institution', '中原', '短命王朝', '皇位高度依赖军队拥立，后梁、后唐、后晋、后汉、后周相继更替。'),
  actor('actor-five-armies', '牙军与节度使', 'group', '军人集团', '政权制造者', '既保卫政权，也能因赏罚、猜疑和继承转而拥立新主。'),
  actor('actor-five-khitan', '契丹', 'polity', '北方', '强邻与干预者', '通过援助石敬瑭、控制燕云和南下中原影响五代格局。'),
  actor('actor-five-south', '南方诸国', 'polity', '南方', '并立政权', '在中原更替时维持区域秩序，与北方王朝战争、贸易并存。'),
  actor('actor-five-zhuangzong', '后唐庄宗集团', 'person', '后唐', '军事征服者', '善战灭梁，却未能把战功联盟转成稳定治理。'),
  actor('actor-five-shi', '石敬瑭与后晋', 'person', '后晋', '借外力建国者', '以称臣和燕云条件换取契丹支持，留下长期边防问题。'),
  actor('actor-five-guowei', '郭威与后周', 'person', '后周', '秩序重建者', '减少苛政、整顿财政，为周世宗改革奠定基础。'),
  actor('actor-five-shizong', '周世宗', 'person', '后周', '统一准备者', '整军、理财并推进南北战争，接近结束中原长期失序。'),
];

const fiveChapters = [
  chapter('five-liang-tang', 'five-dynasties', 1, '梁晋竞争与后唐兴起', '907—923年', 907, 923, '朱温建立后梁，李克用、李存勖集团长期竞争并最终灭梁。', '战场优势需要军纪、联盟与内部信任才能转成政权。', '后唐建立并取得中原。', ['actor-five-central', 'actor-five-armies', 'actor-five-zhuangzong'], ['lesson-li-cunxu-settles-old-grudge-before-saving-luzhou', 'lesson-guo-chongtao-rejects-defensive-peace'], 'five-dynasties-923'),
  chapter('five-later-tang', 'five-dynasties', 2, '后唐胜利后的失序', '924—936年', 924, 936, '庄宗赏罚失衡、功臣互疑，明宗以后继承与强藩问题继续累积。', '会打天下不等于会把不同功臣纳入可预期的秩序。', '石敬瑭借契丹力量推翻后唐。', ['actor-five-central', 'actor-five-armies', 'actor-five-zhuangzong', 'actor-five-shi'], ['lesson-zhuangzong-rewards-performers-before-veterans', 'lesson-rumor-chain-kills-guo-chongtao', 'lesson-shi-jingtang-buys-survival-with-sixteen-prefectures'], 'five-dynasties-923'),
  chapter('five-jin-khitan', 'five-dynasties', 3, '后晋与契丹关系', '937—946年', 937, 946, '后晋依靠契丹建立，又试图摆脱臣属关系。', '缺少实力与联盟支撑的强硬姿态，会把边界谈判升级成生存战争。', '后晋主力投降，契丹进入开封。', ['actor-five-central', 'actor-five-armies', 'actor-five-khitan', 'actor-five-shi'], ['lesson-jing-yanguang-turns-boundary-into-provocation'], 'five-dynasties-923'),
  chapter('five-khitan-han', 'five-dynasties', 4, '契丹南下与后汉短命', '947—950年', 947, 950, '契丹占领中原却因掠夺失去地方支持，后汉随后建立又以猜杀逼反郭威。', '军事占领若不能约束执行者、恢复日常秩序，胜利会迅速失去社会基础。', '郭威推翻后汉，建立后周。', ['actor-five-central', 'actor-five-armies', 'actor-five-khitan', 'actor-five-guowei'], ['lesson-khitan-conquest-destroys-its-own-control', 'lesson-later-han-emperor-kills-his-guardians'], 'five-dynasties-923'),
  chapter('five-zhou', 'five-dynasties', 5, '后周改革与统一准备', '951—959年', 951, 959, '郭威、周世宗减轻苛政、整军理财并向南北推进。', '长期领导能力不只看能否取胜，还看胜利后能否守信、节制并修复秩序。', '五代的统一条件趋于成熟，北宋即将在此基础上继续完成统一。', ['actor-five-guowei', 'actor-five-shizong', 'actor-five-armies', 'actor-five-south'], ['lesson-guo-wei-ends-collective-punishment', 'lesson-guo-wei-gives-state-farms-to-tenants', 'lesson-zhou-shizong-melts-images-to-restore-currency', 'lesson-sima-guang-compares-zhuangzong-and-shizong'], 'five-dynasties-923'),
];

const guideDefinitions = [
  {
    id: 'warring-states', title: '战国争雄', rangeLabel: '前403—前221年', thesis: '旧名分失去约束后，各国用变法、人才、外交和战争重新争夺秩序。',
    entry: '周王室衰落，晋国内部卿大夫已掌握实际权力；前403年册命三家成为《通鉴》的开篇。',
    exit: '秦吞并六国，把多国竞争变成皇帝统治下的统一帝国。',
    spatial: '政治重心从周王畿扩展到关中、河北、中原、齐鲁、荆楚等多个竞争中心；地理纵深和粮道决定国家能否承受长期战争。',
    mapIds: ['warring-states-260-bce'], actors: warringActors, chapters: warringChapters, sourceIds: ['source-tongjian', 'source-shiji'],
    society: [
      section('warring-power', '权力制度', '分封名义仍在，郡县、官僚和君主集权迅速发展。', '战争要求命令能直接抵达县、军队和户籍。', ['source-tongjian', 'source-shiji']),
      section('warring-land', '土地与财政', '国家更直接登记人口和土地，以赋税、粮食和军功支撑战争。', '兼并战争背后首先是长期供给能力。', ['source-tongjian']),
      section('warring-army', '军事结构', '贵族车战逐步让位于步兵、骑兵、弩兵和大规模动员。', '组织变化使战争规模扩大，也提高普通人的服役负担。', ['source-tongjian']),
      section('warring-life', '社会流动', '士、说客、将领和客卿跨国流动，出身不再完全决定政治机会。', '人才流动让弱国可能变强，也让君主更依赖识人与用人。', ['source-shiji']),
    ],
    contradictions: [
      contradiction('warring-name-power', '旧名分与新实力', ['周王室与旧贵族', '新诸侯与强卿'], '名义秩序无法阻止实际权力转移。', '周天子逐步承认既成事实，最终退出政治中心。', ['source-tongjian']),
      contradiction('warring-reform-cost', '国家能力与百姓负担', ['变法国君', '编户齐民'], '更强的行政和军队也意味着更严密的税役。', '强国胜出，但统一后的治理强度成为秦政问题。', ['source-tongjian']),
      contradiction('warring-alliance', '共同威胁与彼此猜疑', ['东方六国', '秦国'], '六国需要联合抗秦，却又不断争夺眼前利益。', '联盟反复瓦解，秦得以逐国击破。', ['source-shiji']),
    ],
    relationships: [
      relation('rel-warring-1', 'actor-warring-zhou', 'actor-warring-six', 'legitimizes', '册命，但无法控制'),
      relation('rel-warring-2', 'actor-warring-qin', 'actor-warring-six', 'conflicts', '兼并与制衡'),
      relation('rel-warring-3', 'actor-warring-shangyang', 'actor-warring-qin', 'builds', '以变法重组国家'),
      relation('rel-warring-4', 'actor-warring-zongheng', 'actor-warring-six', 'influences', '组织或拆散联盟'),
      relation('rel-warring-5', 'actor-warring-people', 'actor-warring-qin', 'supports', '以税役支撑扩张'),
      relation('rel-warring-6', 'actor-warring-shi', 'actor-warring-six', 'serves', '跨国提供人才'),
    ],
    checks: [
      check('check-warring-1', 'warring-states', '《通鉴》为什么从三家分晋写起？', ['因为这是秦第一次获胜', '因为实际权力被最高名义权威正式承认', '因为周王室重新统一天下'], 1, '司马光关注名分怎样处理既成事实，册命意味着旧秩序正式让位。'),
      check('check-warring-2', 'warring-states', '战国变法最直接提高了什么？', ['国家动员人口、土地和军队的能力', '周天子的实际军力', '诸侯间的永久信任'], 0, '变法把户籍、土地、军功和地方行政更直接地纳入国家。'),
      check('check-warring-3', 'warring-states', '六国合纵为什么难以长期维持？', ['六国没有军队', '共同威胁与彼此利益冲突同时存在', '秦拒绝使用外交'], 1, '共同抗秦不足以消除六国之间的旧怨与短期利益。'),
      check('check-warring-4', 'warring-states', '秦最终优势最不应只归因于哪一项？', ['一次战役', '制度、人才和供给的长期积累', '对手联盟失效'], 0, '统一是长期组织优势的结果，不是某一场战役单独决定。'),
    ],
    glossary: ['分封', '郡县', '军功爵', '合纵', '连横', '客卿'],
  },
  {
    id: 'qin-chu-han', title: '秦与楚汉', rangeLabel: '前221—前202年', thesis: '秦证明天下可以统一，秦亡与楚汉又重新回答统一之后靠什么让人服从。',
    entry: '秦兼并六国，第一次把皇帝、郡县和统一法令覆盖到广阔天下。',
    exit: '刘邦击败项羽，汉继承统一结构并降低早期治理强度。',
    spatial: '关中提供稳定后方，关东与楚地提供人口和反秦网络；谁能控制粮道、河流与多战场协同，谁才有持续作战能力。',
    mapIds: ['qin-empire-210-bce', 'han-civilisation-2ce'], actors: qinActors, chapters: qinChapters, sourceIds: ['source-tongjian', 'source-shiji', 'source-hanshu'],
    society: [
      section('qin-power', '权力制度', '皇帝通过郡县官僚直接任免地方，命令高度集中。', '集中能提高执行速度，也会放大最高层的信息错误。', ['source-shiji']),
      section('qin-tax', '工程与税役', '道路、宫殿、陵墓、边防和运输同时调用大量人力。', '统一带来的公共工程若超过社会承受能力，会迅速消耗支持。', ['source-shiji']),
      section('qin-army', '军事结构', '秦军依靠郡县征发，反秦力量则从戍卒、旧贵族和地方豪杰发展。', '中央军主力一旦失去，地方几乎没有自治缓冲。', ['source-tongjian']),
      section('qin-life', '社会与法律', '统一法律深入日常生活，严密连坐和处罚使官民都倾向隐瞒问题。', '高压能制造表面安静，却不等于真正稳定。', ['source-shiji', 'source-hanshu']),
    ],
    contradictions: [
      contradiction('qin-unity-burden', '统一效率与治理负担', ['秦廷', '地方社会'], '中央要求快速一致，地方却需要恢复和适应。', '急政与失真叠加，地方反抗迅速扩散。', ['source-shiji']),
      contradiction('qin-information', '严刑与真实信息', ['最高权力', '官僚执行者'], '坏消息会惩罚报告者，官员因此只上报安全答案。', '秦二世直到危机极深仍无法掌握真实局势。', ['source-tongjian']),
      contradiction('qin-chuhan-order', '战场威望与长期秩序', ['项羽集团', '刘邦集团'], '项羽以军事威望分封，刘邦以关中、人才与承诺建立联盟。', '刘邦的组织与调整能力最终胜过项羽的个人战力。', ['source-shiji', 'source-hanshu']),
    ],
    relationships: [
      relation('rel-qin-1', 'actor-qin-emperor', 'actor-qin-bureaucracy', 'commands', '集中发令'),
      relation('rel-qin-2', 'actor-qin-bureaucracy', 'actor-qin-people', 'controls', '征发与执法'),
      relation('rel-qin-3', 'actor-qin-local', 'actor-qin-emperor', 'rebels', '以复国和自保反抗'),
      relation('rel-qin-4', 'actor-qin-xiangyu', 'actor-qin-liubang', 'conflicts', '争夺天下'),
      relation('rel-qin-5', 'actor-qin-hanxin', 'actor-qin-liubang', 'serves', '扩展汉军战场'),
      relation('rel-qin-6', 'actor-qin-liubang', 'actor-qin-local', 'allies', '吸收诸侯与人才'),
    ],
    checks: [
      check('check-qin-1', 'qin-chu-han', '秦的集中制度为什么会放大最高层错误？', ['地方可以自行纠正', '所有执行者都依赖同一命令和信息链', '秦没有道路'], 1, '高度统一的执行网络在命令正确时高效，在信息被控制时也会一致地做错。'),
      check('check-qin-2', 'qin-chu-han', '秦末“表面无事”主要来自什么？', ['问题已经解决', '坏消息难以上达', '地方都支持二世'], 1, '严刑使报告者更愿意隐藏危机。'),
      check('check-qin-3', 'qin-chu-han', '刘邦相对项羽最重要的长期优势是什么？', ['个人武力更强', '能够组织人才、后方和联盟', '从未失败'], 1, '楚汉胜负来自持续组织，不是个人勇武比较。'),
      check('check-qin-4', 'qin-chu-han', '汉朝继承秦的是什么？', ['完全相同的统治强度', '统一国家与郡县官僚框架', '六国旧王全部复位'], 1, '汉保留统一结构，但逐步调整政策强度与政治联盟。'),
    ],
    glossary: ['皇帝', '郡县', '徭役', '连坐', '关中', '分封'],
  },
  {
    id: 'western-han', title: '西汉', rangeLabel: '前202—8年', thesis: '西汉把秦留下的统一机器从恢复、扩张带到成熟，也让帝国长期运行中的财政、土地和宫廷问题逐步显现。',
    entry: '楚汉战争结束，汉廷必须安置功臣、诸侯和百姓，同时恢复生产。', exit: '王莽以外戚和道德声望取得权力，西汉皇统中断。',
    spatial: '关中仍是政治核心，郡国遍布内地；对匈奴战争、西域交通和南方郡县把帝国资源拉向更远边疆。',
    mapIds: ['han-civilisation-2ce'], actors: westernHanActors, chapters: westernHanChapters, sourceIds: ['source-tongjian', 'source-hanshu'],
    society: [
      section('whan-power', '皇权与官僚', '丞相、御史、内朝近臣和地方郡国共同运转帝国。', '制度成熟后，权力仍会因皇帝年龄与信任方式改变。', ['source-hanshu']),
      section('whan-land', '土地与财政', '农业税役是基础，盐铁、均输等政策在扩张期补充财政。', '财政工具可以支持大战略，也可能挤压民间恢复。', ['source-hanshu']),
      section('whan-army', '边疆与军队', '郡国兵、中央军与边郡屯戍共同承担防卫和远征。', '对匈奴长期战争改变财政、人口与边疆关系。', ['source-tongjian']),
      section('whan-life', '选官与社会', '察举、经学和地方评价扩大士人进入官僚的路径，豪强土地也逐渐增长。', '国家需要地方精英治理，却难完全限制其兼并和家族势力。', ['source-hanshu']),
    ],
    contradictions: [
      contradiction('whan-center-princes', '中央与诸侯王', ['皇帝中枢', '宗室封国'], '汉初分封稳定联盟，也保留了地方军事权。', '七国之乱后中央持续削弱封国实权。', ['source-hanshu']),
      contradiction('whan-expansion-rest', '扩张与休养', ['帝国战略', '社会承受力'], '边疆安全与威望需要资源，农业社会又需要时间恢复。', '武帝晚年转向休息，成为重要政策修正。', ['source-tongjian']),
      contradiction('whan-public-private', '公共制度与宫廷亲信', ['常规官僚', '外戚与宠臣'], '皇帝倾向通过亲近者处理敏感事务。', '晚期公共权力越来越受私人关系影响。', ['source-hanshu']),
    ],
    relationships: [
      relation('rel-whan-1', 'actor-whan-emperor', 'actor-whan-princes', 'controls', '分封后逐步削权'),
      relation('rel-whan-2', 'actor-whan-officials', 'actor-whan-emperor', 'advises', '治理与谏诤'),
      relation('rel-whan-3', 'actor-whan-wudi', 'actor-whan-xiongnu', 'conflicts', '战争与分化'),
      relation('rel-whan-4', 'actor-whan-people', 'actor-whan-wudi', 'supports', '承担扩张成本'),
      relation('rel-whan-5', 'actor-whan-outer', 'actor-whan-emperor', 'influences', '通过宫廷和辅政进入中枢'),
      relation('rel-whan-6', 'actor-whan-officials', 'actor-whan-outer', 'checks', '制度与亲信相互牵制'),
    ],
    checks: [
      check('check-whan-1', 'western-han', '文景休养首先解决什么问题？', ['恢复战争后的社会与财政', '扩大宫殿工程', '消灭所有诸侯'], 0, '汉初最重要的是让人口、农业与国家信用恢复。'),
      check('check-whan-2', 'western-han', '武帝时期国家能力与社会成本是什么关系？', ['只有收益没有成本', '扩张能力提高，同时财政和民力负担扩大', '完全没有变化'], 1, '帝国的高成就与高消耗是同一结构的两面。'),
      check('check-whan-3', 'western-han', '霍光辅政体现了什么难题？', ['幼主时期稳定与辅政者退出', '边疆没有军队', '诸侯王全部独立'], 0, '强势辅政能维持秩序，也必须回答权力如何交还。'),
      check('check-whan-4', 'western-han', '西汉晚期最关键的权力变化是什么？', ['外戚和私人信任压过常规程序', '郡县全部取消', '匈奴占领长安'], 0, '宫廷关系逐步改变公共权力的分配，最终给王莽提供机会。'),
    ],
    glossary: ['郡国并行', '察举', '内朝', '外戚', '盐铁', '推恩令'],
  },
  {
    id: 'xin-eastern-han', title: '新莽与东汉', rangeLabel: '9—220年', thesis: '王莽失败说明理想制度不能脱离执行与信用，东汉重建则说明依靠地方力量恢复秩序也会留下新的权力限制。',
    entry: '王莽代汉，试图通过密集改制解决土地、财政与身份问题。', exit: '地方军阀控制皇帝和军队，汉朝名义被曹魏取代。',
    spatial: '洛阳成为东汉中心，地方豪强网络遍布郡县；西域、羌胡和北方边疆要求中央持续依赖地方将领与长期代理人。',
    mapIds: ['han-civilisation-2ce'], actors: easternHanActors, chapters: easternHanChapters, sourceIds: ['source-tongjian', 'source-houhanshu'],
    society: [
      section('ehan-power', '中央与地方', '东汉中央较节制地使用行政，地方豪强和宗族承担更多基层组织。', '重建速度快，却让中央更难直接触及地方社会。', ['source-houhanshu']),
      section('ehan-land', '土地与赋役', '豪强庄园扩大，依附人口和流民使户籍税役逐渐失真。', '财政与兵役越难按户籍落实，中央越依赖地方力量。', ['source-houhanshu']),
      section('ehan-court', '宫廷继承', '幼主频繁出现，外戚辅政、宦官反制形成循环。', '权力冲突逐渐离开公开官僚程序。', ['source-tongjian']),
      section('ehan-life', '士人清议', '太学、察举和地方名望形成公共评价网络。', '党锢清除士人后，朝廷失去重要的批评与组织资源。', ['source-houhanshu']),
    ],
    contradictions: [
      contradiction('ehan-reform-reality', '制度理想与现实执行', ['王莽改制', '市场与地方社会'], '政策频繁变化，执行者和百姓无法形成稳定预期。', '新朝信用崩溃，改革目标反而更难实现。', ['source-tongjian']),
      contradiction('ehan-court-loop', '外戚与宦官', ['外戚辅政', '皇帝近侍'], '幼主依赖外戚，成年皇帝借宦官夺权。', '每次清除都制造新的封闭集团。', ['source-houhanshu']),
      contradiction('ehan-center-local', '中央名义与地方军权', ['汉廷', '地方豪强与军阀'], '中央需要地方镇压危机，却无法在危机后收回军队。', '军阀取代中央，汉朝结束。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-ehan-1', 'actor-ehan-wangmang', 'actor-ehan-people', 'reforms', '反复调整制度'),
      relation('rel-ehan-2', 'actor-ehan-guangwu', 'actor-ehan-gentry', 'allies', '合作重建秩序'),
      relation('rel-ehan-3', 'actor-ehan-outer', 'actor-ehan-eunuchs', 'conflicts', '围绕皇帝反复夺权'),
      relation('rel-ehan-4', 'actor-ehan-scholars', 'actor-ehan-eunuchs', 'criticizes', '清议与党锢'),
      relation('rel-ehan-5', 'actor-ehan-regional', 'actor-ehan-people', 'recruits', '从地方危机获得军队'),
      relation('rel-ehan-6', 'actor-ehan-regional', 'actor-ehan-guangwu', 'replaces', '汉末取代中央权力'),
    ],
    checks: [
      check('check-ehan-1', 'xin-eastern-han', '王莽改制最根本的执行问题是什么？', ['政策过少', '政策频繁且脱离现实承受与信用', '地方完全没有问题'], 1, '目标宏大不等于执行可行，频繁改令还会损害信用。'),
      check('check-ehan-2', 'xin-eastern-han', '东汉重建为何依赖地方豪强？', ['中央需要其土地、宗族和地方组织', '豪强全部是皇族', '中央取消了郡县'], 0, '地方网络帮助恢复秩序，同时也限制中央直达基层。'),
      check('check-ehan-3', 'xin-eastern-han', '外戚宦官循环为什么难停止？', ['双方都没有权力', '幼主辅政与成年皇帝夺权不断重复', '士人支持所有宦官'], 1, '继承年龄和私人近侍结构反复制造同类冲突。'),
      check('check-ehan-4', 'xin-eastern-han', '黄巾以后地方军阀为何崛起？', ['地方获得自行募兵与指挥的机会', '中央军队突然更多', '战争已经结束'], 0, '危机把军权交给地方，中央此后难以收回。'),
    ],
    glossary: ['改制', '豪强', '外戚', '宦官', '党锢', '州牧'],
  },
  {
    id: 'three-kingdoms', title: '三国', rangeLabel: '220—280年', thesis: '三国不是英雄名场面的集合，而是魏蜀吴在国力、组织、人才和继承上的长期竞争。',
    entry: '曹丕代汉，刘备、孙权随后建立自己的皇帝名义。', exit: '司马氏先控制曹魏，再灭蜀、代魏、灭吴完成统一。',
    spatial: '曹魏占人口与农业核心，蜀汉依托四川盆地和汉中，孙吴依托长江水网与江东；地理让三方能够长期对峙，也限制进攻。',
    mapIds: ['three-kingdoms-262'], actors: threeActors, chapters: threeChapters, sourceIds: ['source-tongjian', 'source-sanguozhi'],
    society: [
      section('three-power', '政权结构', '三方都以汉末州郡与军阀组织为基础，逐步建立中央官僚。', '创业集团怎样交接，决定政权能否超越第一代。', ['source-sanguozhi']),
      section('three-land', '人口与屯田', '长期战争造成迁徙，各国以屯田、控制户籍和地方豪族恢复供给。', '人口和粮食差距限制了战略选择。', ['source-sanguozhi']),
      section('three-army', '军队与地理', '魏重北方资源，蜀依险北伐，吴以水军守江。', '战役必须放在交通、补给和纵深中理解。', ['source-tongjian']),
      section('three-gentry', '士族与用人', '各国都需要地方士族和跨区域人才进入行政。', '人才忠诚不仅是个人品格，也受政权包容与晋升影响。', ['source-sanguozhi']),
    ],
    contradictions: [
      contradiction('three-strength', '总体国力与局部战略', ['曹魏', '蜀汉与孙吴'], '魏国资源占优，蜀吴依靠地理与联盟避免被各个击破。', '三方长期僵持，最终仍由掌握魏国资源者统一。', ['source-tongjian']),
      contradiction('three-alliance', '共同敌人与吴蜀利益', ['蜀汉', '孙吴'], '双方需要联合抗魏，又围绕荆州与边界竞争。', '联盟破裂造成夷陵等巨大损耗。', ['source-sanguozhi']),
      contradiction('three-regency', '幼主与辅政权力', ['皇室', '重臣与权臣'], '创业者死后，军政权力集中于少数辅政者。', '司马氏利用魏国辅政结构逐步取代皇室。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-three-1', 'actor-three-wei', 'actor-three-shu', 'conflicts', '北伐与防守'),
      relation('rel-three-2', 'actor-three-wei', 'actor-three-wu', 'conflicts', '淮南与长江对峙'),
      relation('rel-three-3', 'actor-three-shu', 'actor-three-wu', 'allies', '联合抗魏又争荆州'),
      relation('rel-three-4', 'actor-three-sima', 'actor-three-wei', 'controls', '从辅政进入最高权力'),
      relation('rel-three-5', 'actor-three-gentry', 'actor-three-wei', 'supports', '提供地方治理与人才'),
      relation('rel-three-6', 'actor-three-commanders', 'actor-three-shu', 'supports', '维持边防和政权'),
    ],
    checks: [
      check('check-three-1', 'three-kingdoms', '三国长期鼎立最重要的结构原因是什么？', ['三方兵力完全相同', '国力差距与地理防线相互制约', '所有人拒绝作战'], 1, '魏国更强，蜀吴的地理和联盟仍能提高进攻成本。'),
      check('check-three-2', 'three-kingdoms', '吴蜀联盟为什么既必要又脆弱？', ['既有共同敌人也有荆州等利益冲突', '双方从未接壤', '曹魏支持联盟'], 0, '共同敌人不能自动消除边界和资源争议。'),
      check('check-three-3', 'three-kingdoms', '司马氏为何能成为最终赢家？', ['只因一次决斗', '逐步掌握魏国军政与辅政权力', '从未担任官职'], 1, '司马氏继承了最大政权的组织与资源。'),
      check('check-three-4', 'three-kingdoms', '理解三国故事时最不应忽略什么？', ['后勤、人口和继承', '人物绰号', '单次情绪'], 0, '英雄选择必须放在组织条件中理解。'),
    ],
    glossary: ['禅让', '屯田', '荆州', '北伐', '辅政', '士族'],
  },
  {
    id: 'two-jin', title: '两晋', rangeLabel: '280—420年', thesis: '西晋说明统一并不自动带来稳定，东晋则说明皇权、门阀和军队可以在长期不平衡中勉强共存。',
    entry: '西晋灭吴，三国重新统一。', exit: '北府将领刘裕取代东晋，南朝开始。',
    spatial: '北方在内战和多政权竞争中反复重组，大量人口南渡；长江成为东晋防线，荆州、建康和北府军驻地构成南方权力支点。',
    mapIds: ['western-jin-280', 'eastern-jin-376'], actors: jinActors, chapters: jinChapters, sourceIds: ['source-tongjian', 'source-jinshu'],
    society: [
      section('jin-power', '宗室与门阀', '西晋扩大宗室军权，东晋则依赖门阀家族与皇权共治。', '两种安排都在回答怎样避免单一权臣，却都产生新的制约。', ['source-jinshu']),
      section('jin-migration', '人口南渡与土地', '战争推动北方人口南迁，江南开发和侨置制度逐步扩大。', '人口迁移改变南方财政、文化与军事基础。', ['source-jinshu']),
      section('jin-army', '军镇与流民军', '地方军队、北府军和北方各政权军队决定政局。', '中央缺少稳定直辖军时，只能在将领之间维持平衡。', ['source-tongjian']),
      section('jin-life', '族群与政权重组', '北方不同族群在战争、迁徙和建国中不断融合与冲突。', '不能把这一时期简单理解成固定族群之间的单线战争。', ['source-jinshu']),
    ],
    contradictions: [
      contradiction('jin-princes', '防权臣与宗室军权', ['西晋皇帝', '地方诸王'], '皇帝用宗室防外姓，却让诸王拥有争夺中央的力量。', '八王之乱摧毁统一核心。', ['source-jinshu']),
      contradiction('jin-throne-gentry', '皇权与门阀共治', ['东晋皇室', '门阀士族'], '皇室需要士族资源，士族也需要皇帝名义。', '双方维持脆弱合作，权臣与内乱反复出现。', ['source-tongjian']),
      contradiction('jin-north-south', '北伐理想与南方现实', ['北伐将领', '江南朝廷'], '恢复故土既是政治目标，也会改变内部军权。', '北伐成果多次因继承、后勤和猜疑而失去。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-jin-1', 'actor-jin-imperial', 'actor-jin-princes', 'empowers', '分封后转为内战'),
      relation('rel-jin-2', 'actor-jin-imperial', 'actor-jin-gentry', 'co-governs', '东晋共同维持朝廷'),
      relation('rel-jin-3', 'actor-jin-frontier', 'actor-jin-imperial', 'protects', '防守并影响废立'),
      relation('rel-jin-4', 'actor-jin-fuqin', 'actor-jin-imperial', 'conflicts', '淝水南征'),
      relation('rel-jin-5', 'actor-jin-northern', 'actor-jin-fuqin', 'competes', '北方统一与再分裂'),
      relation('rel-jin-6', 'actor-jin-liuyu', 'actor-jin-imperial', 'replaces', '以军功终结东晋'),
    ],
    checks: [
      check('check-jin-1', 'two-jin', '西晋大封宗室原本要解决什么？', ['防止外姓权臣孤立皇室', '鼓励八王内战', '放弃地方治理'], 0, '设计目标是保护皇室，但军权配置制造了更大的内部风险。'),
      check('check-jin-2', 'two-jin', '东晋为什么依赖门阀？', ['皇室南渡后需要家族、土地和行政网络', '门阀全部拥有皇位', '江南没有人口'], 0, '门阀提供了新政权缺少的地方和社会基础。'),
      check('check-jin-3', 'two-jin', '淝水之战说明数量优势为什么可能失效？', ['内部联盟和指挥不稳', '士兵越多一定越弱', '地理完全不重要'], 0, '前秦的巨大军队建立在脆弱整合上，一次失败引发全面解体。'),
      check('check-jin-4', 'two-jin', '刘裕能够终结东晋的基础是什么？', ['北府军、军功和行政控制', '只靠皇族身份', '没有参与战争'], 0, '他把军事胜利持续转化为中枢权力。'),
    ],
    glossary: ['八王之乱', '永嘉南渡', '门阀', '侨置', '北府军', '淝水'],
  },
  {
    id: 'north-south', title: '南北朝', rangeLabel: '420—589年', thesis: '南北长期并立并非停滞，而是在政权更替、族群融合、土地制度和军事组织中不断积累重新统一的条件。',
    entry: '刘裕代晋建宋，北魏逐步统一北方。', exit: '隋继承北方军政整合成果并灭陈，重新统一南北。',
    spatial: '长江分隔南北政权，淮河、襄阳和四川是反复争夺的通道；北方从平城转向洛阳，再分为东西两大政治军事中心。',
    mapIds: ['northern-southern-500', 'northern-southern-560'], actors: northSouthActors, chapters: northSouthChapters, sourceIds: ['source-tongjian', 'source-songshu', 'source-weishu', 'source-liangshu', 'source-chenshu', 'source-zhoushu'],
    society: [
      section('ns-power', '政权更替', '南朝多由掌军权者代前朝，北方则在军镇与皇权重组中分合。', '禅让仪式相似，背后的军队、财政和联盟才决定真实权力。', ['source-tongjian']),
      section('ns-land', '土地与户籍', '北魏均田等制度试图重新连接人口、土地、税役与国家。', '制度能否覆盖迁徙人口和地方豪强，决定财政与军队基础。', ['source-weishu']),
      section('ns-army', '军镇与府兵前身', '北方边镇、东西魏军政集团和南方地方军队长期塑造政局。', '被忽视的军镇会从边防工具变成政权竞争者。', ['source-tongjian']),
      section('ns-life', '族群与文化整合', '迁都、通婚、语言服制和官僚制度推动不同人群长期互动。', '融合不是单向改变，而是国家治理和社会生活共同重组。', ['source-weishu']),
    ],
    contradictions: [
      contradiction('ns-court-generals', '皇权与将领', ['南朝皇帝', '宗室与名将'], '皇帝依赖将领保国，又担心其声望威胁皇位。', '猜杀名将反复削弱南朝防线。', ['source-songshu']),
      contradiction('ns-reform-garrison', '中央改革与边镇失落', ['北魏洛阳中枢', '六镇军人'], '迁都后的政治文化中心南移，旧边镇待遇与身份下降。', '六镇起义推动北魏分裂。', ['source-weishu']),
      contradiction('ns-division-unity', '分裂政权与统一趋势', ['南北各国', '跨区域制度与战争'], '各国争夺边界，同时吸收彼此制度、人口和军事经验。', '北周、隋整合北方后获得统一优势。', ['source-tongjian', 'source-zhoushu']),
    ],
    relationships: [
      relation('rel-ns-1', 'actor-ns-south', 'actor-ns-northwei', 'conflicts', '淮河与河南战争'),
      relation('rel-ns-2', 'actor-ns-northwei', 'actor-ns-garrisons', 'neglects', '迁都后边镇失衡'),
      relation('rel-ns-3', 'actor-ns-gaoyu', 'actor-ns-northwei', 'replaces', '分裂为东西魏'),
      relation('rel-ns-4', 'actor-ns-houjing', 'actor-ns-south', 'rebels', '摧毁梁朝中枢'),
      relation('rel-ns-5', 'actor-ns-chen', 'actor-ns-houjing', 'defeats', '重建江南秩序'),
      relation('rel-ns-6', 'actor-ns-sui', 'actor-ns-chen', 'conquers', '完成南北统一'),
    ],
    checks: [
      check('check-ns-1', 'north-south', '北魏迁都洛阳最重要的治理目标是什么？', ['更有效统治农业核心与官僚国家', '彻底放弃北方', '帮助南朝'], 0, '迁都服务于更广泛的国家整合，但也改变了边镇利益。'),
      check('check-ns-2', 'north-south', '六镇起义与迁都有什么结构关系？', ['边镇地位和待遇下降', '六镇全部迁到江南', '边镇没有军人'], 0, '中央重心变化让原有边防集团感到被抛弃。'),
      check('check-ns-3', 'north-south', '侯景为什么能从少量兵力扩大到摧毁梁廷？', ['梁朝信息、边防和地方协调连续失败', '侯景没有遇到抵抗', '北魏直接统一南方'], 0, '小威胁在多层失误中不断获得空间。'),
      check('check-ns-4', 'north-south', '南北朝为什么不能只理解成长期混乱？', ['期间有制度、人口与族群的持续重组', '所有政权都完全相同', '没有发生战争'], 0, '重新统一所需的制度和组织正是在这一时期逐渐形成。'),
    ],
    glossary: ['南朝', '北朝', '均田制', '六镇', '东西魏', '府兵'],
  },
  {
    id: 'sui', title: '隋', rangeLabel: '581—618年', thesis: '隋用数十年结束长期分裂、重建统一国家，也因过快使用这套能力而在一代之内耗尽社会承受。',
    entry: '杨坚控制北周中枢并建立隋朝。', exit: '全国起义与军阀割据中，唐朝在关中建立。',
    spatial: '关中与洛阳连接东西，运河加强北方政治中心与江南粮食区；辽东远征则把运输和兵役推到帝国能力边缘。',
    mapIds: ['sui-610'], actors: suiActors, chapters: suiChapters, sourceIds: ['source-tongjian', 'source-suishu'],
    society: [
      section('sui-power', '制度整合', '中央行政、州县调整与选官制度连接南北。', '隋的许多制度被唐继承，说明灭亡不等于建设毫无价值。', ['source-suishu']),
      section('sui-tax', '户籍与财政', '重新清查人口、整顿税役，使国家迅速获得可调用资源。', '账面国力越强，越容易让统治者误判社会还能继续承受。', ['source-suishu']),
      section('sui-army', '府兵与远征', '北方军政传统支撑统一，连续远征却使动员超出可持续范围。', '军队强大并不等于后勤与社会可以无限使用。', ['source-tongjian']),
      section('sui-life', '运河、市场与役夫', '交通工程连接区域经济，也需要巨大征发和维护成本。', '同一工程可能具有长期价值，同时在建设当下造成沉重痛苦。', ['source-suishu']),
    ],
    contradictions: [
      contradiction('sui-capacity-restraint', '国家能力与自我节制', ['皇帝计划', '社会承受力'], '统一后的财政军力让中央同时推进多项巨型计划。', '过度动员引发逃亡、兵变和起义。', ['source-tongjian']),
      contradiction('sui-north-south', '军事统一与地方认同', ['隋廷', '新并入地区'], '灭陈后地方仍需理解新法律和权力关系。', '急于整齐划一造成江南反叛。', ['source-suishu']),
      contradiction('sui-succession', '公开继承与宫廷信息', ['太子制度', '杨素与宫廷集团'], '储位判断被形象竞争和私下试探替代。', '杨广取得皇位，继承过程留下长期疑虑。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-sui-1', 'actor-sui-emperor', 'actor-sui-officials', 'commands', '共同完成统一'),
      relation('rel-sui-2', 'actor-sui-prince', 'actor-sui-yangdi', 'conflicts', '争夺储位'),
      relation('rel-sui-3', 'actor-sui-yangdi', 'actor-sui-people', 'mobilizes', '工程与远征征发'),
      relation('rel-sui-4', 'actor-sui-rebels', 'actor-sui-yangdi', 'rebels', '地方失控'),
      relation('rel-sui-5', 'actor-sui-tang', 'actor-sui-rebels', 'competes', '争夺隋末秩序'),
      relation('rel-sui-6', 'actor-sui-tang', 'actor-sui-officials', 'inherits', '接收官僚与军队'),
    ],
    checks: [
      check('check-sui-1', 'sui', '隋朝最重要的历史贡献是什么？', ['结束分裂并重建制度交通', '从未统一南方', '取消所有官僚'], 0, '隋虽短命，却为唐朝留下统一结构和制度基础。'),
      check('check-sui-2', 'sui', '隋炀帝的问题为什么不能只说成“做大工程”？', ['关键是多项工程与战争同时超过社会承受', '工程从不需要人力', '所有工程都无价值'], 0, '长期价值与当期成本必须同时判断。'),
      check('check-sui-3', 'sui', '辽东战争中的指挥问题是什么？', ['前线缺乏及时决断权限', '将领完全独立', '没有后勤'], 0, '所有行动等待批准，让机会在传递中消失。'),
      check('check-sui-4', 'sui', '李渊进入关中后首先需要证明什么？', ['新军队能够约束自己并接管秩序', '只会破坏城市', '拒绝使用旧官僚'], 0, '胜利者的纪律决定民众是否愿意接受新权力。'),
    ],
    glossary: ['开皇', '府兵', '科举', '大运河', '东都', '高句丽远征'],
  },
  {
    id: 'tang', title: '唐', rangeLabel: '618—907年', thesis: '唐朝的三百年不是从盛世突然跌入乱世，而是军队、财政、宫廷和地方结构在安史前后发生了根本转换。',
    entry: '李渊在隋末建立唐朝，李世民等人继续完成统一。', exit: '朱温控制唐廷并废帝，地方军阀进入五代格局。',
    spatial: '长安、洛阳连接关中与中原，运河把江南财富送往北方；西域、草原、青藏高原、河北藩镇和东南财赋区在不同时期成为帝国生命线。',
    mapIds: ['tang-742', 'tang-fanzhen-820', 'tang-huang-chao', 'tang-warlords-902'], actors: tangActors, chapters: tangChapters, sourceIds: ['source-tongjian', 'source-jiutangshu'],
    society: [
      section('tang-power', '中央制度', '三省六部、科举与谏官形成成熟官僚体系，宫廷近侍和临时使职后来不断扩张。', '正式制度与灵活使职如何平衡，是唐代政治的重要主线。', ['source-jiutangshu']),
      section('tang-tax', '土地与财政', '均田租庸调逐步失效后，两税、盐税和转运支撑中晚唐。', '财政基础改变，会重新分配中央、地方和百姓之间的权力。', ['source-jiutangshu']),
      section('tang-army', '军制转型', '府兵逐渐让位于募兵、边镇和神策军。', '职业军队提高持续作战能力，也使将领和禁军掌握独立政治筹码。', ['source-tongjian']),
      section('tang-life', '城市、贸易与流动', '长安、洛阳和运河城市连接多区域贸易，科举扩大政治流动。', '繁荣依赖交通、安全和财政秩序，战争会沿同一网络快速传导。', ['source-jiutangshu']),
    ],
    contradictions: [
      contradiction('tang-center-frontier', '中央与边镇', ['唐廷', '节度使'], '中央依赖边镇守边，又担心长期掌兵掌财形成独立。', '安史以后藩镇成为无法简单取消的结构。', ['source-tongjian']),
      contradiction('tang-court-bureaucracy', '宫廷近侍与外廷官僚', ['宦官神策军', '宰相与官僚'], '皇帝依靠近侍控制禁军，外廷则要求公开程序。', '宦官能影响继承，甘露之变后外廷更弱。', ['source-tongjian']),
      contradiction('tang-finance-society', '财政生存与社会负担', ['中央财政', '地方与百姓'], '战争后中央需要稳定收入，户籍和土地现实却已经变化。', '两税等改革维持国家，也带来新的征收与分配矛盾。', ['source-jiutangshu']),
      contradiction('tang-allies', '外援与自主', ['唐廷', '回鹘等盟友'], '危机时需要外部军力，援军也会要求报酬并造成掠夺。', '外交救急无法替代自身组织恢复。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-tang-1', 'actor-tang-emperor', 'actor-tang-aristocracy', 'governs-with', '开国与官僚合作'),
      relation('rel-tang-2', 'actor-tang-emperor', 'actor-tang-frontier', 'delegates', '授权边防后相互防范'),
      relation('rel-tang-3', 'actor-tang-eunuchs', 'actor-tang-emperor', 'guards', '掌禁军并影响继承'),
      relation('rel-tang-4', 'actor-tang-tax', 'actor-tang-people', 'collects', '盐税、两税与转运'),
      relation('rel-tang-5', 'actor-tang-neighbors', 'actor-tang-emperor', 'allies-conflicts', '战争、和亲与援助'),
      relation('rel-tang-6', 'actor-tang-warlords', 'actor-tang-emperor', 'controls', '晚唐挟持朝廷'),
    ],
    checks: [
      check('check-tang-1', 'tang', '安史之乱前后唐朝最根本的结构变化是什么？', ['地方军队与财政权扩大', '长安位置改变', '科举完全消失'], 0, '战后中央再也无法完全恢复早期军制、户籍和地方控制。'),
      check('check-tang-2', 'tang', '藩镇为什么不能简单理解为“中央不愿消灭”？', ['中央也依赖其防边、供军和地方秩序', '藩镇都没有军队', '藩镇只在海外'], 0, '依赖与防范同时存在，才使问题长期化。'),
      check('check-tang-3', 'tang', '宦官权力扩大最重要的资源是什么？', ['神策禁军与宫廷出入', '土地最多', '科举名次'], 0, '控制皇帝安全和继承执行，使近侍权力超出普通官职。'),
      check('check-tang-4', 'tang', '唐末平乱者为何成为新军阀？', ['在战争中获得军队、地盘和财政', '朝廷军权更集中', '起义从未发生'], 0, '平乱过程把实际资源交给地方军事集团。'),
      check('check-tang-5', 'tang', '盛世为什么也要观察信息渠道？', ['风险可能被一致赞美和封闭汇报遮蔽', '盛世不会出现风险', '信息与决策无关'], 0, '安禄山等问题说明表面繁荣不代表纠错机制仍有效。'),
    ],
    glossary: ['三省六部', '府兵', '节度使', '两税法', '神策军', '藩镇'],
  },
  {
    id: 'five-dynasties', title: '五代', rangeLabel: '907—959年', thesis: '五代不断证明武力可以迅速换皇帝，却不能自动建立军队、地方和百姓都愿意相信的长期规则。',
    entry: '朱温废唐建梁，中原进入军人集团轮流建国的时代。', exit: '周世宗改革并推进统一，北宋将在后周基础上继续结束分裂。',
    spatial: '中原五代与南方诸国并立，燕云十六州使契丹更接近华北腹地；开封逐步成为依赖运河和东南供给的政治中心。',
    mapIds: ['five-dynasties-923'], actors: fiveActors, chapters: fiveChapters, sourceIds: ['source-tongjian', 'source-jiuwudaishi'],
    society: [
      section('five-power', '军人政治', '皇帝多由核心军队拥立，禁军与节度使直接决定继承。', '拥立可以快速解决真空，却让每次不满都可能升级为换皇帝。', ['source-jiuwudaishi']),
      section('five-tax', '财政与城市', '战争频繁，中原政权依赖开封交通、地方税收和南方经济联系。', '恢复财政必须先让农户和市场相信规则不会随军队任意改变。', ['source-tongjian']),
      section('five-army', '牙军与强藩', '亲军长期与将领绑定，旧恩、赏赐和恐惧影响忠诚。', '军队若只忠于个人，国家继承就无法稳定。', ['source-jiuwudaishi']),
      section('five-life', '战争与基层秩序', '征发、掠夺和频繁改朝使百姓更重视谁能保护生产和交易。', '后周改革的意义在于把国家收入与民众恢复重新连接。', ['source-tongjian']),
    ],
    contradictions: [
      contradiction('five-army-throne', '拥立军队与皇权', ['皇帝', '牙军与节度使'], '皇帝依靠军队即位，又担心同一军队拥立别人。', '猜杀和兵变反复制造新王朝。', ['source-tongjian']),
      contradiction('five-khitan', '眼前求生与长期边防', ['中原竞争者', '契丹'], '借契丹力量能解决眼前政敌，却要付出称臣和土地。', '燕云问题长期影响中原安全。', ['source-jiuwudaishi']),
      contradiction('five-victory-order', '军事胜利与治理秩序', ['善战君主', '官僚、军队与百姓'], '战功不能自动回答赏罚、财政和对投降者的处理。', '庄宗迅速失败，后周则以改革积累更稳定基础。', ['source-tongjian']),
    ],
    relationships: [
      relation('rel-five-1', 'actor-five-armies', 'actor-five-central', 'enthrones', '拥立也能推翻'),
      relation('rel-five-2', 'actor-five-zhuangzong', 'actor-five-armies', 'rewards-poorly', '胜利后失去功臣信任'),
      relation('rel-five-3', 'actor-five-shi', 'actor-five-khitan', 'depends-on', '以臣属与燕云换援助'),
      relation('rel-five-4', 'actor-five-khitan', 'actor-five-central', 'intervenes', '南下与册立'),
      relation('rel-five-5', 'actor-five-guowei', 'actor-five-armies', 'disciplines', '重建规则与财政'),
      relation('rel-five-6', 'actor-five-shizong', 'actor-five-south', 'conquers-governs', '战争后安排长期秩序'),
    ],
    checks: [
      check('check-five-1', 'five-dynasties', '五代皇位为什么频繁更替？', ['军队拥有拥立和推翻的实际能力', '所有皇帝都没有军队', '南方统一中原'], 0, '军队忠于将领和赏罚，继承缺少超越个人的规则。'),
      check('check-five-2', 'five-dynasties', '石敬瑭借契丹的长期代价是什么？', ['燕云十六州与臣属关系', '失去江南全部土地', '取消所有税收'], 0, '眼前建国把北方战略空间交给契丹。'),
      check('check-five-3', 'five-dynasties', '庄宗与周世宗的关键差别是什么？', ['是否会打仗', '能否把胜利转成守信、公平和长期治理', '出生地点'], 1, '司马光强调会用兵不等于懂得为天下。'),
      check('check-five-4', 'five-dynasties', '后周改革为何重要？', ['开始恢复财政、军纪和民生之间的联系', '立即统一所有地区', '完全依赖契丹'], 0, '后周为下一步结束分裂提供了可持续的国家基础。'),
    ],
    glossary: ['牙军', '节度使', '燕云十六州', '契丹', '后周', '军人政治'],
  },
];

export const periodGuides = guideDefinitions.map(({ actors: _actors, chapters: _chapters, relationships: _relationships, checks: _checks, ...guide }) => guide);
export const periodChapters = guideDefinitions.flatMap((guide) => guide.chapters);
export const historicalActors = guideDefinitions.flatMap((guide) => guide.actors.map((item) => ({ ...item, periodId: guide.id })));
export const relationshipEdges = guideDefinitions.flatMap((guide) => guide.relationships.map((item) => ({ ...item, periodId: guide.id })));
export const knowledgeChecks = guideDefinitions.flatMap((guide) => guide.checks);

const chaptersByPeriod = new Map();
for (const item of periodChapters) {
  if (!chaptersByPeriod.has(item.periodId)) chaptersByPeriod.set(item.periodId, []);
  chaptersByPeriod.get(item.periodId).push(item);
}

const corePlacement = new Map();
for (const item of periodChapters) {
  item.coreLessonIds.forEach((lessonId, index) => {
    corePlacement.set(lessonId, { chapterId: item.id, isCore: true, coreOrder: item.order * 100 + index + 1 });
  });
}

export function getLessonStudyPlacement(lesson) {
  const explicit = corePlacement.get(lesson.id);
  if (explicit) return explicit;

  const chapters = chaptersByPeriod.get(lesson.periodId) || [];
  const year = lesson.startYear;
  const matching = chapters.find((item) => year >= item.startYear && year <= item.endYear)
    || chapters.find((item) => year <= item.endYear)
    || chapters.at(-1);

  return {
    chapterId: matching?.id || null,
    isCore: false,
    coreOrder: null,
  };
}

export function getChapterActorIds(chapterId) {
  return periodChapters.find((item) => item.id === chapterId)?.actorIds || [];
}

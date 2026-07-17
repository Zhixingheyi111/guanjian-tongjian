# 数据来源声明

观鉴 App 所用《资治通鉴》原文、地图与讲解来源记录。每条数据必须可追溯。

## 版权与写作策略

- 《资治通鉴》原文为公版古籍文本；App 内样例原文以维基文库为主，并参考 Chinese Text Project 校对。
- 白话讲解、决策复盘、人物/地点说明为本项目自写，不复制现代译注。
- 地图仅使用 Wikimedia Commons 等明确许可的文件；App 内保留作者、许可与来源链接。
- CHGIS 只作为未来 GIS 参考，不在 v1 打包其数据。

## 十时代导读

本批新增十个时代的整体导读，用于在卷目与故事之间建立历史框架。所有时代说明、社会背景、矛盾分析、关系说明和理解题均为项目自写，不复制现代译注。

- 总体编年与卷界：《资治通鉴》及胡三省音注目录。  
  https://zh.wikisource.org/wiki/資治通鑑
- 战国、秦与楚汉：参考《史记》。  
  https://zh.wikisource.org/wiki/史記
- 西汉：参考《汉书》。  
  https://zh.wikisource.org/wiki/漢書
- 新莽与东汉：参考《后汉书》。  
  https://zh.wikisource.org/wiki/後漢書
- 三国：参考《三国志》。  
  https://zh.wikisource.org/wiki/三國志
- 两晋：参考《晋书》。  
  https://zh.wikisource.org/wiki/晉書
- 南北朝：参考《宋书》《魏书》《梁书》《陈书》《周书》及《资治通鉴》。  
  https://zh.wikisource.org/wiki/宋書  
  https://zh.wikisource.org/wiki/魏書  
  https://zh.wikisource.org/wiki/梁書  
  https://zh.wikisource.org/wiki/陳書  
  https://zh.wikisource.org/wiki/周書
- 隋：参考《隋书》。  
  https://zh.wikisource.org/wiki/隋書
- 唐：参考《旧唐书》。  
  https://zh.wikisource.org/wiki/舊唐書
- 五代：参考《旧五代史》。  
  https://zh.wikisource.org/wiki/舊五代史

每个导读区块在 `periodStudy.js` 中保存 `sourceIds`；数据校验要求每个时代、社会背景和核心矛盾都能解析到来源记录。时代关系图同时展示个人、政权、制度和社会群体，因此节点不等同于人物传记。

## 卷001 样例

- 原文主来源：维基文库《资治通鉴/卷001》  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7001
- 全书目录参考：维基文库《資治通鑑》  
  https://zh.wikisource.org/wiki/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91
- 校对参考：Chinese Text Project《資治通鑑》  
  https://ctext.org/datawiki.pl?if=en&res=176090

### 本批录入范围

- `智宣子将以瑶为后`至智果劝谏段。
- 智伯向韩、魏、赵索地及围晋阳段。
- 张孟谈以“唇亡齿寒”说服韩、魏段。
- 前403年周威烈王册命魏、赵、韩为诸侯段。
- `臣光曰：智伯之亡也，才胜德也`完整评价。
- `臣光曰：臣闻天子之职莫大于礼`完整评价。

原书在前403年条下先记册命，再以“初”回溯智氏兴亡。App 的故事课为方便初学者理解因果，按历史发生顺序重排，但所有段落仍标明卷001出处。

## 地图

- 战国形势图：`File:EN-WarringStatesAll260BCE.jpg`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:EN-WarringStatesAll260BCE.jpg
- 作者：Philg88
- 许可：CC BY-SA 3.0 / GFDL，可按其文件页所列许可使用。
- 注意：该图约为前260年战国形势，App 中用于说明战国格局，不作为前403年的精确边界。

## 周纪精编主线

本批新增卷002至卷005四个重要故事。原文均以维基文库对应卷为主，白话、问题设计和处世方针为项目自写。

- 卷002：商鞅徙木立信、秦孝公变法，以及司马光论“信”。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7002
- 卷003：张仪以六百里诱楚绝齐。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7003
- 卷004：燕昭王筑黄金台、乐毅伐齐。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7004
- 卷005：上党归赵、秦赵议和与长平换将。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7005

## 秦纪精编主线

本批新增卷006至卷008四个重要故事，包括李斯谏逐客、荆轲刺秦、秦统一后的信息失真，以及秦末失控。

- 卷006：逐客令、李斯上书、太子丹与鞠武的国策分歧。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7006
- 卷007：荆轲刺秦、秦完成统一、司马光论燕丹。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7007
- 卷008：陈胜起兵、巨鹿之战、指鹿为马与秦二世之死。  
  https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7008

## 汉纪精编主线

汉纪共六十卷，卷009至卷068现已逐卷建立一课主线。每卷至少包含一个关键故事、一段重点原文、一段自写白话和一条为人处世方针；部分信息密集的课程另收多段原文和完整“臣光曰”。

- 卷009至卷030：楚汉相争与西汉。重点包括刘邦入关、韩信背水、周勃安刘、文景之治、汉武用兵、苏武、霍光、呼韩邪单于与西汉末政。
- 卷031至卷038：成哀之际与王莽。重点包括班婕妤守界、张禹失言、翟方进替罪、董贤受宠、王莽渐夺权与新朝失信。
- 卷039至卷048：光武中兴至和帝亲政。重点包括降将安置、寇恂与贾复和解、马援聚米、班超通西域、邓训护胡与班昭陈情。
- 卷049至卷058：安顺桓灵与党锢、黄巾。重点包括杨震四知、梁冀专权、陈寔入狱、陈球首言与卢植拒贿。
- 卷059至卷068：董卓之乱至汉亡。重点包括何进召董卓、兖州之变、奉迎献帝、官渡、赤壁、荆州联盟与关羽败亡。

卷级内容文件：

- `src/data/tongjian/content/han.js`：十三节多节点核心课程。
- `src/data/tongjian/content/westernHanGuides.js`：西汉缺卷课程。
- `src/data/tongjian/content/xinTransitionGuides.js`：成哀与新莽课程。
- `src/data/tongjian/content/easternHanEarlyGuides.js`：东汉前期课程。
- `src/data/tongjian/content/easternHanMiddleGuides.js`：东汉中期课程。
- `src/data/tongjian/content/easternHanFinalGuides.js`：东汉末年缺卷课程。

维基文库卷页统一格式：  
`https://zh.wikisource.org/zh-hans/資治通鑑/卷NNN`

原文录入时通过维基文库 MediaWiki 修订内容逐卷核对；每条 `passage` 与 `judgment` 在数据中保留对应卷页 `sourceUrl`。现代标题、白话、背景、问题、结果与处世方针均为项目自写。

## 新增地图

- 秦帝国郡县形势图：`File:Qin empire 210 BCE.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Qin_empire_210_BCE.png
- 作者：Yeu Ninje / Itsmine
- 许可：CC BY-SA 3.0 / GFDL
- 注意：此图展示约前210年的统一秦帝国；更早事件只借它建立空间感。

- 汉帝国与交通网络图：`File:Han Civilisation bright large.jpg`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Han_Civilisation_bright_large.jpg
- 作者：Yeu Ninje
- 许可：CC BY-SA 3.0 / GFDL
- 注意：此图以约公元2年的西汉疆域和交通为主；其他汉代事件只作时代背景参考。

## 魏纪精编主线

魏纪卷069至卷078现已逐卷建立一课主线。原文以维基文库对应卷为主，白话、历史背景、问题设计和处世方法均为项目自写。

- 卷069：孙权以长期行迹判断诸葛瑾，不因敌国兄弟关系听信流言。
- 卷070：刘备白帝托孤，明确目标、权限与最坏情形。
- 卷071：马谡失街亭，复盘言谈才气、实战证据与用人责任。
- 卷072：司马懿拒绝诸葛亮以巾帼服激战。
- 卷073：杨阜反复规劝魏明帝节制营建。
- 卷074：刘放、孙资在魏明帝病榻前改变辅政名单。
- 卷075：曹爽以全部筹码换取“只免官”的保证。
- 卷076：费祎对新附之人信任过快，终于遇刺。
- 卷077：曹髦愤而讨伐司马昭，勇气与准备失衡。
- 卷078：成都危局中，谯周比较投吴、奔南与降魏。

维基文库卷页统一格式：  
`https://zh.wikisource.org/zh-hans/資治通鑑/卷NNN`

- 三国形势图：`File:Three Kingdoms.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Three_Kingdoms.png
- 作者：SY（Wikimedia Commons 用户 Seasonsinthesun）
- 许可：CC BY-SA 4.0
- 注意：文件页说明该图表示约262年三国形势；App 中用于整个220—280年阶段的空间背景，不作为逐年精确边界。

## 晋纪精编主线

晋纪卷079至卷118已逐卷建立一课主线，依次讲清西晋统一、八王之乱、永嘉南渡、东晋权臣政治、淝水之战与刘裕崛起。每卷原文以维基文库对应卷为主，白话、背景、问题和处世方法为项目自写。

- 卷079至卷088：大封宗室、统一后的奢政、贾后与八王之乱、永嘉乱起及祖逖北伐。
- 卷089至卷098：长安陷落、东晋建国、王敦与苏峻之乱、陶侃交权、桓温灭蜀及后赵崩溃。
- 卷099至卷108：王猛与前秦、桓温权势、淝水之战、前秦瓦解与北魏兴起。
- 卷109至卷118：东晋末年军头倒戈、桓玄篡位、刘裕复晋、灭南燕、北伐后秦与长安复失。

- 西晋统一形势图：`File:Western Jeun Dynasty 280 CE.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Western_Jeun_Dynasty_280_CE.png
- 作者：Ian Kiu；许可：CC BY-SA 3.0 / GFDL。
- 东晋与前秦形势图：`File:Eastern Jin Dynasty 376 CE.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Eastern_Jin_Dynasty_376_CE.png
- 作者：Ian Kiu；许可：CC BY 3.0 / GFDL。

## 南北朝精编主线

宋、齐、梁、陈纪卷119至卷176已逐卷建立一课主线，依次讲清刘宋立国与宗室相残、南齐废立、北魏改革与分裂、侯景之乱、陈朝兴亡、北周灭齐及隋朝走向统一。每卷原文通过维基文库对应卷的 MediaWiki 修订内容核对，白话、背景、问题和处世方法为项目自写。

- 卷119至卷134：刘裕身后政治、元嘉北伐、北魏灭佛、檀道济之死、刘宋宗室内斗及萧道成掌权。
- 卷135至卷144：南齐兴亡、孝文帝迁洛、北魏汉化与萧衍起兵。
- 卷145至卷155：梁武帝前期、钟离之战、六镇起义、河阴之变及高欢崛起。
- 卷156至卷166：东西魏对峙、玉壁之战、侯景之乱、江陵陷落及陈霸先掌权。
- 卷167至卷176：陈朝立国与废立、北齐自毁、北周灭齐、杨坚辅政及隋灭陈准备。

卷级内容文件：

- `src/data/tongjian/content/liuSongGuides.js`
- `src/data/tongjian/content/southernQiGuides.js`
- `src/data/tongjian/content/liangEarlyGuides.js`
- `src/data/tongjian/content/liangFinalGuides.js`
- `src/data/tongjian/content/chenGuides.js`

- 北魏与南齐形势图：`File:Northern and Southern Dynasties 2.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Northern_and_Southern_Dynasties_2.png
- 作者：SS（Wikimedia Commons 用户 Seasonsinthesun）；许可：CC BY-SA 4.0。
- 注意：此图表示约500年的北魏与南齐形势，用于宋、齐及北魏课程的时代空间背景，不作为逐年精确边界。

- 北周、北齐与陈形势图：`File:Northern and Southern Dynasties 560 CE.png`，Wikimedia Commons  
  https://commons.wikimedia.org/wiki/File:Northern_and_Southern_Dynasties_560_CE.png
- 作者：Ian Kiu；许可：CC BY 3.0 / GFDL。
- 注意：此图表示约560年的北周、北齐与陈朝形势，用于梁末、陈纪及南北统一前夕的空间背景。

## 隋唐与五代精编主线

卷177至卷294已逐卷建立第一轮故事课，原文均通过维基文库对应卷页及 MediaWiki 修订内容逐卷核对。白话、历史背景、学习问题、影响分析和处世方法为项目自写。

- 卷177至卷184：隋统一、开皇治理、杨素用人、征高句丽、隋末起义及唐朝建立。
- 卷185至卷214：唐初统一、玄武门、贞观、武周与开元前期。
- 卷215至卷234：安史之乱、藩镇形成、德宗朝财政与河北战争。
- 卷235至卷254：宪宗削藩、甘露之变、会昌与大中政治、庞勋及黄巢起义。
- 卷255至卷265：黄巢之后的军阀竞逐、昭宗受制、宦官集团覆灭、白马之祸与唐亡。
- 卷266至卷285：后梁、后唐、后晋的建立与覆亡，重点追踪军人政治、燕云十六州和契丹关系。
- 卷286至卷294：后汉苛政、后周改革、周世宗统一准备，以及司马光对庄宗、世宗的终卷总评。

卷级内容文件：

- `src/data/tongjian/content/suiGuides.js`
- `src/data/tongjian/content/tangFoundingGuides.js`
- `src/data/tongjian/content/tangGaozongWuGuides.js`
- `src/data/tongjian/content/tangKaiyuanGuides.js`
- `src/data/tongjian/content/tangAnshiGuides.js`
- `src/data/tongjian/content/tangDezongGuides.js`
- `src/data/tongjian/content/tangXianzongGuides.js`
- `src/data/tongjian/content/tangLateGuides.js`
- `src/data/tongjian/content/tangFallGuides.js`
- `src/data/tongjian/content/fiveDynastiesEarlyGuides.js`
- `src/data/tongjian/content/fiveDynastiesMiddleGuides.js`
- `src/data/tongjian/content/fiveDynastiesFinalGuides.js`

### 隋唐与五代地图

- 隋统一图：`File:Sui Dynasty.png`，作者 SY，CC BY-SA 4.0。  
  https://commons.wikimedia.org/wiki/File:Sui_Dynasty.png
- 盛唐疆域与道制图：`File:China, 742.svg`，作者 Yug，CC BY-SA 3.0。  
  https://commons.wikimedia.org/wiki/File:China,_742.svg
- 唐后期藩镇图：`File:Tang Fanzhen 820.png`，作者 SY，CC BY-SA 4.0。  
  https://commons.wikimedia.org/wiki/File:Tang_Fanzhen_820.png
- 黄巢起义路线图：`File:Huang Chao Uprising.png`，作者 SY，CC BY-SA 4.0。  
  https://commons.wikimedia.org/wiki/File:Huang_Chao_Uprising.png
- 唐末军阀图：`File:End of Tang Warlords.jpg`，作者 SY，CC BY-SA 4.0。  
  https://commons.wikimedia.org/wiki/File:End_of_Tang_Warlords.jpg
- 五代十国形势图：`File:Five Dynasties Ten Kingdoms 923 CE.png`，作者 Ian Kiu，CC BY 3.0 / GFDL。  
  https://commons.wikimedia.org/wiki/File:Five_Dynasties_Ten_Kingdoms_923_CE.png

上述地图均只作相应阶段的空间背景。App 在地图说明中记录图示年份，不把单年边界当成整个阶段逐年精确复原。

## 未来资料

- Wikimedia Commons 历史地图分类：  
  https://commons.wikimedia.org/wiki/Category:Maps_of_the_history_of_China
- CHGIS 未来参考：  
  https://chgis.fas.harvard.edu/

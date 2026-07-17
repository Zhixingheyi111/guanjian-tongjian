function padVolume(number) {
  return String(number).padStart(3, '0');
}

export function volumeId(number) {
  return `vol-${padVolume(number)}`;
}

export function volumeSource(number) {
  return `https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7${padVolume(number)}`;
}

export function defineStory(story) {
  const eventId = story.eventId || `event-${story.id}`;
  const primaryVolumeId = story.volumeIds[0];
  const sectionId = `${primaryVolumeId}-${story.id}`;
  const sourceUrl = story.sourceUrl || volumeSource(story.volumeNumber);
  const passageIds = new Map();
  const judgmentIds = new Map();

  const passages = story.timeline
    .filter((point) => point.original)
    .map((point) => {
      const id = point.passageId || `passage-${story.id}-${point.id}`;
      passageIds.set(point.id, id);
      return {
        id,
        volumeId: point.volumeId || primaryVolumeId,
        eventId,
        title: point.passageTitle || point.title,
        original: point.original,
        vernacular: point.vernacular,
        sourceLabel: point.sourceLabel || `《资治通鉴》卷${padVolume(story.volumeNumber)}，${point.dateLabel}`,
        sourceUrl: point.sourceUrl || sourceUrl,
      };
    });

  const judgments = story.timeline
    .filter((point) => point.judgment)
    .map((point) => {
      const id = point.judgment.id || `judgment-${story.id}-${point.id}`;
      judgmentIds.set(point.id, id);
      return {
        ...point.judgment,
        id,
        eventIds: [eventId],
        sourceUrl: point.judgment.sourceUrl || point.sourceUrl || sourceUrl,
      };
    });

  const timeline = story.timeline.map((point) => ({
    id: point.id,
    dateLabel: point.dateLabel,
    title: point.title,
    summary: point.summary,
    turningPoint: point.turningPoint,
    passageIds: passageIds.has(point.id) ? [passageIds.get(point.id)] : [],
    judgmentIds: judgmentIds.has(point.id) ? [judgmentIds.get(point.id)] : [],
  }));

  const methods = story.methods.map((method) => ({
    ...method,
    sourceEventId: eventId,
    sourceJudgmentId: method.sourceJudgmentId || null,
  }));

  const firstPassage = passages[0];
  const lesson = {
    id: `lesson-${story.id}`,
    order: story.order,
    periodId: story.periodId,
    volumeIds: story.volumeIds,
    title: story.title,
    subtitle: story.subtitle,
    rangeLabel: story.rangeLabel,
    startYear: story.startYear,
    durationLabel: story.durationLabel || '约10分钟',
    importance: story.importance,
    question: story.question,
    summary: story.summary,
    context: story.context,
    eventIds: [eventId],
    timeline,
    outcomes: story.outcomes,
    methodIds: methods.map((method) => method.id),
    mapIds: story.mapIds || [],
    peopleIds: story.peopleIds || [],
    placeIds: story.placeIds || [],
    sourceUrl,
  };

  const event = {
    id: eventId,
    volumeId: primaryVolumeId,
    sectionId,
    order: story.eventOrder || story.order,
    title: story.title,
    subtitle: story.subtitle,
    dateLabel: story.rangeLabel,
    importance: story.importance,
    sourceUrl,
    original: firstPassage?.original || '本课原文正在逐段校录。',
    originalNote: '节录。完整段落按故事时间线排列，并保留原书来源。',
    vernacular: firstPassage?.vernacular || story.summary,
    background: story.context.before,
    explanation: story.summary,
    impacts: story.outcomes,
    peopleIds: story.peopleIds || [],
    placeIds: story.placeIds || [],
    themeIds: story.themeIds || [],
    judgmentIds: judgments.map((judgment) => judgment.id),
    excerptIds: [],
    mapIds: story.mapIds || [],
    lessons: [
      {
        id: `${eventId}-lesson`,
        title: methods[0]?.title || story.question,
        situation: story.context.now,
        choice: timeline[0]?.turningPoint || story.question,
        cost: story.outcomes[0],
        principle: methods[0]?.principle || story.summary,
        practice: methods[0]?.practice || '写下这次转折中最值得复盘的一个选择。',
      },
    ],
  };

  const section = {
    id: sectionId,
    volumeId: primaryVolumeId,
    order: story.eventOrder || story.order,
    title: story.rangeLabel,
    reignTitle: story.rangeLabel,
    yearLabel: story.rangeLabel,
    startYear: story.startYear,
    summary: story.summary,
    eventIds: [eventId],
  };

  return { story, lesson, event, section, passages, judgments, methods };
}

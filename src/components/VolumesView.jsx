import { BookMarked, ChevronRight, ScrollText } from 'lucide-react';
import { eras, listLessonsByVolume, listVolumes } from '../data/tongjian';
import { Tag } from './ui';

export default function VolumesView({ onOpenVolume, onOpenLesson }) {
  const volumes = listVolumes();
  const groups = eras.map((era) => ({
    era,
    volumes: volumes.filter((volume) => volume.dynasty === era),
  }));
  const curatedCount = volumes.filter((volume) => volume.status !== 'placeholder').length;

  return (
    <div className="volume-index">
      <section className="volume-index__intro">
        <div>
          <span>原书入口</span>
          <h2>294卷不是294个孤立章节</h2>
          <p>卷目用于核对原书次序和出处。真正学习时，相关事件会被组织成一条完整故事线。</p>
        </div>
        <BookMarked size={38} aria-hidden="true" />
      </section>

      <div className="volume-index__stats">
        <span><strong>294</strong> 原书卷数</span>
        <span><strong>{curatedCount}</strong> 已精编</span>
        <span><strong>10</strong> 历史阶段</span>
      </div>

      <div className="volume-groups">
        {groups.map((group, groupIndex) => (
          <details key={group.era} className="volume-group" open={groupIndex === 0}>
            <summary>
              <span>
                <strong>{group.era}</strong>
                <em>卷{String(group.volumes[0]?.number).padStart(3, '0')}—卷{String(group.volumes.at(-1)?.number).padStart(3, '0')}</em>
              </span>
              <Tag>{group.volumes.length} 卷</Tag>
            </summary>
            <div className="volume-group__list">
              {group.volumes.map((volume) => {
                const lessonCount = listLessonsByVolume(volume.id).length;
                const available = volume.status !== 'placeholder';
                return (
                  <button
                    key={volume.id}
                    type="button"
                    className={available ? 'volume-index-row is-available' : 'volume-index-row'}
                    onClick={() => available && onOpenVolume(volume.id)}
                    disabled={!available}
                  >
                    <span className="volume-index-row__number">{String(volume.number).padStart(3, '0')}</span>
                    <span className="volume-index-row__body">
                      <strong>{available ? volume.shortTitle : `卷${String(volume.number).padStart(3, '0')}`}</strong>
                      <em>{available ? volume.coverage : '原书索引待校录'}</em>
                      {available && <small><ScrollText size={13} aria-hidden="true" />{lessonCount} 个精编故事</small>}
                    </span>
                    {available ? <ChevronRight size={18} aria-hidden="true" /> : <span className="volume-index-row__status">待精编</span>}
                  </button>
                );
              })}
            </div>
          </details>
        ))}
      </div>

      <div className="volume-featured">
        <span>从历史主线开始</span>
        <button type="button" onClick={() => onOpenLesson('lesson-jin-collapse')}>
          周：晋国为什么会分裂
          <ChevronRight size={17} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onOpenLesson('lesson-qin-unity-and-silence')}>
          秦：统一为什么仍会失控
          <ChevronRight size={17} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onOpenLesson('lesson-liubang-enters-guan')}>
          汉：刘邦入关后的克制
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

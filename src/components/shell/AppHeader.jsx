import { Download, Search, Share, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const MODE_TITLES = {
  tongjian: '沿时间读懂历史',
  consult: '借历史看现实',
  methods: '把道理落到行动',
  notes: '留下自己的理解',
};

export default function AppHeader({ mode, query, onQueryChange }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => (
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
  ));

  useEffect(() => {
    const displayMode = window.matchMedia('(display-mode: standalone)');
    const handlePrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowInstallHelp(false);
    };
    const handleDisplayMode = (event) => setIsInstalled(event.matches);

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    displayMode.addEventListener?.('change', handleDisplayMode);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      displayMode.removeEventListener?.('change', handleDisplayMode);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      setShowInstallHelp(true);
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (choice.outcome !== 'accepted') setShowInstallHelp(true);
  };

  return (
    <header className="app-header">
      <div className="app-header__title">
        <div className="brand-mark">鉴</div>
        <div>
          <h1>观鉴</h1>
          <p>{MODE_TITLES[mode] || '以史为镜'}</p>
        </div>
      </div>
      <div className="app-header__tools">
        <label className="search-box" aria-label="搜索资治通鉴">
          <Search size={17} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="搜时代、人物、故事、臣光曰"
          />
        </label>
        {!isInstalled && (
          <button className="install-button" type="button" onClick={handleInstall} title="安装观鉴到手机" aria-label="安装观鉴到手机">
            <Download size={19} aria-hidden="true" />
          </button>
        )}
      </div>

      {showInstallHelp && (
        <div className="install-dialog" role="dialog" aria-modal="true" aria-labelledby="install-title">
          <button className="install-dialog__close" type="button" onClick={() => setShowInstallHelp(false)} aria-label="关闭安装说明">
            <X size={18} aria-hidden="true" />
          </button>
          <div className="install-dialog__icon"><Share size={20} aria-hidden="true" /></div>
          <h2 id="install-title">保存“观鉴”到手机</h2>
          <p><strong>iPhone / iPad：</strong>用 Safari 打开，点“分享”，再选“添加到主屏幕”。</p>
          <p><strong>Android：</strong>用 Chrome 打开菜单，选择“安装应用”或“添加到主屏幕”。</p>
          <span>安装后可像普通 App 一样启动；阅读进度和笔记保存在这台设备上。</span>
        </div>
      )}
    </header>
  );
}

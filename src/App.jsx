import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ConsultView from './components/ConsultView';
import MethodsView from './components/MethodsView';
import NotesView from './components/NotesView';
import PeriodStudy from './components/PeriodStudy';
import SearchResults from './components/SearchResults';
import StoryLesson from './components/StoryLesson';
import TongjianView from './components/TongjianView';
import VolumeDetail from './components/VolumeDetail';
import AppHeader from './components/shell/AppHeader';
import TabBar from './components/shell/TabBar';

function currentMode(pathname) {
  if (pathname.startsWith('/consult')) return 'consult';
  if (pathname.startsWith('/methods')) return 'methods';
  if (pathname.startsWith('/notes')) return 'notes';
  return 'tongjian';
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const viewportRef = useRef(null);
  const [query, setQuery] = useState('');
  const mode = useMemo(() => currentMode(location.pathname), [location.pathname]);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.search]);

  const openLesson = (lessonId, anchor = '') => {
    setQuery('');
    navigate(`/lesson/${lessonId}${anchor ? `#${anchor}` : ''}`);
  };

  const openVolume = (volumeId) => {
    setQuery('');
    navigate(`/volume/${volumeId}`);
  };

  const openPeriod = (periodId, anchor = '') => {
    setQuery('');
    navigate(`/tongjian/period/${periodId}${anchor ? `#${anchor}` : ''}`);
  };

  const handleModeChange = (nextMode) => {
    setQuery('');
    const paths = {
      tongjian: '/tongjian',
      consult: '/consult',
      methods: '/methods',
      notes: '/notes',
    };
    navigate(paths[nextMode]);
  };

  return (
    <div className="app-shell">
      <AppHeader mode={mode} query={query} onQueryChange={setQuery} />
      <main ref={viewportRef} className="app-viewport">
        {query.trim() ? (
          <SearchResults
            query={query}
            onOpenLesson={openLesson}
            onOpenVolume={openVolume}
            onOpenPeriod={openPeriod}
            onClose={() => setQuery('')}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/tongjian" replace />} />
            <Route path="/tongjian" element={<TongjianView view="timeline" onOpenLesson={openLesson} onOpenVolume={openVolume} onOpenPeriod={openPeriod} />} />
            <Route path="/tongjian/volumes" element={<TongjianView view="volumes" onOpenLesson={openLesson} onOpenVolume={openVolume} onOpenPeriod={openPeriod} />} />
            <Route path="/tongjian/period/:periodId" element={<PeriodStudy onOpenLesson={openLesson} />} />
            <Route path="/lesson/:lessonId" element={<StoryLesson onOpenVolume={openVolume} />} />
            <Route path="/volume/:volumeId" element={<VolumeDetail onOpenLesson={openLesson} />} />
            <Route path="/consult" element={<ConsultView onOpenLesson={openLesson} />} />
            <Route path="/methods" element={<MethodsView onOpenLesson={openLesson} />} />
            <Route path="/notes" element={<NotesView onOpenLesson={openLesson} onOpenPeriod={openPeriod} onOpenVolume={openVolume} />} />
            <Route path="*" element={<Navigate to="/tongjian" replace />} />
          </Routes>
        )}
      </main>
      <TabBar currentMode={mode} onModeChange={handleModeChange} />
    </div>
  );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main';
import NaturePage from './pages/Nature';
import WeatherPage from './pages/Weather';
import EconomyPage from './pages/Economy';
import TransportPage from './pages/Transport';
import CulturePage from './pages/Culture';
import FoodPage from './pages/Food';
import HistoryPage from './pages/History';
import PeoplePage from './pages/People';
import MiscPage from './pages/Misc';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/nature" element={<NaturePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/economy" element={<EconomyPage />} />
      <Route path="/transport" element={<TransportPage />} />
      <Route path="/culture" element={<CulturePage />} />
      <Route path="/food" element={<FoodPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/misc" element={<MiscPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
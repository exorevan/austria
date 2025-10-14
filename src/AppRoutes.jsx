import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NaturePage from './pages/NaturePage';
import WeatherPage from './pages/WeatherPage';
import EconomyPage from './pages/EconomyPage';
import TransportPage from './pages/TransportPage';
import CulturePage from './pages/CulturePage';
import FoodPage from './pages/FoodPage';
import HistoryPage from './pages/HistoryPage';
import PeoplePage from './pages/PeoplePage';
import MiscPage from './pages/MiscPage';

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
      {/* Можно добавить страницу 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
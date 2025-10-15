import { useEffect } from 'react';
import {
  Chart,
  // ... (импорты Chart.js без изменений)
  BarController,
  DoughnutController,
  LineController,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import miscPageData from '../data/miscPageData.json';

// Регистрация всех необходимых компонентов Chart.js
Chart.register(
  BarController,
  DoughnutController,
  LineController,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const { chartData } = miscPageData;

const useCharts = (location, chartIds) => {
  useEffect(() => {
    // Уничтожаем предыдущие экземпляры графиков, чтобы избежать утечек памяти
    const chartInstances = Chart.instances;
    Object.values(chartInstances).forEach(chart => chart.destroy());

    // Определяем, активна ли темная тема
    const isDarkMode = document.documentElement.classList.contains('dark');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
    const tooltipBgColor = isDarkMode ? '#1f2937' : '#fff';
    const tooltipTextColor = isDarkMode ? '#e2e8f0' : '#1e293b';

    // Общие настройки для всех графиков
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: tooltipBgColor,
          titleColor: tooltipTextColor,
          bodyColor: tooltipTextColor,
          borderColor: gridColor,
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: { color: textColor },
        },
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor },
        },
      },
    };

    // Функция для создания графика по его ID
    const createChart = (chartId) => {
      const ctx = document.getElementById(chartId);
      if (!ctx || !chartData[chartId]) return;

      // Получаем существующий график для данного canvas и уничтожаем его перед созданием нового.
      // Это предотвращает "наслоение" и утечки памяти.
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const data = chartData[chartId];
      let options = { ...commonOptions };
      let type = 'bar'; // Тип по умолчанию

      // Кастомизация для конкретных графиков
      switch (chartId) {
        case 'obesityChart':
          type = 'doughnut';
          options = {
            ...commonOptions,
            cutout: '60%',
            plugins: {
              ...commonOptions.plugins,
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: textColor,
                  padding: 15,
                },
              },
            },
          };
          // Добавляем специфичные для doughnut стили
          data.datasets[0].borderWidth = 2;
          data.datasets[0].borderColor = isDarkMode ? '#0f172a' : '#f8fafc';
          break;
        case 'happinessChart':
          options.indexAxis = 'y'; // Горизонтальный bar chart
          break;
        default:
          break;
      }

      new Chart(ctx, { type, data, options });
    };

    // Создаем все запрошенные графики
    chartIds.forEach(createChart);

    // Возвращаем функцию для очистки, которая уничтожит все графики при размонтировании компонента
    return () => {
      Object.values(Chart.instances).forEach(chart => chart.destroy());
      chartIds.forEach(id => {
        const chart = Chart.getChart(id);
        if (chart) chart.destroy();
      });
    };
  }, [location, chartIds, ...Object.values(chartData)]); // Перерисовываем при смене location, ID или данных
};

export default useCharts;
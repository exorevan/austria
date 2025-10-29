import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  BarController, DoughnutController, LineController,
  BarElement, ArcElement, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js';

/**
 * Генерирует массив цветов для графика на основе значений данных (от красного к зеленому).
 * @param {number[]} data - Массив числовых значений.
 * @param {boolean} [isLowerBetter=false] - Если true, меньшие значения получают "лучшие" (зеленые) цвета.
 * @returns {string[]} Массив HSL цветов.
 */
const generateColorGradient = (data, isLowerBetter = false) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  return data.map(value => {
    const normalizedRatio = (max - min) === 0 
      ? 1 
      : (value - min) / (max - min);
    const hueAngle = (isLowerBetter ? 1 - normalizedRatio : normalizedRatio) * 120;
    return `hsl(${hueAngle}, 80%, 50%)`;
  });
};

// Регистрация всех необходимых компонентов Chart.js один раз при загрузке модуля
Chart.register(
  BarController, DoughnutController, LineController,
  BarElement, ArcElement, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Legend
);

const ChartWrapper = ({ type, data, options, chartId, colorize }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  // Следим за сменой темы через изменение класса на корневом элементе
  useEffect(() => {
    const rootEl = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(rootEl.classList.contains('dark'));
    });
    observer.observe(rootEl, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Определяем, активна ли темная тема
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';

    // Уничтожаем предыдущий экземпляр графика, если он существует
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let finalData = data;
    // Если передан prop `colorize`, генерируем цвета
    if (colorize && finalData.datasets && finalData.datasets[0]) {
      // Клонируем данные, чтобы не мутировать props
      finalData = JSON.parse(JSON.stringify(data));
      const dataset = finalData.datasets[0];
      dataset.backgroundColor = generateColorGradient(dataset.data, colorize.isLowerBetter);
    }


    // Создаем новый график
    chartRef.current = new Chart(canvas, {
      type,
      data: finalData,
      options: {
        ...options,
        // Динамически переопределяем цвета для всех осей, которые есть в графике
        scales: Object.keys((options && options.scales) || {}).reduce((acc, key) => {
          acc[key] = {
            ...options.scales[key],
            grid: {
              ...options.scales[key]?.grid,
              color: gridColor,
            },
            ticks: {
              ...options.scales[key]?.ticks,
              color: textColor,
            },
          };
          return acc;
        }, {}),
        plugins: {
          ...options?.plugins,
          legend: { ...options?.plugins?.legend, labels: { ...options?.plugins?.legend?.labels, color: textColor } },
        },
      },
    });

    // Функция очистки для уничтожения графика при размонтировании компонента
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // Зависимости: перерисовываем при смене данных, опций или темы
  }, [type, data, options, colorize, isDarkMode]);

  return <canvas ref={canvasRef} id={chartId}></canvas>;
};

export default ChartWrapper;
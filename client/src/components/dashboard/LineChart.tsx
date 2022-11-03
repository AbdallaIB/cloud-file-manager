import React, { useRef, useEffect } from 'react';

import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartData,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

interface Props {
  data: ChartData;
  width: number;
  height: number;
}

const LineChart = ({ data, width, height }: Props) => {
  const canvas = useRef(null);
  const legend = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = canvas.current;
    if (!ctx) return;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y2: {
            title: {
              display: true,
              text: 'Date',
            },
            grid: {
              drawBorder: false,
              //   beginAtZero: true,
            },
            ticks: {
              maxTicksLimit: 5,
              //   callback: (value) => formatValue(value),
            },
          },
          y: {
            title: {
              display: true,
              text: 'Date',
            },
            grid: {
              drawBorder: false,
              //   beginAtZero: true,
            },
            ticks: {
              maxTicksLimit: 5,
              //   callback: (value) => formatValue(value),
            },
          },
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            callbacks: {
              //   title: () => false, // Disable tooltip title
              //   label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            if (!c || !c.options || !c.options.plugins || !c.options.plugins.legend) return;
            const labels = c.options.plugins.legend.labels;
            if (!labels || !labels.generateLabels) return;
            // Reuse the built-in legendItems generator
            const items = labels.generateLabels(c);
            items.slice(0, 2).forEach((item) => {
              if (!item || !item.datasetIndex) return;
              const datasetIndex = item.datasetIndex;
              const li = document.createElement('li');
              li.style.marginLeft = '1rem';
              // Button element
              const button = document.createElement('button');
              button.style.display = 'inline-flex';
              button.style.alignItems = 'center';
              button.style.opacity = item.hidden ? '.3' : '';
              button.onclick = () => {
                c.setDatasetVisibility(datasetIndex, !c.isDatasetVisible(datasetIndex));
                c.update();
              };
              // Color box
              const box = document.createElement('span');
              box.style.display = 'block';
              box.style.width = '100px';
              box.style.height = '100px';
              box.style.borderRadius = '1rem';
              box.style.marginRight = '1rem';
              box.style.borderWidth = '3px';
              box.style.borderColor = c.data.datasets[datasetIndex].borderColor as string;
              box.style.pointerEvents = 'none';
              // Label
              const label = document.createElement('span');
              label.style.color = 'red';
              label.style.fontSize = '1rem';
              label.style.lineHeight = '1rem';
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              //   button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex flex-wrap justify-between items-end">
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 mr-2">$1,482</div>
            <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">-22%</div>
          </div>
          <div className="grow ml-2 mb-1">
            <ul ref={legend} className="flex flex-wrap justify-end"></ul>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
};

export default LineChart;

import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);
ChartJS.defaults.color = '#fff';

interface Props {
  data: ChartData<'bar', any, unknown>;
}

const FilesUploadedChart = ({ data }: Props) => {
  return (
    <div className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700">
      <div className="px-5 pt-3">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mr-2">Files uploaded</p>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow p-4 pt-0">
        <Bar className="w-full max-h-[46vh]" data={data} />
      </div>
    </div>
  );
};

export default FilesUploadedChart;

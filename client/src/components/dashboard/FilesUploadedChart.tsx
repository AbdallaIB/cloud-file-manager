import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

interface Props {
  data: ChartData<'bar', any, unknown>;
}

const FilesUploadedChart = ({ data }: Props) => {
  return (
    <>
      <div className="px-5 pt-3">
        <div className="flex flex-wrap justify-between items-end">
          <div className="flex items-start">
            <div className="text-xl font-bold text-slate-800 mr-2">Files uploaded</div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow p-4 max-h-96 pt-0">
        <Bar className="w-full max-h-96" data={data} />
      </div>
    </>
  );
};

export default FilesUploadedChart;

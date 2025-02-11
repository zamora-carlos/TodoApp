import MetricsType from '../types/Metrics';
import formatMetric from '../utils/formatMetric';

// This is going to be fetched from the API, probably in seconds and we only need to display them properly
type MetricsProps = {
  metrics: MetricsType;
};

function Metrics({ metrics }: MetricsProps) {
  return (
    <div className="flex items-center gap-4 text-slate-600 bg-white p-4 mt-16 border border-slate-300 rounded-2xl">
      <div className="grow text-center">
        <p className="text-lg">Average time to finish tasks</p>
        <p className="text-xl text-center font-bold">
          {formatMetric(metrics.averageAll)}
        </p>
      </div>
      <div className="flex flex-col grow gap-3 text-center">
        <p className="text-lg">Average time to finish tasks by priority</p>
        <p>
          <span className="font-medium text-lg">Low</span>{' '}
          <span className="text-xl text-center font-bold">
            {formatMetric(metrics.averageLow)}
          </span>
        </p>
        <p>
          <span className="font-medium text-lg">Medium</span>{' '}
          <span className="text-xl text-center font-bold">
            {formatMetric(metrics.averageMedium)}
          </span>
        </p>
        <p>
          <span className="font-medium text-lg">High</span>{' '}
          <span className="text-xl text-center font-bold">
            {formatMetric(metrics.averageHigh)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Metrics;

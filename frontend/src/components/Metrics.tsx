import { useDispatch, useSelector } from 'react-redux';
import formatMetric from '../utils/formatMetric';
import { getMetricsAsync } from '../redux/metricsSlice';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';

function Metrics() {
  const dispatch = useDispatch<AppDispatch>();
  const metrics = useSelector((state: RootState) => state.metrics);

  useEffect(() => {
    dispatch(getMetricsAsync());
  }, [dispatch]);

  return (
    <div className="flex items-center gap-4 text-slate-600 bg-white p-4 mt-16 border border-slate-300 rounded-2xl">
      <div className="grow text-center">
        <p className="text-lg">Average time to finish tasks</p>
        <p className="text-xl text-center font-bold">
          {metrics.avgTime > 0 ? formatMetric(metrics.avgTime) : '--------'}
        </p>
      </div>
      <div className="flex flex-col grow gap-3 text-center">
        <p className="text-lg">Average time to finish tasks by priority</p>
        <p>
          <span className="font-medium text-lg">Low</span>{' '}
          <span className="text-xl text-center font-bold">
            {metrics.avgTimeLow > 0
              ? formatMetric(metrics.avgTimeLow)
              : '--------'}
          </span>
        </p>
        <p>
          <span className="font-medium text-lg">Medium</span>{' '}
          <span className="text-xl text-center font-bold">
            {metrics.avgTimeMedium > 0
              ? formatMetric(metrics.avgTimeMedium)
              : '--------'}
          </span>
        </p>
        <p>
          <span className="font-medium text-lg">High</span>{' '}
          <span className="text-xl text-center font-bold">
            {metrics.avgTimeHigh > 0
              ? formatMetric(metrics.avgTimeHigh)
              : '--------'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Metrics;

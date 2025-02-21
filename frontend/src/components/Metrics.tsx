import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMetricsAsync } from '../redux/metricsSlice';
import formatTimeFromSeconds from '../utils/formatTimeFromSeconds';
import type { AppDispatch, RootState } from '../redux/store';

function Metrics() {
  const dispatch = useDispatch<AppDispatch>();
  const metrics = useSelector((state: RootState) => state.metrics);

  useEffect(() => {
    dispatch(getMetricsAsync());
  }, [dispatch]);

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-2xl font-bold text-slate-700">Metrics</h2>
      <div className="flex items-center gap-4 mt-2 text-slate-600 bg-white p-4 border border-slate-300 rounded-2xl">
        <div className="grow text-center">
          <p className="text-lg">Average time to finish tasks</p>
          <p className="text-2xl text-center font-bold text-indigo-400">
            {metrics.avgTime > 0
              ? formatTimeFromSeconds(metrics.avgTime)
              : '--------'}
          </p>
        </div>
        <div className="flex flex-col grow gap-3 text-center">
          <p className="text-lg">Average time to finish tasks by priority</p>
          <p className="text-center">
            <span className="font-xl font-bold text-xl text-indigo-400">
              Low
            </span>{' '}
            <span className="text-lg font-light">
              {metrics.avgTimeLow > 0
                ? formatTimeFromSeconds(metrics.avgTimeLow)
                : '--------'}
            </span>
          </p>
          <p className="text-center">
            <span className="font-xl font-bold text-xl text-indigo-400">
              Medium
            </span>{' '}
            <span className="text-lg font-light">
              {metrics.avgTimeMedium > 0
                ? formatTimeFromSeconds(metrics.avgTimeMedium)
                : '--------'}
            </span>
          </p>
          <p className="text-center">
            <span className="font-xl font-bold text-xl text-indigo-400">
              High
            </span>{' '}
            <span className="text-lg font-light">
              {metrics.avgTimeHigh > 0
                ? formatTimeFromSeconds(metrics.avgTimeHigh)
                : '--------'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Metrics;

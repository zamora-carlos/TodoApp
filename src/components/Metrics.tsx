import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMetricsAsync } from '@src/redux/metricsSlice';
import formatTimeFromSeconds from '@utils/formatTimeFromSeconds';
import type { AppDispatch, RootState } from '@src/redux/store';
import type { Metrics } from '@customTypes/metrics';

const PRIORITIES: Array<{ name: string; key: keyof Omit<Metrics, 'avgTime'> }> =
  [
    { name: 'Low', key: 'avgTimeLow' },
    { name: 'Medium', key: 'avgTimeMedium' },
    { name: 'High', key: 'avgTimeHigh' },
  ];

const formatTime = (time: number) =>
  time > 0 ? formatTimeFromSeconds(time) : '--------';

function Metrics() {
  const dispatch = useDispatch<AppDispatch>();
  const metrics = useSelector((state: RootState) => state.metrics);

  useEffect(() => {
    dispatch(getMetricsAsync());
  }, [dispatch]);

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-2xl font-bold text-slate-700">Metrics</h2>

      <div className="flex items-center gap-4 mt-2 text-slate-600 p-4 border border-slate-300 rounded-2xl">
        <div className="grow text-center">
          <p className="text-lg">Average time to finish tasks</p>
          <p className="text-2xl font-bold text-indigo-400">
            {formatTime(metrics.avgTime)}
          </p>
        </div>

        <div className="flex flex-col grow gap-3 text-center">
          <p className="text-lg">Average time to finish tasks by priority</p>

          {PRIORITIES.map(({ name, key }) => (
            <p key={name} className="text-center">
              <span className="text-lg font-semibold text-indigo-400">
                {name}
              </span>
              <span className="text-lg font-light">
                {formatTime(metrics[key])}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Metrics;

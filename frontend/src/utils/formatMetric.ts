// TODO: Improve this function
function formatMetric(metric: number): string {
  let output = '';

  // Handle seconds
  output += (metric % 60).toString().padStart(2, '0') + 's';

  if (metric < 60) {
    return output;
  }

  // Handle minutes
  metric = Math.floor(metric / 60);

  output = (metric % 60).toString().padStart(2, '0') + 'm ' + output;

  if (metric < 60) {
    return output;
  }

  // Handle hours
  metric = Math.floor(metric / 60);

  output = (metric % 24).toString().padStart(2, '0') + 'h ' + output;

  if (metric < 24) {
    return output;
  }

  // Handle days
  metric = Math.floor(metric / 24);

  output = metric.toString().padStart(2, '0') + 'd ' + output;

  return output;
}

export default formatMetric;

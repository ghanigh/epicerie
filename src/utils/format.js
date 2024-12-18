export function formatDistance(distance) {
  if (!distance) return '';
  return distance < 1 
    ? `${Math.round(distance * 1000)}m`
    : `${distance.toFixed(1)}km`;
}

export function formatTime(time) {
  return time.replace(/:/g, 'h');
}
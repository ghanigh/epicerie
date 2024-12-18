export function formatDistance(distance: number | undefined): string {
    if (!distance) return '';
    return distance < 1 
        ? `${Math.round(distance * 1000)}m`
        : `${distance.toFixed(1)}km`;
}

export function formatTime(time: string): string {
    return time.replace(/:/g, 'h');
}

export function isCurrentlyOpen(openTime: string, closeTime: string): boolean {
    const now = new Date();
    const [openHour, openMinute] = openTime.split(':').map(Number);
    const [closeHour, closeMinute] = closeTime.split(':').map(Number);
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const currentTotal = currentHour * 60 + currentMinute;
    const openTotal = openHour * 60 + openMinute;
    const closeTotal = closeHour * 60 + closeMinute;
    
    return currentTotal >= openTotal && currentTotal <= closeTotal;
}
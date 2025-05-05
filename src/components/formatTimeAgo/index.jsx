
export const formatTimeAgo = (dateString) => {

    if (!dateString || isNaN(new Date(dateString).getTime())) {
        return "Just now";
    }

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = past - now;
  
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffMs / 60 / 1000);
    const diffHour = Math.round(diffMs / 60 / 60 / 1000);
    const diffDay = Math.round(diffMs / 24 / 60 / 60 / 1000);
  
    if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
    if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
    if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
    return rtf.format(diffDay, 'day');
  }

 
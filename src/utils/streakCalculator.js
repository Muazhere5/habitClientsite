// Utility function to check if two dates are consecutive days (ignoring time)
const isConsecutive = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Set both to midnight to compare days accurately
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const oneDay = 24 * 60 * 60 * 1000;
    // Difference should be exactly one day (date1 is 1 day after date2)
    const diffDays = Math.round((d1.getTime() - d2.getTime()) / oneDay);
    
    return diffDays === 1; 
};

/**
 * Calculates the current consecutive streak based on a history of timestamps.
 * @param {Array<Date|string>} completionHistory - Array of timestamps ($push from MongoDB).
 * @returns {number} The current streak length.
 */
export const calculateCurrentStreak = (completionHistory = []) => {
    if (completionHistory.length === 0) return 0;

    // 1. Sort history descending (newest first) and get unique days
    const uniqueCompletionDates = [];
    const uniqueDays = new Set();
    
    const sortedHistory = completionHistory
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => b.getTime() - a.getTime()); 
        
    sortedHistory.forEach(date => {
        const dayKey = date.toISOString().split('T')[0];
        if (!uniqueDays.has(dayKey)) {
            uniqueDays.add(dayKey);
            uniqueCompletionDates.push(date);
        }
    });
    
    if (uniqueCompletionDates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const latestCompletion = uniqueCompletionDates[0];
    const latestDay = new Date(latestCompletion);
    latestDay.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDaysFromToday = Math.round((today.getTime() - latestDay.getTime()) / oneDay);

    // If the latest completion was today (0) or yesterday (1), the streak is alive.
    if (diffDaysFromToday > 1) {
        return 0; // Streak is broken.
    }
    
    // Start counting the streak
    streak = 1;
    
    // Iterate through the rest of the unique completion dates
    for (let i = 1; i < uniqueCompletionDates.length; i++) {
        const previousDate = uniqueCompletionDates[i - 1];
        const currentDateToCheck = uniqueCompletionDates[i];
        
        if (isConsecutive(previousDate, currentDateToCheck)) {
            streak++;
        } else {
            // Streak is broken
            break;
        }
    }

    return streak;
};
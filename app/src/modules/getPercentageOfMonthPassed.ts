export default (): number => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Calculate the total days in the current month
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate the percentage of days that have passed in the current month
    const percentageOfDaysPassed = (currentDay / totalDaysInMonth) * 100;

    return +(percentageOfDaysPassed.toFixed(2));
}
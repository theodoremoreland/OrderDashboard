// TODO this needs unit tests.
/**
 * Get the percentage of the year that has passed.
 */
export default () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
    const endOfYear = new Date(now.getFullYear(), 11, 31).getTime();

    const totalDaysInYear = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24) + 1;
    const daysPassed = (now.getTime() - startOfYear) / (1000 * 60 * 60 * 24) + 1;

    const percentagePassed = (daysPassed / totalDaysInYear) * 100;

    return +(percentagePassed.toFixed(2)); // Return the result rounded to two decimal places
}

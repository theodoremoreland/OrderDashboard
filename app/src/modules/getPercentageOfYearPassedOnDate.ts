export default (date: Date) => {
    // Get the full year of the given date
    const year: number = date.getFullYear();
    
    // Get the first day of the year
    const startOfYear: Date = new Date(year, 0, 1);
    
    // Get the last day of the year
    const endOfYear: Date = new Date(year, 11, 31);
    
    // Calculate the total number of milliseconds in the year
    const totalMillisecondsInYear:number = endOfYear.getTime() - startOfYear.getTime() + 24 * 60 * 60 * 1000;
    
    // Calculate the number of milliseconds from the start of the year to the given date
    const millisecondsPassed: number = date.getTime() - startOfYear.getTime();
    
    // Calculate the percentage of the year that has passed
    const percentagePassed: number = (millisecondsPassed / totalMillisecondsInYear) * 100;
    
    // Round the result to two decimal places
    return +(percentagePassed.toFixed(2));
}
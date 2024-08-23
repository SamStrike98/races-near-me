export function daysUntil(date) {
    let raceDate = new Date(date)

    // One day Time in seconds
    let day = 60 * 60 * 24;

    // today
    let today = new Date();

    //calculate total number of seconds between two dates  
    const total_seconds = Math.abs(raceDate - today) / 1000;

    //calculate days difference by dividing total seconds in a day  
    const difference = Math.ceil(total_seconds / day);

    return difference;
}


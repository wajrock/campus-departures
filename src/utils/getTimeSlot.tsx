// Define a function `getTimeSlot` that returns the current time rounded to the nearest 15-minute increment.
const getTimeSlot = () => {
    // Create a new Date object for the current date and time.
    const date = new Date();

    // Get the current hour from the Date object.
    let hours = date.getHours();

    // Get the current minutes from the Date object.
    let minutes: string | number = date.getMinutes();

    // Round the minutes down to the nearest 15-minute increment.
    minutes = Math.floor(minutes / 15) * 15;

    // Convert the rounded minutes to a string and pad it with leading zeros if necessary to ensure it is two digits.
    minutes = minutes.toString().padStart(2, '0');

    // Return the formatted time string in the "hours:minutes" format.
    return `${hours}:${minutes}`;
};

// Export the `getTimeSlot` function as the default export of the module.
export default getTimeSlot;

// Define a function `formatDate` that takes a date string as an argument and returns a formatted date string.
const formatDate = (dateString: string): string => {
    // Create a new Date object from the provided date string.
    const date = new Date(dateString);

    // Format the date into a string using the 'fr-FR' locale (French).
    // The options specify the time zone as 'Europe/Paris', 
    // and it formats the time with two-digit hours and minutes using a 24-hour clock.
    return date.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// Export the `formatDate` function as the default export of the module.
export default formatDate;

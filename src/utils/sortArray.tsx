import { Trip } from "../components/LineComponent/LineComponent";

// Define a function `sortArray` that takes an array of `Trip` objects and sorts them by the `depart` property.
const sortArray = (array: Trip[]) => {
  // Use the JavaScript array `sort` method to sort the array based on the departure times.
  return array.sort((a, b) => {
    // Convert the `depart` property of each `Trip` object to a Date object and then to a timestamp.
    const dateA = new Date(a.depart).getTime();
    const dateB = new Date(b.depart).getTime();

    // Subtract `dateB` from `dateA` to determine their relative order. If the result is negative, `a` comes before `b`; if positive, `b` comes before `a`.
    return dateA - dateB;
  });
};

// Export the `sortArray` function as the default export of the module.
export default sortArray;

import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import getTimeSlot from "../../utils/getTimeSlot"; 
import getDayName from "../../utils/getDayName";
import Pill from "../Pill/PillComponent";

interface Attendance {
  line: string; // Represents the line of the transportation.
  sens: string; // Represents the direction (or "sense") of the transportation.
}

// Define the `AttendanceComponent` functional component that takes `line` and `sens` as props.
const AttendanceComponent: FunctionComponent<Attendance> = ({ line, sens }) => {
  const [isFirstRender,setFirstRender] = useState(false); // A ref to keep track of whether this is the first render.
  const [attendanceLevel, setAttendanceLevel] = useState(""); // State to store the current attendance level.

  useEffect(() => {
    // Check if this is the first render.
    if (isFirstRender) {
      return; // Exit early if it's the first render.
    }

    // Function to fetch data from the API.
    const fetchData = () => {
      const currentTimeSlot = getTimeSlot(); // Get the current time slot using the utility function.
      const currentDay = getDayName(); // Get the current day name using the utility function.
      
      // Construct the API URL with query parameters based on the line, sens, current time slot, and current day.
      const url =
        "https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/mkt-frequentation-estimation-niveau-freq-max-ligne-td/records?select=ligne%2Csens%2Ccouleur%2Ctranche_horaire%2Cjour_semaine&refine=ligne%3A" +
        line +
        "&refine=sens%3A" +
        sens +
        "&refine=tranche_horaire%3A" +
        currentTimeSlot +
        "&refine=jour_semaine%3A" +
        currentDay.toLowerCase();

      // Make an HTTP GET request using axios to fetch attendance level data.
      axios
        .get(url)
        .then((response) => {
          const attendanceLevelColor = response.data["results"][0]["couleur"]; // Extract the attendance level color from the API response.
          setFirstRender(true); // Set the state to true after the first render.
          setAttendanceLevel(attendanceLevelColor); // Update the state with the fetched attendance level color.
        })
        .catch(console.error); // Log any errors that occur during the request.
    };

    fetchData(); // Fetch data immediately after the first render.

    const interval = setInterval(fetchData, 60000); // Set up an interval to fetch data every 60 seconds.

    // Cleanup function to clear the interval when the component is unmounted or when dependencies change.
    return () => clearInterval(interval);
  }, [line, sens,isFirstRender]); // Dependencies for useEffect: triggers whenever `line` or `sens` changes.

  // Render the component.
  return (
    <div className="attendance-wrap">
      {/* Conditionally render the Pill component if the attendance level is available */}
      {attendanceLevel !== "Gris" && (
        <Pill color={attendanceLevel.toLowerCase()} /> // Pass the attendance level color as a prop to the Pill component.
      )}
    </div>
  );
};

export default AttendanceComponent;

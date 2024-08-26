import React, { FunctionComponent } from "react";
import "./Pill.scss";

// Define the type for the props the Pill component will receive
const Pill: FunctionComponent<{ color: string }> = ({ color }) => {
  return (
    // The div with class 'round' and dynamic color class
    <div className={`round ${color}`}>
      {/* Inner div for motion effect */}
      <div className="round-motion"></div>
    </div>
  );
};

export default Pill;

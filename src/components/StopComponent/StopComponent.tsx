import React, { FunctionComponent } from "react";
import "./StopComponent.scss";
import LineComponent from "../LineComponent/LineComponent";

// Define the interface for the props the StopComponent will receive
interface Stop {
  name: string; // Name of the stop
  walking_time: number; // Time to walk to the stop, in minutes
  lines: string[]; // List of lines serving the stop
}

// Define the StopComponent using FunctionComponent and the Stop interface
const StopComponent: FunctionComponent<Stop> = ({
  name,
  walking_time,
  lines,
}) => {

  
    
  return (
    <div className="stop-wrap">
      <header className="stop-wrap-header ">
        <h2 className="stop-wrap-header-name text-slate-900">{name}</h2>

        <div className="stop-wrap-header-walkingtime text-slate-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 16"
            fill="none"
          >
            <path
              d="M6.2223 1.50007C6.2223 1.10223 6.39079 0.72068 6.6907 0.439361C6.99061 0.158043 7.39737 0 7.8215 0C8.24564 0 8.6524 0.158043 8.95231 0.439361C9.25222 0.72068 9.42071 1.10223 9.42071 1.50007C9.42071 1.89792 9.25222 2.27947 8.95231 2.56079C8.6524 2.8421 8.24564 3.00015 7.8215 3.00015C7.39737 3.00015 6.99061 2.8421 6.6907 2.56079C6.39079 2.27947 6.2223 1.89792 6.2223 1.50007ZM5.10619 6.22843C5.07288 6.24093 5.04289 6.25343 5.00957 6.26593L4.74304 6.37531C4.19665 6.60345 3.77686 7.03784 3.58695 7.56912L3.50033 7.81288C3.31375 8.33791 2.71072 8.61917 2.151 8.44416C1.59128 8.26915 1.29143 7.7035 1.478 7.17848L1.56463 6.93471C1.94444 5.86904 2.78402 5.00024 3.87681 4.54397L4.14334 4.43459C4.83633 4.14708 5.58595 3.99707 6.34557 3.99707C7.8315 3.99707 9.17083 4.83461 9.74055 6.11905L10.2536 7.27223L10.9666 7.60662C11.493 7.85351 11.7062 8.45354 11.443 8.94731C11.1798 9.44109 10.5401 9.6411 10.0137 9.39421L9.12086 8.97856C8.77769 8.81606 8.50783 8.54729 8.36123 8.2129L8.04139 7.49412L7.39838 9.54109L9.04756 11.2287C9.22747 11.4131 9.35407 11.6349 9.42071 11.8787L10.187 14.757C10.3303 15.2914 9.98376 15.8351 9.41071 15.9695C8.83766 16.1039 8.26128 15.7789 8.11802 15.2414L7.38505 12.4881L5.02956 10.0786C4.53648 9.57547 4.35323 8.87231 4.53981 8.2129L5.10286 6.22843H5.10619ZM3.18049 12.4381L4.0134 10.488C4.08337 10.5818 4.16333 10.6693 4.24662 10.7568L5.60261 12.1443L5.11952 13.2756C5.03956 13.4632 4.91962 13.635 4.76636 13.7788L2.71072 15.707C2.29426 16.0977 1.61793 16.0977 1.20147 15.707C0.785015 15.3164 0.785015 14.682 1.20147 14.2913L3.18049 12.4381Z"
              fill="currentColor"
            />
          </svg>
          <p>{walking_time.toString() + " min"}</p>
        </div>
      </header>

      <main className="stop-wrap-content">
        {lines.map((line, index) => (
          <LineComponent name={line} stop={name} key={index} />
        ))}
      </main>
    </div>
  );
};

export default StopComponent;

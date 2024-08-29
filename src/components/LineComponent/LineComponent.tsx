import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./LineComponent.scss";
import axios from "axios";
import formatDate from "../../utils/formatDate";
import sortArray from "../../utils/sortArray";
import AttendanceComponent from "../AttendanceComponent/AttendanceComponent";
import { useDataContext } from "../../utils/DataContext";

export type Trip = {
  depart: string;
  departfirsttrain: string;
  departsecondtrain: string;
  idligne: string;
  sens: number;
  destination: string;
};

type TripEntry = [string, string];

type Data = {
  [key: string]: TripEntry[];
};

const LineComponent: FunctionComponent<{ name: string; stop: string }> = ({
  name,
  stop,
}) => {
  const stopNameFormat =
    stop === "Beaulieu U." ? "Beaulieu - Université" : stop;
  const isFirstRender = useRef(true);
  const [data, setData] = useState<Data>({
    "0": [],
    "1": [],
  });
  const { markAsLoaded } = useDataContext();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchData = async () => {
      try {
        // Construct the URL based on the condition
        const url =
          name !== "b"
            ? `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records?select=depart%2C%20idligne%2C%20sens%2C%20destination&refine=nomarret%3A${stopNameFormat}&refine=nomcourtligne%3A%22${name}%22`
            : `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-deux-prochains-passages-tr/records?select=departfirsttrain%2C%20departsecondtrain%2C%20idligne%2C%20sens%2C%20destination&refine=nomarret%3A${stopNameFormat}&refine=nomcourtligne%3A%22${name}%22`;
    
        // Perform the GET request
        const response = await axios.get(url);
        const array: Trip[] = response.data["results"];
        const sortedTrips = sortArray(array);
    
        const newData: Data = { "0": [], "1": [] };

        console.log(response);
        
    
        // Process the response data
        sortedTrips.forEach((item) => {
          if (item.sens === 0 && newData["0"].length < 3) {
            name === "b"
              ? newData["0"].push(
                  [formatDate(item.departfirsttrain), item.destination],
                  [formatDate(item.departsecondtrain), item.destination]
                )
              : newData["0"].push([formatDate(item.depart), item.destination]);
          } else if (item.sens === 1 && newData["1"].length < 3) {
            name === "b"
              ? newData["1"].push(
                  [formatDate(item.departfirsttrain), item.destination],
                  [formatDate(item.departsecondtrain), item.destination]
                )
              : newData["1"].push([formatDate(item.depart), item.destination]);
          }
        });
    
        // Update state and mark as loaded
        setData(newData);
        markAsLoaded(name);
      } catch (error) {
        // Handle the error
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [name, stopNameFormat]);

  return (
    <div className={"line-wrap "+ (data["0"].length === 0 && data["1"].length === 0 ? "empty" : "")}>
      <div className={`line-wrap-header line-${name}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
        >
          <path
            d="M8.88913 0C13.0891 0 15.8891 1.1 15.8891 2.5V3V4C16.4423 4 16.8891 4.44688 16.8891 5V7C16.8891 7.55312 16.4423 8 15.8891 8V13C15.8891 13.5531 15.4423 14 14.8891 14V15C14.8891 15.5531 14.4423 16 13.8891 16H12.8891C12.336 16 11.8891 15.5531 11.8891 15V14H5.88913V15C5.88913 15.5531 5.44225 16 4.88913 16H3.88913C3.336 16 2.88913 15.5531 2.88913 15V14C2.336 14 1.88913 13.5531 1.88913 13V8C1.336 8 0.88913 7.55312 0.88913 7V5C0.88913 4.44688 1.336 4 1.88913 4V3V2.5C1.88913 1.1 4.68913 0 8.88913 0ZM3.88913 5V8C3.88913 8.55313 4.336 9 4.88913 9H8.38913V4H4.88913C4.336 4 3.88913 4.44688 3.88913 5ZM9.38913 9H12.8891C13.4423 9 13.8891 8.55313 13.8891 8V5C13.8891 4.44688 13.4423 4 12.8891 4H9.38913V9ZM4.38913 12.5C4.65435 12.5 4.9087 12.3946 5.09624 12.2071C5.28377 12.0196 5.38913 11.7652 5.38913 11.5C5.38913 11.2348 5.28377 10.9804 5.09624 10.7929C4.9087 10.6054 4.65435 10.5 4.38913 10.5C4.12391 10.5 3.86956 10.6054 3.68202 10.7929C3.49449 10.9804 3.38913 11.2348 3.38913 11.5C3.38913 11.7652 3.49449 12.0196 3.68202 12.2071C3.86956 12.3946 4.12391 12.5 4.38913 12.5ZM13.3891 12.5C13.6543 12.5 13.9087 12.3946 14.0962 12.2071C14.2838 12.0196 14.3891 11.7652 14.3891 11.5C14.3891 11.2348 14.2838 10.9804 14.0962 10.7929C13.9087 10.6054 13.6543 10.5 13.3891 10.5C13.1239 10.5 12.8696 10.6054 12.682 10.7929C12.4945 10.9804 12.3891 11.2348 12.3891 11.5C12.3891 11.7652 12.4945 12.0196 12.682 12.2071C12.8696 12.3946 13.1239 12.5 13.3891 12.5ZM11.8891 2.5C11.8891 2.225 11.6641 2 11.3891 2H6.38913C6.11413 2 5.88913 2.225 5.88913 2.5C5.88913 2.775 6.11413 3 6.38913 3H11.3891C11.6641 3 11.8891 2.775 11.8891 2.5Z"
            fill="currentColor"
          />
        </svg>
        <p className="line-wrap-header-name">Ligne {name}</p>
      </div>

      {data["0"].length > 0 && (
        <div className="line-wrap-way">
          <div className="line-wrap-way-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.16666 9.99999H15.8333M15.8333 9.99999L9.99999 4.16666M15.8333 9.99999L9.99999 15.8333"
                stroke="black"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>{data["0"][0][1]}</p>
            {name !== "b" && <AttendanceComponent line={name} sens={"Aller"} />}
          </div>
          <div className="line-wrap-way-departures">
            {data["0"].map((item, index) => (
              <p>{item[0]}</p>
            ))}
          </div>
        </div>
      )}

      {data["1"].length > 0 && (
        <div className="line-wrap-way">
          <div className="line-wrap-way-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.16666 9.99999H15.8333M15.8333 9.99999L9.99999 4.16666M15.8333 9.99999L9.99999 15.8333"
                stroke="black"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>{data["1"][0][1]}</p>
            {name !== "b" && (
              <AttendanceComponent line={name} sens={"Retour"} />
            )}
          </div>
          <div className="line-wrap-way-departures">
            {data["1"].map((item, index) => (
              <p>{item[0]}</p>
            ))}
          </div>
        </div>
      )}

      {data["0"].length === 0 && data["1"].length === 0 && (
        <div className="line-wrap-noway">
          <p>Aucun trajet disponible pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default LineComponent;

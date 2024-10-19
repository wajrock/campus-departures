import React, { FunctionComponent, useEffect, useState } from "react";
import "./LineComponent.scss";
import { useDataContext } from "../../DataContext";
import getDestinationName from "../../utils/getDestinationName";
import getDepartures from "../../utils/getDepartures";
import Departures from "./Departures";

export type Trip = {
  depart: string;
  idligne: string;
  sens: number;
  destination: string;
};


export type Data = {
  outbound: string[];
  return: string[];
};

const LineComponent: FunctionComponent<{ name: string; stop: string }> = ({
  name,
  stop,
}) => {
  const stopNameFormat =
    stop === "Beaulieu U." ? "Beaulieu - Université" : stop;
  const [isFirstRender, setFirstRender] = useState(true);
  const [departures, setDepartures] = useState<Data>({
    outbound: [],
    return: [],
  });
  const [destinationNames, setDestinationNames] = useState({
    outbound: null,
    return: null,
  });

  const { loading,markAsLoaded } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
        const destinationNames = await getDestinationName(name);
        const departures = await getDepartures(name, stopNameFormat);
      
        setDestinationNames(destinationNames);
        setDepartures(departures);

        markAsLoaded(name);
    };

    if (isFirstRender) {
      fetchData();
      setFirstRender(false);
    }
    const interval = setInterval(getDepartures, 30000);

    return () => clearInterval(interval);
  }, [name, stopNameFormat, isFirstRender, markAsLoaded]);

  return (
    <div className={"line-wrap"}>
      <div className={`line-wrap-header line-${name} gap-1`}>
      
        <div className={`h-[70%] aspect-square rounded-full flex items-center justify-center line-${name}`}>
          <img className={"h-[60%]"} src={`${process.env.PUBLIC_URL}/pictos/${name}.png`} alt='Stacked rounded avatar'/>
        </div>
        <p className={`line-wrap-header-name line-${name} px-4 py-1 rounded-full`}>{`Ligne ${name}`}</p>
        
       
      </div>

      <div className={`line-wrap-content line-${name}`}>
            {(["outbound","return"] as ("outbound"|"return")[]).map((direction) => (
              <div className="line-wrap-content-way">
                <div className="line-wrap-content-way-header 
                text-slate-700
                ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4.16666 9.99999H15.8333M15.8333 9.99999L9.99999 4.16666M15.8333 9.99999L9.99999 15.8333"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="currentColor"
                    />
                  </svg>
                  <p>{loading ? "Destination" :  destinationNames[direction]}</p>
                </div>
                <Departures loadingState={loading} departures={departures[direction]} lineName={name}/>
              </div>))}
      </div>
    </div>
  );
};

export default LineComponent;

import React, { FunctionComponent, useEffect, useState} from "react";
import "./LineComponent.scss";

interface CycleStationProps {
  stationName:string;
  availableCycles:number;
  availableEmplacements:number;
}

type Stops = "Beaulieu Chimie"|"Beaulieu - Université"

const CycleComponent: FunctionComponent = () => {
  const stops:Stops[] = ["Beaulieu Chimie","Beaulieu - Université"]

  const [data,setData] = useState(
    {
      "Beaulieu Chimie":{
        stationName:"Station",
        availableCycles:0,
        availableEmplacements:0
      },
      "Beaulieu - Université":{
        stationName:"Station",
        availableCycles:0,
        availableEmplacements:0
      }
    }
  )

  const [isFirstRender, setFirstRender] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchDataStation = async(station:Stops) =>{
      const url = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-etat-tr/records?select=nom%2Cnombreemplacementsdisponibles%2C%20nombrevelosdisponibles&limit=20&refine=nom%3A${station}`

      const fetchDataRequest = await fetch(url);
      const fetchDataResponse = await fetchDataRequest.json();

      const stationDetails:CycleStationProps = {
        'stationName':fetchDataResponse.results[0].nom,
        'availableCycles':fetchDataResponse.results[0].nombrevelosdisponibles,
        'availableEmplacements':fetchDataResponse.results[0].nombreemplacementsdisponibles
      }

      setData(prev => ({...prev,[station]:stationDetails}))
    }

    const fetchData = () => {
      (stops).forEach(element => {
        fetchDataStation(element)
      });
      setLoading(false);
    }
    if (isFirstRender) {
      fetchData();
      setFirstRender(false);
    }

    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  },[data,isFirstRender])

  useEffect(()=>{
    console.log(data);
    
  },[data])
  return (
    <div className={"line-wrap"}>
      <div className={`line-wrap-header line-velo gap-1`}>
      
        <div className={`h-[70%] aspect-square rounded-full flex items-center justify-center line-velo`}>
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          className="size-5"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit={10}
            strokeWidth={40}
            d="M388 288a76 76 0 1076 76 76.24 76.24 0 00-76-76zM124 288a76 76 0 1076 76 76.24 76.24 0 00-76-76z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={40}
            d="M256 360v-86l-64-42 80-88 40 72h56"
          />
          <path d="M320 136a31.89 31.89 0 0032-32.1A31.55 31.55 0 00320.2 72a32 32 0 10-.2 64z" />
        </svg>
        </div>
        <p className={`line-wrap-header-name line-velo px-4 py-1 rounded-full`}>{`Vélo Star`}</p>
        
       
      </div>

      <div className={`line-wrap-content line-velo`}>
            {(stops).map((station) => (
              <div className="line-wrap-content-way">
                <header className="line-wrap-content-way-header 
                text-slate-700
                ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 20.9l4.95-4.95a7 7 0 10-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1112.728 0L12 23.728zM12 13a2 2 0 100-4 2 2 0 000 4zm0 2a4 4 0 110-8 4 4 0 010 8z" />
                  </svg>
                  <p>{data[station].stationName}</p>
                </header>
                <main className="line-wrap-content-way-departures">
                  <div className="label bg-slate-100 text-slate-800 flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none">
                      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" stroke-width={1.5}/>
                      <path d="M8.66051 7L11.4943 15.2926H11.6087L14.4425 7H16.103L12.4389 17.1818H10.6641L7 7H8.66051Z" fill="black"/>
                    </svg>
                    <p className="font-semibold">{data[station].availableCycles}</p>
                  </div>

                  <div className="label bg-slate-100 text-slate-800 flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none">
  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" stroke-width={1.5}/>
  <path d="M9 17.1818V7H12.6293C13.4214 7 14.0777 7.14418 14.598 7.43253C15.1184 7.72088 15.5078 8.11529 15.7663 8.61577C16.0249 9.11293 16.1541 9.67306 16.1541 10.2962C16.1541 10.9226 16.0232 11.486 15.7614 11.9865C15.5028 12.4837 15.1117 12.8781 14.5881 13.1697C14.0677 13.4581 13.4131 13.6023 12.6243 13.6023H10.1286V12.2997H12.4851C12.9856 12.2997 13.3916 12.2135 13.7031 12.0412C14.0147 11.8655 14.2434 11.6269 14.3892 11.3253C14.535 11.0237 14.608 10.6806 14.608 10.2962C14.608 9.9117 14.535 9.57031 14.3892 9.27202C14.2434 8.97372 14.013 8.74006 13.6982 8.57102C13.3866 8.40199 12.9756 8.31747 12.4652 8.31747H10.5362V17.1818H9Z" fill="black"/>
</svg>
                    <p className="font-semibold">{data[station].availableEmplacements}</p>
                  </div>

                </main>
              </div>))}
      </div>
    </div>
  );
};

export default CycleComponent;

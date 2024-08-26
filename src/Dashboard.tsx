import { useEffect, useState } from "react";
import "./App.scss";
import StopComponent from "./components/StopComponent/StopComponent";
import getDayName from "./utils/getDayName";
import getMonthName from "./utils/getMonthName";
import { useDataContext } from "./utils/DataContext";

const Dashboard = () => {
  const [date, setDate] = useState<string>(); // Stock the current date state
  const [totalLines] = useState(6); //Stock the number of lines
  const { loadedLines } = useDataContext(); // Get the number of loaded lines
  const [loader, setLoader] = useState(true); // Set the state of loader

  useEffect(() => {
    // if all lines data are loaded delete loader
    if (loadedLines.length === totalLines) {
      setLoader(false);
    }
  }, [loadedLines, totalLines]);

  // Actualization of date every seconds
  useEffect(() => {
    const showDate = () => {
      const date = new Date();

      setDate(
        getDayName() +
          " " +
          date.getDate() +
          " " +
          getMonthName() +
          " - " +
          ("0" + date.getHours()).slice(-2) +
          ":" +
          ("0" + date.getMinutes()).slice(-2)
      );
    };
    showDate();
    const interval = setInterval(showDate, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="app">
      {loader && (
        <div className="loader-block">
          <div className="loader"></div>
        </div>
      )}

      <main className="app-content">
        <section className="app-content-infos">
          <header className="app-content-infos-header">
            <div className="app-content-infos-header-date">
              <p>{date}</p>
            </div>
            <h1 className="app-content-infos-header-title">
              Prochain départs de Bus et Métro
            </h1>
          </header>
          <div className="app-content-infos-map"></div>
        </section>
        <section className="app-content-grid">
          <div className="app-content-grid-first-row">
            <StopComponent
              name={"Beaulieu INSA"}
              walking_time={3}
              lines={["C4", "14", "10"]}
            />
          </div>
          <div className="app-content-grid-second-row">
            <StopComponent
              name={"Tournebride"}
              walking_time={10}
              lines={["C6", "67"]}
            />
            <StopComponent
              name={"Beaulieu U."}
              walking_time={9}
              lines={["b"]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

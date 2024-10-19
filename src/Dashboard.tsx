import { useEffect, useState } from "react";
import "./App.scss";
import StopComponent from "./components/StopComponent/StopComponent";
import CycleComponent from "./components/LineComponent/CycleComponent";

const Dashboard = () => {
  const [curentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  ); // Stock the current date state
  const [buttonText, setButtonText] = useState<"Agrandir" | "Réduire">(
    "Agrandir"
  );

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // Si aucun élément n'est en plein écran, lancer le plein écran
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Si un élément est déjà en plein écran, quitter le plein écran
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setButtonText(document.fullscreenElement ? "Réduire" : "Agrandir");
    };

    // Ajouter l'événement 'fullscreenchange'
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Nettoyage de l'événement lors du démontage du composant
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Actualization of date every seconds
  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-wrap bg-white">
      <header className="dashboard-wrap-header headerDashboard">
        <div className="headerDashboard-title">
          <h1 className="text-slate-900">Départs bus et métros</h1>
        </div>

        <div className="headerDashboard-utilities gap-2">
          <div className="py-2.5 px-6 text-sm border border-gray-300 rounded-full shadow-xs bg-white font-semibold text-gray-900 ">
            {curentTime}
          </div>
         
          <button
            onClick={toggleFullScreen}
            className="headerDashboard-utilities-fullscreen  py-2.5 px-6 text-sm bg-slate-900 text-slate-100 font-bold rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-slate-950"
          >
            {buttonText}
          </button>
        </div>
      </header>

      <main className="dashboard-wrap-content contentDashboard">
        <StopComponent
          name={"Beaulieu INSA"}
          walking_time={3}
          lines={["C4", "14", "10"]}
        />

        <StopComponent
          name={"Tournebride"}
          walking_time={10}
          lines={["C6", "67"]}
        />

        <div className="last-column">
          <StopComponent name={"Beaulieu U."} walking_time={9} lines={["b"]} />
          <CycleComponent/>
        </div>
      </main>
      <p className="copyrights text-slate-600 text-sm">
        Interface imaginée et conçu par{" "}
        <a
          className="text-sm"
          href="https://wajrock.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thibaud Wajrock
        </a>{" "}
        | Données fournies par le service STAR
      </p>
    </div>
  );
};

export default Dashboard;

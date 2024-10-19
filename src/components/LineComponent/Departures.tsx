import React, { FunctionComponent } from 'react'

interface DeparturesProps {
    loadingState:boolean;
    departures:string[];
    lineName:string
}

const Departures:FunctionComponent<DeparturesProps> = ({loadingState,departures,lineName}) => {
  return (
    <div className={`line-wrap-content-way-departures ${
        departures.length === 0 ? "empty" : ""
      }`}>
          {loadingState && 
                  Array(3).fill("").map((_, index) => (
                        <p key={`empty-${index}`} className="label bg-slate-100 opacity-50 text-slate-800 animate-pulse"></p>
                      ))}
                      
                  {!loadingState && departures.length > 0 &&
                    departures
                      .slice(0,3)
                      .map((item) => (
                        <p className="label bg-slate-100 text-slate-800">{item}</p>
                      ))}

                  {!loadingState && departures.length > 0 &&
                    Array(
                      (lineName === "b" ? 2 : 3) - departures.slice(0, 3).length
                    )
                      .fill("")
                      .map((_, index) => (
                        <p key={`empty-${index}`} className="label bg-slate-100 opacity-50 text-slate-800"></p>
                      ))}

                  {!loadingState && departures.length === 0 && (
                    <p className="label bg-slate-100 opacity-60 text-slate-600">
                      Aucun trajets !
                    </p>
                  )}
    </div>
  )
}

export default Departures
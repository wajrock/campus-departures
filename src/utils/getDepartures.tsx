import { Data, Trip } from "../components/LineComponent/LineComponent";
import formatDate from "./formatDate";
import isNextDate from "./isNextDate";

const getDepartures = async(lineName: string,stopName:string) => {
    try {
      // Construct the URL based on the condition
      const url =
      lineName !== "b"
          ? `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records?select=depart%2C%20idligne%2C%20sens&order_by=depart&refine=nomarret%3A${stopName}&refine=nomcourtligne%3A%22${lineName}%22`
          : `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-passages-tr/records?order_by=depart&refine=nomcourtligne%3A%22${"b"}%22&refine=nomarret%3A%22${stopName}%22&refine=precision%3A%22Temps%20r%C3%A9el%22`;

      // Perform the GET request
      const responsee = await fetch(url);
      const response = await responsee.json();
      const departuresArray: Trip[] = response.results;

      const orderedDepartures:Data = {
        outbound: [],
        return: [],
      };

      // Process the response data
      departuresArray.forEach((departure) => {
        if (departure.depart && departure.sens === 0 && orderedDepartures.outbound.length < 3 && isNextDate(departure.depart)) {
          orderedDepartures.outbound.push(formatDate(departure.depart))
        } else if (departure.sens === 1 && orderedDepartures.return.length < 3 && isNextDate(departure.depart)) {
          orderedDepartures.return.push(formatDate(departure.depart))
        }
      });
      
      return orderedDepartures
      
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        outbound: [],
        return: [],
      }
    }
  };
  
  export default getDepartures;
  
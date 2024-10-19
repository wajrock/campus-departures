const getDestinationName = async(name: string) => {
    try {
        const urlRoadId =
          name !== "b"
            ? `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-lignes-td/records?select=idparcoursprincipalaller&limit=1&refine=nomcourt%3A${name}`
            : `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-topologie-lignes-td/records?select=idparcoursprincipalaller&limit=1&refine=nomcourt%3A${name}`;

        const roadIdRequest = await fetch(urlRoadId);
        const roadIdResponse = await roadIdRequest.json();

        const roadId = roadIdResponse.results[0].idparcoursprincipalaller;

        const urlDestinationName =
          name !== "b"
            ? `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-dessertes-td/records?select=nomarret&order_by=ordre&refine=idparcours%3A${roadId}&limit=100`
            : `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-topologie-dessertes-td/records?select=nomarret&order_by=ordre&refine=idparcours%3A${roadId}&limit=100`;

        const destinationNameRequest = await fetch(urlDestinationName);
        const destinationNameResponse = await destinationNameRequest.json();

        return {
            outbound: destinationNameResponse.results[0].nomarret,
            return:
              destinationNameResponse.results[
                destinationNameResponse.results.length - 1
              ].nomarret,
          }

      } catch (error) {
        console.log(error);
        return {
            outbound: "",
            return: "",
          }
      }
  };
  
  export default getDestinationName;
  
import { useQuery } from "react-query";
import Planet from "./planet";

//we use this function to fetch the data
const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");

  return res.json();
};

const Planets = () => {
  //The third argument is for config object
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 0,
    //cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problemo"),
  });
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}

      {status === "loading" && <div>Loading data...</div>}

      {status === "error" && <div>Error fetching data!</div>}

      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;

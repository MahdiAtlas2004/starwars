import { useQuery } from "react-query";
import Planet from "./planet";
import { useState } from "react";

//we use this function to fetch the data
const fetchPlanets = async (key, greeting, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(
    ["planets", "hello, guys", page],
    fetchPlanets
  );
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

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

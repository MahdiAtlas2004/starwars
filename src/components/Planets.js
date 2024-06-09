import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";

// Function to fetch the data
const fetchPlanets = async ({ queryKey }) => {
  const [, page] = queryKey;
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status, isFetching } = useQuery({
    queryKey: ["planets", page],
    queryFn: fetchPlanets,
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Planets</h2>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1 || isFetching}
      >
        Previous Page
      </button>
      <span>{page}</span>
      <button
        onClick={() => setPage((old) => (!data || !data.next ? old : old + 1))}
        disabled={!data || !data.next || isFetching}
      >
        Next Page
      </button>
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

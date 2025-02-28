'use client'

import { useState, useEffect } from "react";

export default function BeerCatalog() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search beers..."
        className="w-full p-2 mb-5 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid md:grid-cols-3 gap-5">
        {filteredBeers.map((beer) => (
          <div
            key={beer.id}
            className="bg-white shadow-lg rounded-lg p-5 text-center"
          >
            <img
              src={beer.image}
              alt={beer.name}
              className="w-full h-48 object-contain mb-3"
            />
            <h2 className="text-xl font-semibold">{beer.name}</h2>
            <p className="text-gray-700">{beer.price}</p>
            <p className="text-yellow-500 font-bold">
              ⭐ {beer.rating.average.toFixed(1)} ({beer.rating.reviews} reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

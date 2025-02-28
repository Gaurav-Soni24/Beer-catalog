"use client";
import { useState, useEffect } from "react";

interface Beer {
  id: number;
  name: string;
  price: string;
  image: string;
  rating?: {
    average?: number;
    reviews?: number;
  };
}

export default function BeerCatalog() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.sampleapis.com/beers/ale")
      .then((response) => response.json())
      .then((data: Beer[]) => {
        setBeers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">
            Craft Beer Collection
          </h1>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Discover and explore our handpicked selection of the finest ales
          </p>
        </header>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for your favorite beer..."
            className="w-full p-4 pl-10 pr-12 rounded-lg shadow-md bg-white border-2 border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700"
              onClick={() => setSearch("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredBeers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-amber-800">No beers found matching your search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBeers.map((beer) => (
              <div
                key={beer.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 bg-amber-50 flex items-center justify-center p-4">
                  <img
                    src={beer.image || "/api/placeholder/150/200"}
                    alt={beer.name}
                    className="h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/api/placeholder/150/200";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2 h-14">
                    {beer.name}
                  </h2>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-amber-800 font-medium">{beer.price}</span>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-amber-800">
                        {beer.rating?.average ? beer.rating.average.toFixed(1) : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-amber-600">
                    {beer.rating?.reviews ? `${beer.rating.reviews} reviews` : "No reviews yet"}
                  </div>
                  <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-12 text-center text-amber-700 text-sm">
          <p>© {new Date().getFullYear()} Craft Beer Collection • All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
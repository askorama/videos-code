import { useEffect, useState } from "react";
import { Results } from "./components/Results";
import { Input } from "./components/ui/input";
import { Game } from "./lib/types";

import { OramaClient } from "@oramacloud/client";

const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/nes-games-1-snlukd",
  api_key: "VKPyD0kdQnraj9wjP7FCGvPEPaV3sbjV",
});

export default function App() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<{ document: Game }[]>([]);

  const searchGames = async () => {
    const results = await client.search({
      term: query,
      limit: 25,
      tolerance: 1,
      where: {
        total_rating: {
          gt: 0,
        },
      },
    });
    setGames(results?.hits || []);
  };

  useEffect(() => {
    searchGames();
  }, [query]);

  return (
    <div className="min-w-screen min-h-screen p-0 m-0 bg-background">
      <div className="container mx-auto pt-12 flex flex-col gap-8">
        <Input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for a NES Game"
        />
        <Results games={games} />
      </div>
    </div>
  );
}

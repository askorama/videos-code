import { useState } from "react";
import { Results } from "./components/Results";
import { Input } from "./components/ui/input";
import { Game } from "./lib/types";
import { FAKE_GAMES } from "./lib/constants";

export default function App() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<{ document: Game; id: number }[]>([]);

  return (
    <div className="min-w-screen min-h-screen p-0 m-0 bg-background">
      <div className="container mx-auto pt-12 flex flex-col gap-8">
        <Input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for a NES Game"
        />
        <Results games={FAKE_GAMES} />
      </div>
    </div>
  );
}

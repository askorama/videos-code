import { Game } from "@/lib/types";
import { GameCard } from "./Game";

export const Results = ({
  games,
}: {
  games: { document: Game; id: number }[];
}) => {
  return (
    <>
      <h1 className="text-foreground text-2xl font-bold pb-2">
        NES Games ({games.length})
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard game={game.document} key={game.id} />
        ))}
      </div>
    </>
  );
};

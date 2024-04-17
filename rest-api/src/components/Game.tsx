import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Game } from "@/lib/types";

export function GameCard({ game }: { game: Game }) {
  return (
    <a
      href={`https://letsplayretro.games/${game.console}/${game.slug}`}
      target="_blank"
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="w-full aspect-square overflow-hidden relative border-2 rounded-md border-border">
            <img
              src={game.cover ?? "/nintendo-block.jpg"}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <CardTitle>{game.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {new Date(game.first_release_date * 1000).toLocaleString("PT-pt", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
        </CardContent>
        <CardFooter>
          {game.total_rating ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Progress
                    value={game.total_rating}
                    aria-label="25% increase"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{game.total_rating.toFixed(2)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </CardFooter>
      </Card>
    </a>
  );
}

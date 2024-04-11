import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Game } from "@/lib/types";

export const Results = ({ games }: { games: { document: Game }[] }) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Games</CardTitle>
        <CardDescription>
          PS1 Games are just very special, right?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead className="hidden md:table-cell">
                Released at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.document.id}>
                <TableCell className="hidden sm:table-cell">
                  <img
                    alt={game.document.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={game.document.cover?.url}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {game.document.name}
                </TableCell>
                <TableCell>
                  {game.document.genres && (
                    <Badge variant="outline">
                      {game.document.genres.map((a) => a.name).join(" / ")}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {game.document.total_rating
                    ? parseInt(game.document.total_rating.toLocaleString())
                    : ""}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(
                    game.document.first_release_date * 1000
                  ).toLocaleString("PT-pt", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

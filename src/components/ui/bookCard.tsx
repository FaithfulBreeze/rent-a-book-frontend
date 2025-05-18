import { Book } from "../../../interfaces/book.interface";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

export default function BookCard({ author, description, id, name }: Book) {
  return (
    <a href={`/books/${id}`} className="hover:scale-[103%] duration-[50ms]">
      <Card className="flex flex-col justify-between aspect-[.78]">
        <CardHeader>
          <CardTitle className="text-center text-4xl mt-4 font-serif">
            {name}
          </CardTitle>
        </CardHeader>
        <CardFooter className="self-center flex flex-col gap-20">
          <CardDescription className="text-justify opacity-80 text-black">
            {description}
          </CardDescription>
          <div className="text-center font-bold font-serif">
            <p>Written by</p>
            <p> {author.name}</p>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}

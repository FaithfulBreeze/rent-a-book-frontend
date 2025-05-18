import { Book } from "../../../interfaces/book.interface";
import BookCard from "./bookCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

export default function BookCarousel({
  books = [],
}: {
  books: Book[];
  center: boolean;
}) {
  const carouselItemClass = "basis-1/3";
  return (
    <Carousel className="w-[90%] m-auto">
      <CarouselContent>
        {books.map((book) => {
          return (
            <CarouselItem key={book.id} className={carouselItemClass}>
              <BookCard {...book} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

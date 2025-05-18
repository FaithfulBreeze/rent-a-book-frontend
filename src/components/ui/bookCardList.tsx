import { Book } from "../../../interfaces/book.interface";
import BookCard from "./bookCard";

export default function BookCardList({ books }: { books: Book[] }) {
  return (
    <>
      <div className="mt-28 grid grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

export interface Book {
  id: string;
  rating: string;
  name: string;
  description: string;
  author: { name: string; id: string };
}

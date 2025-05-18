import Container from "@/components/ui/container";
import SearchSection from "@/components/ui/searchSection";

export default function Books() {
  return (
    <Container className="bg-primary rounded-md py-6 px-6 flex flex-col mt-8">
      <h1 className="text-6xl font-bold text-white text-center">Books</h1>
      <hr className="my-6" />
      <SearchSection />
    </Container>
  );
}

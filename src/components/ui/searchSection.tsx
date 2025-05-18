"use client";
import { APIFetch } from "@/lib/utils";
import BookCarousel from "./bookCarousel";
import SearchBar from "./searchBar";
import { useEffect, useState } from "react";
import BookCardList from "./bookCardList";

export interface SearchSectionState {
  searchBarValue: string;
  cardListBooks: [];
  carouselBooks: [];
}

export default function SearchSection() {
  const [state, setState] = useState<SearchSectionState>({
    searchBarValue: "",
    cardListBooks: [],
    carouselBooks: [],
  });

  useEffect(() => {
    APIFetch({
      endpoint: `/books?include-author=true&${
        state.searchBarValue && "name=" + state.searchBarValue
      }`,
      method: "GET",
    }).then(({ responseContent }) =>
      setState((prev) => ({
        ...prev,
        cardListBooks: responseContent,
        carouselBooks: state.searchBarValue
          ? state.carouselBooks
          : responseContent,
      }))
    );
  }, [state.searchBarValue]);
  return (
    <>
      <SearchBar setState={setState} />
      {!state.searchBarValue && (
        <>
          <h1 className="text-secondary text-3xl font-semibold mb-8 text-center">
            Check trending books
          </h1>
          <BookCarousel books={state.carouselBooks} center />
        </>
      )}
      <BookCardList books={state.cardListBooks} />
    </>
  );
}

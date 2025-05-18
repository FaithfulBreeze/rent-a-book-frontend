"use client";
import { APIFetch } from "@/lib/utils";
import { useEffect, useState } from "react";
import Container from "./container";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./pagination";
import { Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface BookStateProps {
  book: string | null;
  currentPage: number | null;
  numPages: number | null;
}

export default function RenderBook({ id }: { id: string }) {
  const [state, setState] = useState<BookStateProps>({
    book: null,
    currentPage: null,
    numPages: null,
  });

  useEffect(() => {
    APIFetch({
      endpoint: `/books/${id}?file=true`,
      method: "GET",
      contentType: "application/json",
      parse: "blob",
    }).then(({ responseContent }) => {
      setState((prev) => ({
        ...prev,
        book: URL.createObjectURL(responseContent),
      }));
    });
  }, []);

  return (
    <Container className="bg-primary py-12 rounded-md min-h-[85%]" center>
      {!state.numPages && (
        <div className="absolute top-[50%] translate-y-[-50%] flex flex-col items-center gap-6">
          <h1 className="text-4xl text-white">
            Just a moment! We are loading your book!
          </h1>
          <Loader2 color="white" className="animate-spin h-36 w-36 " />
        </div>
      )}
      <div
        className={` flex flex-col items-center gap-6 ${
          !state.numPages && "invisible"
        }`}
      >
        <Document
          file={state.book}
          onLoadSuccess={({ numPages }) =>
            setState((prev) => ({ ...prev, numPages, currentPage: 1 }))
          }
        >
          <Page pageNumber={state.currentPage!} scale={0.8} />
        </Document>
        <Pagination>
          <PaginationContent className="text-white">
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  state.currentPage == 1 &&
                  "cursor-not-allowed grayscale-100 opacity-20"
                }`}
                onClick={() => {
                  if (state.currentPage! > 1) {
                    setState((prev) => ({
                      ...prev,
                      currentPage: state.currentPage! - 1,
                    }));
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  state.currentPage == state.numPages &&
                  "cursor-not-allowed grayscale-100 opacity-20"
                }`}
                onClick={() => {
                  if (state.currentPage! + 1 <= state.numPages!) {
                    setState((prev) => ({
                      ...prev,
                      currentPage: state.currentPage! + 1,
                    }));
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Container>
  );
}

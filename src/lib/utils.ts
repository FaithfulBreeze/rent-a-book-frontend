import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function APIFetch({
  endpoint,
  method,
  contentType,
  headers,
  body,
  parse,
}: {
  endpoint: string;
  method: string;
  body?: object;
  headers?: HeadersInit;
  contentType?: string;
  parse?: "json" | "blob";
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      credentials: "include",
      method,
      headers: {
        "Content-Type": contentType || "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    }
  );
  const responseContent = await response[parse || "json"]();
  return { response, responseContent };
}

export function handleLogout() {
  // TODO: handle logout
  redirect("/auth");
}

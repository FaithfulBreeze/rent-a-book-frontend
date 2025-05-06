import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function APIFetch(
  endpoint: string,
  method: string,
  body?: object,
  headers?: HeadersInit,
  contentType: string = "application/json"
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      credentials: "include",
      method,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
      body: JSON.stringify(body),
    }
  );
  const responseContent = await response.json();
  return { response, responseContent };
}

export function handleLogout() {
  // TODO: handle logout
  redirect("/auth");
}

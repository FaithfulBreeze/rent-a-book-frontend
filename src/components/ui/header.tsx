"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { APIFetch, handleLogout } from "@/lib/utils";
import { Book } from "lucide-react";
import { redirect } from "next/navigation";

export default function Header() {
  return (
    <header className="h-[10vh] px-6 flex justify-between items-center bg-primary text-secondary">
      <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
        <Book />
        Rent a Book
      </h1>
      <Menubar className="bg-primary h-[100%] border-0">
        <MenubarMenu>
          <MenubarTrigger>Navigator</MenubarTrigger>
          <MenubarContent className="bg-primary text-secondary">
            <MenubarItem onClick={() => redirect("/profile")}>
              Profile
            </MenubarItem>
            <MenubarItem onClick={() => redirect("/books")}>Books</MenubarItem>
            <MenubarItem onClick={() => redirect("/libraries")}>
              Libraries
            </MenubarItem>
            <MenubarItem onClick={() => redirect("/authors")}>
              Authors
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tools</MenubarTrigger>
          <MenubarContent className="bg-primary text-secondary">
            <MenubarItem>Settings</MenubarItem>
            <MenubarItem onClick={handleLogout}>Log off</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}

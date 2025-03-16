"use client"

import { useState } from "react"
import { BookAIcon, ContactIcon, HomeIcon, MenuIcon, ScanEyeIcon, UtensilsIcon, X } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r shadow-lg transform transition-transform duration-200 ease-in-out bg-white/98",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="flex-1 overflow-auto p-3">
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Menu">
                  <CommandItem className="flex items-center gap-2 cursor-pointer">
                    <HomeIcon className="h-4 w-4" />
                    <span>Home</span>
                  </CommandItem>
                  <CommandItem className="flex items-center gap-2 cursor-pointer">
                    <BookAIcon className="h-4 w-4" />
                    <span>About</span>
                  </CommandItem>
                  <CommandItem className="flex items-center gap-2 cursor-pointer">
                    <ContactIcon className="h-4 w-4" />
                    <span>Developers</span>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Apps">
                    <Link href="/restaurant-finder">
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                            <UtensilsIcon className="h-4 w-4" />
                            <span>Restaurant Finder</span>
                        </CommandItem>
                    </Link>
                    <Link href="/product-insight">
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                            <ScanEyeIcon className="h-4 w-4" />
                            <span>Product Insight</span>
                        </CommandItem>
                    </Link>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar

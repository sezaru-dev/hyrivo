
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Funnel } from 'lucide-react'

type CategoryFilterProps = {
  table: any
}

const CategoryFilter = ({table}: CategoryFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const status = ["Rejected", "Inactive"]

  function toggleCategory(category: string) {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updated)
    table.getColumn("status")?.setFilterValue(updated.length ? updated : undefined)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Funnel className=" h-4 w-4" />
          <span className='hidden sm:block'>Status</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px] p-2">
        <Command>
          <CommandInput placeholder="Search Status..." />
          <CommandGroup>
            {status.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => toggleCategory(item)}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={selectedCategories.includes(item)}
                  onCheckedChange={() => toggleCategory(item)}
                />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoryFilter
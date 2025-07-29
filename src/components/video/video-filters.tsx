"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const FILTERS = [
    { name: "None", class: "filter-none" },
    { name: "Grayscale", class: "filter-grayscale" },
    { name: "Sepia", class: "filter-sepia" },
    { name: "Invert", class: "filter-invert" },
    { name: "Contrast", class: "filter-contrast" },
    { name: "Vintage", class: "filter-vintage" },
    { name: "Sunset", class: "filter-sunset" },
    { name: "Dreamy", class: "filter-dreamy" },
];

interface VideoFiltersProps {
    videoPreview: string;
    selectedFilter: string;
    onSelectFilter: (filterClass: string) => void;
}

export function VideoFilters({ videoPreview, selectedFilter, onSelectFilter }: VideoFiltersProps) {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-2 p-2">
                {FILTERS.map((filter) => (
                    <figure 
                        key={filter.name} 
                        className="shrink-0 cursor-pointer"
                        onClick={() => onSelectFilter(filter.class)}
                    >
                        <div className="overflow-hidden rounded-md">
                            <video
                                src={videoPreview}
                                muted
                                playsInline
                                className={cn(
                                    "h-24 w-16 object-cover transition-all hover:scale-105",
                                    filter.class,
                                    selectedFilter === filter.class ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                                )}
                            />
                        </div>
                        <figcaption className="pt-2 text-xs text-center text-muted-foreground">
                            {filter.name}
                        </figcaption>
                    </figure>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { DestinationCard } from "@/components/destinations/destination-card";
import type { Destination } from "@/Types/destination";

const priceRanges = [
  { value: "all", label: "Price Range", min: undefined, max: undefined },
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-2500", label: "$1,000 - $2,500", min: 1000, max: 2500 },
  { value: "2500-5000", label: "$2,500 - $5,000", min: 2500, max: 5000 },
  { value: "over-5000", label: "$5,000+", min: 5000, max: undefined },
] as const;

const sortOptions = [
  { value: "newest", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

type FilterSelectProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

function FilterSelect({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative flex h-[46px] items-center px-4 transition-shadow focus-within:ring-1 focus-within:ring-inset focus-within:ring-brand/40">
      <span
        aria-hidden="true"
        className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-600"
      >
        {value === "all" || value === "newest" ? placeholder : selected?.label}
      </span>
      <ChevronDown
        className="pointer-events-none absolute right-4 size-4 text-zinc-400"
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 size-full cursor-pointer appearance-none border-0 bg-transparent opacity-0 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DestinationsGrid({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(destinations.map((destination) => destination.category).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));

    return [
      { value: "all", label: "All Categories" },
      ...unique.map((value) => ({ value, label: value })),
    ];
  }, [destinations]);

  const visibleDestinations = useMemo(() => {
    const range = priceRanges.find((item) => item.value === priceRange);

    const filtered = destinations.filter((destination) => {
      if (category !== "all" && destination.category !== category) {
        return false;
      }

      if (!range) {
        return true;
      }

      const aboveMin = range.min === undefined || destination.price >= range.min;
      const belowMax = range.max === undefined || destination.price < range.max;

      return aboveMin && belowMax;
    });

    if (sort === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [destinations, category, priceRange, sort]);

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 divide-y divide-zinc-200 border border-zinc-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <FilterSelect
          id="category-filter"
          label="Filter by category"
          placeholder="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <FilterSelect
          id="price-filter"
          label="Filter by price range"
          placeholder="Price Range"
          value={priceRange}
          options={priceRanges.map(({ value, label }) => ({ value, label }))}
          onChange={setPriceRange}
        />
        <FilterSelect
          id="sort-filter"
          label="Sort destinations"
          placeholder="Sort By"
          value={sort}
          options={sortOptions.map(({ value, label }) => ({ value, label }))}
          onChange={setSort}
        />
      </div>

      <p className="mt-4 text-sm text-zinc-500" aria-live="polite">
        Showing {visibleDestinations.length}{" "}
        {visibleDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {visibleDestinations.length === 0 ? (
        <p className="mt-10 border border-dashed border-zinc-200 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-500">
          No destinations match the selected filters.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  );
}

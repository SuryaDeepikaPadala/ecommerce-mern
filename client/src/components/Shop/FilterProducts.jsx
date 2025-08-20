import React from "react";
import { Checkbox } from "../ui/checkbox";
import { shopFilterProducts } from "@/config";

const FilterProducts = ({ filters, handleFilters }) => {
  return (
    <div className="w-full md:w-64 p-4 border rounded-md bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {Object.keys(shopFilterProducts).map((groupKey) => (
        <div key={groupKey} className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-2 capitalize border-b pb-1">
            {groupKey}
          </h3>

          {shopFilterProducts[groupKey]?.map((option) => (
            <div key={option.id} className="flex items-center gap-2 mb-2">
              <Checkbox
                id={option.id}
                checked={
                  filters &&
                  Object.keys(filters).length > 0 &&
                  filters[groupKey] &&
                  filters[groupKey].indexOf(option.id) > -1
                }
                onCheckedChange={() => handleFilters(groupKey, option.id)}
              />
              <label
                htmlFor={option.id}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterProducts;

import React from 'react';

export const FoodCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-[#f0e6de] overflow-hidden animate-pulse">
    <div className="aspect-4/3 bg-gray-200" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
      <div className="flex justify-between items-end pt-2">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  </div>
);

export const MenuItemSkeleton = () => (
  <div className="flex items-center gap-6 p-4 animate-pulse">
    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="flex-1 border-b border-dotted border-gray-200 hidden sm:block" />
        <div className="h-5 bg-gray-200 rounded w-16" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
    </div>
  </div>
);

import { ReactNode } from "react";

export const SummaryCardIcon = ({children}: {children: ReactNode}) =>{
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500 mb-2">
        {children}
    </div>
  );
};

export const SummaryCardTitle = ({children}: {children: ReactNode}) =>{
  return (
    <div className="text-sm font-medium text-slate-500">
        {children}
    </div>
  );
};

export const SummaryCardValue = ({children}: {children: ReactNode}) =>{
  return (
    <div className="text-2xl font-semibold text-slate-900">
        {children}
    </div>
  );
};

export const SummaryCard = ({children}: {children: ReactNode}) =>{
  return (
    <div className="rounded-xl bg-white p-6">
      {children}  
    </div>
  );
};
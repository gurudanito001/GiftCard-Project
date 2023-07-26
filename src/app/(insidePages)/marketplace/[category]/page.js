"use client";

import * as React from 'react';
import extractIdFromUrl from "@/services/extractIdFromUrl";
import { usePathname } from 'next/navigation';
import OffersTable from '../../../market/offersTable';


const MarketPlace = () =>{

  const pathname = usePathname();
  const category = extractIdFromUrl(pathname, "/marketplace/");

  return(
      <section className="container-fluid my-5">
        <OffersTable offerCategory={category} />
      </section>
  )
}

export default MarketPlace;
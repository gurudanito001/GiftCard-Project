"use client";

import * as React from 'react';
import PublicLayout from "@/components/publicLayout";
import extractIdFromUrl from "@/services/extractIdFromUrl";
import { usePathname } from 'next/navigation';
import OffersTable from '../offersTable';


const Market = () =>{

  const pathname = usePathname();
  const category = extractIdFromUrl(pathname, "/marketplace/");

  return(
    <PublicLayout>
      <section className="container-fluid my-5">
        <div className="row">
          <div className="col col-md-10 offset-md-1 ">
            <OffersTable offerCategory={category} />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Market;
"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const RefreshTradeOnInterval = () =>{
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return null
}

export default RefreshTradeOnInterval;
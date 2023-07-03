"use client";

import {useState, useEffect} from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from 'react-redux';
import Store from '../store/store'
import AlertNotification from "@/components/notifications";

function Providers({ children }: React.PropsWithChildren) {
  useEffect(() => {
    // @ts-expect-error
    import('bootstrap/dist/js/bootstrap');
  }, []); 

  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <Provider store={Store}>
      <QueryClientProvider client={client}>
        <AlertNotification />
          {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
    
  );
}

export default Providers;

"use client";

import { useEffect} from "react";
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

  const queryClient = new QueryClient()

  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <AlertNotification />
          {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
    
  );
}

export default Providers;

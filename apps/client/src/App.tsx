import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Header } from '@/components';
import Home from '@/pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className='flex h-dvh w-dvw min-w-[390px] flex-col bg-gray-50'>
        <Header />
        <main className='flex-grow'>
          <Home />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query';
import BasicTable from './components/BasicTable'
import './App.css'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="bg-gray-50 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <BasicTable />
        </div>
      </section>
    </QueryClientProvider>
  )
}
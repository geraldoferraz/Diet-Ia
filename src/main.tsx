import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NutritionSummaryCard } from './NutritionSummaryCard'
import { Header } from './components/Header/Header'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Header/>
      <NutritionSummaryCard />
    </QueryClientProvider>
  </StrictMode>,
)

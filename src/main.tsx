import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NutritionSummaryCard } from './NutritionSummaryCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NutritionSummaryCard />
  </StrictMode>,
)

import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import api from './api.tsx';
import { NutritionSummaryCard } from './NutritionSummaryCard';

function App() {
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    api.get('/get_nutrition_data')
      .then((res) => {
        console.log(res.data);
        setNutritionData(res.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados nutricionais:", error);
      });
  }, []);

  return <NutritionSummaryCard/>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
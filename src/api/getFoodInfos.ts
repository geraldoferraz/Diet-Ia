import { api } from "@/lib/axios";

export interface Nutrition {
    calories: number;
    carbs: number;
    fat: number;
    fiber: number;
    protein: number;
    sugars: number;
}

export interface FoodItem {
    confidence: number;
    food_id: string;
    food_name: string;
    fv_grade: string;
    nutrition: Nutrition;
    quantity: number;
}


export async function getNutritionData(): Promise<FoodItem[]> {
    const { data } = await api.get<FoodItem[]>('/get_nutrition_data');

    console.log(data);
    return data;
}

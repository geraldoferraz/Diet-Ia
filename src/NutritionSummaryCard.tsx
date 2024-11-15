"use client"
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Pie, PieChart, Label } from "recharts"

import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getNutritionData } from "./api/getFoodInfos"

export function NutritionSummaryCard() {

    const NutritionSchema = z.object({
        calories: z.number(),
        carbs: z.number(),
        fat: z.number(),
        fiber: z.number(),
        protein: z.number(),
        sugars: z.number(),
    });

    const FoodItemSchema = z.object({
        confidence: z.number(),
        food_id: z.string(),
        food_name: z.string(),
        fv_grade: z.string(),
        nutrition: NutritionSchema,
        quantity: z.number(),
    });

    const FoodItemsSchema = z.array(FoodItemSchema);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["nutritionData"],
        queryFn: getNutritionData,
    });

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar os dados.</div>;
    }

    const parseResult = FoodItemsSchema.safeParse(data);

    if (!parseResult.success) {
        console.error("Falha na validação:", parseResult.error);
        return <div>Erro na validação dos dados.</div>;
    }

    const nutritionData = parseResult.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chartData: any[] | undefined = [];
    let totalCalories = 0;
    let foodName = "";
    let sugars = 0;
    let fiber = 0;

    if (nutritionData && nutritionData.length > 0) {
        const nutrition = nutritionData[0].nutrition;
        totalCalories = nutrition.calories;
        foodName = nutritionData[0].food_name;
        sugars = nutrition.sugars;
        fiber = nutrition.fiber;

        chartData = [
            {
                nutrient: "Carboidratos",
                percentage: nutrition.carbs,
                fill: "#32CD32",
            },
            {
                nutrient: "Proteínas",
                percentage: nutrition.protein,
                fill: "#1E90FF",
            },
            {
                nutrient: "Gorduras",
                percentage: nutrition.fat,
                fill: "#FF4500",
            },
        ];
    }

    return (
        <>
            <Card className="flex flex-col items-center">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Resumo Nutricional</CardTitle>
                    <CardDescription>
                        Detalhamento diário de macronutrientes
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    {/* Exibir o nome do alimento */}
                    <h2 className="text-xl font-bold">{foodName}</h2>

                    <div className="flex flex-row items-center gap-6">
                        <div className="aspect-square max-h-[250px] flex-1">
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={chartData}
                                    dataKey="percentage"
                                    nameKey="nutrient"
                                    innerRadius={60}
                                    outerRadius={80}
                                    strokeWidth={4}
                                    cx="50%"
                                    cy="50%"
                                >
                                    <Label
                                        position="center"
                                        content={({ viewBox }) => {
                                            const { cx, cy } = viewBox;
                                            return (
                                                <text
                                                    x={cx}
                                                    y={cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="fill-foreground text-2xl font-semibold"
                                                >
                                                    {totalCalories}
                                                    <tspan className="text-lg"> kcal</tspan>
                                                </text>
                                            );
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </div>

                        <div className="flex flex-col gap-2 text-sm items-start">
                            {chartData.map((item) => (
                                <div
                                    key={item.nutrient}
                                    className="flex justify-between items-center w-full max-w-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: item.fill }}
                                        />
                                        <span className="font-semibold">{item.nutrient}</span>
                                    </div>
                                    <span className="font-semibold text-base">
                                        {item.percentage}g
                                    </span>
                                </div>
                            ))}

                            <Separator className="mt-2 mb-2" />

                            <div className="flex justify-between items-center w-full max-w-xs">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-500" />
                                    <span className="font-semibold">Açúcar</span>
                                </div>
                                <span className="font-semibold text-base">{sugars}g</span>
                            </div>

                            <div className="flex justify-between items-center w-full max-w-xs">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                    <span className="font-semibold">Fibras</span>
                                </div>
                                <span className="font-semibold text-base">{fiber}g</span>
                            </div>

                            <Separator className="mt-2 mb-2" />

                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-3 w-3 rounded-full bg-gray-500" />
                                <div className="flex items-center justify-between w-full gap-10">
                                    <span className="font-semibold">Calorias</span>
                                    <span className="font-semibold text-base">
                                        {totalCalories} Kcal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
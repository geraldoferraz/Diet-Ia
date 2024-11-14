"use client"
import { Pie, PieChart, Label } from "recharts"

import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { NutritionCardTitle } from "./NutrtionCardTitle"

const chartData = [
{ nutrient: "Carbohydrate", percentage: 50, fill: "#32CD32" },
{ nutrient: "Protein", percentage: 30, fill: "#1E90FF" },
{ nutrient: "Fat", percentage: 20, fill: "#FF4500" },
]

export function NutritionSummaryCard() {
const totalCalories = 2000

    return (
    <>
    <NutritionCardTitle/>
        <Card className="flex flex-col items-center">
        <CardHeader className="items-center pb-0">
            <CardTitle>Nutrition Summary</CardTitle>
            <CardDescription>Daily breakdown of macronutrients</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-6">
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
                <span className="font-semibold text-base">{item.percentage}%</span>
                </div>
            ))}

            <Separator className="mt-2 mb-2"/>

            <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-gray-500" />
                <div className="flex items-center gap-40">
                    <span className="font-semibold">Calories</span>
                    <span className="font-semibold text-base">{totalCalories} Kcal</span>
                </div>
            </div>
            </div>
        </CardContent>
    </Card>
    </>
    )
}

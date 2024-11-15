import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardTitle } from "@/components/ui/card"


export function NutritionCardTitle(){

    return(
        <>
            <Card className="mb-8 mt-8">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Estatísticas dos alimentos
                        <Button className="flex justify-between items-center gap-3 text-base">
                            Veja as estatísticas
                        </Button>
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}
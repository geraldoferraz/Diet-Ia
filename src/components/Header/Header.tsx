import { Home } from "lucide-react";
import { FaDumbbell } from "react-icons/fa";
// import { AccountMenu } from "./Account-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
// import { IoStatsChart } from "react-icons/io5";


export function Header(){
    return(
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 p-6 justify-between">
                <div className="flex justify-center items-center gap-2 pr-3">
                    <FaDumbbell className="h-5 w-5" />
                    <Separator orientation="vertical" className="h-6 w-0.5 font-bold" />
                    <h2 className="text-lg font-bold">Diet.IA</h2>
                </div>


                <div className="flex justify-between gap-8">
                    <Button variant="outline" className="text-base">
                        <Home className="h-4 w-4 font-bold"/>
                        Home
                    </Button>

                    <Button className="flex items-center gap-3 text-base font-semibold">
                        Veja as estatísticas
                    </Button>
                </div>
            </div>
        </div>
    );
}
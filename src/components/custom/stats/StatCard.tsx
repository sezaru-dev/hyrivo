import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export function StatCard({ title, value, change, isPositive = true }: StatCardProps) {
  return (
    <Card className="w-full bg-muted/20">
      <CardContent className={`p-6  ${change ? "grid grid-cols-4" : ""}`}>
        {change ?
          <div className="col-span-3 flex flex-col justify-center">
            <div className="text-sm text-muted-foreground mb-2">{title}</div>
            <div className="text-3xl font-semibold text-sidebar-primary">{value}</div>
          </div>
          :
          <>
            <div className="text-sm text-muted-foreground mb-2">{title}</div>
            <div className="text-3xl font-semibold text-sidebar-primary">{value}</div>
          </> 
        }
        {
          !change || 
          <div className={`mt-1 text-xs font-medium col-span-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            <p className=" border border-muted p-1 w-min rounded-full">
              {isPositive ? "+" : ""}{change}
            </p>
          </div>
        }
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | React.ReactNode  ;
  change?: string;
  isPositive?: boolean;
}

export function StatCard({ title, value, change, isPositive = true }: StatCardProps) {
  return (
    <Card className="w-full bg-muted/20">
      <CardContent className={`p-6  ${change ? "flex items-start justify-between" : ""}`}>
        {change ?
          <div className="col-span-3 flex flex-col justify-center">
            <h2 className="text-sm text-muted-foreground mb-2">{title}</h2>
            <p className="text-3xl font-semibold text-primary">{value}</p>
          </div>
          :
          <>
            <h2 className="text-sm text-muted-foreground mb-2">{title}</h2>
            <p className="text-3xl font-semibold text-primary">{value}</p>
          </> 
        }
        {
          !change || 
          <div className={`mt-1 text-xs font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            <p className=" border border-muted p-1 w-min rounded-full">
              {isPositive ? "+" : ""}{change}
            </p>
          </div>
        }
      </CardContent>
    </Card>
  );
}

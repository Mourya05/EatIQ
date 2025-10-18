import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionData {
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface NutritionCardProps {
  data: NutritionData;
  imageUrl: string;
}

export const NutritionCard = ({ data, imageUrl }: NutritionCardProps) => {
  const MacroBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-foreground/80 uppercase tracking-wide">{label}</span>
        <span className="text-xl font-black text-foreground">{value}g</span>
      </div>
      <div className="h-3.5 bg-muted rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color} shadow-lg`}
          style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-[var(--shadow-elevated)] border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-[var(--shadow-glow)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt="Analyzed meal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white drop-shadow-lg">Nutrition Breakdown</h3>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full shadow-lg">
              <Flame className="w-5 h-5 text-white" />
              <span className="text-2xl font-black text-white">{data.total.calories}</span>
              <span className="text-sm font-bold text-white/90">kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-gradient-to-b from-card to-card/50">
        {/* Food Items List */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-foreground/60 uppercase tracking-wide">Detected Items</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {data.food.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1">
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.quantity}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-foreground/70">
                    <span className="font-bold text-foreground">{item.calories}</span> cal
                  </span>
                  <span className="text-secondary">
                    <span className="font-bold">{item.protein}</span>g P
                  </span>
                  <span className="text-primary">
                    <span className="font-bold">{item.carbs}</span>g C
                  </span>
                  <span className="text-accent">
                    <span className="font-bold">{item.fat}</span>g F
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Macros */}
        <div className="space-y-4 pt-4 border-t-2 border-primary/20">
          <h4 className="text-sm font-bold text-foreground/60 uppercase tracking-wide">Total Macros</h4>
          <MacroBar label="Protein" value={data.total.protein} color="bg-secondary" />
          <MacroBar label="Carbs" value={data.total.carbs} color="bg-primary" />
          <MacroBar label="Fat" value={data.total.fat} color="bg-accent" />
        </div>
      </div>
    </Card>
  );
};

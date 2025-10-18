import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { NutritionCard } from "@/components/NutritionCard";
import { Sparkles, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroFood from "@/assets/hero-food.jpg";
import exampleMeal from "@/assets/example-meal.jpg";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<{
    food: Array<{
      name: string;
      quantity: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
    total: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    toast({
      title: "Analyzing image...",
      description: "Sending to AI for analysis",
    });

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5678/webhook-test/meal-ai', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      
      // Handle array response format: [{ output: { status, food, total } }]
      const result = Array.isArray(data) ? data[0].output : data.output;

      setNutritionData({
        food: result.food,
        total: result.total,
      });

      toast({
        title: "Analysis complete!",
        description: `Found ${result.food.length} items in your meal`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      setSelectedImage(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroFood} 
            alt="Delicious healthy meal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
          <div className="absolute inset-0" style={{ background: 'var(--gradient-overlay)' }} />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-bold text-primary border border-primary/30">
                <Zap className="w-4 h-4" />
                AI-Powered Instant Analysis
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                  <span className="text-foreground">Eat</span>
                  <span className="text-primary">IQ</span>
                </h1>
                
                <p className="text-2xl md:text-3xl font-bold text-foreground/90 leading-tight">
                  Know what you eat,<br />
                  <span className="text-primary">eat what you need</span>
                </p>
                
                <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
                  Snap any meal and get instant macros—protein, carbs, fat, and calories. No guesswork, just real data to fuel your goals.
                </p>
              </div>

              {/* Upload Section */}
              {!nutritionData && (
                <div className="pt-4">
                  <ImageUpload onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />
                </div>
              )}

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">AI Vision</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">100% Accurate</span>
                </div>
              </div>
            </div>

            {/* Right Column - Example Card */}
            {!nutritionData && (
              <div className="hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl" />
                  <NutritionCard 
                    data={{
                      food: [
                        { name: "Salmon Poke", quantity: "200g", calories: 280, protein: 25, carbs: 15, fat: 12 },
                        { name: "Brown Rice", quantity: "150g", calories: 165, protein: 3, carbs: 35, fat: 1 },
                        { name: "Avocado", quantity: "50g", calories: 80, protein: 1, carbs: 4, fat: 7 },
                      ],
                      total: { calories: 525, protein: 29, carbs: 54, fat: 20 }
                    }}
                    imageUrl={exampleMeal}
                  />
                  <div className="absolute -top-3 -right-3 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-[var(--shadow-elevated)] rotate-12">
                    Try it now! 🔥
                  </div>
                </div>
              </div>
            )}

            {/* Show Result on Both Columns */}
            {nutritionData && (
              <div className="lg:col-span-2 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <NutritionCard data={nutritionData} imageUrl={selectedImage!} />
                <div className="text-center">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setNutritionData(null);
                    }}
                    className="text-lg font-bold text-primary hover:text-accent transition-colors hover:scale-105 transform duration-200 inline-flex items-center gap-2"
                  >
                    Analyze Another Meal <span className="text-2xl">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          Powered by AI vision technology
        </p>
      </div>
    </div>
  );
};

export default Index;

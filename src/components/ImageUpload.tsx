import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelect, isAnalyzing }: ImageUploadProps) => {
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }
      onImageSelect(file);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onImageSelect(file);
    };
    input.click();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isAnalyzing}
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            size="lg"
            className="w-full h-20 text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 shadow-[var(--shadow-glow)] hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
            disabled={isAnalyzing}
            asChild
          >
            <div className="flex items-center gap-3">
              <Upload className="w-6 h-6" />
              Analyze My Meal
            </div>
          </Button>
        </label>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={handleCameraCapture}
        disabled={isAnalyzing}
        className="w-full h-16 text-lg font-bold border-2 border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
      >
        <Camera className="w-6 h-6 mr-3" />
        Snap a Photo
      </Button>
    </div>
  );
};

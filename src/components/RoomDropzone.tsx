import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Upload, Image as ImageIcon, X, Sparkles, Loader2,
  Home, Sofa, Lightbulb, Palette, Check, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Room3DAnalysisPreview from './Room3DAnalysisPreview';

interface AnalysisResult {
  roomType: string;
  dimensions: string;
  currentStyle: string;
  suggestions: {
    title: string;
    description: string;
    category: 'furniture' | 'lighting' | 'color' | 'decor';
    estimatedCost: string;
  }[];
  moodBoard: string[];
  overallScore: number;
}

interface RoomDropzoneProps {
  onAnalysisComplete?: (result: AnalysisResult, imageData: string) => void;
  className?: string;
}

const RoomDropzone: React.FC<RoomDropzoneProps> = ({ onAnalysisComplete, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setAnalysisResult(null);
      setIsSaved(false);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const saveAnalysis = async () => {
    if (!analysisResult || !image) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: 'Login Required',
        description: 'Please sign in to save room analyses.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('room_analyses').insert({
        user_id: session.user.id,
        room_type: analysisResult.roomType,
        dimensions: analysisResult.dimensions,
        current_style: analysisResult.currentStyle,
        suggestions: analysisResult.suggestions,
        mood_board: analysisResult.moodBoard,
        overall_score: analysisResult.overallScore,
        image_url: image,
      });

      if (error) throw error;

      setIsSaved(true);
      toast({
        title: 'Analysis Saved!',
        description: 'Room analysis has been saved to your profile.',
      });
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: 'Save Failed',
        description: error.message || 'Could not save analysis. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const analyzeRoom = async () => {
    if (!image) return;
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: 'Login Required',
        description: 'Please sign in to use AI room analysis.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-room', {
        body: { image }
      });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Handle specific HTTP error codes
        const errorMessage = error.message || '';
        
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
          toast({
            title: 'Session Expired',
            description: 'Please sign in again to continue.',
            variant: 'destructive',
          });
          setIsAnalyzing(false);
          return;
        }
        
        if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
          toast({
            title: 'Rate Limit Exceeded',
            description: 'Too many requests. Please wait a moment and try again.',
            variant: 'destructive',
          });
          setIsAnalyzing(false);
          return;
        }
        
        if (errorMessage.includes('402') || errorMessage.includes('credits')) {
          toast({
            title: 'Credits Exhausted',
            description: 'AI credits have been used up. Please try again later.',
            variant: 'destructive',
          });
          setIsAnalyzing(false);
          return;
        }
        
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data);
      onAnalysisComplete?.(data, image);
      
      toast({
        title: 'Analysis Complete!',
        description: `Detected: ${data.roomType} - ${data.suggestions.length} suggestions generated.`,
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Could not analyze room. Please try again.',
        variant: 'destructive',
      });
    }
    
    setIsAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setAnalysisResult(null);
    setIsSaved(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'furniture': return <Sofa className="w-4 h-4" />;
      case 'lighting': return <Lightbulb className="w-4 h-4" />;
      case 'color': return <Palette className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'furniture': return 'bg-blue-500/10 text-blue-600';
      case 'lighting': return 'bg-yellow-500/10 text-yellow-600';
      case 'color': return 'bg-pink-500/10 text-pink-600';
      default: return 'bg-green-500/10 text-green-600';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!image ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className={cn(
            "flex flex-col items-center transition-transform duration-300",
            isDragging && "scale-110"
          )}>
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors",
              isDragging ? "bg-primary/20" : "bg-muted"
            )}>
              {isDragging ? (
                <ImageIcon className="w-8 h-8 text-primary" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <p className="text-lg font-medium mb-1">
              {isDragging ? 'Drop your image here' : 'Drag & drop room photo'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>
        </label>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <img
              src={image}
              alt="Uploaded room"
              className="w-full h-64 object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={reset}
              className="absolute top-3 right-3"
            >
              <X className="w-4 h-4" />
            </Button>
            
            {!analysisResult && !isAnalyzing && (
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                <Button
                  onClick={analyzeRoom}
                  className="w-full gap-2 bg-gradient-copper hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Room with AI
                </Button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-muted" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <p className="font-medium">Analyzing room with OpenAI...</p>
                  <p className="text-sm text-muted-foreground">
                    Detecting room type, layout & style
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <CardTitle className="text-lg">{analysisResult.roomType}</CardTitle>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      Score: {analysisResult.overallScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-xl bg-muted">
                      <p className="text-muted-foreground text-xs">Style</p>
                      <p className="font-medium truncate">{analysisResult.currentStyle}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted">
                      <p className="text-muted-foreground text-xs">Size</p>
                      <p className="font-medium truncate">{analysisResult.dimensions}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.moodBoard.map((mood, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {mood}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Top Suggestions</p>
                    {analysisResult.suggestions.slice(0, 3).map((suggestion, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <div className={cn("p-1.5 rounded-md", getCategoryColor(suggestion.category))}>
                          {getCategoryIcon(suggestion.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{suggestion.title}</p>
                          <p className="text-xs text-muted-foreground">{suggestion.estimatedCost}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={saveAnalysis} 
                      disabled={isSaving || isSaved}
                      className="flex-1 gap-2"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isSaved ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSaved ? 'Saved to Profile' : 'Save to Profile'}
                    </Button>
                    <Button variant="outline" onClick={reset}>
                      New Room
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 3D Preview */}
              <Room3DAnalysisPreview 
                roomType={analysisResult.roomType}
                suggestions={analysisResult.suggestions}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomDropzone;

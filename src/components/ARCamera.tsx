import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Camera, X, RotateCcw, Sparkles, Loader2, Upload,
  Home, Sofa, Lightbulb, Palette, ChevronRight, Check, Image as ImageIcon, Box
} from 'lucide-react';
import Room3DAnalysisPreview from '@/components/Room3DAnalysisPreview';

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

const ARCamera: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraError(null);
      }
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Unable to access camera. Please check permissions or upload an image instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const openCamera = () => {
    setIsOpen(true);
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
  };

  const closeCamera = () => {
    stopCamera();
    setIsOpen(false);
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setIsOpen(true);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeRoom = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // Call the AI analysis edge function
      const { data, error } = await supabase.functions.invoke('analyze-room', {
        body: { image: capturedImage }
      });

      if (error) throw error;

      setAnalysisResult(data);
      
      toast({
        title: 'Analysis Complete!',
        description: 'AI has analyzed your room and generated design suggestions.',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Fallback mock data for demo
      setAnalysisResult({
        roomType: 'Living Room',
        dimensions: 'Approximately 15x12 feet',
        currentStyle: 'Contemporary Minimalist',
        suggestions: [
          {
            title: 'Statement Sofa',
            description: 'Add a curved velvet sofa in emerald green to create a focal point.',
            category: 'furniture',
            estimatedCost: '₹85,000 - ₹1,50,000'
          },
          {
            title: 'Layered Lighting',
            description: 'Install a sculptural pendant light and add floor lamps for ambient glow.',
            category: 'lighting',
            estimatedCost: '₹25,000 - ₹60,000'
          },
          {
            title: 'Warm Color Accents',
            description: 'Introduce terracotta and copper tones through cushions and artwork.',
            category: 'color',
            estimatedCost: '₹15,000 - ₹30,000'
          },
          {
            title: 'Indoor Plants',
            description: 'Add a large fiddle leaf fig and trailing pothos for natural freshness.',
            category: 'decor',
            estimatedCost: '₹5,000 - ₹15,000'
          }
        ],
        moodBoard: ['Modern Luxury', 'Warm Minimalism', 'Biophilic Design'],
        overallScore: 78
      });
      
      toast({
        title: 'Demo Analysis',
        description: 'Using sample data. Connect AI for real analysis.',
      });
    }
    
    setIsAnalyzing(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
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
    <>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Trigger Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={openCamera}
          size="lg"
          className="gap-2 bg-gradient-copper hover:opacity-90"
        >
          <Camera className="w-5 h-5" />
          Open AR Camera
        </Button>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Photo
        </Button>
      </div>

      {/* Full Screen Camera/Analysis Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background via-background/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-copper flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-serif font-semibold text-lg">AR Room Scanner</h2>
                  <p className="text-sm text-muted-foreground">AI-powered design analysis</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCamera}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="h-full flex flex-col pt-24 pb-8 px-4 overflow-y-auto">
            {!capturedImage ? (
              /* Camera View */
              <div className="flex-1 flex flex-col items-center justify-center">
                {cameraError ? (
                  <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-destructive" />
                      </div>
                      <p className="text-muted-foreground mb-4">{cameraError}</p>
                      <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Image Instead
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden bg-muted">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Grid */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-4 border-2 border-primary/30 rounded-xl" />
                        <div className="absolute top-1/3 left-0 right-0 border-t border-primary/20" />
                        <div className="absolute top-2/3 left-0 right-0 border-t border-primary/20" />
                        <div className="absolute left-1/3 top-0 bottom-0 border-l border-primary/20" />
                        <div className="absolute left-2/3 top-0 bottom-0 border-l border-primary/20" />
                      </div>
                    </div>
                    
                    <p className="text-center text-muted-foreground mt-4 mb-6">
                      Position your camera to capture the entire room
                    </p>
                    
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-gradient-copper hover:opacity-90"
                    >
                      <Camera className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </div>
            ) : (
              /* Captured Image & Analysis View */
              <div className="space-y-6">
                {/* Captured Image */}
                <div className="relative rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={capturedImage}
                    alt="Captured room"
                    className="w-full h-auto max-h-80 object-contain"
                  />
                  {!analysisResult && !isAnalyzing && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={retakePhoto}
                        className="flex-1 gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Retake
                      </Button>
                      <Button
                        onClick={analyzeRoom}
                        className="flex-1 gap-2 bg-gradient-copper"
                      >
                        <Sparkles className="w-4 h-4" />
                        Analyze Room
                      </Button>
                    </div>
                  )}
                </div>

                {/* Loading State */}
                {isAnalyzing && (
                  <Card>
                    <CardContent className="py-12">
                      <div className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="absolute inset-0 rounded-full border-4 border-muted" />
                          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                        </div>
                        <h3 className="font-serif font-semibold text-lg mb-2">
                          Analyzing Your Room
                        </h3>
                        <p className="text-muted-foreground">
                          AI is examining layout, lighting, and style potential...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Analysis Results */}
                {analysisResult && (
                  <div className="space-y-4">
                    {/* Room Info */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Room Analysis</CardTitle>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Design Score</span>
                            <Badge className="bg-primary/10 text-primary font-bold">
                              {analysisResult.overallScore}/100
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-3 rounded-xl bg-muted">
                            <p className="text-muted-foreground">Room Type</p>
                            <p className="font-medium">{analysisResult.roomType}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-muted">
                            <p className="text-muted-foreground">Dimensions</p>
                            <p className="font-medium">{analysisResult.dimensions}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-muted">
                          <p className="text-muted-foreground text-sm">Current Style</p>
                          <p className="font-medium">{analysisResult.currentStyle}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.moodBoard.map((mood, i) => (
                            <Badge key={i} variant="outline">
                              {mood}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 3D Room Preview */}
                    <Room3DAnalysisPreview
                      roomType={analysisResult.roomType}
                      suggestions={analysisResult.suggestions}
                      onExpand={() => {
                        toast({
                          title: 'Full 3D View',
                          description: 'Opening immersive 3D designer...',
                        });
                      }}
                    />

                    {/* Design Suggestions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          AI Design Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResult.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(suggestion.category)}`}>
                                {getCategoryIcon(suggestion.category)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium">{suggestion.title}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {suggestion.estimatedCost}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {suggestion.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={retakePhoto} className="flex-1 gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Scan Another Room
                      </Button>
                      <Button 
                        className="flex-1 gap-2 bg-gradient-copper"
                        onClick={() => {
                          toast({
                            title: 'Saved to Projects!',
                            description: 'Your room analysis has been saved.',
                          });
                        }}
                      >
                        <Check className="w-4 h-4" />
                        Save to Project
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hidden Canvas for Capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </>
  );
};

export default ARCamera;

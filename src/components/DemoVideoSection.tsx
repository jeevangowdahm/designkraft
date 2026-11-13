import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DemoVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const demoSteps = [
    { time: 0, title: 'Upload Your Room Photo', description: 'Simply drag and drop or click to upload' },
    { time: 3, title: 'AI Analyzes Your Space', description: 'Our AI identifies room type, dimensions, and style' },
    { time: 6, title: 'Get Design Recommendations', description: 'Receive personalized suggestions for furniture and decor' },
    { time: 9, title: 'View 3D Preview', description: 'See your transformed room in interactive 3D' },
    { time: 12, title: 'Get Instant Quote', description: 'Receive detailed cost breakdown in INR' },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const step = demoSteps.findIndex((s, i) => {
        const nextTime = demoSteps[i + 1]?.time || Infinity;
        return currentTime >= s.time && currentTime < nextTime;
      });
      if (step !== -1) setCurrentStep(step);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteClick = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
  };

  const jumpToStep = (stepIndex: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = demoSteps[stepIndex].time;
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="demo-video" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              See DesignKraft India in Action
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Transform Your Room in Minutes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch how our AI-powered platform analyzes your room and delivers personalized design recommendations instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Container */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl bg-charcoal">
              <div className="aspect-video relative">
                {/* Animated Demo Screens */}
                <div className="w-full h-full bg-gradient-to-br from-charcoal via-charcoal/95 to-primary/20 relative overflow-hidden">
                  {/* App Interface Mockup */}
                  <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Bar */}
                    <div className="h-12 bg-primary/10 border-b border-border/50 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="ml-4 text-sm font-medium text-foreground">DesignKraft India - AI Room Analyzer</span>
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-6 h-[calc(100%-3rem)] flex items-center justify-center">
                      <div className="text-center">
                        {currentStep === 0 && (
                          <div className="animate-fade-in">
                            <div className="w-32 h-32 mx-auto mb-4 border-4 border-dashed border-primary/50 rounded-2xl flex items-center justify-center">
                              <span className="text-4xl">📷</span>
                            </div>
                            <p className="text-lg font-medium">Drop your room photo here</p>
                          </div>
                        )}
                        {currentStep === 1 && (
                          <div className="animate-fade-in">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse">
                              <span className="text-4xl">🔍</span>
                            </div>
                            <p className="text-lg font-medium">AI Analyzing...</p>
                            <div className="w-48 h-2 bg-muted rounded-full mx-auto mt-4 overflow-hidden">
                              <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
                            </div>
                          </div>
                        )}
                        {currentStep === 2 && (
                          <div className="animate-fade-in grid grid-cols-2 gap-4">
                            <div className="bg-muted p-4 rounded-xl">
                              <span className="text-2xl">🛋️</span>
                              <p className="text-sm mt-2">Living Room Detected</p>
                            </div>
                            <div className="bg-muted p-4 rounded-xl">
                              <span className="text-2xl">📐</span>
                              <p className="text-sm mt-2">250 sq ft</p>
                            </div>
                            <div className="bg-muted p-4 rounded-xl">
                              <span className="text-2xl">🎨</span>
                              <p className="text-sm mt-2">Modern Style</p>
                            </div>
                            <div className="bg-muted p-4 rounded-xl">
                              <span className="text-2xl">⭐</span>
                              <p className="text-sm mt-2">Score: 72/100</p>
                            </div>
                          </div>
                        )}
                        {currentStep === 3 && (
                          <div className="animate-fade-in">
                            <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                              <span className="text-6xl">🏠</span>
                            </div>
                            <p className="text-lg font-medium mt-4">Interactive 3D Preview</p>
                          </div>
                        )}
                        {currentStep === 4 && (
                          <div className="animate-fade-in">
                            <div className="text-4xl font-serif font-bold text-primary mb-2">₹2,85,000</div>
                            <p className="text-muted-foreground">Estimated Project Cost</p>
                            <div className="flex justify-center gap-4 mt-4">
                              <span className="bg-muted px-3 py-1 rounded-full text-xs">Materials: ₹1,20,000</span>
                              <span className="bg-muted px-3 py-1 rounded-full text-xs">Labor: ₹85,000</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 bg-charcoal/60 flex items-center justify-center cursor-pointer group"
                    onClick={handlePlayClick}
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={handlePlayClick}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={handleRestart}
                      >
                        <RotateCcw className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={handleMuteClick}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={handleFullscreen}
                      >
                        <Maximize2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden Video for audio/timing */}
              <video
                ref={videoRef}
                className="hidden"
                muted={isMuted}
                loop
                playsInline
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-lg text-foreground mb-4">How It Works</h3>
              {demoSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => jumpToStep(index)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    currentStep === index
                      ? 'bg-primary/10 border-primary shadow-lg'
                      : 'bg-card border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${currentStep === index ? 'text-primary' : 'text-foreground'}`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Features Below Video */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">50+ Cities</h3>
              <p className="text-muted-foreground text-sm">
                Serving customers from Mumbai to Kolkata with local expertise
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">
                Smart room analysis with instant design recommendations
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">₹</span>
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground text-sm">
                City-specific rates with detailed cost breakdowns in INR
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;

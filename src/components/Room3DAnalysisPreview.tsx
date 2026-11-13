import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Box, Plane } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw, Maximize2, Sparkles } from 'lucide-react';

interface Room3DAnalysisPreviewProps {
  roomType: string;
  suggestions?: {
    title: string;
    category: 'furniture' | 'lighting' | 'color' | 'decor';
  }[];
  onExpand?: () => void;
}

const materialColors: Record<string, string> = {
  'Living Room': '#b5894f',
  'Bedroom': '#5d4037',
  'Kitchen': '#d4a574',
  'Bathroom': '#e8e4e0',
  'Office': '#9e9e9e',
  'Dining Room': '#c9a66b',
  'Temple': '#DAA520',
  'Puja Room': '#DAA520',
};

const Furniture: React.FC<{ roomType: string }> = ({ roomType }) => {
  const furnitureColor = '#5d4037';
  const fabricColor = '#4a6741';
  const metalColor = '#c0c0c0';
  const accentColor = '#d4a574';

  const type = roomType.toLowerCase();

  if (type.includes('living')) {
    return (
      <>
        {/* L-Shape Sofa */}
        <group position={[-0.3, 0.25, -1.2]}>
          <Box args={[1.8, 0.35, 0.7]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[1.8, 0.5, 0.1]} position={[0, 0.25, -0.3]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          {/* Cushions */}
          <Box args={[0.3, 0.12, 0.3]} position={[-0.5, 0.23, -0.05]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
          <Box args={[0.3, 0.12, 0.3]} position={[0.3, 0.23, -0.05]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
        </group>
        {/* Coffee Table */}
        <group position={[0, 0.12, 0.2]}>
          <Box args={[0.7, 0.02, 0.45]} position={[0, 0.1, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} metalness={0.9} />
          </Box>
          <Box args={[0.6, 0.1, 0.35]} position={[0, 0.03, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
        </group>
        {/* TV Unit */}
        <Box args={[1.2, 0.3, 0.25]} position={[0, 0.15, 1.7]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[1, 0.6, 0.03]} position={[0, 0.65, 1.8]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        {/* Plant */}
        <group position={[1.4, 0, -1.2]}>
          <Box args={[0.2, 0.3, 0.2]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.3, 0.45, 0.3]} position={[0, 0.52, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Box>
        </group>
        {/* Rug */}
        <Box args={[1.4, 0.01, 1]} position={[0, 0.005, 0.2]}>
          <meshStandardMaterial color="#8B6914" />
        </Box>
      </>
    );
  }

  if (type.includes('bedroom')) {
    return (
      <>
        {/* Bed */}
        <group position={[0, 0.15, -0.8]}>
          <Box args={[1.4, 0.15, 1.6]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[1.35, 0.1, 1.55]} position={[0, 0.12, 0]}>
            <meshStandardMaterial color="#f5f5f5" />
          </Box>
          {/* Headboard */}
          <Box args={[1.4, 0.7, 0.08]} position={[0, 0.42, -0.76]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Pillows */}
          <Box args={[0.4, 0.08, 0.25]} position={[-0.35, 0.26, -0.55]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.4, 0.08, 0.25]} position={[0.35, 0.26, -0.55]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Blanket */}
          <Box args={[1.3, 0.05, 1.1]} position={[0, 0.2, 0.2]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
        </group>
        {/* Nightstands */}
        <Box args={[0.35, 0.4, 0.3]} position={[-1.1, 0.2, -1]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[0.35, 0.4, 0.3]} position={[1.1, 0.2, -1]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Lamps */}
        <Box args={[0.1, 0.25, 0.1]} position={[-1.1, 0.52, -1]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        <Box args={[0.1, 0.25, 0.1]} position={[1.1, 0.52, -1]}>
          <meshStandardMaterial color="#f5f5dc" />
        </Box>
        {/* Wardrobe */}
        <Box args={[0.9, 1.6, 0.45]} position={[1.5, 0.8, 0.5]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
      </>
    );
  }

  if (type.includes('kitchen')) {
    return (
      <>
        {/* L-Shape Counter */}
        <Box args={[2.5, 0.6, 0.45]} position={[0, 0.3, -1.6]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[2.5, 0.03, 0.5]} position={[0, 0.62, -1.6]}>
          <meshStandardMaterial color="#f0f0f0" metalness={0.3} />
        </Box>
        <Box args={[0.45, 0.6, 1.5]} position={[-1.5, 0.3, -0.8]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[0.5, 0.03, 1.5]} position={[-1.5, 0.62, -0.8]}>
          <meshStandardMaterial color="#f0f0f0" metalness={0.3} />
        </Box>
        {/* Upper Cabinets */}
        <Box args={[2.5, 0.5, 0.28]} position={[0, 1.5, -1.72]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Range Hood */}
        <Box args={[0.6, 0.3, 0.35]} position={[0.5, 1.1, -1.65]}>
          <meshStandardMaterial color={metalColor} metalness={0.7} />
        </Box>
        {/* Refrigerator */}
        <Box args={[0.55, 1.4, 0.5]} position={[1.6, 0.7, -1.55]}>
          <meshStandardMaterial color={metalColor} metalness={0.5} />
        </Box>
        {/* Island */}
        <group position={[0, 0.35, 0.4]}>
          <Box args={[1.2, 0.65, 0.6]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[1.25, 0.03, 0.65]} position={[0, 0.34, 0]}>
            <meshStandardMaterial color="#f0f0f0" metalness={0.3} />
          </Box>
        </group>
      </>
    );
  }

  if (type.includes('bathroom')) {
    return (
      <>
        {/* Vanity */}
        <Box args={[1.4, 0.6, 0.4]} position={[0, 0.3, -1.65]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[1.4, 0.03, 0.45]} position={[0, 0.62, -1.65]}>
          <meshStandardMaterial color="#f5f5f5" metalness={0.2} />
        </Box>
        {/* Mirror */}
        <Box args={[1.2, 0.7, 0.02]} position={[0, 1.2, -1.88]}>
          <meshStandardMaterial color="#d4e5f7" metalness={0.95} roughness={0.05} />
        </Box>
        {/* Bathtub */}
        <group position={[-1.2, 0, 0.3]}>
          <Box args={[0.7, 0.45, 1.3]} position={[0, 0.22, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.55, 0.4, 1.15]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#e8f4f8" />
          </Box>
        </group>
        {/* Glass Shower */}
        <group position={[1.2, 0, 0]}>
          <Box args={[0.85, 1.6, 0.02]} position={[0, 0.8, -0.42]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
          </Box>
          <Box args={[0.02, 1.6, 0.85]} position={[-0.42, 0.8, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
          </Box>
        </group>
        {/* Toilet */}
        <group position={[0, 0, 1.2]}>
          <Box args={[0.35, 0.3, 0.5]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.32, 0.45, 0.15]} position={[0, 0.37, -0.17]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
        </group>
      </>
    );
  }

  if (type.includes('office')) {
    return (
      <>
        {/* L-Desk */}
        <group position={[0, 0.3, -1.4]}>
          <Box args={[1.6, 0.03, 0.6]} position={[0, 0.27, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[0.03, 0.55, 0.55]} position={[-0.78, 0, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          <Box args={[0.03, 0.55, 0.55]} position={[0.78, 0, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
        </group>
        {/* Monitors */}
        <Box args={[0.45, 0.3, 0.02]} position={[-0.25, 0.75, -1.5]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        <Box args={[0.45, 0.3, 0.02]} position={[0.25, 0.75, -1.5]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        {/* Chair */}
        <group position={[0, 0.22, -0.4]}>
          <Box args={[0.4, 0.06, 0.38]} position={[0, 0.32, 0]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[0.4, 0.5, 0.06]} position={[0, 0.6, -0.16]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[0.06, 0.32, 0.06]} position={[0, 0.16, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
        </group>
        {/* Bookshelf */}
        <group position={[1.6, 0, 0]}>
          <Box args={[0.28, 1.5, 0.6]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[0.2, 0.22, 0.15]} position={[0, 1.25, 0.15]}>
            <meshStandardMaterial color="#8B0000" />
          </Box>
          <Box args={[0.2, 0.2, 0.15]} position={[0, 0.95, -0.08]}>
            <meshStandardMaterial color="#00008B" />
          </Box>
        </group>
      </>
    );
  }

  if (type.includes('temple') || type.includes('puja')) {
    const goldColor = '#DAA520';
    const marbleColor = '#f5f5f5';
    const redColor = '#8B0000';
    
    return (
      <>
        {/* Main Mandir */}
        <group position={[0, 0, -1.5]}>
          {/* Base */}
          <Box args={[1.6, 0.1, 0.55]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color={marbleColor} metalness={0.1} />
          </Box>
          {/* Cabinet */}
          <Box args={[1.4, 1.2, 0.5]} position={[0, 0.7, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Inner Gold */}
          <Box args={[1.2, 1, 0.05]} position={[0, 0.7, 0.18]}>
            <meshStandardMaterial color={goldColor} metalness={0.6} />
          </Box>
          {/* Dome */}
          <Box args={[1.5, 0.2, 0.52]} position={[0, 1.4, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Pillars */}
          <Box args={[0.06, 1.1, 0.06]} position={[-0.6, 0.65, 0.25]}>
            <meshStandardMaterial color={goldColor} metalness={0.5} />
          </Box>
          <Box args={[0.06, 1.1, 0.06]} position={[0.6, 0.65, 0.25]}>
            <meshStandardMaterial color={goldColor} metalness={0.5} />
          </Box>
        </group>
        {/* Diya Stand */}
        <Box args={[0.4, 0.05, 0.25]} position={[0, 0.025, -0.3]}>
          <meshStandardMaterial color={marbleColor} />
        </Box>
        {/* Prayer Mat */}
        <Box args={[0.8, 0.015, 0.6]} position={[0, 0.007, 0.7]}>
          <meshStandardMaterial color={redColor} />
        </Box>
        {/* Bell */}
        <Box args={[0.1, 0.18, 0.1]} position={[0, 1.65, -1.2]}>
          <meshStandardMaterial color="#CD853F" metalness={0.8} />
        </Box>
        {/* Om Symbol */}
        <Box args={[0.25, 0.25, 0.015]} position={[0, 1.75, -1.9]}>
          <meshStandardMaterial color={goldColor} metalness={0.7} />
        </Box>
      </>
    );
  }

  // Default furniture
  return (
    <>
      <Box args={[1.2, 0.35, 0.5]} position={[0, 0.17, -1.3]}>
        <meshStandardMaterial color={fabricColor} />
      </Box>
      <Box args={[0.5, 0.18, 0.35]} position={[0, 0.09, 0]}>
        <meshStandardMaterial color={furnitureColor} />
      </Box>
    </>
  );
};

const RoomScene: React.FC<{ roomType: string }> = ({ roomType }) => {
  const floorColor = useMemo(() => materialColors[roomType] || '#b5894f', [roomType]);
  const wallColor = '#f5f0eb';

  return (
    <>
      <PerspectiveCamera makeDefault position={[3.5, 3, 3.5]} fov={45} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffd7a8" />
      <pointLight position={[-1.5, 2, -1.5]} intensity={0.3} color="#ffecd2" />

      <Environment preset="apartment" />

      {/* Floor */}
      <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color={floorColor} roughness={0.3} />
      </Plane>

      {/* Back Wall */}
      <Plane args={[4, 2.5]} position={[0, 1.25, -2]} receiveShadow>
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </Plane>

      {/* Left Wall */}
      <Plane args={[4, 2.5]} position={[-2, 1.25, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </Plane>

      {/* Right Wall with Window */}
      <Plane args={[4, 2.5]} position={[2, 1.25, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </Plane>

      {/* Window */}
      <group position={[1.99, 1.4, 0]}>
        <Box args={[0.02, 0.9, 1.1]}>
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} />
        </Box>
      </group>

      {/* Furniture */}
      <Furniture roomType={roomType} />

      {/* Accent light beam */}
      <pointLight position={[1, 0.5, 1]} intensity={0.2} color="#ffd700" />
    </>
  );
};

const Room3DAnalysisPreview: React.FC<Room3DAnalysisPreviewProps> = ({
  roomType,
  suggestions,
  onExpand,
}) => {
  const enhancementCount = suggestions?.length || 0;

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            3D Design Preview
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {enhancementCount} Enhancements
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* 3D Canvas */}
        <div className="relative h-64 bg-gradient-to-b from-muted/30 to-muted/60">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            }
          >
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
              <RoomScene roomType={roomType} />
            </Canvas>
          </Suspense>

          {/* Overlay Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
              {roomType}
            </Badge>
          </div>

          {/* Controls Hint */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-2 py-1 rounded-md">
              <RotateCcw className="w-3 h-3 inline mr-1" />
              Auto-rotating
            </span>
            {onExpand && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onExpand}
                className="gap-1 bg-background/80 backdrop-blur-sm"
              >
                <Maximize2 className="w-3 h-3" />
                Full View
              </Button>
            )}
          </div>
        </div>

        {/* Enhancement Preview */}
        {suggestions && suggestions.length > 0 && (
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <p className="text-xs text-muted-foreground mb-2">Applied Suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.slice(0, 4).map((suggestion, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs bg-background/50"
                >
                  {suggestion.title}
                </Badge>
              ))}
              {suggestions.length > 4 && (
                <Badge variant="outline" className="text-xs bg-background/50">
                  +{suggestions.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Room3DAnalysisPreview;

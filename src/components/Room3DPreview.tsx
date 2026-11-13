import React, { useState, Suspense, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Box, Plane } from '@react-three/drei';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { flooringMaterials, wallFinishes, lightingOptions, furnitureByRoom, Material, LightingOption, FurnitureItem } from '@/data/materials';
import { Eye, EyeOff, RotateCcw, Sun, Moon, Lamp, Sofa, Bed, ChefHat, Bath, Briefcase, FileDown, Save, Share2, Flame } from 'lucide-react';
import * as THREE from 'three';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

const roomTypes = [
  { id: 'living', name: 'Living Room', icon: Sofa },
  { id: 'bedroom', name: 'Bedroom', icon: Bed },
  { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
  { id: 'bathroom', name: 'Bathroom', icon: Bath },
  { id: 'office', name: 'Office', icon: Briefcase },
  { id: 'temple', name: 'Temple/Puja Room', icon: Flame },
];

// Material color mappings
const materialColors: Record<string, string> = {
  'hardwood-oak': '#b5894f',
  'hardwood-walnut': '#5d4037',
  'laminate-wood': '#c9a66b',
  'vinyl-luxury': '#a0826d',
  'ceramic-tile': '#d4ccc4',
  'porcelain-tile': '#e8e4e0',
  'marble': '#f5f5f5',
  'concrete-polished': '#9e9e9e',
  'bamboo': '#d4a574',
  'carpet': '#7a6a5a',
  'paint-matte': '#f5f0eb',
  'paint-satin': '#e8e0d5',
  'paint-semi-gloss': '#ffffff',
  'wallpaper-vinyl': '#d4c4b0',
  'wallpaper-textile': '#c9b896',
  'wood-paneling': '#8b6914',
  'stone-veneer': '#a89880',
  'brick-exposed': '#b35c44',
  'plaster-venetian': '#f0e6d8',
  'tile-subway': '#ffffff',
};

interface RoomSceneProps {
  roomType: string;
  flooring: string;
  wall: string;
  lightIntensity: number;
  showFurniture: boolean;
  isAfter: boolean;
}

const Furniture: React.FC<{ roomType: string; isAfter: boolean }> = ({ roomType, isAfter }) => {
  const furnitureColor = isAfter ? '#5d4037' : '#8b7355';
  const fabricColor = isAfter ? '#4a6741' : '#9e9e9e';
  const metalColor = isAfter ? '#c0c0c0' : '#808080';
  const accentColor = isAfter ? '#d4a574' : '#a89880';

  if (roomType === 'living') {
    return (
      <>
        {/* L-Shape Sofa */}
        <group position={[-1, 0.4, -2]}>
          <Box args={[2.5, 0.5, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[2.5, 0.7, 0.15]} position={[0, 0.35, -0.42]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[1, 0.5, 1.5]} position={[1.75, 0, 0.25]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          {/* Cushions */}
          <Box args={[0.5, 0.2, 0.5]} position={[-0.8, 0.35, -0.1]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
          <Box args={[0.5, 0.2, 0.5]} position={[0.2, 0.35, -0.1]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
        </group>
        {/* Coffee Table with Glass Top */}
        <group position={[0, 0.25, 0]}>
          <Box args={[1.4, 0.03, 0.7]} position={[0, 0.22, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[1.2, 0.15, 0.5]} position={[0, 0.08, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
        </group>
        {/* TV Console */}
        <Box args={[2.5, 0.5, 0.4]} position={[0, 0.25, 2.5]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Large TV */}
        <Box args={[2.2, 1.3, 0.05]} position={[0, 1.25, 2.6]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        {/* Plant Stand */}
        <group position={[-2.3, 0, 2]}>
          <Box args={[0.4, 0.6, 0.4]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.5, 0.8, 0.5]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Box>
        </group>
        {/* Rug */}
        <Box args={[2.5, 0.02, 1.8]} position={[0, 0.01, 0]}>
          <meshStandardMaterial color="#8B6914" />
        </Box>
        {/* Floor Lamp */}
        <group position={[2.2, 0, -2]}>
          <Box args={[0.3, 0.02, 0.3]} position={[0, 0.01, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          <Box args={[0.05, 1.5, 0.05]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          <Box args={[0.4, 0.3, 0.4]} position={[0, 1.6, 0]}>
            <meshStandardMaterial color="#f5f5dc" />
          </Box>
        </group>
      </>
    );
  }

  if (roomType === 'bedroom') {
    return (
      <>
        {/* King Size Bed */}
        <group position={[0, 0.3, -1]}>
          <Box args={[2.4, 0.25, 2.6]} position={[0, 0, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Mattress */}
          <Box args={[2.3, 0.2, 2.5]} position={[0, 0.22, 0]}>
            <meshStandardMaterial color="#f5f5f5" />
          </Box>
          {/* Headboard */}
          <Box args={[2.4, 1.2, 0.1]} position={[0, 0.7, -1.25]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Pillows */}
          <Box args={[0.6, 0.12, 0.35]} position={[-0.6, 0.4, -0.95]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.6, 0.12, 0.35]} position={[0.6, 0.4, -0.95]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Blanket */}
          <Box args={[2.2, 0.08, 1.8]} position={[0, 0.36, 0.3]}>
            <meshStandardMaterial color={accentColor} />
          </Box>
        </group>
        {/* Nightstands */}
        <group position={[-1.7, 0, -1.5]}>
          <Box args={[0.5, 0.55, 0.4]} position={[0, 0.27, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Lamp */}
          <Box args={[0.15, 0.35, 0.15]} position={[0, 0.72, 0]}>
            <meshStandardMaterial color="#f5f5dc" />
          </Box>
        </group>
        <group position={[1.7, 0, -1.5]}>
          <Box args={[0.5, 0.55, 0.4]} position={[0, 0.27, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[0.15, 0.35, 0.15]} position={[0, 0.72, 0]}>
            <meshStandardMaterial color="#f5f5dc" />
          </Box>
        </group>
        {/* Wardrobe */}
        <Box args={[1.5, 2.2, 0.6]} position={[2.2, 1.1, 0]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Dresser with Mirror */}
        <group position={[-2.2, 0, 1]}>
          <Box args={[1.2, 0.8, 0.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[0.8, 1, 0.03]} position={[0, 1.4, -0.1]}>
            <meshStandardMaterial color="#d4e5f7" metalness={0.95} roughness={0.05} />
          </Box>
        </group>
        {/* Rug */}
        <Box args={[1.8, 0.02, 1.2]} position={[0, 0.01, 1]}>
          <meshStandardMaterial color="#d4c4b0" />
        </Box>
      </>
    );
  }

  if (roomType === 'kitchen') {
    return (
      <>
        {/* L-Shape Counter */}
        <Box args={[4, 0.9, 0.65]} position={[0, 0.45, -2.35]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[4, 0.04, 0.7]} position={[0, 0.92, -2.35]}>
          <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
        </Box>
        {/* Side Counter */}
        <Box args={[0.65, 0.9, 2.5]} position={[-2.35, 0.45, -1]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[0.7, 0.04, 2.5]} position={[-2.35, 0.92, -1]}>
          <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
        </Box>
        {/* Upper Cabinets */}
        <Box args={[4, 0.7, 0.35]} position={[0, 2.1, -2.55]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Stove/Range */}
        <Box args={[0.8, 0.1, 0.6]} position={[1, 0.97, -2.35]}>
          <meshStandardMaterial color="#2a2a2a" />
        </Box>
        {/* Range Hood */}
        <Box args={[0.9, 0.4, 0.5]} position={[1, 1.5, -2.55]}>
          <meshStandardMaterial color={metalColor} metalness={0.8} />
        </Box>
        {/* Sink */}
        <Box args={[0.7, 0.15, 0.5]} position={[-1, 0.85, -2.35]}>
          <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.2} />
        </Box>
        {/* Refrigerator */}
        <Box args={[0.8, 2, 0.7]} position={[2.3, 1, -2.3]}>
          <meshStandardMaterial color={metalColor} metalness={0.6} />
        </Box>
        {/* Island */}
        <group position={[0, 0.5, 0.8]}>
          <Box args={[1.8, 0.9, 0.9]} position={[0, 0, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[1.9, 0.04, 0.95]} position={[0, 0.47, 0]}>
            <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
          </Box>
        </group>
        {/* Bar Stools */}
        {[-0.5, 0.5].map((x, i) => (
          <group key={i} position={[x, 0, 1.7]}>
            <Box args={[0.35, 0.04, 0.35]} position={[0, 0.7, 0]}>
              <meshStandardMaterial color={furnitureColor} />
            </Box>
            <Box args={[0.04, 0.7, 0.04]} position={[0, 0.35, 0]}>
              <meshStandardMaterial color={metalColor} />
            </Box>
          </group>
        ))}
      </>
    );
  }

  if (roomType === 'bathroom') {
    return (
      <>
        {/* Double Vanity */}
        <Box args={[2, 0.85, 0.55]} position={[0, 0.42, -2.45]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[2, 0.04, 0.6]} position={[0, 0.87, -2.45]}>
          <meshStandardMaterial color="#f5f5f5" metalness={0.3} />
        </Box>
        {/* Sinks */}
        <Box args={[0.5, 0.08, 0.35]} position={[-0.5, 0.83, -2.4]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.5, 0.08, 0.35]} position={[0.5, 0.83, -2.4]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        {/* Large Mirror */}
        <Box args={[1.8, 1, 0.03]} position={[0, 1.7, -2.75]}>
          <meshStandardMaterial color="#d4e5f7" metalness={0.95} roughness={0.05} />
        </Box>
        {/* Freestanding Bathtub */}
        <group position={[-1.8, 0, 0.5]}>
          <Box args={[0.9, 0.6, 1.8]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Inner */}
          <Box args={[0.7, 0.5, 1.6]} position={[0, 0.35, 0]}>
            <meshStandardMaterial color="#e8f4f8" />
          </Box>
        </group>
        {/* Glass Shower Enclosure */}
        <group position={[1.8, 0, 0]}>
          <Box args={[1.2, 2.2, 0.02]} position={[0, 1.1, -0.6]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
          </Box>
          <Box args={[0.02, 2.2, 1.2]} position={[-0.6, 1.1, 0]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.2} />
          </Box>
          {/* Shower Head */}
          <Box args={[0.2, 0.05, 0.2]} position={[0.3, 2, 0.3]}>
            <meshStandardMaterial color={metalColor} metalness={0.9} />
          </Box>
        </group>
        {/* Toilet */}
        <group position={[0, 0, 1.8]}>
          <Box args={[0.45, 0.4, 0.65]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.4, 0.6, 0.2]} position={[0, 0.5, -0.22]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
        </group>
        {/* Towel Rack */}
        <Box args={[0.6, 0.04, 0.04]} position={[-2.8, 1.2, 0.5]}>
          <meshStandardMaterial color={metalColor} metalness={0.9} />
        </Box>
      </>
    );
  }

  if (roomType === 'office') {
    return (
      <>
        {/* L-Shape Desk */}
        <group position={[0, 0.4, -2]}>
          <Box args={[2.2, 0.04, 0.8]} position={[0, 0.35, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          <Box args={[0.04, 0.7, 0.75]} position={[-1.05, 0, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          <Box args={[0.04, 0.7, 0.75]} position={[1.05, 0, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          {/* Side Extension */}
          <Box args={[0.8, 0.04, 1.5]} position={[1.4, 0.35, 0.35]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
        </group>
        {/* Dual Monitors */}
        <Box args={[0.6, 0.4, 0.03]} position={[-0.35, 0.95, -2.3]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        <Box args={[0.6, 0.4, 0.03]} position={[0.35, 0.95, -2.3]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        {/* Ergonomic Chair */}
        <group position={[0, 0.3, -0.5]}>
          <Box args={[0.55, 0.08, 0.5]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[0.55, 0.7, 0.08]} position={[0, 0.85, -0.21]}>
            <meshStandardMaterial color={fabricColor} />
          </Box>
          <Box args={[0.08, 0.45, 0.08]} position={[0, 0.22, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          <Box args={[0.5, 0.03, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color={metalColor} />
          </Box>
          {/* Armrests */}
          <Box args={[0.04, 0.08, 0.25]} position={[-0.27, 0.6, 0.1]}>
            <meshStandardMaterial color="#2a2a2a" />
          </Box>
          <Box args={[0.04, 0.08, 0.25]} position={[0.27, 0.6, 0.1]}>
            <meshStandardMaterial color="#2a2a2a" />
          </Box>
        </group>
        {/* Bookshelf */}
        <group position={[2.5, 0, 0]}>
          <Box args={[0.35, 2.2, 0.9]} position={[0, 1.1, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Books */}
          <Box args={[0.25, 0.3, 0.2]} position={[0, 1.8, 0.2]}>
            <meshStandardMaterial color="#8B0000" />
          </Box>
          <Box args={[0.25, 0.25, 0.2]} position={[0, 1.5, -0.1]}>
            <meshStandardMaterial color="#00008B" />
          </Box>
          <Box args={[0.25, 0.28, 0.2]} position={[0, 1.1, 0.15]}>
            <meshStandardMaterial color="#006400" />
          </Box>
        </group>
        {/* Filing Cabinet */}
        <Box args={[0.45, 0.7, 0.55]} position={[-2.3, 0.35, -1]}>
          <meshStandardMaterial color={metalColor} />
        </Box>
        {/* Plant */}
        <group position={[-2.3, 0, 1.5]}>
          <Box args={[0.3, 0.35, 0.3]} position={[0, 0.17, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.4, 0.5, 0.4]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Box>
        </group>
      </>
    );
  }

  if (roomType === 'temple') {
    const goldColor = '#DAA520';
    const marbleColor = '#f5f5f5';
    const redColor = '#8B0000';
    
    return (
      <>
        {/* Main Mandir/Temple Unit */}
        <group position={[0, 0, -2.2]}>
          {/* Base Platform */}
          <Box args={[2.5, 0.15, 0.8]} position={[0, 0.07, 0]}>
            <meshStandardMaterial color={marbleColor} metalness={0.1} roughness={0.3} />
          </Box>
          {/* Main Cabinet */}
          <Box args={[2.2, 1.8, 0.7]} position={[0, 1.05, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Inner Shrine */}
          <Box args={[1.8, 1.4, 0.1]} position={[0, 1.1, 0.25]}>
            <meshStandardMaterial color={goldColor} metalness={0.6} roughness={0.3} />
          </Box>
          {/* Dome/Top */}
          <Box args={[2.4, 0.3, 0.75]} position={[0, 2.1, 0]}>
            <meshStandardMaterial color={furnitureColor} />
          </Box>
          {/* Pillars */}
          <Box args={[0.1, 1.6, 0.1]} position={[-1, 0.95, 0.35]}>
            <meshStandardMaterial color={goldColor} metalness={0.5} />
          </Box>
          <Box args={[0.1, 1.6, 0.1]} position={[1, 0.95, 0.35]}>
            <meshStandardMaterial color={goldColor} metalness={0.5} />
          </Box>
          {/* Deity Platforms */}
          <Box args={[0.3, 0.1, 0.25]} position={[-0.4, 0.7, 0.15]}>
            <meshStandardMaterial color={marbleColor} />
          </Box>
          <Box args={[0.3, 0.1, 0.25]} position={[0, 0.7, 0.15]}>
            <meshStandardMaterial color={marbleColor} />
          </Box>
          <Box args={[0.3, 0.1, 0.25]} position={[0.4, 0.7, 0.15]}>
            <meshStandardMaterial color={marbleColor} />
          </Box>
        </group>
        {/* Diya Stand */}
        <group position={[0, 0, -0.5]}>
          <Box args={[0.6, 0.08, 0.4]} position={[0, 0.04, 0]}>
            <meshStandardMaterial color={marbleColor} />
          </Box>
          {/* Diyas */}
          <Box args={[0.1, 0.05, 0.1]} position={[-0.15, 0.1, 0]}>
            <meshStandardMaterial color="#CD853F" metalness={0.7} />
          </Box>
          <Box args={[0.1, 0.05, 0.1]} position={[0.15, 0.1, 0]}>
            <meshStandardMaterial color="#CD853F" metalness={0.7} />
          </Box>
        </group>
        {/* Bell */}
        <group position={[0, 2.3, -1.5]}>
          <Box args={[0.15, 0.25, 0.15]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#CD853F" metalness={0.8} />
          </Box>
        </group>
        {/* Prayer Mat */}
        <Box args={[1.2, 0.02, 0.8]} position={[0, 0.01, 1]}>
          <meshStandardMaterial color={redColor} />
        </Box>
        {/* Storage Drawer */}
        <Box args={[1, 0.4, 0.5]} position={[-1.8, 0.2, -1]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        {/* Incense Holder */}
        <group position={[1.5, 0, -1]}>
          <Box args={[0.2, 0.02, 0.3]} position={[0, 0.01, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
        </group>
        {/* Wall Hanging (Om Symbol placeholder) */}
        <Box args={[0.4, 0.4, 0.02]} position={[0, 2.5, -2.9]}>
          <meshStandardMaterial color={goldColor} metalness={0.7} />
        </Box>
        {/* Side Shelves for items */}
        <Box args={[0.5, 0.08, 0.25]} position={[2.5, 1.2, -2.5]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
        <Box args={[0.5, 0.08, 0.25]} position={[2.5, 1.6, -2.5]}>
          <meshStandardMaterial color={furnitureColor} />
        </Box>
      </>
    );
  }

  return null;
};

const RoomScene: React.FC<RoomSceneProps> = ({
  roomType,
  flooring,
  wall,
  lightIntensity,
  showFurniture,
  isAfter,
}) => {
  const floorColor = useMemo(() => materialColors[flooring] || '#d4a574', [flooring]);
  const wallColor = useMemo(() => materialColors[wall] || '#f5f0eb', [wall]);
  const beforeFloorColor = '#9e9e9e';
  const beforeWallColor = '#e0e0e0';

  const actualFloorColor = isAfter ? floorColor : beforeFloorColor;
  const actualWallColor = isAfter ? wallColor : beforeWallColor;

  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 4, 5]} fov={50} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={12}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3 * lightIntensity} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.7 * lightIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2.5, 0]} intensity={0.5 * lightIntensity} color={isAfter ? '#ffd7a8' : '#ffffff'} />
      
      {isAfter && (
        <>
          <pointLight position={[-2, 2.5, -2]} intensity={0.3 * lightIntensity} color="#ffecd2" />
          <pointLight position={[2, 2.5, 2]} intensity={0.3 * lightIntensity} color="#ffecd2" />
        </>
      )}

      <Environment preset={isAfter ? 'apartment' : 'warehouse'} />

      {/* Room Shell */}
      {/* Floor */}
      <Plane
        args={[6, 6]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={actualFloorColor} roughness={isAfter ? 0.3 : 0.6} />
      </Plane>

      {/* Back Wall */}
      <Plane args={[6, 3]} position={[0, 1.5, -3]} receiveShadow>
        <meshStandardMaterial color={actualWallColor} roughness={0.8} />
      </Plane>

      {/* Left Wall */}
      <Plane args={[6, 3]} position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={actualWallColor} roughness={0.8} />
      </Plane>

      {/* Right Wall */}
      <Plane args={[6, 3]} position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={actualWallColor} roughness={0.8} />
      </Plane>

      {/* Ceiling */}
      <Plane args={[6, 6]} rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </Plane>

      {/* Baseboard */}
      <Box args={[6, 0.1, 0.05]} position={[0, 0.05, -2.97]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.05, 0.1, 6]} position={[-2.97, 0.05, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.05, 0.1, 6]} position={[2.97, 0.05, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Furniture */}
      {showFurniture && <Furniture roomType={roomType} isAfter={isAfter} />}

      {/* Window (on right wall for natural light reference) */}
      <group position={[2.98, 1.8, 0]}>
        <Box args={[0.02, 1.2, 1.5]}>
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
        </Box>
        <Box args={[0.05, 0.05, 1.5]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.05, 0.05, 1.5]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.05, 1.2, 0.05]} position={[0, 0, 0.75]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.05, 1.2, 0.05]} position={[0, 0, -0.75]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    </>
  );
};

const Room3DPreview: React.FC = () => {
  const { t } = useLanguage();
  const [roomType, setRoomType] = useState('living');
  const [flooring, setFlooring] = useState('hardwood-oak');
  const [wall, setWall] = useState('paint-matte');
  const [lightIntensity, setLightIntensity] = useState([1]);
  const [showFurniture, setShowFurniture] = useState(true);
  const [viewMode, setViewMode] = useState<'before' | 'after' | 'compare'>('after');
  const [roomSize, setRoomSize] = useState(200); // sq ft

  const filteredFlooring = flooringMaterials.filter(m => m.bestFor.includes(roomType));
  const filteredWalls = wallFinishes.filter(m => m.bestFor.includes(roomType));
  const roomFurniture = furnitureByRoom[roomType] || [];
  const roomLighting = lightingOptions.filter(l => l.bestFor.includes(roomType));

  const RoomIcon = roomTypes.find(r => r.id === roomType)?.icon || Sofa;
  const roomName = roomTypes.find(r => r.id === roomType)?.name || 'Room';
  const selectedFlooringMaterial = flooringMaterials.find(m => m.id === flooring);
  const selectedWallMaterial = wallFinishes.find(m => m.id === wall);

  const calculateCosts = () => {
    const floorCost = (selectedFlooringMaterial?.pricePerSqFt || 0) * roomSize;
    const wallCost = (selectedWallMaterial?.pricePerSqFt || 0) * (roomSize * 0.8); // Approximate wall coverage
    const furnitureCost = roomFurniture.reduce((sum, item) => sum + item.priceRange.standard, 0);
    const lightingCost = roomLighting.slice(0, 3).reduce((sum, item) => sum + ((item.priceRange.min + item.priceRange.max) / 2), 0);
    return { floorCost, wallCost, furnitureCost, lightingCost, total: floorCost + wallCost + furnitureCost + lightingCost };
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const costs = calculateCosts();
    const date = new Date().toLocaleDateString();
    
    // Header
    pdf.setFillColor(45, 55, 72);
    pdf.rect(0, 0, 210, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Room Design Specifications', 20, 25);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${date}`, 20, 33);

    // Room Info
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${roomName} Design`, 20, 55);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Room Size: ${roomSize} sq ft`, 20, 65);

    // Materials Section
    pdf.setFillColor(249, 250, 251);
    pdf.rect(15, 75, 180, 50, 'F');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Materials Selected', 20, 88);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    let y = 98;
    
    if (selectedFlooringMaterial) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Flooring:', 25, y);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${selectedFlooringMaterial.name} - $${selectedFlooringMaterial.pricePerSqFt}/sq ft`, 55, y);
      y += 8;
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Durability: ${selectedFlooringMaterial.durability}/5 | Maintenance: ${selectedFlooringMaterial.maintenance}`, 55, y);
      pdf.setTextColor(45, 55, 72);
      y += 10;
    }
    
    if (selectedWallMaterial) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Wall Finish:', 25, y);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${selectedWallMaterial.name} - $${selectedWallMaterial.pricePerSqFt}/sq ft`, 55, y);
    }

    // Furniture Section
    y = 140;
    pdf.setFillColor(249, 250, 251);
    pdf.rect(15, y - 8, 180, 10 + (roomFurniture.length * 12), 'F');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Recommended Furniture', 20, y);
    
    pdf.setFontSize(10);
    y += 12;
    roomFurniture.forEach((item, index) => {
      if (y < 260) {
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${item.name}`, 25, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`$${item.priceRange.budget} - $${item.priceRange.premium}`, 130, y);
        y += 10;
      }
    });

    // Lighting Section
    y += 10;
    if (y < 220) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommended Lighting', 20, y);
      
      pdf.setFontSize(10);
      y += 12;
      roomLighting.slice(0, 4).forEach((item, index) => {
        if (y < 260) {
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${item.name}`, 25, y);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`$${item.priceRange.min} - $${item.priceRange.max}`, 130, y);
          y += 10;
        }
      });
    }

    // Cost Summary
    pdf.addPage();
    pdf.setFillColor(45, 55, 72);
    pdf.rect(0, 0, 210, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Cost Estimate Summary', 20, 20);

    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(12);
    y = 50;

    const costItems = [
      { label: 'Flooring Materials', value: costs.floorCost },
      { label: 'Wall Finishes', value: costs.wallCost },
      { label: 'Furniture (estimated)', value: costs.furnitureCost },
      { label: 'Lighting (estimated)', value: costs.lightingCost },
    ];

    costItems.forEach((item) => {
      pdf.setFont('helvetica', 'normal');
      pdf.text(item.label, 25, y);
      pdf.text(`$${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 150, y, { align: 'right' });
      y += 12;
    });

    // Total
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, y, 190, y);
    y += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('ESTIMATED TOTAL', 25, y);
    pdf.setTextColor(76, 175, 80);
    pdf.text(`$${costs.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 150, y, { align: 'right' });

    // Notes
    y += 25;
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.text('* Prices are estimates and may vary based on location, labor costs, and market conditions.', 20, y);
    pdf.text('* Furniture and lighting costs are averages based on mid-range options.', 20, y + 8);
    pdf.text('* Please consult with a professional for accurate quotes.', 20, y + 16);

    // Footer
    pdf.setFillColor(249, 250, 251);
    pdf.rect(0, 270, 210, 27, 'F');
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Generated by SpaceBloom Interior Design Platform', 105, 280, { align: 'center' });
    pdf.text('www.spacebloom.com', 105, 287, { align: 'center' });

    // Save PDF
    pdf.save(`${roomName.toLowerCase().replace(' ', '-')}-design-${Date.now()}.pdf`);
    toast.success('Design exported to PDF successfully!');
  };

  const saveDesign = () => {
    const design = {
      roomType,
      roomName,
      roomSize,
      flooring: selectedFlooringMaterial,
      wall: selectedWallMaterial,
      furniture: roomFurniture,
      lighting: roomLighting.slice(0, 4),
      costs: calculateCosts(),
      createdAt: new Date().toISOString(),
    };
    
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
    savedDesigns.push(design);
    localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));
    toast.success('Design saved successfully!');
  };

  return (
    <section id="3d-preview" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('preview_title') || '3D Room Visualizer'}
          </h2>
          <p className="text-muted-foreground text-lg">
            Preview your design choices in real-time with our interactive 3D room viewer
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
              <h3 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                <RoomIcon className="w-5 h-5 text-primary" />
                Room Settings
              </h3>

              {/* Room Type */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground">Room Type</label>
                <div className="grid grid-cols-5 gap-2">
                  {roomTypes.map((room) => {
                    const Icon = room.icon;
                    return (
                      <button
                        key={room.id}
                        onClick={() => setRoomType(room.id)}
                        className={`p-2 rounded-lg border transition-all ${
                          roomType === room.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                        }`}
                        title={room.name}
                      >
                        <Icon className="w-5 h-5 mx-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flooring */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground">Flooring</label>
                <Select value={flooring} onValueChange={setFlooring}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flooring" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredFlooring.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: materialColors[m.id] }}
                          />
                          {m.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Wall Finish */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground">Wall Finish</label>
                <Select value={wall} onValueChange={setWall}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wall finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredWalls.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: materialColors[m.id] }}
                          />
                          {m.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Light Intensity */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Light Intensity
                </label>
                <Slider
                  value={lightIntensity}
                  onValueChange={setLightIntensity}
                  min={0.2}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span><Moon className="w-3 h-3 inline" /> Dim</span>
                  <span><Sun className="w-3 h-3 inline" /> Bright</span>
                </div>
              </div>

              {/* Show Furniture Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lamp className="w-4 h-4" />
                  Show Furniture
                </label>
                <Button
                  variant={showFurniture ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFurniture(!showFurniture)}
                >
                  {showFurniture ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* View Mode */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
              <h3 className="font-serif font-semibold text-foreground mb-4">View Mode</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={viewMode === 'before' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('before')}
                  className="text-xs"
                >
                  Before
                </Button>
                <Button
                  variant={viewMode === 'compare' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compare')}
                  className="text-xs"
                >
                  Compare
                </Button>
                <Button
                  variant={viewMode === 'after' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('after')}
                  className="text-xs"
                >
                  After
                </Button>
              </div>
            </div>

            {/* Material Info */}
            <div className="bg-muted/50 rounded-2xl border border-border/50 p-6">
              <h4 className="font-semibold text-foreground mb-3">Selected Materials</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Flooring:</span>
                  <span className="font-medium">{flooringMaterials.find(m => m.id === flooring)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Walls:</span>
                  <span className="font-medium">{wallFinishes.find(m => m.id === wall)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Size:</span>
                  <span className="font-medium">{roomSize} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Total:</span>
                  <span className="font-medium text-primary">
                    ${calculateCosts().total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Room Size Slider */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
              <h4 className="font-semibold text-foreground mb-3">Room Size</h4>
              <Slider
                value={[roomSize]}
                onValueChange={(v) => setRoomSize(v[0])}
                min={100}
                max={500}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>100 sq ft</span>
                <span className="font-medium text-foreground">{roomSize} sq ft</span>
                <span>500 sq ft</span>
              </div>
            </div>

            {/* Export Actions */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6">
              <h4 className="font-semibold text-foreground mb-4">Save & Export</h4>
              <div className="space-y-3">
                <Button
                  onClick={exportToPDF}
                  className="w-full"
                  variant="default"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Export to PDF
                </Button>
                <Button
                  onClick={saveDesign}
                  className="w-full"
                  variant="outline"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Design
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Download a detailed PDF with all materials, furniture, and cost estimates.
              </p>
            </div>
          </div>

          {/* 3D Preview Area */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden">
              {viewMode === 'compare' ? (
                <div className="grid grid-cols-2 gap-0.5 bg-border">
                  <div className="relative aspect-square bg-muted">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-charcoal/90 text-primary-foreground rounded-full text-sm font-medium">
                      Before
                    </div>
                    <Canvas shadows>
                      <Suspense fallback={null}>
                        <RoomScene
                          roomType={roomType}
                          flooring={flooring}
                          wall={wall}
                          lightIntensity={lightIntensity[0]}
                          showFurniture={showFurniture}
                          isAfter={false}
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                  <div className="relative aspect-square bg-muted">
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-sage/90 text-secondary-foreground rounded-full text-sm font-medium">
                      After
                    </div>
                    <Canvas shadows>
                      <Suspense fallback={null}>
                        <RoomScene
                          roomType={roomType}
                          flooring={flooring}
                          wall={wall}
                          lightIntensity={lightIntensity[0]}
                          showFurniture={showFurniture}
                          isAfter={true}
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] bg-muted">
                  <div className={`absolute top-4 ${viewMode === 'before' ? 'left-4' : 'right-4'} z-10 px-3 py-1 rounded-full text-sm font-medium ${
                    viewMode === 'before' 
                      ? 'bg-charcoal/90 text-primary-foreground' 
                      : 'bg-sage/90 text-secondary-foreground'
                  }`}>
                    {viewMode === 'before' ? 'Before' : 'After'}
                  </div>
                  <Canvas shadows>
                    <Suspense fallback={null}>
                      <RoomScene
                        roomType={roomType}
                        flooring={flooring}
                        wall={wall}
                        lightIntensity={lightIntensity[0]}
                        showFurniture={showFurniture}
                        isAfter={viewMode === 'after'}
                      />
                    </Suspense>
                  </Canvas>
                </div>
              )}

              {/* Instructions */}
              <div className="p-4 bg-muted/30 border-t border-border/50">
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-4 h-4" />
                    Drag to rotate
                  </span>
                  <span>Scroll to zoom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Room3DPreview;

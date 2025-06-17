
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, RefreshCw } from "lucide-react";

const StyleCustomizer = ({ qrStyle, setQrStyle }) => {
  const presetStyles = [
    { name: 'Classic', fgColor: '#000000', bgColor: '#FFFFFF', frameStyle: 'none', frameColor: '#000000' },
    { name: 'Ocean', fgColor: '#1e40af', bgColor: '#dbeafe', frameStyle: 'rounded', frameColor: '#3b82f6' },
    { name: 'Sunset', fgColor: '#dc2626', bgColor: '#fef3c7', frameStyle: 'solid', frameColor: '#f59e0b' },
    { name: 'Forest', fgColor: '#166534', bgColor: '#dcfce7', frameStyle: 'rounded', frameColor: '#22c55e' },
    { name: 'Royal', fgColor: '#581c87', bgColor: '#f3e8ff', frameStyle: 'solid', frameColor: '#8b5cf6' },
    { name: 'Neon', fgColor: '#ff0080', bgColor: '#001122', frameStyle: 'rounded', frameColor: '#00ff88' }
  ];

  const applyPreset = (preset) => {
    setQrStyle(prev => ({ ...prev, ...preset }));
  };

  const randomizeColors = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    const fgColor = colors[Math.floor(Math.random() * colors.length)];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    const frameColor = colors[Math.floor(Math.random() * colors.length)];
    
    setQrStyle(prev => ({ 
      ...prev, 
      fgColor, 
      bgColor: bgColor === fgColor ? '#ffffff' : bgColor, 
      frameColor 
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fg-color" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Foreground Color
          </Label>
          <Input
            id="fg-color"
            type="color"
            value={qrStyle.fgColor}
            onChange={(e) => setQrStyle(prev => ({ ...prev, fgColor: e.target.value }))}
            className="h-12 cursor-pointer"
          />
        </div>
        <div>
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={qrStyle.bgColor}
            onChange={(e) => setQrStyle(prev => ({ ...prev, bgColor: e.target.value }))}
            className="h-12 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="frame-style">Frame Style</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['none', 'rounded', 'solid'].map(style => (
            <Button
              key={style}
              variant={qrStyle.frameStyle === style ? 'default' : 'outline'}
              onClick={() => setQrStyle(prev => ({ ...prev, frameStyle: style }))}
              className="capitalize"
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {qrStyle.frameStyle !== 'none' && (
        <div>
          <Label htmlFor="frame-color">Frame Color</Label>
          <Input
            id="frame-color"
            type="color"
            value={qrStyle.frameColor}
            onChange={(e) => setQrStyle(prev => ({ ...prev, frameColor: e.target.value }))}
            className="h-12 cursor-pointer"
          />
        </div>
      )}

      <div>
        <Label>Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {presetStyles.map(preset => (
            <Button
              key={preset.name}
              variant="outline"
              onClick={() => applyPreset(preset)}
              className="text-sm"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={randomizeColors} className="w-full" variant="outline">
        <RefreshCw className="w-4 h-4 mr-2" />
        Randomize Colors
      </Button>
    </div>
  );
};

export default StyleCustomizer;

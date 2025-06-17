import React, { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Download, Settings, Palette, Users, Zap, Frame, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdvancedOptions from './AdvancedOptions';
import StyleCustomizer from './StyleCustomizer';
import BatchGenerator from './BatchGenerator';
import SocialTemplates from './SocialTemplates';

const QRCodeGenerator = () => {
  const [qrValue, setQRValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [textBelow, setTextBelow] = useState('');
  const [logo, setLogo] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [resolution, setResolution] = useState(1000);
  
  // New style states
  const [qrStyle, setQrStyle] = useState({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeRadius: 0,
    frameStyle: 'none',
    frameColor: '#000000',
    pattern: 'square'
  });
  
  const qrCodeRef = useRef(null);
  const previewSize = 200;

  // Load pasted logo from localStorage on component mount
  useEffect(() => {
    const pastedLogo = localStorage.getItem('pastedLogo');
    if (pastedLogo) {
      setLogo(pastedLogo);
      setShowLogo(true);
      toast.success("🎨 Using your uploaded logo!");
    }
  }, []);

  const generateQRCode = () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setQRValue(inputValue);
      setIsGenerating(false);
      toast.success("✨ Unique QR Code generated!");
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const generateStyledQRCodeImage = useCallback(() => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const padding = 40;
      const frameWidth = qrStyle.frameStyle !== 'none' ? 20 : 0;
      canvas.width = resolution + (padding * 2) + (frameWidth * 2);
      canvas.height = resolution + (padding * 2) + (frameWidth * 2);
      const ctx = canvas.getContext('2d');
      
      // Draw background
      ctx.fillStyle = qrStyle.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw frame if selected
      if (qrStyle.frameStyle !== 'none') {
        ctx.strokeStyle = qrStyle.frameColor;
        ctx.lineWidth = frameWidth;
        if (qrStyle.frameStyle === 'rounded') {
          const radius = 20;
          ctx.beginPath();
          ctx.roundRect(frameWidth/2, frameWidth/2, canvas.width - frameWidth, canvas.height - frameWidth, radius);
          ctx.stroke();
        } else if (qrStyle.frameStyle === 'solid') {
          ctx.fillStyle = qrStyle.frameColor;
          ctx.fillRect(0, 0, canvas.width, frameWidth);
          ctx.fillRect(0, 0, frameWidth, canvas.height);
          ctx.fillRect(canvas.width - frameWidth, 0, frameWidth, canvas.height);
          ctx.fillRect(0, canvas.height - frameWidth, canvas.width, frameWidth);
        }
      }
      
      // Draw QR Code
      const qrSize = resolution * 0.8;
      const qrPosition = (canvas.width - qrSize) / 2;
      const svgString = new XMLSerializer().serializeToString(qrCodeRef.current.querySelector('svg'));
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, qrPosition, qrPosition, qrSize, qrSize);
        
        // Draw text below with styling
        if (textBelow) {
          const fontSize = resolution * 0.05;
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = qrStyle.fgColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          const textY = qrPosition + qrSize + (resolution * 0.05);
          
          // Add text shadow for better visibility
          ctx.shadowColor = 'rgba(0,0,0,0.3)';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.fillText(textBelow, canvas.width / 2, textY);
        }
        
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
  }, [resolution, textBelow, qrStyle]);

  const copyToClipboard = async () => {
    try {
      const dataUrl = await generateStyledQRCodeImage();
      const blob = await fetch(dataUrl).then(res => res.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success("🎨 Styled QR Code copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy QR Code");
    }
  };

  const saveAsPNG = async () => {
    try {
      const dataUrl = await generateStyledQRCodeImage();
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("🚀 Unique QR Code saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save QR Code");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="w-full shadow-xl border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-6">
            <CardTitle className="text-3xl font-bold text-white text-center flex items-center justify-center gap-2">
              <Zap className="w-8 h-8" />
              QR Code Alchemist Pro
              <Zap className="w-8 h-8" />
            </CardTitle>
            <p className="text-blue-100 text-center">Create stunning, customizable QR codes with style</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="✨ Enter your content and watch the magic happen..."
              className="w-full text-lg border-2 border-purple-200 focus:border-purple-400 transition-all"
            />
            <Button 
              onClick={generateQRCode} 
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              disabled={isGenerating || !inputValue.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Crafting your unique QR code...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Unique QR Code
                </>
              )}
            </Button>

            <Accordion type="multiple" className="w-full space-y-2">
              <AccordionItem value="style-customizer" className="border border-purple-200 rounded-lg">
                <AccordionTrigger className="py-3 px-4 hover:bg-purple-50">
                  <div className="flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-purple-500" />
                    Style Customizer
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <StyleCustomizer qrStyle={qrStyle} setQrStyle={setQrStyle} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="social-templates" className="border border-blue-200 rounded-lg">
                <AccordionTrigger className="py-3 px-4 hover:bg-blue-50">
                  <div className="flex items-center">
                    <Frame className="w-5 h-5 mr-2 text-blue-500" />
                    Social Media Templates
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <SocialTemplates setInputValue={setInputValue} setTextBelow={setTextBelow} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="batch-generator" className="border border-green-200 rounded-lg">
                <AccordionTrigger className="py-3 px-4 hover:bg-green-50">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-500" />
                    Batch Generator
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <BatchGenerator qrStyle={qrStyle} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="advanced-options" className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-500" />
                    Advanced Options
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <AdvancedOptions
                    text={textBelow}
                    setText={setTextBelow}
                    logo={logo}
                    setLogo={setLogo}
                    showLogo={showLogo}
                    setShowLogo={setShowLogo}
                    resolution={resolution}
                    setResolution={setResolution}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {qrValue && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div 
                    ref={qrCodeRef} 
                    className="p-6 bg-white rounded-xl shadow-xl border-4"
                    style={{ 
                      borderColor: qrStyle.frameColor,
                      width: `${previewSize + 48}px`, 
                      minHeight: `${previewSize + 48}px`,
                      background: qrStyle.bgColor
                    }}
                  >
                    <QRCodeSVG 
                      value={qrValue} 
                      size={Math.round(previewSize * 0.8)}
                      level="H"
                      fgColor={qrStyle.fgColor}
                      bgColor={qrStyle.bgColor}
                      imageSettings={showLogo && logo ? {
                        src: logo,
                        x: undefined,
                        y: undefined,
                        height: Math.round(previewSize * 0.16),
                        width: Math.round(previewSize * 0.16),
                        excavate: true,
                      } : undefined}
                    />
                    {textBelow && (
                      <div 
                        className="text-center mt-4 text-sm font-bold"
                        style={{ color: qrStyle.fgColor }}
                      >
                        {textBelow}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button onClick={copyToClipboard} className="flex items-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Masterpiece
                  </Button>
                  <Button onClick={saveAsPNG} className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Download className="mr-2 h-4 w-4" />
                    Save Creation
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

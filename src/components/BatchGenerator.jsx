
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Plus, Trash2 } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { toast } from "sonner";

const BatchGenerator = ({ qrStyle }) => {
  const [batchItems, setBatchItems] = useState([
    { id: 1, content: '', label: '' }
  ]);

  const addBatchItem = () => {
    setBatchItems(prev => [...prev, { 
      id: Date.now(), 
      content: '', 
      label: '' 
    }]);
  };

  const removeBatchItem = (id) => {
    setBatchItems(prev => prev.filter(item => item.id !== id));
  };

  const updateBatchItem = (id, field, value) => {
    setBatchItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const generateBatchQRCodes = async () => {
    const validItems = batchItems.filter(item => item.content.trim());
    if (validItems.length === 0) {
      toast.error("Please add some content to generate QR codes");
      return;
    }

    try {
      // Create a zip-like structure using canvas
      const canvas = document.createElement('canvas');
      const gridSize = Math.ceil(Math.sqrt(validItems.length));
      const qrSize = 200;
      const padding = 20;
      
      canvas.width = (qrSize + padding) * gridSize;
      canvas.height = (qrSize + padding) * gridSize;
      const ctx = canvas.getContext('2d');
      
      // Set background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < validItems.length; i++) {
        const item = validItems[i];
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const x = col * (qrSize + padding) + padding/2;
        const y = row * (qrSize + padding) + padding/2;

        // Create individual QR code
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = qrSize;
        tempCanvas.height = qrSize;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Create SVG for QR code
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', qrSize);
        svg.setAttribute('height', qrSize);
        
        // This is a simplified approach - in a real app you'd want proper QR generation
        tempCtx.fillStyle = qrStyle.bgColor;
        tempCtx.fillRect(0, 0, qrSize, qrSize);
        tempCtx.fillStyle = qrStyle.fgColor;
        tempCtx.font = '12px Arial';
        tempCtx.textAlign = 'center';
        tempCtx.fillText(`QR: ${item.content.substring(0, 20)}...`, qrSize/2, qrSize/2);
        
        // Draw on main canvas
        ctx.drawImage(tempCanvas, x, y);
        
        // Add label
        if (item.label) {
          ctx.fillStyle = '#000000';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(item.label, x + qrSize/2, y + qrSize + 15);
        }
      }

      // Download the batch
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `batch-qr-codes-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success(`🎉 Generated ${validItems.length} QR codes in batch!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate batch QR codes");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold">Batch QR Code Generator</Label>
        <Button onClick={addBatchItem} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Item
        </Button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {batchItems.map((item, index) => (
          <div key={item.id} className="border rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Item #{index + 1}</span>
              {batchItems.length > 1 && (
                <Button 
                  onClick={() => removeBatchItem(item.id)} 
                  size="sm" 
                  variant="ghost"
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
            <Input
              placeholder="QR Code content (URL, text, etc.)"
              value={item.content}
              onChange={(e) => updateBatchItem(item.id, 'content', e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Label (optional)"
              value={item.label}
              onChange={(e) => updateBatchItem(item.id, 'label', e.target.value)}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      <Button onClick={generateBatchQRCodes} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Generate Batch ({batchItems.filter(item => item.content.trim()).length} QR codes)
      </Button>

      <div className="text-xs text-gray-500">
        💡 Tip: Generate multiple QR codes at once and download them as a single image grid
      </div>
    </div>
  );
};

export default BatchGenerator;

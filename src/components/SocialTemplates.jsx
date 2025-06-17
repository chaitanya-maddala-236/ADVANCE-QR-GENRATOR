
import React from 'react';
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Mail } from "lucide-react";

const SocialTemplates = ({ setInputValue, setTextBelow }) => {
  const socialTemplates = [
    {
      name: 'Instagram Profile',
      icon: Instagram,
      template: 'https://instagram.com/yourusername',
      text: 'Follow me on Instagram!'
    },
    {
      name: 'Twitter Profile',
      icon: Twitter,
      template: 'https://twitter.com/yourusername',
      text: 'Connect on Twitter'
    },
    {
      name: 'Facebook Page',
      icon: Facebook,
      template: 'https://facebook.com/yourpage',
      text: 'Like our Facebook page'
    },
    {
      name: 'LinkedIn Profile',
      icon: Linkedin,
      template: 'https://linkedin.com/in/yourname',
      text: 'Connect professionally'
    },
    {
      name: 'YouTube Channel',
      icon: Youtube,
      template: 'https://youtube.com/@yourchannel',
      text: 'Subscribe to our channel'
    },
    {
      name: 'Email Contact',
      icon: Mail,
      template: 'mailto:your.email@example.com',
      text: 'Send us an email'
    }
  ];

  const businessTemplates = [
    {
      name: 'WiFi Access',
      template: 'WIFI:T:WPA;S:NetworkName;P:Password;H:;;',
      text: 'Connect to WiFi'
    },
    {
      name: 'vCard Contact',
      template: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD',
      text: 'Add to contacts'
    },
    {
      name: 'Event',
      template: 'BEGIN:VEVENT\nSUMMARY:Event Name\nDTSTART:20241225T180000Z\nDTEND:20241225T200000Z\nLOCATION:Event Location\nEND:VEVENT',
      text: 'Add to calendar'
    }
  ];

  const applyTemplate = (template, text) => {
    setInputValue(template);
    setTextBelow(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-purple-700">Social Media Templates</h3>
        <div className="grid grid-cols-2 gap-2">
          {socialTemplates.map(template => (
            <Button
              key={template.name}
              variant="outline"
              onClick={() => applyTemplate(template.template, template.text)}
              className="flex items-center justify-start gap-2 h-auto p-3 text-left"
            >
              <template.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{template.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-blue-700">Business Templates</h3>
        <div className="space-y-2">
          {businessTemplates.map(template => (
            <Button
              key={template.name}
              variant="outline"
              onClick={() => applyTemplate(template.template, template.text)}
              className="w-full justify-start text-left h-auto p-3"
            >
              <div>
                <div className="font-medium text-xs">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1">{template.text}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialTemplates;


import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Palette, Upload, Clipboard, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Landing = () => {
  const [pastedLogo, setPastedLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handlePaste = async (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const logoData = event.target.result;
          setPastedLogo(logoData);
          setLogoPreview(logoData);
          localStorage.setItem('pastedLogo', logoData);
          toast.success("✨ Logo pasted successfully!");
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoData = event.target.result;
        setPastedLogo(logoData);
        setLogoPreview(logoData);
        localStorage.setItem('pastedLogo', logoData);
        toast.success("🎨 Logo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const features = [
    { icon: Palette, title: "Style Customizer", desc: "Custom colors, frames & themes" },
    { icon: Sparkles, title: "Social Templates", desc: "Instagram, Twitter, LinkedIn & more" },
    { icon: Zap, title: "Batch Generator", desc: "Create multiple QR codes at once" },
    { icon: Upload, title: "Logo Integration", desc: "Add your brand to QR codes" }
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Marketing Director", text: "Game-changer for our campaigns!" },
    { name: "Alex K.", role: "Designer", text: "Beautiful QR codes that match our brand" },
    { name: "Mike R.", role: "Event Organizer", text: "Saved hours with batch generation" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">QR Alchemist</span>
            </div>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Star className="w-4 h-4 mr-2" />
              Star on GitHub
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Transform Your QR Codes</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 leading-tight">
              Create
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Stunning{" "}
              </span>
              QR Codes
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most powerful QR code generator with custom styling, logo integration, 
              and batch processing. Make every scan a brand experience.
            </p>

            {/* Logo Upload Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-white/10 border-white/20 backdrop-blur-md">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Add Your Logo</h3>
                  <div className="space-y-6">
                    <div 
                      className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
                      onPaste={handlePaste}
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {logoPreview ? (
                        <div className="space-y-4">
                          <img src={logoPreview} alt="Logo preview" className="w-24 h-24 mx-auto rounded-lg object-cover" />
                          <p className="text-green-300 flex items-center justify-center">
                            <Check className="w-5 h-5 mr-2" />
                            Logo ready for QR codes!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                            <Clipboard className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium mb-2">Paste or Upload Your Logo</p>
                            <p className="text-blue-200 text-sm">Ctrl+V to paste from clipboard or click to upload</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Link to="/generator">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-6 px-12 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                Start Creating Magic
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Everything you need to create professional QR codes that stand out
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-blue-200">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Loved by Creators</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md">
                  <CardContent className="p-8">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-white mb-6 text-lg">"{testimonial.text}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-blue-200">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-blue-200 mb-12">
              Join thousands of creators making beautiful QR codes
            </p>
            <Link to="/generator">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-6 px-12 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;

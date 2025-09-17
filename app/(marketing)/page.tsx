'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight,
  CheckCircle,
  Users,
  FileText,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Play,
  Menu,
  X
} from 'lucide-react';
import AuthButton from './_components/logsign';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // 3D SOP Document Component
  const SOP3D = () => {
    const tiltX = mousePosition.y * -15; // Fixed: inverted Y axis
    const tiltY = mousePosition.x * 15;  // Fixed: inverted X axis
    const translateZ = Math.abs(mousePosition.x * 50) + Math.abs(mousePosition.y * 50);

    return (
      <div className="relative perspective-100">
        <div 
          className="relative w-120 h-144 transition-transform duration-300 ease-out transform-gpu"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${translateZ}px)`,
          }}
        >
          {/* Main Document */}
          <div className="absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Document Header */}
            <div className="bg-blue-700 h-16 flex items-center px-6">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <div className="text-white font-semibold text-sm">Standard Operating Procedure</div>
                <div className="text-blue-700 text-xs">Employee Onboarding</div>
              </div>
            </div>
            
            {/* Document Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-1.5 bg-gray-100 rounded w-3/4 mt-2"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-1.5 bg-gray-100 rounded w-2/3 mt-2"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-1.5 bg-gray-100 rounded w-1/2 mt-2"></div>
                </div>
              </div>
              

              {/* Team Members */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Assigned Team Members</div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-medium">J</div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">S</div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">M</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-700 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Shadow pages behind */}
          <div 
            className="absolute inset-0 bg-white rounded-xl shadow-lg border border-gray-200 -z-10"
            style={{ transform: 'translateZ(-10px) translateX(4px) translateY(4px)' }}
          ></div>
          <div 
            className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-20"
            style={{ transform: 'translateZ(-20px) translateX(8px) translateY(8px)' }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-100 overflow-hidden">
  {/* Animated flowing wave background */}
  <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="none" 
      viewBox="0 0 1920 1080"
    >
      {/* Large flowing wave - top layer */}
      <path
        d="M0,300 Q480,150 960,300 T1920,300 L1920,0 L0,0 Z"
        fill="rgba(219, 227, 244, 0.8)"
        className="animate-pulse"
      >
        <animate
          attributeName="d"
          dur="15s"
          repeatCount="indefinite"
          values="M0,300 Q480,150 960,300 T1920,300 L1920,0 L0,0 Z;
                  M0,350 Q480,200 960,350 T1920,350 L1920,0 L0,0 Z;
                  M0,300 Q480,150 960,300 T1920,300 L1920,0 L0,0 Z"
        />
      </path>

      {/* Medium wave - middle layer */}
      <path
        d="M0,450 Q640,300 1280,450 T2560,450 L2560,0 L0,0 Z"
        fill="rgba(219, 227, 244, 0.8)"
        className="animate-pulse"
        style={{ animationDelay: '5s' }}
      >
        <animate
          attributeName="d"
          dur="20s"
          repeatCount="indefinite"
          values="M0,450 Q640,300 1280,450 T2560,450 L2560,0 L0,0 Z;
                  M0,500 Q640,350 1280,500 T2560,500 L2560,0 L0,0 Z;
                  M0,450 Q640,300 1280,450 T2560,450 L2560,0 L0,0 Z"
        />
      </path>

      {/* Bottom wave - deepest layer */}
      <path
        d="M0,600 Q800,400 1600,600 T3200,600 L3200,0 L0,0 Z"
        fill="rgba(219, 227, 244, 0.6)"
        className="animate-pulse"
        style={{ animationDelay: '10s' }}
      >
        <animate
          attributeName="d"
          dur="25s"
          repeatCount="indefinite"
          values="M0,600 Q800,400 1600,600 T3200,600 L3200,0 L0,0 Z;
                  M0,650 Q800,450 1600,650 T3200,650 L3200,0 L0,0 Z;
                  M0,600 Q800,400 1600,600 T3200,600 L3200,0 L0,0 Z"
        />
      </path>

      {/* Additional flowing elements from bottom */}
      <path
        d="M0,1080 Q480,900 960,1080 T1920,1080 L1920,1080 L0,1080 Z"
        fill="rgba(219, 227, 244, 0.8)"
        className="animate-pulse"
        style={{ animationDelay: '7s' }}
      >
        <animate
          attributeName="d"
          dur="18s"
          repeatCount="indefinite"
          values="M0,1080 Q480,900 960,1080 T1920,1080 L1920,1080 L0,1080 Z;
                  M0,1080 Q480,950 960,1080 T1920,1080 L1920,1080 L0,1080 Z;
                  M0,1080 Q480,900 960,1080 T1920,1080 L1920,1080 L0,1080 Z"
        />
      </path>

      {/* Right side flowing wave */}
      <path
        d="M1920,0 Q1700,270 1920,540 T1920,1080 L1920,0 Z"
        fill="rgba(219, 227, 244, 0.3)"
        className="animate-pulse"
        style={{ animationDelay: '12s' }}
      >
        <animate
          attributeName="d"
          dur="22s"
          repeatCount="indefinite"
          values="M1920,0 Q1700,270 1920,540 T1920,1080 L1920,0 Z;
                  M1920,0 Q1650,270 1920,540 T1920,1080 L1920,0 Z;
                  M1920,0 Q1700,270 1920,540 T1920,1080 L1920,0 Z"
        />
      </path>
    </svg>
  </div>

  {/* Content layer */}
  <div className="relative z-20">
    {/* Your content goes here */}
  </div>

  {/* Content overlay to ensure readability */}
  <div className="relative z-20">
    {/* Your content goes here */}
  </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-9 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Flow Step Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block text-gray-600">Features</a>
              <a href="#pricing" className="block text-gray-600">Pricing</a>
              <a href="#about" className="block text-gray-600">About</a>
              <button className="block w-full text-left text-blue-700">Sign In</button>
              <button className="block w-full px-6 py-2 bg-blue-700 text-white rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-700 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                New: Real-time Collaboration
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Build{' '}
                <span className="bg-blue-700 bg-clip-text text-transparent">
                  Interactive
                </span>{' '}
                SOPs in Minutes
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Create, manage, and track Standard Operating Procedures with our intuitive block-based builder. 
                Empower your team with clear processes and real-time progress tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <span className="font-semibold">Start Building SOPs</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group flex items-center justify-center px-8 py-4 border-2 border-blue-700 text-blue-700 rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 hover:scale-105">
                  <Play className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">SOPs Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - 3D SOP */}
            <div className="flex justify-center lg:justify-end">
              <SOP3D />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20  backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything you need to streamline operations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines powerful features with intuitive design to make SOP creation and management effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Block-Based Builder",
                description: "Create SOPs using our intuitive drag-and-drop interface with text, images, videos, and multi-column layouts."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Assign tasks to team members, track progress, and collaborate in real-time on procedure completion."
              },
              {
                icon: CheckCircle,
                title: "Progress Tracking",
                description: "Visual progress indicators and completion tracking help teams stay on top of their procedures."
              },
              {
                icon: Shield,
                title: "Role-Based Access",
                description: "Admin and employee views ensure the right people have the right level of access to your SOPs."
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description: "Changes sync instantly across all team members, keeping everyone aligned and up to date."
              },
              {
                icon: Star,
                title: "Export & Share",
                description: "Export SOPs to PDF or share via secure links. Perfect for training and documentation."
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to transform your operations?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of companies already using SOPBuilder to streamline their processes and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SOPBuilder</span>
              </div>
              <p className="text-gray-400">
                Streamline your operations with intelligent SOP management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Templates</div>
                <div>Integrations</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Community</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SOPBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
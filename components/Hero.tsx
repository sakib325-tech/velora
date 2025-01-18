'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Cpu, Network } from 'lucide-react'
import Link from 'next/link';

const phrases = [
  "Transform Conversations with AI",
  "Generate Stunning AI Images",
  "Enhance Photos with Generative Fill",
  "Remove Backgrounds Effortlessly",
  "Recolor Images Seamlessly",
  "Boost Image Quality with AI Enhancer",
  "Generate Stunning AI Logos",
  "Create Engaging AI Shorts",
  "Generate Audio and Video Content",
  "Remove Unwanted Objects with Precision",
  "Leverage 150+ Content Templates"
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < phrases[currentPhrase].length) {
        setCharIndex(charIndex + 1)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCharIndex(0)
          setCurrentPhrase((currentPhrase + 1) % phrases.length)
        }, 2000)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [currentPhrase, charIndex])

  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '-2s' }} />
      </div>
      <div className="container mx-auto px-4 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            AI-Powered Solutions to
          </h1>
          <div className="h-20 mb-8">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400">
              {phrases[currentPhrase].substring(0, charIndex)}
              <span className="animate-blink">|</span>
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto ">
            Harness the power of cutting-edge AI to revolutionize your business. Stay ahead of the competition with our intelligent, adaptive solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href={"/sign-up"}>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            <Link href={"/sign-up"}>
            <Button size="lg" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400/10 hover:text-white">
              Watch Demo
            </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Brain, title: "Cognitive AI", description: "Advanced machine learning algorithms that adapt and evolve" },
              { icon: Cpu, title: "Edge Computing", description: "Process data locally for faster, more secure operations" },
              { icon: Network, title: "Neural Networks", description: "Deep learning capabilities for complex problem-solving" },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center transform transition-all duration-200 hover:scale-105">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2 text-purple-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


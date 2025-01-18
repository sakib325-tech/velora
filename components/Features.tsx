import { Brain, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    name: 'Advanced AI Algorithms',
    description: 'Our cutting-edge AI algorithms adapt to your unique business needs, providing intelligent insights and automation.',
    icon: Brain,
  },
  {
    name: 'Lightning-Fast Processing',
    description: 'Experience unparalleled speed with our optimized infrastructure, delivering results in real-time.',
    icon: Zap,
  },
  {
    name: 'Scalable Solutions',
    description: 'Our platform grows with your business, offering flexible solutions that scale seamlessly as your needs evolve.',
    icon: TrendingUp,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
          Powerful Features to Transform Your Business
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


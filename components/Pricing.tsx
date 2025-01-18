import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Link from "next/link"

const tiers = [
  {
    name: 'Starter',
    price: 29,
    features: ['Basic AI functionality', '1,000 API calls/month', 'Email support'],
  },
  {
    name: 'Pro',
    price: 99,
    features: ['Advanced AI algorithms', '10,000 API calls/month', 'Priority support', 'Custom integrations'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Full AI suite', 'Unlimited API calls', '24/7 dedicated support', 'On-premise deployment option'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
          Flexible Pricing for Every Business
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{tier.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                {typeof tier.price === 'number' && <span className="text-base font-normal text-gray-500">/month</span>}
              </p>
              <ul className="mb-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={"/sign-up"}>
              <Button className="w-full">{tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


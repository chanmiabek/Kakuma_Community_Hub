import { Briefcase, GraduationCap, Heart, Users, TrendingUp, Globe } from 'lucide-react'

const features = [
  { icon: Briefcase, title: 'Job Opportunities', description: 'Find employment opportunities from organizations and businesses operating in and around Kakuma.' },
  { icon: GraduationCap, title: 'Education & Training', description: 'Access educational programs, scholarships, and training courses to enhance your skills.' },
  { icon: Heart, title: 'Volunteer Programs', description: 'Get involved in community service and volunteer initiatives that make a difference.' },
  { icon: Users, title: 'Community Network', description: 'Connect with other community members, share experiences, and build meaningful relationships.' },
  { icon: TrendingUp, title: 'Career Development', description: 'Access resources and mentorship to help you grow professionally and achieve your goals.' },
  { icon: Globe, title: 'Global Connections', description: 'Connect with organizations and opportunities from around the world.' },
]

export function Features() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Everything in one place</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">What We Offer</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Comprehensive resources and opportunities to help you thrive and contribute to the community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.08]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-slate-950">{feature.title}</h3>
              <p className="leading-7 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

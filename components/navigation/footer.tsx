import Link from 'next/link'
import { Globe2, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Globe2 className="h-5 w-5" /></span>
              <span className="text-lg font-bold tracking-tight text-white">Kakuma<span className="text-primary">Hub</span></span>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Connecting community members with opportunities, resources, and each other. Building a stronger Kakuma together.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/opportunities" className="text-sm text-slate-400 transition-colors hover:text-white">Opportunities</Link></li>
              <li><Link href="/posts" className="text-sm text-slate-400 transition-colors hover:text-white">Community Posts</Link></li>
              <li><Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Contact</h3>
            <ul className="space-y-3">
              <li><a href="mailto:info@kakumahub.org" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"><Mail className="h-4 w-4 text-primary" />info@kakumahub.org</a></li>
              <li><a href="tel:+254700000000" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"><Phone className="h-4 w-4 text-primary" />+254 700 000 000</a></li>
              <li className="flex items-start gap-2 text-sm text-slate-400"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Kakuma Refugee Camp, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Kakuma Community Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

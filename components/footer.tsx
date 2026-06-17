import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';

const circleLinks = [
  { label: 'Join the Community', href: '/join' },
  { label: 'League of Legends', href: '/league' },
  { label: 'Hire with Talentiser', href: 'https://talentiser.com/contact-us/', external: true },
];

const eventLinks = [
  { label: 'View Upcoming Events', href: '/events' },
  { label: 'Past Events', href: '/events#past' },
  { label: 'Register for an Event', href: '/events' },
];

const reachLinks = [
  { label: 'Partners', href: '/partners' },
  { label: 'Blogs / Insights', href: '/insights' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#070b14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#B87333] flex items-center justify-center text-white font-bold text-sm">
                GCC
              </div>
              <span className="text-white font-semibold text-lg">Circle</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India's foremost leadership community for top-tier professionals across GCCs. Curated, connected, and collaborative.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/gcc-circle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1a6cff] flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="text-white" />
              </a>
              {/* <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e1306c] flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white" />
              </a> */}
            </div>
          </div>

          {/* Circle */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Circle</h4>
            <ul className="space-y-3">
              {circleLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Events</h4>
            <ul className="space-y-3">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach out */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Reach Out</h4>
            <ul className="space-y-3 mb-6">
              {reachLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a
                href="mailto:hello@gcccircle.com"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                <Mail size={14} />
                hello@gcccircle.com
              </a>
              <a
                href="tel:+918505823013"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone size={14} />
                +91 8505823013
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
          <div
            className="flex items-center gap-4 cursor-pointer self-start"
            onClick={() =>
              window.open(
                "https://talentiser.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white">
                Ecosystem Partner
              </p>
              <p className="text-base font-semibold bg-[linear-gradient(210deg,_#0051B0_0%,_#9C65B8_100%)] bg-clip-text text-transparent">
                Talentiser
              </p>
            </div>
          </div>

          <p className="text-white/30 text-sm text-center sm:text-right self-center sm:self-auto">
            Copyright &copy; 2025 GCC Circle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo/bluelogo.png"
                alt="GCC Circle"
                width={240}
                height={80}
                className="h-28 sm:h-40 w-auto"
              />
            </div>
            {/* <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/gcc-circle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1a6cff] flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="text-white" />
              </a>
            </div> */}
          </div>

          {/* Circle */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 sm:mb-5">Circle</h4>
            <ul className="space-y-2.5 sm:space-y-3">
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
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 sm:mb-5">Events</h4>
            <ul className="space-y-2.5 sm:space-y-3">
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
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 sm:mb-5">Reach Out</h4>
            <ul className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
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
              <a
                href="https://www.linkedin.com/company/gcc-circle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                <Linkedin size={14} />
                Linked In
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              window.open(
                "https://talentiser.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <div className="h-10 w-px bg-white/10" />
            {/* <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white">
                Powered by
              </p>
              <p className="text-base font-semibold bg-[linear-gradient(210deg,_#0051B0_0%,_#9C65B8_100%)] bg-clip-text text-transparent">
                Talentiser
              </p>
            </div> */}
            <Image
              src="/logo/Talentiser.webp"
              alt="GCC Circle"
              width={150}
              height={80}
            />
          </div>

          <p className="text-white/30 text-xs sm:text-sm text-center">
            Copyright &copy; 2026 GCC Circle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Linkedin, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

interface Leader {
  id: string;
  name: string;
  title: string;
  company: string;
  img: string;
  type: 'tech' | 'hr';
  bio?: string;
  email?: string;
  linkedin?: string;
}

const leaders: Leader[] = [
  // Tech Leaders
  {
    id: 'supriya-rao',
    name: 'Supriya Rao',
    title: 'MD India',
    company: 'ClearRoute',
    img: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Supriya Rao is the Managing Director for India at ClearRoute, leading technology innovation and digital transformation initiatives. With a proven track record in building scalable engineering teams, she brings strategic vision and operational excellence to the region. Her focus on innovation and sustainability has positioned ClearRoute as a leader in the GCC space.',
    email: 'supriya@clearroute.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'paras-nigam',
    name: 'Paras Nigam',
    title: 'VP, Engineering and AI | Site Leader',
    company: 'iCIMS',
    img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Paras Nigam serves as Vice President of Engineering and AI at iCIMS, spearheading the development of cutting-edge AI solutions for talent management. As the site leader, he drives engineering excellence and innovation across the region. His expertise spans machine learning, distributed systems, and building high-performance teams.',
    email: 'paras@icims.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'amod-deshpande',
    name: 'Amod Deshpande',
    title: 'GCC Leader & Country Director',
    company: 'Allvue Systems',
    img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Amod Deshpande leads Allvue Systems as the GCC Leader and Country Director, driving strategic technology initiatives and ensuring global delivery excellence. With extensive experience in building and scaling engineering centers, he champions innovation, quality, and customer-focused solutions across the organization.',
    email: 'amod@allvue.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'anurag-garg',
    name: 'Anurag Garg',
    title: 'Global Engineering Executive',
    company: 'Ryan',
    img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Anurag Garg is a global engineering executive at Ryan, focused on transforming engineering teams and accelerating product development. His strategic approach integrates global best practices with local expertise, resulting in improved delivery timelines and product quality across markets.',
    email: 'anurag@ryan.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'yogesh-more',
    name: 'Yogesh More',
    title: 'General Manager',
    company: 'isolved',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Yogesh More manages technical operations at isolved, overseeing the scaling of engineering teams and driving innovation. His focus on operational excellence and team development has been instrumental in establishing isolved as a technology leader in the region.',
    email: 'yogesh@isolved.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'srinivas-chamarthy',
    name: 'Srinivas Chamarthy',
    title: 'SVP Engineering & India Site Leader',
    company: 'Diligent',
    img: 'https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Srinivas Chamarthy is the Senior Vice President of Engineering and India Site Leader at Diligent, overseeing the development of enterprise solutions. His commitment to engineering excellence, quality assurance, and innovation has shaped the technical direction of the organization across global markets.',
    email: 'srinivas@diligent.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'abhishek-chauhan',
    name: 'Abhishek Chauhan',
    title: 'India Site Leader',
    company: 'SONATYPE',
    img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Abhishek Chauhan leads the India operations at SONATYPE, orchestrating technology infrastructure and engineering practices. His expertise in DevOps, cloud technologies, and team leadership has established a strong technical foundation for the organization.',
    email: 'abhishek@sonatype.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'vikram-mehta',
    name: 'Vikram Mehta',
    title: 'CTO & India Head',
    company: 'CloudBase Inc',
    img: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'tech',
    bio: 'Vikram Mehta serves as CTO and India Head at CloudBase Inc, building next-generation cloud solutions. His strategic vision in cloud computing and infrastructure has positioned CloudBase as an innovation leader, driving digital transformation for clients across the region.',
    email: 'vikram@cloudbase.com',
    linkedin: 'https://linkedin.com',
  },
  // HR Leaders
  {
    id: 'rajesh-puneyani',
    name: 'Rajesh Puneyani',
    title: 'Vice President & Site Leader',
    company: 'Kenvue',
    img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'hr',
    bio: 'Rajesh Puneyani is the Vice President and Site Leader at Kenvue, transforming human resources and driving organizational excellence. His strategic approach to talent management, employee engagement, and cultural transformation has strengthened the organization\'s capabilities across the region.',
    email: 'rajesh@kenvue.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Country Head & SVP',
    company: 'FinTech Corp',
    img: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'hr',
    bio: 'Priya Sharma leads FinTech Corp as Country Head and Senior Vice President, driving talent strategy and people operations. Her focus on employee development, organizational culture, and diversity & inclusion has created a thriving work environment that attracts top talent.',
    email: 'priya@fintech.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'kiran-bhat',
    name: 'Kiran Bhat',
    title: 'Director of Engineering',
    company: 'GlobalEdge',
    img: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'hr',
    bio: 'Kiran Bhat directs talent acquisition and people development initiatives at GlobalEdge across global operations. Her strategic championing of recruitment excellence and team building has been critical in attracting and retaining top engineering talent.',
    email: 'kiran@globaledge.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'neha-kulkarni',
    name: 'Neha Kulkarni',
    title: 'VP Operations & Site Lead',
    company: 'Nexus Systems',
    img: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'hr',
    bio: 'Neha Kulkarni serves as Vice President of Operations and Site Lead at Nexus Systems, optimizing organizational operations and building high-performing teams. Her people-first approach has created a culture of trust, collaboration, and continuous improvement.',
    email: 'neha@nexus.com',
    linkedin: 'https://linkedin.com',
  },
];

export default function LeaderDetailPage() {
  const params = useParams();
  const leaderId = params?.id as string;

  const leader = useMemo(() => {
    return leaders.find((l) => l.id === leaderId);
  }, [leaderId]);

  if (!leader) {
    return (
      <main className="bg-[#070b14] text-white min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Leader not found</h1>
          <p className="text-white/55 mb-8">The leader you're looking for doesn't exist.</p>
          <Link
            href="/league"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back to League
          </Link>
        </div>
      </main>
    );
  }

  const accentColor = leader.type === 'tech' ? '#1a6cff' : '#D2A679';

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <Link
          href="/league"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back to League
        </Link>
      </div>

      {/* Leader Details */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Image Section */}
            <div className="md:col-span-1">
              <div className="relative rounded-2xl overflow-hidden border-2 sticky top-24 border-[#B87333]">
                <div className="aspect-[3/4]">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                    style={{ backgroundColor: `#D2A67920`, color: "#D2A679" }}
                  >
                    {leader.type === 'tech' ? 'Tech Leader' : 'HR Leader'}
                  </span>
                </div>
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">{leader.name}</h1>
                <div className="space-y-1 mb-6">
                  <p className="text-xl font-semibold" style={{ color: "#D2A679" }}>
                    {leader.title}
                  </p>
                  <p className="text-lg text-white/70">{leader.company}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  {leader.bio}
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Connect</h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                      <Mail size={20} style={{ color: '#D2A679' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Email</p>
                      <p className="font-semibold">{leader.email}</p>
                    </div>
                  </a>

                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                      <Linkedin size={20} style={{ color: '#D2A679' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/55">LinkedIn</p>
                      <p className="font-semibold">Connect on LinkedIn</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                      <MapPin size={20} style={{ color: '#D2A679' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Location</p>
                      <p className="font-semibold">India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Experience', value: '15+ Years' },
                  { label: 'Teams Led', value: '200+' },
                  { label: 'Companies', value: '3+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                  >
                    <p className="text-white/55 text-sm">{stat.label}</p>
                    <p className="text-xl font-bold mt-1" style={{ color: '#D2A679' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Leaders Section */}
      {/* <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Other {leader.type === 'tech' ? 'Tech' : 'HR'} Leaders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {leaders
              .filter((l) => l.type === leader.type && l.id !== leader.id)
              .slice(0, 4)
              .map((relatedLeader) => (
                <Link key={relatedLeader.id} href={`/league/${relatedLeader.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer h-full">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={relatedLeader.img}
                        alt={relatedLeader.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="font-semibold text-sm leading-tight">{relatedLeader.name}</div>
                      <div className="text-white/55 text-xs mt-0.5 leading-tight">{relatedLeader.title}</div>
                      <div className="text-[#D2A679] text-xs font-semibold mt-1">{relatedLeader.company}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}

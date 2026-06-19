import Image from "next/image";
import owning from "../../public/insights/owning.avif";
import owning1 from "../../public/insights/owning1.avif";
import owning2 from "../../public/insights/owning2.avif";

import crunch from "../../public/insights/crunch.avif";
import crunch1 from "../../public/insights/crunch1.avif";
import crunch2 from "../../public/insights/crunch2.avif";
import crunch3 from "../../public/insights/crunch3.avif";

import future from "../../public/insights/future.avif";

export const insights = [
  {
    id: 'women-leaders-reshaping-gcc',
    title: "Why Women Leaders Are Reshaping GCC Culture Faster Than Traditional Enterprises",
    excerpt: 'The talent gap is widening across global capability centres, impacting hiring timelines, salary benchmarks, and execution velocity for critical initiatives.',
    date: "29 May 2026",
    readTime: '5 min read',
    tag: 'Culture',
    img: future.src,
    content: (
      <div className="space-y-8 text-base leading-8 text-white/70 sm:text-lg">
        <p>
          Women leaders are changing decision rhythms and talent practices inside Global Capability Centers (GCCs) with speed and clarity. Their approach combines inclusive hiring, continuous upskilling, and a bias toward measurable outcomes — not process for its own sake.
        </p>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Practical moves driving change</h2>
          <ul className="list-disc space-y-2 pl-6 text-white/70">
            <li>Embedding mentorship programmes that link junior hires to senior sponsors.</li>
            <li>Designing role families around capability rather than title, enabling lateral moves.</li>
            <li>Using people analytics to target development investments where they move the needle.</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl max-w-2xl w-full">
            <Image src={owning1} alt="Women leaders" className="w-full h-auto" />
          </div>
        </div>

        <p>
          The outcome is faster capability building and improved retention: teams report higher learning velocity and clearer pathways to responsibility. For GCCs, the imperative is simple — measure decisions, not headcount.
        </p>

        <div>
          <p className="font-semibold text-white mb-3">What leaders should do this quarter:</p>
          <ol className="list-decimal pl-6 space-y-2 text-white/70">
            <li>Run a one-month capability audit to identify 3 high-value development pockets.</li>
            <li>Pair senior sponsors with emerging leaders for focused 90-day projects.</li>
            <li>Align performance metrics to decisions influenced, not tasks completed.</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: 'owning-ai-stack',
    title: "Owning the AI Stack vs Renting It: The Strategic Trade-off No Leadership Team Can Ignore",
    excerpt: 'As AI infrastructure costs rise and vendor lock-in becomes a real boardroom concern, GCC leaders face a fundamental build-vs-buy question that will define their next decade of operations.',
    date: "5 May 2026",
    readTime: '8 min read',
    tag: 'AI Strategy',
    img: owning.src,
    content: (
      <div className="space-y-8 text-base leading-8 text-white/70 sm:text-lg">
        <p>
          There is a quiet but very real shift happening inside leadership conversations right now. Not about whether to invest in AI. That decision is already made. The real debate is far more uncomfortable. Do you build your own AI capability or do you rent it from someone else?
        </p>

        <p>
          Because this is not a technology decision. It is a control decision. And increasingly, it is becoming a talent decision.
        </p>

        <p>
          In simple terms, owning the AI stack means building proprietary models, infrastructure, and data systems that are deeply integrated into your business...
        </p>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl max-w-2xl w-full">
            <Image src={owning1} alt="Owning vs Renting AI Stack" className="w-full h-auto" />
          </div>
        </div>

        <p>
          This is where many organisations get it wrong. They treat this as a binary choice and swing too far in one direction...
        </p>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl max-w-2xl w-full">
            <Image src={owning2} alt="AI Capability Strategy" className="w-full h-auto" />
          </div>
        </div>

        <p>
          From a hiring perspective, this shift is already reshaping priorities...
        </p>

        <div className="rounded-2xl border border-[#D2A679]/30 bg-white/[0.03] p-6">
          <p className="text-center text-lg font-medium text-white">
            Looking to build your AI leadership team or define your AI capability roadmap?
          </p>
          <p className="mt-2 text-center text-[#D2A679] font-semibold">
            Talk to Talentiser at +91 7291991368
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'gcc-talent-crunch',
    title: "GCC Talent Crunch in India: 40% Skill Gap in AI, Data and Product Roles",
    excerpt: 'The talent gap is widening across global capability centres, impacting hiring timelines, salary benchmarks, and execution velocity for critical initiatives.',
    date: "21 April 2026",
    readTime: '6 min read',
    tag: 'Talent',
    img: crunch.src,
    content: (
      <div className="space-y-8 text-base leading-8 text-white/70 sm:text-lg">
        <p>
          India's Global Capability Center (GCC) story is having a moment. On the ground, it is anything but clean. Hiring leaders are dealing with a paradox that does not show up in glossy reports...
        </p>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl max-w-2xl w-full">
            <Image src={crunch1} alt="GCC Talent Crunch" className="w-full h-auto" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Why this matters now</h2>
          <p className="mb-4">
            GCCs are no longer back-office delivery engines...
          </p>
          <ul className="list-disc space-y-2 pl-6 text-white/70">
            <li>2–3 new GCCs are being set up every week in India.</li>
            <li>Existing GCCs are doubling down on AI, data, and platform roles.</li>
            <li>Startups and product companies are fishing in the same talent pool.</li>
          </ul>
          <p className="mt-4">The result is predictable - demand has outpaced evolution.</p>
        </div>

        <blockquote className="rounded-r-xl border-l-4 border-[#D2A679] bg-[#D2A679]/10 p-6 italic text-white/80">
          "The cost of a wrong hire in a GCC is not just salary, it is lost momentum." — Ravi Wadhwa
        </blockquote>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">From Scale to Capability: The Real Shift</h2>
          <p>
            The biggest mindset shift happening right now is this...
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <Image src={crunch2} alt="Capability Building" className="w-full h-auto" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">What Best-in-Class GCCs Are Doing Differently</h2>
          <p className="mb-4">They are not waiting for the market to fix itself...</p>
          
          <p className="font-semibold text-white mb-3">They are asking:</p>
          <ul className="list-disc space-y-2 pl-6 text-white/70 mb-4">
            <li>What have you built?</li>
            <li>What decisions have you influenced?</li>
            <li>What failures have you navigated?</li>
          </ul>

          <p className="font-semibold text-white mb-3">Instead of:</p>
          <ul className="list-disc space-y-2 pl-6 text-white/70">
            <li>Where did you work?</li>
            <li>What was your title?</li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <Image src={crunch3} alt="Future of GCC Talent" className="w-full h-auto" />
        </div>
      </div>
    ),
  },
  {
    id: 'gcc-workforce-future',
    title: "GCC Workforce Future Predictions: 2.8M Jobs, Leadership Gaps, and What Every Talent Leader Must Do Now",
    excerpt: 'With GCC headcount projected to reach 2.8 million by 2027, the leadership pipeline problem is becoming India\'s most pressing talent challenge.',
    date: "17 March 2026",
    readTime: '7 min read',
    tag: 'Leadership',
    img: crunch3.src,
    content: (
      <div className="space-y-8 text-base leading-8 text-white/70 sm:text-lg">
        <p>
          India's Global Capability Center (GCC) story is having a moment. On the ground, it is anything but clean. Hiring leaders are dealing with a paradox that does not show up in glossy reports...
        </p>

        <div className="overflow-hidden rounded-2xl">
          <Image src={crunch1} alt="India GCC Talent Market" className="w-full h-auto" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Why This Matters Now</h2>
          <p className="mb-4">
            GCCs are no longer back-office delivery engines...
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D2A679] flex-shrink-0" />
                <span>2–3 new GCCs are being set up every week in India.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D2A679] flex-shrink-0" />
                <span>Existing GCCs are doubling down on AI, data, and platform roles.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D2A679] flex-shrink-0" />
                <span>Startups and product companies are fishing in the same talent pool.</span>
              </li>
            </ul>
          </div>
        </div>

        <blockquote className="rounded-r-xl border-l-4 border-[#D2A679] bg-[#D2A679]/10 p-6 italic text-white/80">
          "Experience is no longer a proxy for readiness, exposure is." — Ravi Wadhwa, Founder - Talentiser & GCC Circle
        </blockquote>

        <blockquote className="rounded-r-xl border-l-4 border-[#D2A679] bg-[#D2A679]/10 p-6 italic text-white/80">
          "The cost of a wrong hire in a GCC is not just salary, it is lost momentum." — Ravi Wadhwa
        </blockquote>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">From Scale to Capability: The Real Shift</h2>
          <p>The biggest mindset shift happening right now is this...</p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <Image src={crunch2} alt="Capability Architecture" className="w-full h-auto" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">What Best-in-Class GCCs Are Doing Differently</h2>
          <p className="mb-4">They are not waiting for the market to fix itself...</p>
          
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <h3 className="mb-3 font-semibold text-emerald-400">They Ask</h3>
              <ul className="space-y-2 text-white/70">
                <li>✓ What have you built?</li>
                <li>✓ What decisions have you influenced?</li>
                <li>✓ What failures have you navigated?</li>
              </ul>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5">
              <h3 className="mb-3 font-semibold text-rose-400">Instead Of</h3>
              <ul className="space-y-2 text-white/70">
                <li>✕ Where did you work?</li>
                <li>✕ What was your title?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <Image src={crunch3} alt="Future GCC Workforce" className="w-full h-auto" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Future Outlook: What Happens in the Next 12–24 Months</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ul className="space-y-3 text-white/70">
              <li>• Tier 2 cities will see accelerated GCC expansion.</li>
              <li>• Nano GCCs with lean, high-impact teams will become common.</li>
              <li>• AI-led roles will grow faster than traditional engineering roles.</li>
              <li>• Competition for talent will intensify.</li>
            </ul>
          </div>
        </div>

        <blockquote className="rounded-r-xl border-l-4 border-[#D2A679] bg-[#D2A679]/10 p-6 italic text-white/80">
          "GCCs that treat hiring as a leadership lever will outperform those that treat it as a support function." — Arushi Jindal, Co-founder - Talentiser & GCC Circle
        </blockquote>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">The Talentiser POV</h2>
          <p>
            The companies that are getting this right are not necessarily the ones with the biggest budgets—they are the ones asking better questions...
          </p>
        </div>
      </div>
    ),
  },
];
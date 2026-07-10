import { StaticImageData } from "next/image";
import hemant from "../../public/images/Hemant Gupta.webp";
import nitin from "../../public/images/Nitin Srivastava.webp";
import priji from "../../public/images/Priji Thomas.webp";
import uma from "../../public/images/Uma Seetharaman.webp";
import abhishek from "../../public/images/Abhishek Chauhan.webp";
import amod from "../../public/images/Amod Deshpande.webp";
import anurag from "../../public/images/Anurag Garg.webp";
import geeta from "../../public/images/Geetha Thiagarajan.jpg";
import paras from "../../public/images/Paras Nigam.webp";
import rajesh from "../../public/images/Rajesh Puneyani.webp";
import srinivas from "../../public/images/Srinivas Chamarthy.webp";
import supriya from "../../public/images/Supriya Rao.webp";
import yogesh from "../../public/images/Yogesh More.webp";
import rohit from "../../public/images/Rohit Khanna.webp";
import rakesh from "../../public/images/Rakesh Chawla.webp";
import sidharth from "../../public/images/Sidharth Gupta.jpg";

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface LeaderData {
  name: string;
  date: string;
  linkedin: string;
  image: string | StaticImageData;
  designation: string;
  company?: string;
  quote: string;
  questionaire: QuestionAnswer[];
}

export interface Leader extends LeaderData {
  id: string;
  type: 'tech' | 'hr';
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');

export const leaderTypeMap: Record<string, 'tech' | 'hr'> = {
  'geetha-thiagarajan': 'hr',
  'sidharth-gupta': 'hr'
};

export const leaders1: LeaderData[] = [
  {
    name: "Uma Seetharaman",
    date: "29th May - 2pm",
    designation: "Product & Engineering Leader",
    linkedin: "https://www.linkedin.com/in/uma-seetharaman-1769699/",
    image: uma,
    quote:
      "The best GCC leaders transform cost centers into innovation hubs by combining governance, patience, and long-term thinking.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "My day revolves around four key pillars: Stability (Governance & Risk) - setting the right guardrails to ensure seamless operations, compliance, and sustainable growth. Scale (Team Building) - expanding the GCC footprint by hiring top-tier talent and fostering a high-performance culture from the ground up. Alignment (Reviews & 1:1s) - driving cross-functional collaboration, conducting reviews, and mentoring leaders to ensure teams remain focused on common goals. Future-Proofing (AI & Thought Leadership) - moving beyond execution by embracing innovation, AI, and strategic thinking to create long-term value."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I anchor myself through spirituality. It provides the stillness needed to declutter my mind, regain perspective, and recharge."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to shift the GCC narrative from a Cost Center focused on execution to an Innovation Hub focused on value creation."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I lead with radical transparency, openly sharing the 'why' and the 'how' behind decisions so teams can think independently and make informed choices. I also prefer walking 1:1s over traditional meetings, removing formal barriers and encouraging more authentic conversations."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look for individuals who take extreme ownership of outcomes and possess the curiosity to continuously improve how work gets done. They combine a growth mindset, where failures are treated as learning iterations, with the resilience to keep moving forward through challenges."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer: "“Play it safe.” True growth requires the courage to experiment, learn, and iterate."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I use AI to automate repetitive manual tasks while keeping the human in the loop for decisions that require judgment, context, and leadership."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer: "I attend Sanskrit classes every week."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Building a GCC isn't a 20/20 sprint — it's a test match. Success comes through endurance, consistency, strategic patience, and the ability to play the long game."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Build for the long term. Prioritize strong governance from day one and hire a core team that embodies the culture you want to create. Transformation is a test match, not a sprint. Have the patience and conviction to lead change the right way."
      }
    ]
  },

  {
    name: "Priji Thomas",
    date: "29th May - 2pm",
    designation: "Vice President & Site Leader",
    linkedin: "https://www.linkedin.com/in/priji-thomas-04b31b/",
    image: priji,
    quote:
      "Build your differentiator and your moats. That’s what creates lasting value in a GCC.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A typical day starts with identifying the big rocks that need to be moved. I value the morning hours because they are usually free from calls and meetings, allowing uninterrupted thinking time and focused decision-making. Post lunch, the day shifts towards collaboration with European and US teams, working closely with cross-functional leaders to drive alignment and execution."
      },
      {
        question: "How do you unwind after a tough week?",
        answer: "Watching a movie."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer: "Networking and staying abreast of technology changes."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I spend time with sales engineers, support teams, and customer success teams — the frontline teams — to understand what a typical day looks like for them and the challenges they face."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "During meetings and presentations, I pay close attention to how individuals conduct themselves. Their communication, confidence, and presence often provide strong indicators of future potential."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer: "“Go with the flow.”"
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "If I’m unable to solve a problem within 30 minutes, I bring in additional perspectives and get more eyes on it."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer: "I completed my schooling in Nagaland."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer: "Build your differentiator and your moats."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer: "Be curious."
      }
    ]
  },
  {
    name: "Nitin Srivastava",
    date: "18th May EOD",
    designation: "Global Director - Data and Analytics",
    linkedin: "https://www.linkedin.com/in/nitinsrivastava/",
    image: nitin,
    quote:
      "A GCC stops being a delivery center the moment it starts owning business outcomes.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Honestly, there’s no such thing as a typical day. Mornings usually begin with prioritising business outcomes — understanding which decisions need to be made, where momentum is stuck, and where teams need air cover. The day is a mix of strategy conversations, unblocking teams, stakeholder alignment across time zones, and reviewing whether what we’re building is truly moving the needle. At the core, the focus is always on ensuring the GCC drives impact, not just activity."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I usually binge-watch a good web series or movie. It helps me disconnect from work, slow down, and come back refreshed."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to move the GCC from delivery to true ownership of business outcomes — where teams feel accountable for impact, not just tasks."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I often challenge teams by asking: 'If we didn’t do this project at all, what would the business actually lose?' It helps separate activity from impact and keeps everyone honest about why something is being built."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "High-potential talent consistently does three things: they ask better questions, not just provide faster answers; they connect their work to business impact, not just technical elegance; and they take ownership beyond their role — even when it’s uncomfortable. Titles don’t matter. Mindset does."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "I’ve been fortunate to work with exceptional leaders throughout my career, so most of the advice I’ve received has actually been valuable. A lot of my learning has come from observing what great leadership looks like in practice."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "My productivity hack is building leaders around me. By coaching teams to take ownership of decisions, delegation becomes natural and allows me to focus more on strategic priorities."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "If I hadn’t gone into IT, I’d probably be in Bollywood making movies. I actually resigned from my first job to work as an Assistant Director on a film. Storytelling has always been a huge part of who I am, and making a feature film remains on my bucket list. Another lesser-known part of my journey is that I’m a trained past life regression therapist. I went through the process myself and was able to heal from a condition doctors had considered non-curable by addressing its root cause through that experience. Today, with AI, I’ve already created music videos and remote content — and eventually, after my IT and filmmaking chapters, helping people through PLR is something I deeply want to pursue."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "A GCC is not about cost arbitrage or scale — it’s about capability, trust, and ownership. The moment a GCC starts owning outcomes instead of tasks, everything changes: credibility, impact, and career growth for teams."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Don’t start by building teams — start by building relevance. Understand the business deeply, earn trust through outcomes, and design your GCC around domains, not functions. If you get that right, scale follows naturally."
      }
    ]
  },
  {
    name: "Supriya Rao",
    date: "",
    designation: "MD India",
    linkedin: "https://www.linkedin.com/in/supriya-y-rao/",
    image: supriya,
    quote:
      "If you don’t define what your GCC stands for, it will default to being a cost centre.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "My day starts with scanning global updates — UK/US threads, customer escalations, and key signals. I review core metrics like revenue, utilisation, hiring pipeline, and bench risk, followed by prepping for critical conversations with customers and leadership. The day includes 1:1s with delivery leaders and architects, hiring reviews for critical roles and pipeline health, customer checkpoints to ensure we’re truly delivering value, presales and new opportunity discussions, partnerships across AWS, ecosystem, and community, and strategic initiatives spanning India GTM, events, brand, and hiring strategy. At its core, my job isn’t to have all the answers — it’s to ensure the right problems are being solved by the right people at the right time."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I reset by first writing down what’s pending versus what can wait, and closing loops where possible. I consciously remind myself that nothing urgent should carry into Monday unless it truly is. Weekends are about slow mornings, light movement like walking or yoga, minimal social noise, and spending quality time with family — being fully present."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "Empathy, combined with clarity of prioritisation under ambiguity."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I consciously switch between zoomed-in and zoomed-out thinking, depending on what the situation demands."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I don’t look for high performers — I look for trajectory. I focus on how quickly individuals connect the dots, how they perform under pressure, and how they operate in ambiguity."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“As a leader, you need to have all the answers.”"
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I run my day on '3 outcomes' instead of a long to-do list."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I mentally rehearse tough conversations like a strategy game."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "If you don’t define what your GCC stands for, it will default to being a cost centre."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Be intentional about what you’re building — your first 50 hires will define your next 500."
      }
    ]
  },

  {
    name: "Paras Nigam",
    date: "1st April",
    designation: "VP, Engineering and AI | Site Leader",
    linkedin: "https://www.linkedin.com/in/parasnigam1/",
    image: paras,
    quote:
      "Great GCC leadership isn’t about control — it’s about orchestration, narrative, and trust.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A typical day is less about running a function and more about orchestration. I start by identifying key signals — escalations from HQ or local teams, hiring bottlenecks, attrition risks, delivery challenges, and budget alignment gaps. A significant portion of my day (30–40%) goes into stakeholder management — budgeting discussions, securing headcount, shaping perception of the India center, and aligning with global functional leaders. Alongside this, there’s continuous work on solving local issues, bringing in the right people and vendors, setting priorities, and aligning workforce with business initiatives. At its core, the role comes down to three things: building trust, creating opportunities, and controlling the narrative."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Unwinding is about stepping away from constant cognitive load. Weekends are largely focused on family — balancing responsibilities like planning for kids, household priorities, and meaningful downtime. I enjoy cooking — it’s therapeutic and helps me slow down. Catching up with close friends also helps reset perspective. I intentionally keep time for reflection — reviewing the week, thinking ahead, and entering Monday with clarity instead of chaos."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to shape, position, and control the narrative of their center."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I don’t leave things alone just because they’re working. I constantly ask — can this be better, can it scale, can it evolve? That said, I balance improvement with urgency — fixing what’s critical always comes first. I also hire for resilience and coachability — people who can handle tough feedback and grow from it. And on a lighter note — I strongly believe in 'work hard, party harder.' High performance needs energy and celebration."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look at how someone behaves when the problem is unclear. High-potential individuals don’t wait for clarity — they create it. I also look for the ability to operate across cultures — presenting confidently to global stakeholders, pushing back respectfully, and influencing without authority."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Don’t be too transparent — people can’t handle the full picture.” In reality, we work with adults. Transparency and honest communication with context always work better in the long run."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Learning through observation has been key. Equally important is protecting time for reflection and thinking — better decisions lead to better productivity."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I love office swag — it removes one daily decision: what to wear."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Scaling a GCC is not a headcount game — especially in the age of AI. It’s about delivering value to HQ, building credibility, influencing the narrative, and continuously expanding scope."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Your role is not to be the smartest person in the room — it’s to be the best orchestrator. A GCC is a complex system of global stakeholders, local talent, cultural nuances, and business expectations. Your leverage comes from aligning the right people, empowering leaders, and creating clarity in ambiguity. Also, don’t build in isolation. The ecosystem has matured — learn from those who have built, scaled, and reinvented GCCs before you."
      }
    ]
  },

  {
    name: "Rajesh Puneyani",
    date: "28th February",
    designation: "Vice President & Site Leader",
    linkedin: "https://www.linkedin.com/in/rajeshpuneyani/",
    image: rajesh,
    quote:
      "Collaboration builds momentum, but clear articulation of value builds credibility.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A typical day is less about running a fixed agenda and more about holding the center while multiple conversations move in parallel. I move between strategy, people, and context — setting direction rather than driving tasks. Some moments are spent shaping how the GCC is positioned with enterprise leaders. Others focus on ensuring the site runs smoothly and employees feel supported. A significant part of my time goes into building credibility with external stakeholders. What defines my day most is absorbing ambiguity so others can operate with clarity. I make judgment calls on what deserves attention, what can wait, and what the GCC should say yes — or no — to. Much of the impact is invisible: building trust, reinforcing confidence during uncertainty, and positioning the GCC as a strategic partner rather than just an execution arm. By the end of the day, progress may not always look tangible, but alignment, stability, and purpose are stronger because the bigger picture has been held together."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "On weekdays, spiritual discussions and soft instrumental music with my wife. On weekends, comedy series or movies with family."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to deal with ambiguity and clear the big rocks for teams — providing maximum clarity around mission, purpose, and objectives. Clear, transparent communication and storytelling, combined with strong stakeholder management, are essential."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I sometimes leave things deliberately unfinished — without a specific reason. Perhaps unconventional. Perhaps strategic pause."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "Through interpersonal interactions. I look for confidence to speak up, willingness to experiment, the courage to volunteer for cross-functional problem-solving, and comfort operating in complexity."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Don’t worry. Don’t do anything. It will die down on its own. People will forget. It’s okay.” Avoidance is not leadership."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Two habits: Scribbling notes in my phone or recording voice notes the moment a thought emerges. Quick breathing exercises whenever overthinking or anxiety begins to build."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "My calendar is so disciplined that even daily exercise, commute time, lunch, and travel back home have recurring invites."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Collaboration and co-creation matter — but even more important is clear and crisp articulation of the GCC’s value story and impact on the business."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Be bold and take measured risks. Develop an everlasting learning mindset. Listen more and speak only when needed. Wear a coaching hat — that’s what makes an effective and ultimately successful GCC leader."
      }
    ]
  },
  {
    name: "Anurag Garg",
    date: "6th March",
    designation: "Global Engineering Executive",
    linkedin: "https://www.linkedin.com/in/agarg01/",
    image: anurag,
    quote:
      "Building capability and ownership creates lasting value. Capacity built purely for cost arbitrage is temporary.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A typical workday starts around 8 AM at home, catching up on emails and Teams messages from US stakeholders to see if anything requires urgent attention. I usually reach the office around 9:30 AM, walk the floor, grab coffee at the pantry, and spend a few minutes catching up with colleagues. We have a leadership stand-up Monday through Thursday at 10:30 AM to review open items and hiring progress. This helps keep everyone aligned and ensures support where needed. The rest of the day includes project reviews, team reviews, direct and skip-level 1:1s, and site-level initiatives. Since many of my US colleagues operate in EST and CST, as the India day ends the US day begins. That means weekly or biweekly reviews, 1:1s, and staff meetings with US teams and stakeholders. With a short dinner break, the day usually ends around 10:30 PM. We try to avoid recurring meetings on Fridays. Earlier in my career working with West Coast HQ teams, the day often stretched until midnight India time."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Working with US-based GCCs leaves little time during the week, so Saturdays are typically spent meeting friends, connecting with ecosystem colleagues, and mentoring startups. Sundays are reserved for downtime with family — catching a new OTT release or spending time on the golf course."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to continuously learn, adapt, and pivot quickly in a rapidly changing environment."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "Managing by walking around. It may not be unconventional, but I value informal interactions deeply. It was the thing I missed most during the COVID period."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look for people who think beyond their immediate role — those who seek context, understand the broader business picture, and take ownership to improve systems rather than just execute tasks. These individuals naturally cross silos, take initiative to make things better, and act as force multipliers by helping others succeed. They demonstrate an ownership mindset, systems thinking, and informal leadership."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "I don’t recall specific bad advice that I personally followed, but I have seen poor leadership styles — such as being overly controlling instead of enabling people, or prioritizing short-term results at the cost of people’s well-being."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I regularly block time on my calendar to work on strategic initiatives. I break these into short-term milestones and align them with my manager and team so we stay focused on long-term objectives."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "With enough encouragement, I could probably be a good stand-up comic."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Building capability and ownership creates long-term value. Building capacity purely for cost arbitrage is temporary."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Focus on ownership. Learn the domain deeply, understand the culture, and align the center’s goals with the broader organization’s objectives."
      }
    ]
  },

  {
    name: "Amod Deshpande",
    date: "11th March",
    designation: "GCC Leader & Country Director",
    linkedin: "https://www.linkedin.com/in/amoddeshpande/",
    image: amod,
    quote:
      "Technology can be bought and talent can be hired — but ownership at scale has to be inspired.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A mix of strategy conversations, talent decisions, architectural debates, and removing invisible roadblocks. And somewhere in between, trying to finish one uninterrupted cup of coffee."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Sports, long treks, and switching from dashboards to mountain trails. Nature has a way of resetting priorities faster than any leadership workshop."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to create ownership at scale. Technology can be bought. Talent can be hired. But true ownership has to be inspired."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I ask more questions than I answer. Curiosity surfaces truth faster than authority ever can."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look for people who ask 'why,' take responsibility without being asked, and stay curious even after success. Skills get you hired. Ownership gets you trusted."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Stay in your lane.” Great leaders don’t stay in lanes — they build new roads."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Ruthless prioritization. If everything is important, nothing is. I focus on the few decisions that truly move the needle."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "Some of my best leadership thinking has happened halfway up a trekking trail, slightly out of breath, wondering why I signed up for it in the first place."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "GCCs succeed when they stop behaving like cost centers and start thinking like product companies. Real impact begins when ownership, innovation, and accountability move closer to the engineers building the future."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Build credibility before you build scale. Invest in culture, clarity, and capability first. Headcount without ownership is just expensive confusion."
      }
    ]
  },

  {
    name: "Yogesh More",
    date: "20th February",
    designation: "General Manager",
    linkedin: "http://linkedin.com/in/yogeshmore",
    image: yogesh,
    quote:
      "A GCC must evolve from a delivery outpost into an innovation engine the global enterprise cannot imagine operating without.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "My day moves between high-altitude strategy and ground-level execution. I oversee production health and release cycles to ensure stability, while driving the yearly strategic roadmap. Beyond metrics, I act as the cultural glue for the center — managing local operations and talent to ensure our GCC is not just a delivery hub, but a value-driven partner."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I reclaim balance by blending the practical with the peaceful — tackling home chores to create order, socializing with my inner circle to recharge, and spending time in nature to disconnect from screens and reset focus."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to connect strategic vision with operational excellence. This means clarity on long-term goals, navigating cross-functional matrices, maintaining efficiency, and advancing strategic milestones."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I often play devil’s advocate on key decisions. What some may call stubbornness, I call rigorous validation. I push the team to defend their logic to ensure our solutions are globally robust."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "High potential shows up in the white spaces of a resume — the ability to simplify complexity for non-technical stakeholders and act as a culture carrier. I look for the intersection of strong metrics and emotional intelligence. When someone delivers results while elevating others, they’re ready for the next level."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Results at any cost” and “I don’t care how it gets done, just get it done.” In a GCC, the 'how' defines scalability, technical debt, and long-term value. We are not just execution engines — we are consultative partners."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I front-load my day. Starting at 8:30 AM gives me two uninterrupted hours before operational meetings begin. That focused block keeps me ahead of the business instead of playing catch-up."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "While I’m rigorous about technical standards at work, I’m the 'Chief Humor Officer' off the clock. Leadership requires gravity — but life requires levity."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "A GCC leader must be a strategic polymath — a master of technology and a jack of all trades across global operations, talent branding, and stakeholder diplomacy. You must speak both boardroom and engineering fluently."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Be a strategic catalyst, not just a functional manager. Avoid populist leadership. Focus relentlessly on how your GCC drives global business goals. Transform your center from a delivery outpost into an innovation engine the enterprise cannot imagine operating without."
      }
    ]
  },
  {
    name: "Rakesh Chawla",
    date: "5th January",
    designation: "Chief Executive Officer",
    linkedin: "",
    image: rakesh,
    quote:
      "Right recruitment, at the right velocity, is the single biggest driver of GCC success.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Identifying the problems that truly need my attention and solving them. Everything else is noise."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "By cooking nutritious, genuinely good food and spending quality time talking with family and friends. That reset matters."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The ability to interview and select the right candidates at every level — technical and non-technical. Talent judgment is non-negotiable."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I make it a point to stay closely connected with employees at junior levels. You learn far more than dashboards will ever tell you."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I ask questions beyond their immediate domain and observe how they respond. It’s not about the answer — it’s about how they think."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Keep your distance and assert authority.” It’s outdated and usually counterproductive."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I respond to all emails in my inbox before the workday officially starts. It clears mental clutter fast."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I’m a serious coffee lover — and deeply disappointed by most coffee beans in the market. So I roast my own."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Right recruitment, at the right velocity, is the single biggest driver of GCC success."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Understand and adapt to matrix governance, hire with intent, and actively educate stakeholders about the realities of the Indian business environment."
      }
    ]
  },

  {
    name: "Rohit Khanna",
    date: "",
    designation: "VP Engineering & Site Leader",
    linkedin: "https://www.linkedin.com/in/rrkhanna/",
    image: rohit,
    quote:
      "Work hard, show initiative, take high ownership, and stay structured.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "From sorting out office snacks to closing a critical hire, speaking at conferences, or going deep into technical and product discussions. No two days look the same, and that’s the point."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Working out, swimming, and spending quality time with family."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "Master of some, jack of all functions."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I talk directly to customers and read feedback and support tickets myself. No filters."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "High ownership, real hunger, and clear proof of both in past experiences."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“If you want something done right, do it yourself.”"
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Planning my month and week the night before."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I’ve completed the Ironman Race."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Hang in there. Things feel difficult at times, but there’s always a way to navigate through."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Work hard, show initiative, take high ownership, and stay structured."
      }
    ]
  },

  {
    name: "Abhishek Chauhan",
    date: "",
    designation: "India Site Leader",
    linkedin: "https://www.linkedin.com/in/abhu85/",
    image: abhishek,
    quote:
      "A GCC creates real value only when it’s treated as a business and innovation hub, not as a cost center.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Optimising team members in India to align with strategy and culture, while actively talking about and promoting the usage of AI code assistants."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "What is unwind? 🙂 On a serious note, Saturdays are game days with friends, and Sundays are reserved for long, guilt-free sleep-ins."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "Practical, hands-on exposure to AI."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I personally give a company and product overview to every new joiner."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "Through meetups and developer community connects."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“Keep a distance between yourself and engineers; you are very high up in the hierarchy.”"
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "No secret. Just hard work."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I do a lot of leisure travel on my motorbike."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "A GCC creates real value only when it’s treated as a business and innovation hub, not as a cost center."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Be less administrative and more business-oriented to create long-term value. And patience is always a good friend to have."
      }
    ]
  },
  {
    name: "Srinivas Chamarthy",
    date: "",
    designation: "SVP Engineering & India Site Leader",
    linkedin: "https://www.linkedin.com/in/srinivaschamarthy",
    image: srinivas,
    quote: "Communication and collaboration are the most important traits a leader can have.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Unblocking teams, making decisions, implementing and reviewing processes, and balancing velocity, quality, innovation, growth, hiring, legal considerations, and cross-functional dependencies. This typically includes syncing with the leadership team on critical blockers, strategic planning and refining business cases for new use cases that increase ARR or data monetisation, reviewing architectural decisions and conducting technical deep dives, performance evaluations and vendor discussions, hiring pipeline reviews and build vs buy decisions, stakeholder management across functions, budget reviews, ROI analysis, financial modelling, and Monthly Operating Reviews (MORs) and Quarterly Business Reviews (QBRs)."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Spending time with family."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "Communication, technical depth, mentoring, and stakeholder management — with stakeholder management being the most critical."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "No."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "By their ability to implement systems at scale, solve latency challenges, and build complex platforms that power high business revenue."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "“It’s okay, we can cross the bridge when it comes.”"
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Collaborate and be a servant leader."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I enjoy all kinds of music — Indian, rap, pop, and more."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Communication and collaboration are the most important traits a leader can have."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Build a strong technical foundation, develop a genuine collaboration mindset, and communicate — repeatedly and clearly."
      }
    ]
  },
  {
    name: "Hemant Gupta",
    date: "",
    designation: "",
    company: "",
    linkedin: "https://www.linkedin.com/in/hemant-gupta-744bb35/",
    image: hemant,
    quote:
      "A GCC becomes truly valuable when teams stop owning tasks and start owning business outcomes.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Honestly, my day starts before the formal workday begins. Around 7 AM, I review messages, customer updates, delivery risks, and overnight developments from our UK teams. Based on those inputs, I prioritize the day and identify what requires immediate attention. The mornings are largely India-focused. I work closely with a 40+ member team spanning engineering, cloud operations, customer support, implementation, finance, and HR operations. My focus is not only on execution but also on understanding team sentiment, identifying blockers, gathering customer feedback, and determining where leadership intervention is needed. A practice I strongly believe in is creating visibility. I continuously share company updates, customer priorities, product direction, and business context so that the India team operates with ownership rather than as an offshore execution unit. As the day progresses, my focus shifts to UK and global stakeholders. I collaborate with the CTO, CPO, product owners, security teams, sales leaders, and customer-facing functions on roadmap planning, architecture, customer commitments, security, production operations, and delivery risks. One-on-one conversations are also a critical part of ensuring alignment. Alongside operational responsibilities, I spend significant time on future-focused initiatives, particularly AI strategy, agentic workflows, and the practical implementation of AI-driven operational models. Staying close to technology allows me to contribute to prototypes, architecture discussions, and innovation efforts. Ultimately, my role is a blend of running today's business while building tomorrow's capabilities."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I try to disconnect from the constant flow of meetings, messages, and decision-making. Spending quality time with family, taking long walks, and allowing myself space for quiet reflection helps me reset. Walking, in particular, gives me the opportunity to evaluate what worked well, what could be improved, and what deserves attention in the coming week. I’ve also learned not to carry every unresolved issue into the weekend. Recovery is an important part of performance. Without it, you cannot show up with clarity and energy for your team. I also enjoy reading about technology, AI, and product innovation—not because I have to, but because I genuinely enjoy it."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "A GCC leader must be able to bridge business, product, technology, people, and operations. The role requires translating context between global strategy and local execution, product vision and engineering reality, and business objectives and team capability. That ability to create understanding and context is what transforms teams from task executors into true owners of outcomes."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I pay close attention to what isn’t being said. When someone says, “Everything is fine,” I observe tone, confidence, hesitation, and energy levels—not just the status update itself. Often, the real risks aren't visible in reports; they are visible in team sentiment. I also remain deeply connected to technology, actively experimenting with AI workflows, architecture concepts, and prototypes. Staying hands-on helps me support and challenge teams more effectively."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I observe how people behave when the path forward isn’t clearly defined. High-potential individuals ask the right questions rather than waiting for instructions, bring structure to ambiguity, connect their work to business outcomes, think beyond execution, and take ownership of recommendations and decisions. I also pay attention to how they elevate those around them. True leadership potential is reflected not just in individual performance, but in the impact they create for the wider team."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "\"Leave emotions out of leadership.\" While leaders need to remain objective and accountable, completely ignoring emotions is a mistake. The best leaders combine data, governance, and decision-making with empathy and emotional awareness. Often, the biggest risks are not found in dashboards—they are found in fatigue, silence, confusion, or loss of ownership within teams."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "I start every day by converting noise into priorities. Rather than treating every message, escalation, or meeting as equally important, I categorize work into three buckets: what requires an immediate decision, what requires alignment, and what can be delegated or monitored. I also use walking time as thinking time. Some of my best ideas and clearest decisions emerge away from the screen."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "Despite spending much of my time on leadership, operations, and strategy, I remain deeply passionate about technology. I continue to explore AI, agentic workflows, and automation hands-on because it keeps me connected to the builder mindset that originally drew me into technology."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "The biggest transformation happens when teams move from execution ownership to business ownership. When people understand the customer, product vision, and business context, they stop merely completing tasks and begin owning outcomes. A GCC becomes truly valuable when it evolves into a capability center built on trust, context, visibility, and ownership."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Focus on creating business context—not just managing delivery. Help teams understand the customer, product vision, roadmap, and business objectives. When people understand the \"why,\" they naturally take ownership of outcomes. Stay close to both people and technology. Leadership cannot happen solely through dashboards and status calls. Finally, build trust through transparency. Be honest about risks, avoid overpromising, and consistently provide solutions and visibility. The future GCC leader must be a bridge between global strategy and local execution, technology capability and business outcomes, and today's delivery and tomorrow's innovation."
      }
    ]
  },
  {
    name: "Arun Kohli",
    date: "",
    designation: "",
    company: "",
    linkedin: "https://www.linkedin.com/in/kohliarun",
    image: "",
    quote:
      "A GCC's mandate grows at the speed of trust. Credibility is earned through consistent delivery, business understanding, and stakeholder confidence.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "A typical day is a mix of strategy, stakeholder conversations, people discussions, and unblocking initiatives that are moving more slowly than they should. There’s constant context-switching between GCC priorities and global expectations, with a significant amount of time spent translating broad ambitions into practical next steps. And honestly, the calendar often has a mind of its own."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "Doing something selfless is usually the most meaningful part of my week."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "Adaptability and the ability to navigate ambiguity. We’re operating in an environment of constant change, and success depends on dynamic thinking and the ability to evolve quickly."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I like testing new AI tools myself before discussing enterprise adoption. It helps me separate genuine capability from impressive demos and ensures I have first-hand experience before recommending any technology."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look for people who demonstrate curiosity, take ownership beyond their job description, and connect their work to broader business outcomes. High-potential talent isn't always the loudest voice in the room. More often, it's the individual who brings clarity to ambiguous problems, learns quickly, and earns trust across teams."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "Stay in your lane."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Prioritization. It's both an art and a science."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "A surprising number of my best ideas come while walking my dog."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "A GCC's mandate grows at the speed of trust. Strong talent is essential, but credibility is earned through consistent delivery, business understanding, and the confidence of global stakeholders."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Learn the business before trying to transform it. Understanding the business context is the foundation for creating lasting impact."
      }
    ]
  },
  {
    name: "Deepika Gandhi",
    date: "",
    designation: "",
    company: "",
    linkedin: "https://www.linkedin.com/in/deepika-gandhi-4b02417/",
    image: "",
    quote:
      "Scale alone is not strategy. The strongest GCCs are the ones that grow more relevant—not just bigger.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a GCC leader — honestly?",
        answer:
          "Honestly, there’s no such thing as a \"typical\" day—and that’s exactly what makes it exciting. A large part of my day is spent context-switching between strategy and execution. One moment I’m focused on long-term capability building and talent strategy, and the next I’m unblocking a delivery issue, reviewing a transformation initiative, or aligning stakeholders across geographies. What remains constant is the people-centricity. A good day always includes time with my leadership team, conversations with emerging talent, and space to think about how we continue making the GCC a strategic asset for the global business."
      },
      {
        question: "How do you unwind after a tough week?",
        answer:
          "I like switching off by doing something completely unrelated to dashboards, org charts, or operating models. One ritual that helps me reset is playing Sudoku—usually during my commute and more seriously over the weekend. It clears my mind while keeping it engaged. I also enjoy reading. A mentor once described this as \"tuning the radio\"—shifting out of the noise and back into clarity—and I've found that to be incredibly effective."
      },
      {
        question: "What’s the one skill every GCC leader must have today?",
        answer:
          "The conscious ability to connect the dots between business strategy, talent, culture, technology, and execution. GCCs are no longer just delivery engines or cost-arbitrage centers—they are value creators. Leaders must navigate ambiguity, translate strategy into action, and align teams to a larger business narrative."
      },
      {
        question: "Do you have any quirky or unconventional leadership habits?",
        answer:
          "I ask a lot of questions. Whenever someone presents an issue, my instinct is to ask: \"What's the issue behind the issue?\" It helps uncover root causes instead of simply reacting to symptoms. I also carry a notebook wherever I go, capturing observations, ideas, and recurring patterns. More often than not, solutions to complex problems emerge from revisiting those notes weeks—or even months—later."
      },
      {
        question: "How do you personally spot high-potential talent in a GCC?",
        answer:
          "I look for four qualities: Curiosity, Collaboration, Ownership, and Breadth of thinking. High-potential individuals don't stop at doing their jobs well. They ask better questions, step outside their immediate responsibilities, and volunteer for broader initiatives. I also believe potential isn't defined by traditional career paths. In a GCC environment, some of the strongest leaders emerge from diverse backgrounds and unconventional journeys. The people who thrive are those who influence without authority and continue learning faster than the environment evolves."
      },
      {
        question: "What’s the worst piece of leadership advice you’ve ever received?",
        answer:
          "\"Don't get too close to the team—leaders need distance.\" I've never believed that. Leadership isn't about creating distance; it's about building clarity, consistency, and trust. Teams aren't simply there to execute instructions—they amplify a leader's thinking, reach, and impact. The best leadership happens when people know they're understood, valued, and supported."
      },
      {
        question: "Do you have a secret productivity hack that actually works for you?",
        answer:
          "Nothing revolutionary—I deliberately leave white space in my calendar. That space allows me to deal with the unexpected, learn, reflect, explore opportunities, or simply be available when someone on my team needs a sounding board. Another personal rule is simple: if something can be resolved with a quick phone call, I'd rather make the call than start a long email thread."
      },
      {
        question: "Share one fun or surprising fact about you that your team may not know.",
        answer:
          "I'm probably far more of an observer than people realize. In group settings, I don't always react immediately. Instead, I'm quietly observing patterns, reading the room, noticing energy shifts, and paying close attention to what's not being said. Many of my leadership decisions are shaped by those observations and the notes I revisit later."
      },
      {
        question: "What’s one big lesson the GCC ecosystem has taught you?",
        answer:
          "Scale alone is not strategy. The strongest GCCs aren't necessarily the biggest—they're the most relevant. Relevance comes from building trust, investing in diverse talent, and evolving from execution support to decision-shaping impact. Ultimately, long-term value is created when capability, culture, and business context come together. Future-ready GCCs won't just be high-performing—they'll be responsible institutions that contribute meaningfully to people, communities, and sustainable business growth."
      },
      {
        question: "What advice would you give to future GCC leaders just starting out?",
        answer:
          "Don't build only for today's requirements—build for the role your GCC will need to play three years from now. Invest early in culture, leadership bench strength, and credibility with global stakeholders. Spend as much time understanding the business as you do understanding your role. Tomorrow's GCC leaders won't be defined solely by execution excellence, but by their ability to shape strategy, influence decision-making, and build inclusive talent ecosystems that create long-term value."
      }
    ]
  },
  {
    name: "Geetha Thiagarajan",
    date: "",
    designation: "Country Head | People & Culture",
    company: "Curriculum Associates",
    linkedin: "https://www.linkedin.com/in/geetha-thiagarajan/",
    image: geeta,
    quote:
      "I don’t hire for the role. I hire for the room - because the right person doesn’t just do the job, they elevate everyone around them.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a Talent Leader — honestly?",
        answer:
          "I start the day thinking I’ll be strategic, and I spend the first hour putting out a fire no one saw coming. Then there’s a hiring manager who needs a quick call, a candidate who’s gone quiet, and a dashboard telling me something I don’t want to hear. By afternoon, I’m in back-to-back conversations — half coaching, half convincing. Somewhere in between, I’m trying to remember why I got into this work. Then someone on the team solves a problem without being asked, or a new hire says they finally feel like they belong. And I remember — this is the job. Not the decks. The moments where people actually move forward. The calendar looks like chaos. The work feels like purpose."
      },
      {
        question: "What’s the toughest hiring challenge you’re solving right now in GCCs?",
        answer:
          "The toughest challenge isn’t finding talent — it’s convincing talent that a GCC is a career, not a compromise. We’re solving for narrative. Can we credibly tell candidates they’ll do meaningful global work, not just execute from afar? The toughest hires are the ones who want to believe us but have been burned before. Rebuilding that trust, one real conversation at a time — that’s the real work."
      },
      {
        question: "How do you unwind after a long week of hiring chaos?",
        answer:
          "Good food, bad TV, and absolutely zero Slack notifications."
      },
      {
        question: "What’s the one skill every Talent Leader must have today?",
        answer:
          "Curiosity — especially in how people talk about success versus failure."
      },
      {
        question: "How do you spot high-potential talent beyond what’s on a resume?",
        answer:
          "By how they think, not just what they’ve done — especially how they process wins and failures."
      },
      {
        question: "What’s the funniest or weirdest thing a candidate has said or done?",
        answer:
          "“If I were you, I would hire me.” It took me a few seconds, but I did laugh."
      },
      {
        question: "One hiring myth you strongly disagree with",
        answer:
          "That hiring decisions are made in the first 20 seconds. They’re not."
      },
      {
        question: "Do you have a personal rule or non-negotiable when it comes to hiring?",
        answer:
          "I don’t hire for the role. I hire for the room. Can this person elevate the team? Can they handle being wrong? Can they disagree constructively? Skills can be built, but someone who shrinks the room — that’s not fixable."
      },
      {
        question: "Do you have a productivity hack that actually works for you?",
        answer:
          "Using AI — hasn’t killed anybody yet."
      },
      {
        question: "What’s one big lesson the GCC hiring ecosystem has taught you?",
        answer:
          "The most dangerous candidate isn’t the weak one — it’s the 'perfect on paper' candidate who leaves when something shinier comes along. Purpose matters more than compensation in the long run."
      },
      {
        question: "What advice would you give to future Talent Leaders?",
        answer:
          "Learn the business obsessively. Not HR theory — the actual business. Revenue, product, customer. When you connect hiring to business outcomes, you stop being support and become strategic."
      }
    ]
  },
  {
    name: "Sidharth Gupta",
    date: "",
    designation: "",
    company: "Bupa GCC",
    linkedin: "https://www.linkedin.com/in/amazon-leader",
    image: sidharth,
    quote:
      "Leadership isn't about saying 'yes' to every request. It's about earning trust through expertise, conviction, and sound judgment.",
    questionaire: [
      {
        question: "What does a typical day look like for you as a Talent Leader — honestly?",
        answer:
          "Setting up the Bupa GCC is a dynamic, high-stakes balancing act. A typical day is defined by constant uncertainty, ad hoc requests, and managing complex internal teams and vendor ecosystems. At the same time, I'm in back-to-back meetings with global stakeholders. Success comes from seamlessly bridging real-time operational execution with international strategic alignment. It's a demanding role that tests resilience every day, requiring rapid adaptability to drive corporate strategy while keeping local execution firmly on track."
      },
      {
        question: "What’s the toughest hiring challenge you’re solving right now in GCCs?",
        answer:
          "Building the Bupa GCC presents two major challenges. The first is accelerating talent acquisition while convincing business units to move away from long-standing external service providers. We have to demonstrate that the GCC can deliver exceptional talent and business outcomes at speed. The second is changing how global leadership views GCCs. Many still see them as transactional, cost-focused delivery centres rather than strategic capability hubs. The real challenge is balancing rapid execution with continuous advocacy—helping leadership see the GCC as an equal enterprise partner."
      },
      {
        question: "How do you unwind after a long week of hiring chaos?",
        answer:
          "Spending time talking with my team, office friends, and my family."
      },
      {
        question: "What’s the one skill every Talent Leader must have today?",
        answer:
          "Adaptability."
      },
      {
        question: "How do you spot high-potential talent beyond what’s on a resume?",
        answer:
          "I use AI to assess how well a resume aligns with the role, conduct structured recruiter screening conversations, ask 'out-of-syllabus' questions to understand how candidates think, and review their LinkedIn presence and professional footprint."
      },
      {
        question: "What’s the funniest or weirdest thing a candidate has said or done?",
        answer:
          "One candidate asked if we could hire her boyfriend as well."
      },
      {
        question: "One hiring myth you strongly disagree with",
        answer:
          "That the HR interview is just a formality."
      },
      {
        question: "Do you have a personal rule or non-negotiable when it comes to hiring?",
        answer:
          "Ethics are non-negotiable."
      },
      {
        question: "Do you have a productivity hack that actually works for you?",
        answer:
          "I use time-blocked 'Global Windows' and 'Local Sprints.' Mornings are reserved for deep work, sourcing strategy, and vendor management with no global meetings. Afternoons and evenings are dedicated to global stakeholder discussions and leadership coaching. Grouping similar work together protects execution time and minimizes constant context switching."
      },
      {
        question: "What’s one big lesson the GCC hiring ecosystem has taught you?",
        answer:
          "Joining a GCC requires a very different mindset from working in a traditional technology company. The challenges, stakeholders, and operating model are fundamentally different."
      },
      {
        question: "What advice would you give to future Talent Leaders?",
        answer:
          "Many people assume they're Talent Acquisition experts simply because they've interviewed candidates. In a GCC, Talent Leaders must operate as strategic advisors—not order takers. Use talent intelligence and market data to shape hiring strategy, establish clear ownership of the hiring process, and have the courage to challenge stakeholders when quality is at risk. Leadership isn't about saying 'yes' to every request. It's about earning trust through expertise, conviction, and sound judgment."
      },
      {
        question: "Fun / Surprising Fact",
        answer:
          "I always appear calm on the outside... but I'm usually feeling very chaotic on the inside."
      }
    ]
  }
];


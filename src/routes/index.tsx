import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Download, Mail, Github, Linkedin, MapPin, Phone,
  Code2, Database, Server, Layers, Briefcase, GraduationCap,
  ExternalLink, CheckCircle2, Menu, X, Award, Sparkles, Zap,
} from "lucide-react";
import avatar from "@/assets/yousef-avatar-dark.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yousef Aldeeb — ASP.NET Full-Stack Developer" },
      { name: "description", content: "Portfolio of Yousef Mohammad Aldeeb — ASP.NET Core, Entity Framework, Web API, SQL/Oracle. Projects, experience, and contact." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  ["home", "Home"], ["about", "About"], ["experience", "Experience"],
  ["skills", "Skills"], ["services", "Services"], ["projects", "Projects"],
  ["certificates", "Certificates"], ["contact", "Contact"],
] as const;

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Nav open={open} setOpen={setOpen} active={active} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ open, setOpen, active }: { open: boolean; setOpen: (b: boolean) => void; active: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground mono text-sm">Y</span>
            <span className="text-gradient">Yousef.dev</span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active === id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
            Hire Me <ArrowRight className="h-4 w-4" />
          </a>
          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="glass rounded-2xl mt-2 p-3 lg:hidden animate-fade-in">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10">
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const stack = ["ASP.NET Core", "C#", "EF Core", "Web API", "SQL Server", "Oracle", "JavaScript", "Bootstrap"];
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.17 240 / 0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.17 240 / 0.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.35fr] gap-10 items-center relative">
        {/* Left: copy */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-muted-foreground">Available for opportunities</span>
            <span className="text-border">·</span>
            <span className="text-primary">Amman, JO</span>
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
            Hi, I'm <br className="hidden md:block" />
            <span className="text-gradient">Yousef Aldeeb</span>
          </h1>

          <div className="mt-5 flex items-center gap-3 text-lg md:text-xl">
            <span className="mono text-primary">&gt;</span>
            <span className="text-foreground/90">ASP.NET Full-Stack Developer</span>
            <span className="inline-block h-5 w-[2px] bg-primary animate-pulse" />
          </div>

          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Software Engineering graduate from JUST, specializing in ASP.NET Core MVC,
            Entity Framework Core, Web APIs, and database-driven applications. I build
            efficient, scalable software that ships.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-3 font-medium glow transition hover:shadow-xl hover:-translate-y-0.5">
              View My Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
            <a href="/Yousef-Aldeeb-CV.pdf" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 font-medium hover:bg-primary/10 hover:-translate-y-0.5 transition">
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "2+", v: "Years experience" },
              { k: "10+", v: "Projects shipped" },
              { k: "3.25", v: "GPA · JUST" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl px-4 py-3">
                <div className="text-2xl font-bold text-gradient">{s.k}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 text-muted-foreground">
            <a href="https://github.com/yousefweb" target="_blank" rel="noreferrer" aria-label="GitHub" className="glass rounded-lg p-2.5 hover:text-primary hover:-translate-y-0.5 transition"><Github className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/yousef-al-deeb/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass rounded-lg p-2.5 hover:text-primary hover:-translate-y-0.5 transition"><Linkedin className="h-4 w-4" /></a>
            <span className="mono text-xs">github.com/yousefweb</span>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="relative animate-fade-in lg:justify-self-end">
          <div className="relative mx-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/50 to-accent/50 blur-3xl opacity-60 rounded-[2.5rem]" />

            {/* Avatar card */}
            <div className="relative glass rounded-3xl p-2 overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-card">
                <img
                  src={avatar}
                  alt="Yousef Aldeeb"
                  width={768}
                  height={768}
                  className="w-full h-full aspect-square object-cover scale-[1.35] object-[center_18%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <div className="mono text-[10px] uppercase tracking-widest text-primary">Currently</div>
                    <div className="text-sm font-medium">Royal Scientific Society</div>
                  </div>
                  <span className="glass rounded-lg px-2 py-1 mono text-[10px] flex items-center gap-1">
                    <Zap className="h-3 w-3 text-emerald-400" /> Online
                  </span>
                </div>
              </div>
            </div>

            {/* Floating tech chips */}
            <div className="absolute -bottom-6 -left-8 glass rounded-xl px-4 py-3 animate-float">
              <div className="flex items-center gap-2 mono text-xs">
                <Code2 className="h-4 w-4 text-primary" /> ASP.NET Core
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 mono text-xs">
                <Database className="h-4 w-4 text-accent" /> SQL / Oracle
              </div>
            </div>
            <div className="absolute top-1/2 -right-10 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-2 mono text-xs">
                <Server className="h-4 w-4 text-primary" /> Web API
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="mt-16 relative">
        <div className="glass border-x-0 rounded-none py-4 overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-[marquee_28s_linear_infinite] mono text-sm text-muted-foreground">
            {[...stack, ...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="mono text-xs uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-4xl md:text-5xl font-bold">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About() {
  const strengths = [
    "Fast learner", "Team collaboration", "Problem solving",
    "Time management", "Works under pressure", "Continuous improvement",
  ];
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="About Me" title="Building software that matters." />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-2xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              Software Engineering graduate from Jordan University of Science and Technology (2023)
              with a Very Good grade and GPA 3.25. Experienced in ASP.NET Web Development with
              strong knowledge of Object-Oriented Programming concepts, MVC architecture,
              Entity Framework Core, and both database-first and code-first approaches.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {strengths.map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 text-primary">
              <GraduationCap /> <span className="mono text-xs uppercase tracking-widest">Education</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold">Bachelor's in Software Engineering</h3>
            <p className="text-muted-foreground mt-1">Jordan University of Science and Technology</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-2"><dt className="text-muted-foreground">Graduated</dt><dd>October 2023</dd></div>
              <div className="flex justify-between border-b border-border/50 pb-2"><dt className="text-muted-foreground">Grade</dt><dd>Very Good</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GPA</dt><dd className="mono text-primary">3.25 / 4.00</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

const EXPERIENCES = [
  {
    company: "Royal Scientific Society",
    role: "ASP.NET Full Stack Web Developer",
    period: "Jan 2025 — Present",
    points: [
      "Full-stack ASP.NET web application development",
      "Building frontend and backend solutions",
      "Developing APIs using ASP.NET Web API",
      "JavaScript, HTML5, CSS, Bootstrap on the frontend",
      "Database development with Oracle SQL Developer and Toad",
      "Oracle Forms and ADM systems",
      "Reports with SQL Server Reporting Services (SSRS)",
      "Repository management and version control",
    ],
    tech: ["ASP.NET MVC", "ASP.NET Web API", "Oracle SQL", "JavaScript", "AJAX", "Bootstrap", "SSRS"],
  },
  {
    company: "Electronic Health Solutions",
    role: "Software Development Officer",
    period: "May 2024 — Jan 2025",
    points: [
      "Healthcare technology solutions and Vista architecture",
      "MUMPS language (M) and specialized healthcare systems",
    ],
    tech: ["MUMPS (M)", "Vista", "Healthcare Systems"],
  },
  {
    company: "Orange Coding School",
    role: "Full Stack Developer Intern",
    period: "Oct 2023 — Jan 2024",
    points: [
      "Developed full-stack web applications",
      "Applied UI/UX principles, wireframes in Miro",
      "Project management with Trello, Discord, GitHub",
      "Projects: Portfolio, Attendance Tracker, E-commerce",
    ],
    tech: ["ASP.NET Core MVC", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    company: "Coderz for Software and Training",
    role: "ASP.NET Core MVC Trainee",
    period: "Oct 2022 — Dec 2022",
    points: [
      "60-hour ASP.NET Core MVC program",
      "OOP, Validation and Data Annotation",
      "Entity Framework Core, SQL databases, API development",
    ],
    tech: ["ASP.NET Core MVC", "EF Core", "SQL", "OOP"],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Experience" title="Where I've built things." />
        <div className="mt-12 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
          <div className="space-y-10">
            {EXPERIENCES.map((e, i) => (
              <div key={e.company} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}>
                <div className="pl-12 md:pl-0 md:px-6">
                  <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-2 h-4 w-4 rounded-full bg-primary glow" />
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-primary">
                          <Briefcase className="h-4 w-4" />
                          <span className="mono text-xs">{e.period}</span>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
                        <p className="text-muted-foreground">{e.company}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2"><span className="text-primary">▸</span>{p}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.tech.map((t) => (
                        <span key={t} className="mono text-[11px] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILL_GROUPS: { title: string; icon: React.ElementType; items: { name: string; level: number }[] }[] = [
  { title: "Backend", icon: Server, items: [
    { name: "C#", level: 92 }, { name: "ASP.NET Core MVC", level: 92 },
    { name: "ASP.NET Web API", level: 88 }, { name: "Entity Framework Core", level: 88 },
    { name: "ASP.NET MVC", level: 85 }, { name: "Code First / DB First", level: 85 },
  ]},
  { title: "Frontend", icon: Layers, items: [
    { name: "JavaScript", level: 82 }, { name: "HTML5", level: 92 },
    { name: "CSS3", level: 88 }, { name: "Bootstrap", level: 90 }, { name: "AJAX", level: 80 },
  ]},
  { title: "Databases", icon: Database, items: [
    { name: "Microsoft SQL Server", level: 88 }, { name: "Oracle SQL", level: 82 },
    { name: "Oracle Forms", level: 72 },
  ]},
  { title: "Tools & Practices", icon: Code2, items: [
    { name: "Visual Studio / VS Code", level: 92 }, { name: "GitHub / Version Control", level: 88 },
    { name: "Postman", level: 85 }, { name: "SSRS", level: 78 }, { name: "Agile / Scrum", level: 82 },
  ]},
];

function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Skills" title="Tools I reach for." />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map(({ title, icon: Icon, items }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <div className="mt-6 space-y-4">
                {items.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Layers, title: "Web Application Development",
    desc: "Modern, responsive, scalable websites using ASP.NET Core MVC and Entity Framework Core." },
  { icon: Server, title: "API Development",
    desc: "Secure and efficient REST APIs using ASP.NET Web API and Node.js." },
  { icon: Database, title: "Database Solutions",
    desc: "Design and manage systems with SQL Server and Oracle, using Code First and Database First." },
  { icon: Code2, title: "Full Stack Development",
    desc: "Complete solutions from frontend interfaces to backend services and database integration." },
];

function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Services" title="What I can build for you." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group glass rounded-2xl p-6 hover:-translate-y-1 transition">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Health Provisor",
    tag: "Medical Consultation Platform",
    desc: "ASP.NET Core MVC healthcare platform for consultation management between doctors, patients, and administrators. Role-based auth, AJAX interactions, DI architecture.",
    tech: ["ASP.NET Core MVC", "AJAX", "Bootstrap", "MSSQL"],
    href: "https://github.com/yousefweb/Health-Provisor",
    icon: "❤",
  },
  {
    title: "5Dot",
    tag: "Mobile-Optimized eCommerce Hub",
    desc: "ASP.NET Core MVC e-commerce platform for mobile users with category management, secure payments, and personalized shopping.",
    tech: ["ASP.NET Core MVC", "Bootstrap", "SQL Server"],
    href: "https://github.com/Five-Dot/5Dot",
    icon: "🛒",
  },
  {
    title: "Product Purchase System",
    tag: "PPS · Hope International",
    desc: "Node.js procurement management system to improve product purchasing processes for Hope International Company.",
    tech: ["Node.js", "JavaScript"],
    href: "https://github.com/ScriptingTeamApp/PPS",
    icon: "📦",
  },
  {
    title: "Tabeebk.com",
    tag: "Graduation Project",
    desc: "Clinic booking web application built at Jordan University of Science and Technology. Patient management, doctor scheduling, booking system.",
    tech: ["ASP.NET MVC", "SQL", "Bootstrap"],
    href: "https://github.com/yousefweb/Tabeebk",
    icon: "🩺",
  },
];

function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Projects" title="Selected work." />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noreferrer"
              className="group glass rounded-2xl p-6 hover:-translate-y-1 transition block">
              <div className="flex items-start justify-between">
                <div className="grid place-items-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-2xl">
                  {p.icon}
                </div>
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <div className="mono text-xs uppercase tracking-widest text-primary mt-6">{p.tag}</div>
              <h3 className="mt-1 text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="mono text-[11px] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{t}</span>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-sm text-primary">
                View on GitHub <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  "Bachelor Degree — Jordan University of Science and Technology",
  "Coderz ASP.NET Core MVC Training",
  "Node.js Backend Training — Hope International",
  "Orange Coding School Certificate",
  "Advanced Computer Skills",
  "Entrepreneurship — Cisco Networking Academy",
  "British Council Certificates",
  "ISO 9001 Foundation Quality Certification",
  "SQL Server Reporting Services (SSRS)",
];

function Certificates() {
  return (
    <section id="certificates" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Certificates" title="Training & credentials." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS.map((c) => (
            <div key={c} className="glass rounded-xl p-5 flex items-start gap-3 hover:border-primary/40 transition">
              <span className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-medium leading-snug">{c}</div>
                <div className="mono text-[11px] text-muted-foreground mt-1">Certified</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="grid lg:grid-cols-2 gap-10 relative">
            <div>
              <div className="mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Get in touch
              </div>
              <h2 className="mt-2 text-4xl md:text-5xl font-bold">Let's build something great.</h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Open to full-stack .NET roles, freelance projects, and collaborations.
                I usually reply within 24 hours.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <a href="mailto:yousef.aldeeb11@gmail.com" className="flex items-center gap-3 hover:text-primary transition">
                  <Mail className="h-4 w-4 text-primary" /> yousef.aldeeb11@gmail.com
                </a>
                <a href="tel:+962795837513" className="flex items-center gap-3 hover:text-primary transition">
                  <Phone className="h-4 w-4 text-primary" /> +962 79 583 7513
                </a>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Amman, Jordan</div>
                <div className="flex items-center gap-4 pt-4">
                  <a href="https://github.com/yousefweb" target="_blank" rel="noreferrer" className="glass rounded-lg p-2.5 hover:text-primary transition"><Github className="h-4 w-4" /></a>
                  <a href="https://www.linkedin.com/in/yousef-al-deeb/" target="_blank" rel="noreferrer" className="glass rounded-lg p-2.5 hover:text-primary transition"><Linkedin className="h-4 w-4" /></a>
                  <a href="https://yousefweb.github.io/Portfolio/" target="_blank" rel="noreferrer" className="glass rounded-lg p-2.5 hover:text-primary transition"><ExternalLink className="h-4 w-4" /></a>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:yousef.aldeeb11@gmail.com"; }}
              className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <Field label="Subject" name="subject" placeholder="Project inquiry" />
              <div>
                <label className="mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea rows={5} required placeholder="Tell me about your project…"
                  className="mt-2 w-full rounded-xl bg-input/50 border border-border px-4 py-3 outline-none focus:border-primary transition" />
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-medium hover:opacity-90 glow transition">
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-input/50 border border-border px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Yousef Mohammad Aldeeb. All rights reserved.</div>
        <div className="mono text-xs">Built with ASP.NET mindset · React + TypeScript</div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Home, BookOpen, Code2, FolderGit2, UploadCloud, User, Menu, X, Search,
  Download, Play, CheckCircle2, ChevronRight, ChevronDown, FileText,
  Image as ImageIcon, File as FileIcon, Trash2, FolderOpen, Eye, ArrowRight,
  Sparkles, Filter, Clock, FileCode2, Copy, Check, Rocket, Orbit, PanelsTopLeft,
  ListChecks, GraduationCap, ChevronLeft, Plus, AlertCircle
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const CHAPTERS = [
  { id: "c1", title: "Introduction to C", desc: "History, structure of a C program, compilation process and your first \"Hello, World\".", pages: 12, progress: 100 },
  { id: "c2", title: "Data Types", desc: "Primitive types, type qualifiers, constants and the size of things in memory.", pages: 9, progress: 100 },
  { id: "c3", title: "Operators", desc: "Arithmetic, relational, logical, bitwise operators and operator precedence.", pages: 10, progress: 80 },
  { id: "c4", title: "Control Statements", desc: "if-else, switch, loops and the flow of decisions through a program.", pages: 14, progress: 60 },
  { id: "c5", title: "Functions", desc: "Declaration, definition, recursion, and passing arguments by value.", pages: 11, progress: 40 },
  { id: "c6", title: "Arrays", desc: "Single and multi-dimensional arrays, and how they sit in memory.", pages: 13, progress: 20 },
  { id: "c7", title: "Pointers", desc: "Addresses, dereferencing, pointer arithmetic and pointers to pointers.", pages: 16, progress: 0 },
  { id: "c8", title: "Structures", desc: "Grouping different data types, nested structures, and unions.", pages: 10, progress: 0 },
  { id: "c9", title: "File Handling", desc: "Reading and writing files with fopen, fscanf, fprintf and fclose.", pages: 8, progress: 0 },
];

const PRACTICAL_CATEGORIES = ["Basic Programs", "Loops", "Arrays", "Functions", "Pointers", "Structures", "File Handling"];

const PRACTICALS = [
  {
    id: "p1", category: "Basic Programs", title: "Swap two numbers without a third variable", difficulty: "Easy",
    problem: "Write a C program that swaps the values of two integer variables without using a temporary variable.",
    output: "Before: a = 5, b = 10\nAfter:  a = 10, b = 5",
    solution:
`#include <stdio.h>

int main() {
    int a = 5, b = 10;

    a = a + b;
    b = a - b;
    a = a - b;

    printf("After:  a = %d, b = %d", a, b);
    return 0;
}`,
  },
  {
    id: "p2", category: "Basic Programs", title: "Check if a number is prime", difficulty: "Easy",
    problem: "Write a C program that reads an integer and prints whether it is a prime number.",
    output: "Enter a number: 17\n17 is a prime number",
    solution:
`#include <stdio.h>

int main() {
    int n, isPrime = 1;
    printf("Enter a number: ");
    scanf("%d", &n);

    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = 0;
            break;
        }
    }

    if (n < 2) isPrime = 0;
    printf(isPrime ? "%d is a prime number" : "%d is not prime", n);
    return 0;
}`,
  },
  {
    id: "p3", category: "Loops", title: "Print a right-angled triangle of stars", difficulty: "Easy",
    problem: "Using nested loops, print a right-angled triangle pattern of '*' with n rows.",
    output: "*\n**\n***\n****\n*****",
    solution:
`#include <stdio.h>

int main() {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
  },
  {
    id: "p4", category: "Loops", title: "Sum of digits using a while loop", difficulty: "Easy",
    problem: "Write a program that reads a number and prints the sum of its digits.",
    output: "Enter a number: 4521\nSum of digits = 12",
    solution:
`#include <stdio.h>

int main() {
    int n, sum = 0;
    printf("Enter a number: ");
    scanf("%d", &n);

    while (n != 0) {
        sum += n % 10;
        n /= 10;
    }

    printf("Sum of digits = %d", sum);
    return 0;
}`,
  },
  {
    id: "p5", category: "Arrays", title: "Find the second largest element", difficulty: "Medium",
    problem: "Given an array of integers, find and print the second largest distinct element.",
    output: "Array: 4 9 2 9 5\nSecond largest = 5",
    solution:
`#include <stdio.h>

int main() {
    int arr[] = {4, 9, 2, 9, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int first = arr[0], second = -1;

    for (int i = 1; i < n; i++) {
        if (arr[i] > first) { second = first; first = arr[i]; }
        else if (arr[i] < first && arr[i] > second) second = arr[i];
    }

    printf("Second largest = %d", second);
    return 0;
}`,
  },
  {
    id: "p6", category: "Arrays", title: "Matrix addition", difficulty: "Medium",
    problem: "Write a program to add two 2x2 matrices and print the resulting matrix.",
    output: "1 2   5 6     6  8\n3 4 + 7 8  =  10 12",
    solution:
`#include <stdio.h>

int main() {
    int a[2][2] = {{1,2},{3,4}};
    int b[2][2] = {{5,6},{7,8}};
    int c[2][2];

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            c[i][j] = a[i][j] + b[i][j];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%d ", c[i][j]);
        printf("\\n");
    }
    return 0;
}`,
  },
  {
    id: "p7", category: "Functions", title: "Factorial using recursion", difficulty: "Easy",
    problem: "Write a recursive function that returns the factorial of a non-negative integer.",
    output: "factorial(5) = 120",
    solution:
`#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("factorial(5) = %d", factorial(5));
    return 0;
}`,
  },
  {
    id: "p8", category: "Pointers", title: "Swap using pointers", difficulty: "Medium",
    problem: "Write a function that swaps two integers using pointers, then call it from main.",
    output: "Before: x = 3, y = 8\nAfter:  x = 8, y = 3",
    solution:
`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 3, y = 8;
    swap(&x, &y);
    printf("After:  x = %d, y = %d", x, y);
    return 0;
}`,
  },
  {
    id: "p9", category: "Structures", title: "Store student records", difficulty: "Medium",
    problem: "Define a structure Student with name, roll number and marks; store and print 2 records.",
    output: "Roll 1: Aman  Marks: 88\nRoll 2: Riya  Marks: 92",
    solution:
`#include <stdio.h>

struct Student {
    char name[20];
    int roll;
    float marks;
};

int main() {
    struct Student s[2] = {
        {"Aman", 1, 88},
        {"Riya", 2, 92}
    };

    for (int i = 0; i < 2; i++)
        printf("Roll %d: %s  Marks: %.0f\\n", s[i].roll, s[i].name, s[i].marks);

    return 0;
}`,
  },
  {
    id: "p10", category: "File Handling", title: "Write and read a text file", difficulty: "Hard",
    problem: "Write a program that writes a line to a file, then reopens it and prints the content.",
    output: "Reading file...\nHello from StudySphere!",
    solution:
`#include <stdio.h>

int main() {
    FILE *fp = fopen("notes.txt", "w");
    fprintf(fp, "Hello from StudySphere!");
    fclose(fp);

    char line[100];
    fp = fopen("notes.txt", "r");
    printf("Reading file...\\n");
    fgets(line, 100, fp);
    printf("%s", line);
    fclose(fp);
    return 0;
}`,
  },
];

const SAMPLE_PROJECTS = [
  { id: "pr1", name: "Library Management System", language: "C", description: "A console-based system to issue, return and track books using file handling.", date: "2026-07-14", files: ["main.c", "book.h", "student.h", "records.txt"] },
  { id: "pr2", name: "Student Result Portal", language: "C", description: "Calculates grades and generates a printable result sheet for a class of students.", date: "2026-06-02", files: ["result.c", "grading.c", "utils.h"] },
  { id: "pr3", name: "Portfolio Website", language: "HTML/CSS/JS", description: "A personal portfolio built for the web development elective, deployed as a static site.", date: "2026-05-20", files: ["index.html", "style.css", "script.js", "assets/"] },
];

const SAMPLE_NOTES = [
  { id: "n1", subject: "C Programming", chapter: "Pointers", title: "Pointer arithmetic — quick reference", type: "pdf", date: "2026-08-02" },
  { id: "n2", subject: "C Programming", chapter: "Arrays", title: "2D array memory layout diagram", type: "image", date: "2026-07-28" },
  { id: "n3", subject: "C Programming", chapter: "Functions", title: "Recursion trace examples", type: "docx", date: "2026-07-19" },
];

const SUBJECTS = ["C Programming", "Mathematics", "Digital Electronics", "Communication Skills"];

/* ------------------------------- UTILITIES -------------------------------- */

function cls(...a) { return a.filter(Boolean).join(" "); }

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightC(code) {
  let out = escapeHtml(code);
  out = out.replace(/(\/\/.*$)/gm, '§C§$1§/§');
  out = out.replace(/("(?:[^"\\]|\\.)*")/g, '§S§$1§/§');
  out = out.replace(/^(#\w+.*)$/gm, '§P§$1§/§');
  const kw = ["int","float","double","char","void","if","else","for","while","do","return","struct","sizeof","const","static","break","continue"];
  out = out.replace(new RegExp(`\\b(${kw.join("|")})\\b`, "g"), '§K§$1§/§');
  out = out.replace(/\b(printf|scanf|fopen|fclose|fprintf|fscanf|fgets|fputs|factorial|swap|main)(?=\()/g, '§F§$1§/§');
  out = out.replace(/\b(\d+)\b/g, '§N§$1§/§');
  out = out
    .replace(/§C§/g, '<span class="tok-comment">').replace(/§S§/g, '<span class="tok-string">')
    .replace(/§P§/g, '<span class="tok-preproc">').replace(/§K§/g, '<span class="tok-keyword">')
    .replace(/§F§/g, '<span class="tok-func">').replace(/§N§/g, '<span class="tok-number">')
    .replace(/§\/§/g, "</span>");
  return out;
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.__ssStore && window.__ssStore[key];
      return raw !== undefined ? raw : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    window.__ssStore = window.__ssStore || {};
    window.__ssStore[key] = value;
  }, [key, value]);
  return [value, setValue];
}

/* ------------------------------- PRIMITIVES -------------------------------- */

function OrbitProgress({ percent, size = 54, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, percent)) / 100) * c;
  const gid = useRef(`og-${Math.random().toString(36).slice(2)}`).current;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(148,163,209,0.16)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={`url(#${gid})`} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.4,0,.2,1)" }} />
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#4f8ef7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold" style={{ color: "#eef2ff", fontFamily: "var(--font-body)" }}>
        {percent}%
      </div>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true, style = {} }) {
  return (
    <div className={cls("glass-card", hover && "glass-card-hover", className)} style={style}>
      {children}
    </div>
  );
}

function Pill({ children, tone = "blue" }) {
  return <span className={cls("pill", `pill-${tone}`)}>{children}</span>;
}

function PrimaryButton({ children, icon: Icon, onClick, className = "", type = "button" }) {
  return (
    <button type={type} onClick={onClick} className={cls("btn-primary", className)}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function GhostButton({ children, icon: Icon, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={cls("btn-ghost", className)}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

/* ---------------------------------- ORB ------------------------------------ */

function HeroOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="orb-ring orb-ring-1" />
      <div className="orb-ring orb-ring-2" />
      <div className="orb-glow" />
      <svg viewBox="0 0 320 320" className="relative" style={{ width: "min(80%, 340px)", height: "auto" }}>
        <defs>
          <radialGradient id="orbBody" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#7fb4ff" />
            <stop offset="45%" stopColor="#4f8ef7" />
            <stop offset="100%" stopColor="#16234a" />
          </radialGradient>
          <linearGradient id="orbBook" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="270" rx="90" ry="14" fill="#000" opacity="0.25" />
        <circle cx="160" cy="150" r="108" fill="url(#orbBody)" />
        <circle cx="160" cy="150" r="108" fill="none" stroke="rgba(94,234,212,0.35)" strokeWidth="1.5" />
        <g transform="translate(112,118)" opacity="0.96">
          <path d="M0 8 Q24 -6 48 8 L48 76 Q24 62 0 76 Z" fill="url(#orbBook)" />
          <path d="M96 8 Q72 -6 48 8 L48 76 Q72 62 96 76 Z" fill="#dbe4ff" />
          <line x1="48" y1="10" x2="48" y2="78" stroke="#94a3d1" strokeWidth="1.2" />
          <line x1="10" y1="18" x2="40" y2="12" stroke="#94a3d1" strokeWidth="1" opacity="0.6" />
          <line x1="10" y1="30" x2="40" y2="24" stroke="#94a3d1" strokeWidth="1" opacity="0.6" />
          <line x1="10" y1="42" x2="40" y2="36" stroke="#94a3d1" strokeWidth="1" opacity="0.6" />
        </g>
        <circle cx="120" cy="110" r="4" fill="#fff" opacity="0.55" />
        {[...Array(14)].map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const rr = 150 + (i % 3) * 8;
          return <circle key={i} cx={160 + Math.cos(a) * rr} cy={150 + Math.sin(a) * rr * 0.55} r={i % 4 === 0 ? 1.8 : 1} fill="#9db4ff" opacity={0.5 + (i % 3) * 0.15} />;
        })}
      </svg>
    </div>
  );
}

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    size: Math.random() < 0.85 ? 1 : 2, delay: Math.random() * 6, dur: 3 + Math.random() * 4,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map(s => (
        <span key={s.id} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />
      ))}
    </div>
  );
}

/* ---------------------------------- NAV ------------------------------------ */

function NavBar({ page, setPage, menuOpen, setMenuOpen }) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "practicals", label: "Practicals", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "about", label: "About", icon: PanelsTopLeft },
  ];
  return (
    <header className="nav-glass sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button onClick={() => setPage("home")} className="flex items-center gap-2 shrink-0" aria-label="StudySphere home">
          <span className="logo-mark"><Orbit size={17} strokeWidth={2.4} /></span>
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)", fontSize: "1.05rem" }}>StudySphere</span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {items.map(it => (
            <button key={it.id} onClick={() => setPage(it.id)}
              className={cls("nav-link", page === it.id && "nav-link-active")}>
              {it.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <PrimaryButton icon={UploadCloud} onClick={() => setPage("upload")}>Upload</PrimaryButton>
          <button className="avatar-btn" aria-label="Profile" onClick={() => setPage("about")}>
            <User size={16} />
          </button>
        </div>

        <button className="md:hidden text-[color:var(--text-hi)]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[color:var(--border-glass)] px-5 py-3 flex flex-col gap-1 bg-[color:var(--bg-panel)]">
          {items.map(it => (
            <button key={it.id} onClick={() => { setPage(it.id); setMenuOpen(false); }}
              className={cls("nav-link justify-start", page === it.id && "nav-link-active")}>
              <it.icon size={16} className="inline mr-2 -mt-0.5" />{it.label}
            </button>
          ))}
          <button onClick={() => { setPage("upload"); setMenuOpen(false); }} className="btn-primary mt-2 justify-center">
            <UploadCloud size={16} /> Upload
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- HOME ------------------------------------ */

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <GlassCard className="p-5 flex items-center gap-4">
      <div className={cls("stat-icon", `stat-icon-${tone}`)}><Icon size={19} /></div>
      <div>
        <div className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{value}</div>
        <div className="text-[13px]" style={{ color: "var(--text-mid)" }}>{label}</div>
      </div>
    </GlassCard>
  );
}

function HomePage({ setPage, notes, projects }) {
  const completedChapters = CHAPTERS.filter(c => c.progress === 100).length;
  return (
    <div>
      <section className="relative overflow-hidden">
        <Starfield />
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div>
            <Pill tone="blue"><Sparkles size={12} /> BCA · Semester dashboard</Pill>
            <h1 className="hero-title mt-5">Organize. Learn. Build.</h1>
            <p className="mt-5 text-[15px] md:text-base leading-relaxed max-w-md" style={{ color: "var(--text-mid)" }}>
              A single hub for your BCA notes, C practicals and coding projects —
              track chapter progress, revisit solved problems, and keep every
              upload from lab to portfolio in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton icon={ArrowRight} onClick={() => setPage("notes")}>Explore Notes</PrimaryButton>
              <GhostButton icon={UploadCloud} onClick={() => setPage("upload")}>Upload Material</GhostButton>
            </div>
          </div>
          <div className="h-[300px] md:h-[380px]"><HeroOrb /></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 -mt-4 md:-mt-8 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <StatCard icon={BookOpen} label="Notes in library" value={notes.length} tone="blue" />
          <StatCard icon={CheckCircle2} label="Chapters completed" value={`${completedChapters}/${CHAPTERS.length}`} tone="teal" />
          <StatCard icon={ListChecks} label="Practical questions" value={PRACTICALS.length} tone="violet" />
          <StatCard icon={FolderGit2} label="Projects uploaded" value={projects.length} tone="blue" />
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <GlassCard className="p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Continue where you left off</h2>
              <button onClick={() => setPage("notes")} className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent-blue)" }}>
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {CHAPTERS.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center gap-4 py-2 border-b last:border-b-0" style={{ borderColor: "var(--border-glass)" }}>
                  <OrbitProgress percent={c.progress} size={42} stroke={3.5} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "var(--text-hi)" }}>{c.title}</div>
                    <div className="text-xs" style={{ color: "var(--text-mid)" }}>C Programming · {c.pages} pages</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="section-title mb-4">This week</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><Clock size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-cyan)" }} /><span style={{ color: "var(--text-mid)" }}>Pointers chapter opens for practice on Monday.</span></li>
              <li className="flex items-start gap-2"><FileCode2 size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-cyan)" }} /><span style={{ color: "var(--text-mid)" }}>3 file-handling practicals due before lab.</span></li>
              <li className="flex items-start gap-2"><FolderGit2 size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-cyan)" }} /><span style={{ color: "var(--text-mid)" }}>Upload the portfolio project ZIP for review.</span></li>
            </ul>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------- NOTES ------------------------------------ */

function ChapterDetail({ chapter, onClose }) {
  if (!chapter) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card w-full md:max-w-lg max-h-[85vh] overflow-y-auto p-6 md:rounded-2xl rounded-t-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[color:var(--text-mid)] hover:text-[color:var(--text-hi)]" aria-label="Close">
          <X size={20} />
        </button>
        <div className="flex items-center gap-4">
          <OrbitProgress percent={chapter.progress} size={58} />
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{chapter.title}</h3>
            <p className="text-xs" style={{ color: "var(--text-mid)" }}>{chapter.pages} pages · C Programming</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>{chapter.desc}</p>
        <div className="mt-6 flex gap-3">
          <PrimaryButton icon={Download}>Download notes</PrimaryButton>
          <GhostButton icon={CheckCircle2}>Mark reviewed</GhostButton>
        </div>
      </div>
    </div>
  );
}

function ChapterCard({ chapter, onOpen }) {
  return (
    <GlassCard className="p-5 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{chapter.title}</h3>
        <OrbitProgress percent={chapter.progress} size={44} stroke={3.5} />
      </div>
      <p className="mt-2 text-[13px] leading-relaxed flex-1" style={{ color: "var(--text-mid)" }}>{chapter.desc}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>{chapter.pages} pages</span>
        <div className="flex gap-2">
          <button onClick={() => onOpen(chapter)} className="btn-mini"><Eye size={13} /> View</button>
          <button className="btn-mini btn-mini-solid"><Download size={13} /> Notes</button>
        </div>
      </div>
    </GlassCard>
  );
}

function NotesPage({ notes }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = CHAPTERS.filter(c => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "done" && c.progress === 100) || (filter === "progress" && c.progress > 0 && c.progress < 100) || (filter === "new" && c.progress === 0);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Pill tone="violet"><BookOpen size={12} /> Subject</Pill>
          <h1 className="page-title mt-3">C Programming</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-mid)" }}>{CHAPTERS.length} chapters · {CHAPTERS.filter(c=>c.progress===100).length} completed</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="search-box flex-1 md:w-64">
            <Search size={15} style={{ color: "var(--text-dim)" }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search chapters…" aria-label="Search chapters" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap" role="group" aria-label="Filter chapters">
        {[["all", "All"], ["done", "Completed"], ["progress", "In progress"], ["new", "Not started"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className={cls("filter-chip", filter === id && "filter-chip-active")}>{label}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden lg:block">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xs font-medium mb-3 flex items-center gap-1" style={{ color: "var(--text-mid)" }}>
            {sidebarOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />} Chapter list
          </button>
          {sidebarOpen && (
            <ul className="space-y-1">
              {CHAPTERS.map(c => (
                <li key={c.id}>
                  <button onClick={() => setActive(c)} className="sidebar-item">
                    <span className="truncate">{c.title}</span>
                    <span className="text-[10px] shrink-0" style={{ color: c.progress === 100 ? "var(--accent-cyan)" : "var(--text-dim)" }}>{c.progress}%</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(c => <ChapterCard key={c.id} chapter={c} onOpen={setActive} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16" style={{ color: "var(--text-mid)" }}>
              No chapters match “{query}”. Try a different search or filter.
            </div>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="section-title mb-4">Uploaded notes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(n => (
            <GlassCard key={n.id} className="p-4 flex items-center gap-3">
              <div className="note-type-icon">
                {n.type === "pdf" && <FileText size={16} />}
                {n.type === "image" && <ImageIcon size={16} />}
                {n.type === "docx" && <FileIcon size={16} />}
                {n.type === "text" && <FileText size={16} />}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium truncate" style={{ color: "var(--text-hi)" }}>{n.title}</div>
                <div className="text-[11px]" style={{ color: "var(--text-dim)" }}>{n.subject} · {n.chapter}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <ChapterDetail chapter={active} onClose={() => setActive(null)} />
    </div>
  );
}

/* -------------------------------- PRACTICALS ---------------------------------- */

function SolutionView({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!item) return null;
  const copy = () => {
    navigator.clipboard?.writeText(item.solution).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card w-full md:max-w-2xl max-h-[88vh] overflow-y-auto md:rounded-2xl rounded-t-2xl">
        <div className="p-5 md:p-6 border-b flex items-start justify-between gap-4" style={{ borderColor: "var(--border-glass)" }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Pill tone={item.difficulty === "Easy" ? "teal" : item.difficulty === "Medium" ? "blue" : "violet"}>{item.difficulty}</Pill>
              <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>{item.category}</span>
            </div>
            <h3 className="text-base font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{item.title}</h3>
          </div>
          <button onClick={onClose} className="text-[color:var(--text-mid)] hover:text-[color:var(--text-hi)]" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="p-5 md:p-6 space-y-5">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>{item.problem}</p>
          <div>
            <div className="text-xs font-medium mb-2" style={{ color: "var(--text-dim)" }}>SAMPLE OUTPUT</div>
            <pre className="output-block">{item.output}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: "var(--text-dim)" }}>SOLUTION</span>
              <button onClick={copy} className="btn-mini">
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="code-block"><code dangerouslySetInnerHTML={{ __html: highlightC(item.solution) }} /></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticalsPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const filtered = PRACTICALS.filter(p =>
    (category === "all" || p.category === category) &&
    (p.title.toLowerCase().includes(query.toLowerCase()) || p.problem.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <Pill tone="teal"><Code2 size={12} /> Practice</Pill>
      <h1 className="page-title mt-3">Practical Questions</h1>
      <p className="text-sm mt-1 mb-8" style={{ color: "var(--text-mid)" }}>C practicals organized by topic, with worked solutions.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="search-box flex-1">
          <Search size={15} style={{ color: "var(--text-dim)" }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search practicals…" aria-label="Search practicals" />
        </div>
        <div className="search-box md:w-56">
          <Filter size={15} style={{ color: "var(--text-dim)" }} />
          <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {PRACTICAL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p => (
          <GlassCard key={p.id} className="p-5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <Pill tone={p.difficulty === "Easy" ? "teal" : p.difficulty === "Medium" ? "blue" : "violet"}>{p.difficulty}</Pill>
              <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>{p.category}</span>
            </div>
            <h3 className="text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{p.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed flex-1" style={{ color: "var(--text-mid)" }}>{p.problem}</p>
            <div className="mt-3">
              <div className="text-[10px] font-medium mb-1" style={{ color: "var(--text-dim)" }}>SAMPLE OUTPUT</div>
              <pre className="output-block-mini">{p.output.split("\n")[0]}{p.output.includes("\n") ? " …" : ""}</pre>
            </div>
            <button onClick={() => setActive(p)} className="btn-primary mt-4 justify-center">
              <Play size={14} /> View Solution
            </button>
          </GlassCard>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16" style={{ color: "var(--text-mid)" }}>No practicals match your search.</div>
        )}
      </div>

      <SolutionView item={active} onClose={() => setActive(null)} />
    </div>
  );
}

/* --------------------------------- PROJECTS ----------------------------------- */

function ProjectCard({ project, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="project-icon"><FolderGit2 size={18} /></div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold truncate" style={{ fontFamily: "var(--font-display)", color: "var(--text-hi)" }}>{project.name}</h3>
            <div className="text-[11px]" style={{ color: "var(--text-dim)" }}>{project.language} · uploaded {project.date}</div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>{project.description}</p>

      <button onClick={() => setExpanded(!expanded)} className="mt-3 text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent-blue)" }}>
        {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />} {project.files.length} files
      </button>
      {expanded && (
        <ul className="mt-2 space-y-1 border-l pl-3" style={{ borderColor: "var(--border-glass)" }}>
          {project.files.map((f, i) => (
            <li key={i} className="text-[12px] flex items-center gap-2" style={{ color: "var(--text-mid)" }}>
              <FileIcon size={12} />{f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-mini"><FolderOpen size={13} /> Open Files</button>
        <button className="btn-mini"><Download size={13} /> Download ZIP</button>
        <button onClick={() => onDelete(project.id)} className="btn-mini btn-mini-danger"><Trash2 size={13} /> Delete</button>
      </div>
    </GlassCard>
  );
}

function ProjectsPage({ projects, setProjects }) {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const zipInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const acceptExt = [".zip"];

  const handleFiles = useCallback((fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    const zip = files.find(f => f.name.toLowerCase().endsWith(".zip"));
    const isFolder = files.length > 1 || files.some(f => f.webkitRelativePath);

    if (!zip && !isFolder) {
      setError("Please upload a .zip file, or a folder if your browser supports it.");
      return;
    }
    setError("");
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          const name = zip ? zip.name.replace(/\.zip$/i, "") : (files[0].webkitRelativePath?.split("/")[0] || "New Project");
          setProjects(prev => [{
            id: `pr-${Date.now()}`,
            name,
            language: "C",
            description: "Uploaded from " + (zip ? "ZIP archive." : "a local project folder."),
            date: new Date().toISOString().slice(0, 10),
            files: zip ? [zip.name] : files.slice(0, 8).map(f => f.webkitRelativePath || f.name),
          }, ...prev]);
          setTimeout(() => setProgress(null), 600);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  }, [setProjects]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <Pill tone="blue"><FolderGit2 size={12} /> Workspace</Pill>
      <h1 className="page-title mt-3">Projects</h1>
      <p className="text-sm mt-1 mb-8 max-w-2xl" style={{ color: "var(--text-mid)" }}>
        Keep your VS Code project folders and lab work in one place. Most browsers can't
        read an arbitrary folder from disk directly — upload a ZIP for a reliable result,
        or try folder upload in a browser that supports it (like Chrome).
      </p>

      <GlassCard
        className={cls("upload-zone", dragOver && "upload-zone-active")}
        hover={false}
        style={{}}
      >
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className="p-10 flex flex-col items-center text-center"
        >
          <div className="upload-icon"><UploadCloud size={26} /></div>
          <p className="mt-4 text-sm font-medium" style={{ color: "var(--text-hi)" }}>Drag and drop a project folder or .zip file here</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>ZIP is the reliable path across all browsers</p>
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            <button className="btn-primary" onClick={() => zipInputRef.current?.click()}><UploadCloud size={15} /> Upload ZIP</button>
            <button className="btn-ghost" onClick={() => folderInputRef.current?.click()}><FolderOpen size={15} /> Select folder</button>
          </div>
          <input ref={zipInputRef} type="file" accept=".zip" className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
          <input ref={folderInputRef} type="file" webkitdirectory="" directory="" multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} />

          {progress !== null && (
            <div className="w-full max-w-xs mt-6">
              <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
              <div className="text-[11px] mt-1" style={{ color: "var(--text-dim)" }}>Uploading… {progress}%</div>
            </div>
          )}
          {error && (
            <div className="mt-4 text-xs flex items-center gap-2" style={{ color: "#fca5a5" }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}
        </div>
      </GlassCard>

      <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onDelete={(id) => setProjects(prev => prev.filter(x => x.id !== id))} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- UPLOAD ------------------------------------ */

function UploadPage({ setNotes }) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [chapter, setChapter] = useState(CHAPTERS[0].title);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const typeOf = (f) => {
    if (!f) return "text";
    if (f.type.includes("pdf")) return "pdf";
    if (f.type.includes("image")) return "image";
    if (f.name.endsWith(".docx")) return "docx";
    return "text";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setNotes(prev => [{
      id: `n-${Date.now()}`, subject, chapter, title: title.trim(),
      type: typeOf(file), date: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setSuccess(true);
    setTitle(""); setDescription(""); setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    setTimeout(() => setSuccess(false), 3200);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-10">
      <Pill tone="violet"><UploadCloud size={12} /> Add material</Pill>
      <h1 className="page-title mt-3">Upload Notes</h1>
      <p className="text-sm mt-1 mb-8" style={{ color: "var(--text-mid)" }}>PDFs, DOCX files, images or plain text — tagged by subject and chapter so they're easy to find later.</p>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6">
        <GlassCard className="p-6" hover={false}>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="subject">Subject</label>
                <select id="subject" className="form-input" value={subject} onChange={e => setSubject(e.target.value)}>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="chapter">Chapter</label>
                <select id="chapter" className="form-input" value={chapter} onChange={e => setChapter(e.target.value)}>
                  {CHAPTERS.map(c => <option key={c.id}>{c.title}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="title">Title</label>
              <input id="title" required className="form-input" placeholder="e.g. Recursion trace examples" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="form-label" htmlFor="desc">Description</label>
              <textarea id="desc" rows={3} className="form-input resize-none" placeholder="A short note about what this file covers" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="form-label" htmlFor="file">File</label>
              <input ref={inputRef} id="file" type="file" accept=".pdf,.docx,.txt,image/*" className="form-input file-input" onChange={e => setFile(e.target.files?.[0] || null)} />
            </div>
            <PrimaryButton icon={UploadCloud} type="submit" className="w-full justify-center">Upload material</PrimaryButton>
            {success && (
              <div className="success-toast"><CheckCircle2 size={15} /> Uploaded successfully — it now appears in your Notes library.</div>
            )}
          </form>
        </GlassCard>

        <GlassCard className="p-6" hover={false}>
          <h3 className="text-sm font-medium mb-3" style={{ color: "var(--text-hi)" }}>Preview</h3>
          {file ? (
            <div className="border rounded-xl p-4 flex flex-col items-center text-center gap-3" style={{ borderColor: "var(--border-glass)" }}>
              {file.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(file)} alt={file.name} className="max-h-40 rounded-lg object-cover" />
              ) : (
                <div className="note-type-icon" style={{ width: 44, height: 44 }}><FileText size={20} /></div>
              )}
              <div className="text-xs font-medium truncate w-full" style={{ color: "var(--text-hi)" }}>{file.name}</div>
              <div className="text-[11px]" style={{ color: "var(--text-dim)" }}>{(file.size / 1024).toFixed(1)} KB</div>
            </div>
          ) : (
            <div className="border border-dashed rounded-xl p-8 text-center text-xs" style={{ borderColor: "var(--border-glass)", color: "var(--text-dim)" }}>
              Choose a file to preview it here before uploading.
            </div>
          )}
          <div className="mt-6 text-[11px] leading-relaxed p-3 rounded-lg" style={{ background: "rgba(79,142,247,0.08)", color: "var(--text-dim)" }}>
            This demo stores uploads in memory for the session. In production, files
            would go to object storage (e.g. S3 or Cloud Storage) with metadata in a
            database, behind authenticated user accounts.
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------------------------- ABOUT ------------------------------------ */

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
      <Pill tone="blue"><GraduationCap size={12} /> About</Pill>
      <h1 className="page-title mt-3">A study hub built around one semester's work</h1>
      <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
        StudySphere brings together lecture notes, C practicals and lab projects for a
        BCA first-year course, so revision material and code live in the same place
        instead of scattered across chat apps and drives.
      </p>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, title: "Notes", text: "Chapter-wise C notes with progress tracking." },
          { icon: Code2, title: "Practicals", text: "Solved problems with sample output and code." },
          { icon: FolderGit2, title: "Projects", text: "VS Code folders and ZIPs, organized by course." },
        ].map((f, i) => (
          <GlassCard key={i} className="p-5">
            <f.icon size={18} style={{ color: "var(--accent-blue)" }} />
            <div className="mt-3 text-sm font-semibold" style={{ color: "var(--text-hi)" }}>{f.title}</div>
            <div className="text-xs mt-1" style={{ color: "var(--text-mid)" }}>{f.text}</div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-10 text-xs leading-relaxed p-4 rounded-lg" style={{ background: "rgba(79,142,247,0.08)", color: "var(--text-dim)" }}>
        Production notes: this build uses in-memory sample data. A real deployment
        would add authenticated accounts, a database (notes, chapters, practicals,
        projects tables), and object storage for uploaded files and ZIP archives.
      </div>
    </div>
  );
}

/* ----------------------------------- APP ------------------------------------- */

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notes, setNotes] = useLocalStorage("ss_notes", SAMPLE_NOTES);
  const [projects, setProjects] = useLocalStorage("ss_projects", SAMPLE_PROJECTS);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="ss-root">
      <style>{CSS}</style>
      <NavBar page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === "home" && <HomePage setPage={setPage} notes={notes} projects={projects} />}
      {page === "notes" && <NotesPage notes={notes} />}
      {page === "practicals" && <PracticalsPage />}
      {page === "projects" && <ProjectsPage projects={projects} setProjects={setProjects} />}
      {page === "upload" && <UploadPage setNotes={setNotes} />}
      {page === "about" && <AboutPage />}
      <footer className="text-center text-[11px] py-8" style={{ color: "var(--text-dim)" }}>
        StudySphere · a personal BCA study hub
      </footer>
    </div>
  );
}

/* ----------------------------------- CSS ------------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.ss-root {
  --bg-void: #05070f;
  --bg-navy: #0a0f1e;
  --bg-panel: #0d1424;
  --border-glass: rgba(148,163,209,0.14);
  --accent-blue: #4f8ef7;
  --accent-cyan: #5eead4;
  --accent-violet: #8b8cf7;
  --text-hi: #eef2ff;
  --text-mid: #a9b2cf;
  --text-dim: #6d7699;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,142,247,0.18), transparent), var(--bg-void);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--text-mid);
}

.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

.nav-glass {
  background: rgba(10,15,30,0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-glass);
}
.logo-mark {
  width: 32px; height: 32px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-violet));
  color: #fff;
}
.nav-link {
  padding: 8px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 500;
  color: var(--text-mid); transition: all .18s ease;
}
.nav-link:hover { color: var(--text-hi); background: rgba(148,163,209,0.08); }
.nav-link-active { color: var(--text-hi); background: rgba(79,142,247,0.14); }
.avatar-btn {
  width: 34px; height: 34px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
  background: rgba(148,163,209,0.1); border: 1px solid var(--border-glass); color: var(--text-mid);
  transition: all .18s ease;
}
.avatar-btn:hover { color: var(--text-hi); border-color: var(--accent-blue); }

.glass-card {
  background: linear-gradient(180deg, rgba(148,163,209,0.06), rgba(148,163,209,0.02));
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  position: relative;
  transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
}
.glass-card-hover:hover {
  transform: translateY(-2px);
  border-color: rgba(79,142,247,0.4);
  box-shadow: 0 10px 30px -12px rgba(79,142,247,0.25);
}

.pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; letter-spacing: .02em;
  padding: 5px 11px; border-radius: 999px; text-transform: uppercase;
}
.pill-blue { background: rgba(79,142,247,0.14); color: #8fb8ff; }
.pill-teal { background: rgba(94,234,212,0.14); color: #6ee7d8; }
.pill-violet { background: rgba(139,140,247,0.16); color: #b3b4ff; }

.hero-title {
  font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em;
  font-size: clamp(2.1rem, 5vw, 3.4rem); line-height: 1.05; color: var(--text-hi);
}
.page-title {
  font-family: var(--font-display); font-weight: 700; letter-spacing: -0.01em;
  font-size: clamp(1.5rem, 3vw, 2.1rem); color: var(--text-hi);
}
.section-title {
  font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; color: var(--text-hi);
}

.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  background: linear-gradient(135deg, var(--accent-blue), #3b6fe0);
  color: #fff; font-size: 13.5px; font-weight: 600;
  padding: 10px 18px; border-radius: 10px;
  box-shadow: 0 8px 20px -8px rgba(79,142,247,0.55);
  transition: transform .18s ease, box-shadow .18s ease; border: none; cursor: pointer;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -8px rgba(79,142,247,0.65); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(148,163,209,0.06); color: var(--text-hi); font-size: 13.5px; font-weight: 600;
  padding: 10px 18px; border-radius: 10px; border: 1px solid var(--border-glass);
  transition: all .18s ease; cursor: pointer;
}
.btn-ghost:hover { border-color: var(--accent-blue); background: rgba(79,142,247,0.08); }
.btn-mini {
  display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600;
  color: var(--text-mid); background: rgba(148,163,209,0.08); border: 1px solid var(--border-glass);
  padding: 6px 10px; border-radius: 8px; cursor: pointer; transition: all .16s ease;
}
.btn-mini:hover { color: var(--text-hi); border-color: var(--accent-blue); }
.btn-mini-solid { background: rgba(79,142,247,0.16); color: #8fb8ff; border-color: rgba(79,142,247,0.3); }
.btn-mini-danger:hover { color: #fca5a5; border-color: rgba(252,165,165,0.4); }

.stat-icon {
  width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; color: #fff; shrink: 0;
}
.stat-icon-blue { background: linear-gradient(135deg, var(--accent-blue), #3b6fe0); }
.stat-icon-teal { background: linear-gradient(135deg, var(--accent-cyan), #1fa38a); }
.stat-icon-violet { background: linear-gradient(135deg, var(--accent-violet), #5b5cd6); }

.orb-ring { position: absolute; border-radius: 999px; border: 1px solid rgba(94,234,212,0.18); }
.orb-ring-1 { width: 240px; height: 240px; animation: spin 22s linear infinite; border-style: dashed; }
.orb-ring-2 { width: 320px; height: 320px; animation: spin 34s linear infinite reverse; }
.orb-glow { position: absolute; width: 260px; height: 260px; border-radius: 999px; background: radial-gradient(circle, rgba(79,142,247,0.35), transparent 70%); filter: blur(10px); }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.star { position: absolute; border-radius: 999px; background: #cdd9ff; animation: twinkle ease-in-out infinite; }
@keyframes twinkle { 0%,100% { opacity: .15; } 50% { opacity: .9; } }

.search-box {
  display: flex; align-items: center; gap: 8px;
  background: rgba(148,163,209,0.06); border: 1px solid var(--border-glass);
  border-radius: 10px; padding: 9px 13px;
}
.search-box input, .search-box select {
  background: transparent; border: none; outline: none; color: var(--text-hi);
  font-size: 13px; width: 100%; font-family: var(--font-body);
}
.search-box select option { background: var(--bg-panel); }
.search-box input::placeholder { color: var(--text-dim); }

.filter-chip {
  font-size: 12px; font-weight: 500; padding: 7px 13px; border-radius: 999px;
  background: rgba(148,163,209,0.06); border: 1px solid var(--border-glass); color: var(--text-mid);
  cursor: pointer; transition: all .16s ease;
}
.filter-chip-active { background: rgba(79,142,247,0.18); border-color: rgba(79,142,247,0.4); color: #eef2ff; }

.sidebar-item {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
  text-align: left; font-size: 12.5px; color: var(--text-mid); padding: 8px 10px; border-radius: 8px;
  transition: all .15s ease;
}
.sidebar-item:hover { background: rgba(148,163,209,0.08); color: var(--text-hi); }

.note-type-icon {
  width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
  background: rgba(79,142,247,0.14); color: #8fb8ff; shrink: 0;
}
.project-icon {
  width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center;
  background: rgba(139,140,247,0.16); color: #b3b4ff; shrink: 0;
}
.upload-icon {
  width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
  background: rgba(79,142,247,0.14); color: var(--accent-blue);
}

.output-block {
  font-family: var(--font-mono); font-size: 12.5px; color: #c9f7ea;
  background: rgba(94,234,212,0.06); border: 1px solid rgba(94,234,212,0.16);
  border-radius: 10px; padding: 12px 14px; white-space: pre-wrap; line-height: 1.6;
}
.output-block-mini {
  font-family: var(--font-mono); font-size: 11px; color: #a9e8dc;
  background: rgba(94,234,212,0.06); border: 1px solid rgba(94,234,212,0.14);
  border-radius: 8px; padding: 7px 10px; white-space: pre-wrap; line-height: 1.5; overflow: hidden;
}
.code-block {
  font-family: var(--font-mono); font-size: 12.5px; line-height: 1.7;
  background: #070b16; border: 1px solid var(--border-glass);
  border-radius: 10px; padding: 16px; overflow-x: auto; color: #d6dcf5;
}
.tok-keyword { color: #93c5fd; font-weight: 600; }
.tok-string { color: #6ee7d8; }
.tok-comment { color: #6d7699; font-style: italic; }
.tok-number { color: #fbbf8f; }
.tok-preproc { color: #b3b4ff; }
.tok-func { color: #f0abfc; }

.upload-zone { border: 1.5px dashed var(--border-glass); border-radius: 18px; }
.upload-zone-active { border-color: var(--accent-blue); background: rgba(79,142,247,0.06); }

.progress-track { height: 6px; border-radius: 999px; background: rgba(148,163,209,0.14); overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue)); transition: width .2s ease; }

.form-label { display: block; font-size: 12px; font-weight: 500; color: var(--text-mid); margin-bottom: 6px; }
.form-input {
  width: 100%; background: rgba(148,163,209,0.06); border: 1px solid var(--border-glass);
  border-radius: 10px; padding: 10px 13px; color: var(--text-hi); font-size: 13.5px; font-family: var(--font-body);
  outline: none; transition: border-color .16s ease;
}
.form-input:focus { border-color: var(--accent-blue); }
.form-input option { background: var(--bg-panel); }
.file-input { padding: 8px; color: var(--text-mid); font-size: 12.5px; }

.success-toast {
  display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #a9e8dc;
  background: rgba(94,234,212,0.1); border: 1px solid rgba(94,234,212,0.25);
  border-radius: 10px; padding: 10px 13px;
}

button { font-family: var(--font-body); }
*:focus-visible { outline: 2px solid var(--accent-blue); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .orb-ring-1, .orb-ring-2, .star { animation: none !important; }
}
`;

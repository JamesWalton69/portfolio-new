// Every {{placeholder}} is a blank to fill. `grep '{{' src/lib/content.ts`

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://riddhiman.loc.cc";

export const person = {
  name: "Riddhiman Ghosh",
  short: "Riddhiman",
  role: "Web developer & software engineer",
  location: "Kolkata, India",
  email: "riddhiman@riddhiman.shop",
  resume: "https://jameswalton69.github.io/riddhiman-portfolio/cv.html",
  github: "https://github.com/JamesWalton69",
  githubUser: "JamesWalton69",
  linkedin: "{{linkedinUrl}}",
};

export const hero = {
  kit: "Seeking junior roles, internships & open source",
  headline: ["Tools that", "solve real", "problems."],
  sub: "I make practical web applications and interactive tools with JavaScript, TypeScript and Python, exploring AI and computer vision where they make the experience better.",
  cta: "Get in touch",
  ctaHref: `mailto:riddhiman@riddhiman.shop?subject=Hello%20Riddhiman`,
  secondary: "See the work",
};

export const ticker = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Flask",
  "FastAPI",
  "Electron",
  "Three.js",
  "MediaPipe",
  "Whisper",
  "SQLite",
  "Supabase",
  "Godot",
  "Kotlin",
  "Open source",
];

export const statement = {
  label: "A little about how I work",
  text: "I learn by building. Computer vision, self-hosted tools, and understanding how things work under the hood.",
};

export const principles = [
  {
    n: "01",
    title: "Learn by making",
    body: "I turn ideas into working projects, using each build to understand a new tool or solve a practical problem.",
  },
  {
    n: "02",
    title: "Make it useful",
    body: "From a workout companion to a school voting system, I enjoy building software with a clear purpose.",
  },
  {
    n: "03",
    title: "Explore the details",
    body: "Computer vision, browser automation and local video pipelines are chances to learn how the pieces work together.",
  },
  {
    n: "04",
    title: "Keep growing",
    body: "I bring curiosity, persistence and a willingness to learn from people with more experience.",
  },
];

export const steps = [
  {
    title: "Explore",
    body: "I start with a question or a problem worth solving, then figure out what tools could help.",
  },
  {
    title: "Experiment",
    body: "I build a working version, try ideas out and learn from what does and does not work.",
  },
  {
    title: "Share",
    body: "I document projects and share them on GitHub so other people can see how they work.",
  },
];

export const experienceNow = {
  role: "Independent developer",
  org: "Personal projects & open source",
  dates: "2023 to now",
};

// From the timeline in the published CV. No industry roles yet, so this reads
// as education and self-directed work rather than employment history.
export const experience = [
  {
    role: "High School Diploma, Computer Science",
    org: "Saini International School",
    dates: "Graduating 2026",
    outcome:
      "Focus on computer science fundamentals, logic and mathematics. Built the school-wide council election system on faculty request.",
  },
];

// Skill levels as published in the interactive CV.
export const skills = [
  { name: "HTML5 / CSS3 layouts", level: 95 },
  { name: "JavaScript / TypeScript", level: 92 },
  { name: "React / Next.js", level: 90 },
  { name: "Python, Flask and computer vision", level: 88 },
  { name: "Firebase, Supabase and realtime data", level: 85 },
  { name: "Java OOP development", level: 80 },
  { name: "Database engineering, SQLite and SQL", level: 75 },
];

// Deployments and pages that are live right now. Every URL here was checked.
export const elsewhere = [
  {
    title: "Interactive CV",
    href: "https://jameswalton69.github.io/riddhiman-portfolio/cv.html",
    note: "Terminal styled, with sections for summary, stack, projects and education.",
  },
  {
    title: "SelfLens",
    href: "https://selflens.in",
    note: "Free personality and self-awareness assessments, scored in the browser.",
  },
  {
    title: "FitTrainer",
    href: "https://fittrainer.duckdns.org",
    note: "The self-hosted workout companion, running on its own server.",
  },
  {
    title: "Parallel Earth Simulator",
    href: "https://ai-universe-simulator.vercel.app",
    note: "Change the planetary parameters and generate an alternate Earth.",
  },
  {
    title: "GlobEditor",
    href: "https://glob-editor-gamma.vercel.app",
    note: "A code editor that runs Python in the browser via WebAssembly.",
  },
  {
    title: "Earlier portfolio",
    href: "https://jameswalton69.github.io/riddhiman-portfolio/",
    note: "The static site this one replaced, still online.",
  },
];

export const faq = [
  {
    q: "Are you available for work?",
    a: "Yes. I am looking for junior web development roles, internships, or open-source collaboration, in Kolkata or remote. Send the role or the brief and I reply within a day.",
  },
  {
    q: "What do you work with?",
    a: "JavaScript and TypeScript on the front end, Python and Flask on the back end, plus computer vision with MediaPipe, MoveNet and TensorFlow.js where it earns its place.",
  },
  {
    q: "Can you work inside our codebase?",
    a: "Yes. TypeScript and Python codebases are home, and I read before I write. You get a short written plan of what I would touch before a branch opens.",
  },
  {
    q: "How do you handle data?",
    a: "Local first where it makes sense. When a hosted call is genuinely needed, it is a decision we take together and write down in the readme.",
  },
  {
    q: "Is it all AI work?",
    a: "No. Several of these are plain web, desktop and game projects. The AI parts earn their place by removing a step.",
  },
  {
    q: "Do you only build your own projects?",
    a: "No. I have shipped school and community tools that real people used, including a council election system and a workout app. I document each one so the next person can pick it up.",
  },
];

export type CaseStudy = {
  slug: string;
  // Empty for proprietary work: there is no public repository to read.
  repo: string;
  title: string;
  kicker: string;
  year: string;
  role: string;
  tags: string[];
  summary: string;
  problem: string;
  build: string[];
  outcome: string[];
  colour: string;
  image?: string;
  coverImage?: string;
  // Live deployment, when there is one.
  demo?: string;
};

// `repo` must match a real GitHub repository. Language, commit counts and
// language bytes on each page come from the GitHub API.
export const caseStudies: CaseStudy[] = [
  {
    slug: "video-maker-ai",
    repo: "Video-Maker-AI",
    title: "Video Maker AI",
    kicker: "A video pipeline that lives in a terminal",
    year: "2026",
    role: "Design, engineering, packaging",
    tags: ["Python", "WhisperX", "Gemini", "FFmpeg"],
    summary:
      "A desktop pipeline that turns a topic and a runtime into a finished video: script, neural voiceover, generated frames, word aligned captions and karaoke highlighting.",
    problem:
      "Making a narrated video means moving between a script editor, a voice tool, an image generator, a subtitle editor and an encoder. Each one has its own export format, and the timings only line up in the last tool, by hand.",
    build: [
      "A single control panel launched from one file scans the workspace and reports what is ready: which audio file, how many images, whether the script exists and whether FFmpeg is found.",
      "The script stage asks for a topic and an exact runtime, then writes narration to that length rather than truncating afterwards.",
      "WhisperX transcribes the voiceover and forces alignment against the script, which gives every word a start and end time.",
      "Captions are burned in with the spoken word highlighted in yellow, so timing comes from the audio rather than from a guess.",
      "Images come from either a CLI generator or a bulk Flow session, then a sanitiser renames them to a clean sequence so the track order is unambiguous.",
      "The render step applies Ken Burns motion per frame, letterboxes mixed aspect ratios and encodes at the chosen shape for landscape, shorts or square.",
    ],
    outcome: [
      "One launcher replaces five tools and their export formats.",
      "Captions are word aligned by construction, not adjusted by hand.",
      "Every stage can be rerun alone, so a wrong frame costs seconds rather than a whole render.",
    ],
    colour: "bg-orange",
    image: "/images/video-maker-ai.png",
  },
  {
    slug: "hitodama",
    repo: "hitodima-oss",
    title: "Hitodama",
    kicker: "A desktop companion with a soul",
    year: "2026",
    role: "Design, Electron, Win32 automation",
    tags: ["Electron", "JavaScript", "Win32", "MCP"],
    summary:
      "An ambient companion that floats on the desktop as a dynamic island: a procedural flame, push to talk dictation, real Windows controls and any OpenAI compatible model.",
    problem:
      "Desktop assistants either take over the screen or need an account. Neither is acceptable for something you keep open all day, and neither respects the fact that you already have a model running locally.",
    build: [
      "The soul is a canvas shader rather than a video: it reacts to four states and carries orbiting sakura petals, so it costs almost nothing when idle.",
      "A floating dynamic island docks to the top bezel with click through hit testing and wheel gestures to expand the control centre.",
      "Five slots cover personality, voice, abilities and dictation. Abilities are real Win32 calls run through PowerShell, including dark mode, master volume, Wi-Fi state and wallpaper changes.",
      "Push to talk listens on a global shortcut and injects the transcript straight into whichever window has the cursor.",
      "The endpoint is any OpenAI compatible URL, so Ollama, LM Studio, Groq, OpenRouter and Gemini all work without special cases.",
    ],
    outcome: [
      "No account, no subscription, and the whole thing runs offline against a local model.",
      "Injection at the cursor means the transcript lands where you are typing, instead of in a chat window you then copy from.",
      "The mural set ships with the app, so the first launch already looks finished.",
    ],
    colour: "bg-pink",
    image: "/images/hitodama.png",
  },
  {
    slug: "lumen-dash",
    repo: "Kinetra",
    title: "Lumen Dash",
    kicker: "A runner you play with your body",
    year: "2026",
    role: "Game design, graphics, vision, tooling",
    tags: ["Three.js", "TypeScript", "MediaPipe", "Vite"],
    summary:
      "A 3D endless runner controlled by pose. Your body steers, a second phone measures your jog, and a monster called the Hollow gains when you slow down.",
    problem:
      "Camera games usually send frames to a server, which makes them laggy, expensive and private in the wrong direction. Most also need a controller nobody owns, or a webcam nobody has.",
    build: [
      "Pose estimation runs in the browser on a lite MediaPipe landmarker, filtered with a One-Euro filter so thresholds are stable at a distance.",
      "Gestures are recognised by a deterministic rule engine measured in shoulder widths, so nothing depends on how close you stand.",
      "The game layer never imports camera code. That separation is why keyboard mode works offline with no model at all.",
      "A phone becomes the webcam over USB with no app: a relay serves frames to a canvas, and getUserMedia is patched to return that stream. The game itself was never modified.",
      "A second phone points at your legs, measures cadence by frame differencing on the lower frame, and posts a few bytes. The monster closes when you stop.",
      "The track generator plans against worst case speed, so jump and slide timing stays fair as difficulty rises.",
    ],
    outcome: [
      "Latency stays around one frame over USB, far below what the pose model can perceive.",
      "No cloud, no account, no install on the phone.",
      "A seed in the URL reproduces any run exactly, which made tuning possible.",
    ],
    colour: "bg-blue",
    image: "/images/lumen-dash.png",
  },
  {
    slug: "fittrainer",
    repo: "WEb1-trainer",
    title: "FitTrainer",
    kicker: "A coach that runs on your own server",
    year: "2026",
    role: "Frontend, backend, deployment",
    tags: ["React", "Vite", "SQLite", "PWA"],
    summary:
      "An installable workout coach that walks you through each set, speaks the cues out loud and keeps your history on a server you control.",
    problem:
      "Most fitness apps want an account before they will count a single rep, and they keep your training history on someone else's database. A coach you have to sign up for is a coach you have to trust with everything.",
    build: [
      "A workout engine walks each set through prep, tension, reset and rest timers, with a progress ring and spoken cues through the browser's SpeechSynthesis API.",
      "Every session is written to localStorage first and pushed to a small Node API second, so the app stays usable with the server down or the phone offline, and queued writes replay later.",
      "Writes are row-level upserts guarded by a timestamp, so two devices used the same day cannot overwrite each other.",
      "Progressive overload carries rep and hold offsets forward from the last time you ran the routine.",
      "The server is Node's built-in http and node:sqlite with zero npm dependencies, fronted by nginx with a single shared password as the whole access-control story.",
    ],
    outcome: [
      "No accounts, no login screen, no third-party backend.",
      "Clearing your browser no longer loses your history, and two devices see the same log.",
      "Forty-nine checks cover the API, the sync rules and the pure logic.",
    ],
    colour: "bg-lime",
    image: "/images/fittrainer.jpg",
    demo: "https://fittrainer.duckdns.org",
  },
  {
    slug: "brainfuck",
    repo: "brainfuck2",
    title: "Self hosting Brainfuck",
    kicker: "An interpreter written in its own language",
    year: "2026",
    role: "Low level, testing",
    tags: ["Brainfuck", "Parsers", "Esolang"],
    summary:
      "A Brainfuck interpreter whose source is Brainfuck, shipped with a working food ordering system that takes orders on stdin and prints a receipt.",
    problem:
      "An interpreter is the smallest honest test of whether you understand a language. Writing one inside the language itself removes every library that would otherwise hide a mistake.",
    build: [
      "The interpreter is 596 bytes and implements all eight commands, nested loops, the full byte range and end of input as zero.",
      "Programs and their input are fed on one stream, separated by an exclamation point, because Brainfuck has no concept of files.",
      "A full order flow sits on top: menu, item, quantity, then a receipt with line items and a total, built from digit pairs.",
      "Each case was checked against the reference suite, including nested loops and rot13, with results recorded in the readme.",
    ],
    outcome: [
      "A table of verified runs, not a claim of correctness.",
      "The ordering system proves input handling and arithmetic in the same interpreter that runs it.",
      "Small enough to read in one sitting.",
    ],
    colour: "bg-pink",
    image: "/images/brainfuck.png",
    coverImage: "/images/brainfuck-cover.jpg",
  },
  {
    slug: "school-voting",
    repo: "school_votingMAIN",
    title: "School Council Elections",
    kicker: "A real election system, run for real students",
    year: "2026",
    role: "Backend, security, deployment",
    tags: ["Flask", "SQLite", "Rate limiting", "Python"],
    summary:
      "A Flask and SQLite voting system for Saini International School, with ID and date-of-birth authentication, rate limiting and a password protected admin dashboard.",
    problem:
      "Student council elections were running on paper ballots and goodwill. Counting took an evening, the results could not be checked afterwards, and nobody could say who had voted.",
    build: [
      "Voters authenticate against a JSON roll of student IDs, dates of birth and houses, so a ballot cannot be cast on a guess.",
      "Flask-Limiter rate limits submissions per voter, which is what stops one person from filling the box.",
      "Votes, candidates and posts live in SQLite, including the live election state, so a restart mid-poll does not lose the count.",
      "A separate admin console handles candidate linkage and result reporting behind its own password.",
      "Setup is a single script that installs the requirements and starts the server, and the server runs on PythonAnywhere.",
    ],
    outcome: [
      "One shared source of truth for who voted and for what.",
      "A count that survives a server restart and can be audited afterwards.",
      "Built on faculty request and used for the actual school election.",
    ],
    colour: "bg-orange",
    image: "/images/school-voting.jpg",
  },
  {
    slug: "friendly-bet",
    repo: "friendly-bet-app",
    title: "Friendly Bet",
    kicker: "Betting between friends, without an account",
    year: "2026",
    role: "Full stack",
    tags: ["Next.js", "TypeScript", "Firebase", "PWA"],
    summary:
      "A Progressive Web App for small friendly bets, using browser fingerprinting for lightweight user identification and a real-time database for live scores.",
    problem:
      "Splitting a bet between friends usually means a spreadsheet, a group chat and a rule everyone half-remembers. There is no owner to ask and no way to settle it without an argument.",
    build: [
      "Browser fingerprinting identifies a returning player without a login form, so starting a bet takes seconds.",
      "Firestore keeps scores live, so the number on screen is the number everyone agrees on.",
      "Route handlers cover the whole lifecycle: creating a bet, wagering on it, voting, resolving, and disputing a result.",
      "An admin API approves or rejects accounts and reads transactions, so someone has to be in charge of the money side.",
      "A service worker and manifest make it installable, which is what people actually use at a pub table.",
    ],
    outcome: [
      "No account needed to place the first bet.",
      "Every resolution is a recorded state change rather than a promise.",
      "Runs as an installed app rather than a bookmarked tab.",
    ],
    colour: "bg-blue",
    image: "/images/friendly-bet.jpg",
  },
  {
    slug: "parallel-earth",
    repo: "AiUniverseSimulator",
    title: "Parallel Earth Simulator",
    kicker: "Generate a different world and watch it evolve",
    year: "2026",
    role: "Design, graphics, simulation",
    tags: ["Three.js", "TypeScript", "Vite", "Simplex noise"],
    summary:
      "A browser simulator where you change planetary parameters and generate alternate Earths, with procedural terrain, evolving species, emergent civilizations and AI written narratives.",
    problem:
      "Worldbuilding usually starts in a document and stays there. You can describe a second Earth, but you cannot watch one form, settle and invent its own history.",
    build: [
      "Planetary parameters are the only input, so every generated world is reproducible from the same numbers.",
      "Terrain is built procedurally with simplex noise rather than mapped from real data, which is what lets the world drift somewhere unfamiliar.",
      "Species and civilizations are simulated on top of the terrain rather than painted onto it, so the map and the population agree.",
      "The narrative for each world is generated last, as a description of what the simulation actually produced.",
    ],
    outcome: [
      "One set of parameters produces a whole planet, consistently.",
      "The narrative describes the simulation instead of replacing it.",
      "A single page app that runs without a backend.",
    ],
    colour: "bg-pink",
    image: "/images/parallel-earth.jpg",
    demo: "https://ai-universe-simulator.vercel.app",
  },
  {
    slug: "funny-day",
    repo: "funny-day",
    title: "Funny Day",
    kicker: "A party game that punishes you for laughing",
    year: "2026",
    role: "Computer vision, realtime systems",
    tags: ["Python", "FastAPI", "MediaPipe", "OpenCV"],
    summary:
      "A six-player try-not-to-laugh game that watches three cameras, scores every smirk and flinch on device, and runs the whole match on one laptop.",
    problem:
      "The classic try-not-to-laugh game needs a human referee watching six players and judging who reacted. That referee is the whole game, and finding one is the reason it never happens.",
    build: [
      "Head pose is anchored to eight rigid cranial and nasal landmarks instead of the mouth, so a laugh cannot read as a massive head turn.",
      "Smoothing adapts on the fly: micro-movements get heavy smoothing, deliberate turns get none, so the score is stable and responsive at the same time.",
      "Iris landmarks are normalised against the eye corners, which catches a glance at a phone even when the head never moves.",
      "Reactions are scored over a 150 millisecond window that matches human reaction onset, instead of a single frame.",
      "The TV display, the host dashboard and the match report are three routes on one local server, driven by three USB camera feeds.",
    ],
    outcome: [
      "No referee, no phones on the table, no cloud round trip.",
      "It runs on one laptop with three webcams and two phones over USB.",
      "Scoring rules are visible to the host, with casual and hardcore presets.",
    ],
    colour: "bg-lime",
    image: "/images/funny-day.jpg",
  },
  {
    slug: "kaggle-manager",
    repo: "renderxkaggle",
    title: "Kaggle Cloud Manager",
    kicker: "Run Kaggle notebooks without watching a browser tab",
    year: "2026",
    role: "Backend, infrastructure, MCP",
    tags: ["Python", "FastAPI", "Postgres", "MCP"],
    summary:
      "A web dashboard and job queue for running Kaggle notebook executions remotely, with the same control plane exposed to any AI agent over MCP.",
    problem:
      "A Kaggle notebook run is a browser tab you have to keep open, on a free account where the queue is the real cost. There is no queue of your own, no log you can keep, and no way to ask anything else to start one.",
    build: [
      "One job runs at a time, enforced in the database rather than in memory, so a redeploy cannot start a second execution.",
      "Job state lives in Postgres, which means a queued run survives a restart and an interrupted run can be requeued.",
      "Kaggle is driven through its REST API directly, with no heavyweight SDK and full control over retries.",
      "The MCP server exposes the same tools the dashboard uses, so an agent can list notebooks, run one, and read the logs without a browser.",
      "It is built for a free web service tier: one process, a hosted database, no build step and no on-instance storage.",
    ],
    outcome: [
      "One execution at a time, guaranteed by the database.",
      "Stop works by pushing an immediate-exit version of the notebook, and the outputs survive the stop.",
      "The agent path and the dashboard path are the same API.",
    ],
    colour: "bg-blue",
    image: "/images/kaggle-manager.jpg",
  },
  {
    slug: "glob-editor",
    repo: "GLOB-EDITOR",
    title: "GlobEditor",
    kicker: "A code editor that runs in the browser",
    year: "2026",
    role: "Frontend, backend, product",
    tags: ["React", "Monaco", "Pyodide", "Supabase"],
    summary:
      "A browser IDE with the Monaco editor, Python running locally in WebAssembly and a cloud engine for the languages that need it, with files stored per user.",
    problem:
      "A code editor in the browser usually means an editor and nothing else. You write code, then you have to leave, find a runtime and run it somewhere else, which is where most of these projects stop being useful.",
    build: [
      "Monaco gives the same syntax highlighting and command palette as a desktop editor, with detection for Python, JavaScript, HTML, CSS, Java, C and C++.",
      "Python runs client-side through Pyodide, so it is fast and private and needs no server.",
      "A second cloud engine handles the languages a browser cannot run, and returns the result to the same panel.",
      "Files are stored in Supabase with row level security, so a user only ever sees their own workspace.",
      "An admin mode gives a second view across users for support and moderation.",
    ],
    outcome: [
      "Write and run without leaving the page.",
      "Python stays on the machine; only the heavy languages go out.",
      "The workspace follows the account across devices.",
    ],
    colour: "bg-orange",
    image: "/images/glob-editor.jpg",
    demo: "https://glob-editor-gamma.vercel.app",
  },
  {
    slug: "selflens",
    repo: "",
    title: "SelfLens",
    kicker: "Personality tests you can take without an account",
    year: "2026",
    role: "Product, brand, engineering",
    tags: ["JavaScript", "Secure tokens", "Admin console"],
    summary:
      "A self-awareness assessment platform that scores results in the browser, with standard and deep catalogs, timed access tokens and a protected admin console.",
    problem:
      "Most personality quizzes take an email address before they show you a single result, then sell you a report. That is a wall in front of a five minute question that does not need one.",
    build: [
      "Results are scored in the browser, so a visitor can finish a five minute assessment without signing up or giving an email.",
      "Deep assessments are protected by timed tokens that stay valid for 3 to 48 hours, so a paid result cannot be shared by simply copying a link.",
      "The catalog is split into standard and deep tracks, so the same engine serves both without a separate flow.",
      "An administrator console is validated separately and compiles reports offline, so results are not left sitting in a public page.",
    ],
    outcome: [
      "No signup and no email to take the free assessments.",
      "Paid results are time limited rather than permanently open.",
      "The report is compiled offline rather than rendered in public.",
    ],
    colour: "bg-orange",
    image: "/images/selflens.jpg",
    demo: "https://selflens.in",
  },
  {
    slug: "anime-vote",
    repo: "animevote",
    title: "AnimeVote",
    kicker: "A notice board that actually settles the argument",
    year: "2026",
    role: "Frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    summary:
      "A voting app for the school anime notice board: pick a title or write your own in, and watch the results update.",
    problem:
      "The school notice board ran on a sheet of paper and an argument. Every week the same question came back, and the person holding the paper always won.",
    build: [
      "Voters choose from the list or write their own answer in, so a new title never needs a code change.",
      "Results are on their own page and update live, so the board can point a phone at the room instead of at a sheet.",
      "The whole thing is three files with no build step, which matters when it has to be edited by whoever is on duty.",
    ],
    outcome: [
      "The result is visible to everyone while the vote is open.",
      "New options do not need a developer.",
      "Small enough to edit on the spot.",
    ],
    colour: "bg-pink",
    image: "/images/anime-vote.jpg",
  },
];

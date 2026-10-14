// ─────────────────────────────────────────────────────────────
//  All of the site's content lives in this file.
//  Edit text here; you shouldn't need to touch the components.
//  Empty strings ('') hide that piece of UI automatically.
// ─────────────────────────────────────────────────────────────
import {
  SiPython,
  SiOpenjdk,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
  SiKotlin,
  SiLua,
  SiHtml5,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiFlask,
  SiAndroid,
  SiJetpackcompose,
  SiDiscord,
  SiGithubactions,
  SiWireshark,
  SiGit,
  SiDocker,
  SiLinux,
  SiAndroidstudio,
  SiUnity,
  SiFfmpeg,
  SiSqlite,
  SiFirebase,
  SiPytest,
} from 'react-icons/si'
import { TbBrandCSharp, TbBrandAws, TbLambda, TbSql, TbApi } from 'react-icons/tb'
import {
  LuDatabase,
  LuDumbbell,
  LuUtensils,
  LuShield,
  LuGlasses,
  LuSparkles,
  LuKeyRound,
  LuFileCode,
  LuShieldCheck,
  LuTestTube,
  LuNetwork,
  LuRadio,
  LuVideo,
  LuLock,
  LuChartCandlestick,
  LuCalendarClock,
  LuActivity,
} from 'react-icons/lu'

export const profile = {
  name: 'David Huynh',
  role: 'Software Developer',
  school: 'UT Arlington',
  jpAccent: '開発者', // "developer"
  tagline: 'I build apps, games, and the systems behind them.',
  avatar: '/avatar.jpg',
  github: 'https://github.com/DavidHuynh01',
  linkedin: 'https://www.linkedin.com/in/davidhuynhh/',
  email: 'DavidHuynhh01@gmail.com',
  resumeUrl: '', // off until the paper is published; then add /public/resume.pdf and set '/resume.pdf'
}

export const about = {
  paragraphs: [
    "Hi, I'm David, a Software Engineering student at the University of Texas at Arlington and an undergraduate researcher in UTA's MobiSec Lab.",
    "I like building things end to end: a serverless game on AWS with real CI/CD, an Android app with a full test suite, a VR streamer that only sends full quality where you're looking. Outside of code I'm usually gaming or playing soccer.",
  ],
  facts: [
    { label: 'Studying', value: 'B.S. Software Engineering' },
    { label: 'Graduating', value: 'Dec 2027' },
    { label: 'Research', value: 'MobiSec Lab, UTA' },
    { label: 'Off-screen', value: 'Gaming & soccer' },
  ],
}

// kind: label above the title (defaults to "Featured Project").
// images: first one is the cover; leave empty for a placeholder card.
export const projects = [
  {
    slug: 'skyblock-zordle',
    title: 'SkyblockZordle',
    period: 'Jul 2026 – Present',
    description:
      'A daily Wordle-style guessing game for Hypixel Skyblock items, with unlimited mode, collections, streaks, and a global leaderboard.',
    longDescription:
      "A daily puzzle where you guess a Hypixel Skyblock item and every guess shows how close you are across the item's attributes. There's an unlimited mode, collections, streaks, shareable results, and a global leaderboard behind Discord sign-in, all running on a serverless AWS backend.",
    highlights: [
      'Automated CI/CD with GitHub Actions: every push runs the unit tests, and merges to main deploy automatically.',
      'Secured deploys with GitHub OIDC and a least-privilege IAM role, so no long-lived AWS keys are stored anywhere.',
      'Designed a single-table DynamoDB schema with atomic counters and a precomputed top-10 leaderboard.',
      'Built Discord OAuth2 login with HMAC-signed sessions and CSRF protection.',
      'Found and closed a leaderboard exploit by moving all scoring to the server.',
      'Wrote 54 unit tests against an in-memory DynamoDB fake covering auth, rate limits, and streak logic.',
    ],
    technologies: ['React', 'Node.js', 'AWS Lambda', 'DynamoDB', 'GitHub Actions', 'S3 + CloudFront', 'AWS SAM', 'Discord OAuth2', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/DavidHuynh01/SkyblockZordle',
    liveUrl: 'https://d3htnxjhk2w7e2.cloudfront.net',
    images: [
      '/projects/skyblock-zordle/menu.png',
      '/projects/skyblock-zordle/daily.png',
      '/projects/skyblock-zordle/win.png',
      '/projects/skyblock-zordle/leaderboard.png',
      '/projects/skyblock-zordle/collections.png',
      '/projects/skyblock-zordle/how-to-play.png',
    ],
  },
  {
    slug: 'skyblock-market',
    title: 'SkyBlock Market',
    period: 'Oct 2026 – Present',
    description:
      'A serverless pipeline that captures every finished Hypixel SkyBlock auction, about 80 sales a minute, to train a model that prices upgraded items.',
    longDescription:
      "Hypixel publishes every finished auction but only keeps the last 60 seconds, with no history. SkyBlock Market runs a Lambda every minute that saves each batch to S3 before it disappears, building the dataset for a price model that will feed into SkyblockZordle. The collector is live; the model comes once there are a few weeks of sales.",
    highlights: [
      'Built a serverless pipeline that captures every finished Hypixel SkyBlock auction (about 80 sales per minute) from a feed that only keeps the last 60 seconds, with 100% minute coverage since launch.',
      "Designed for exactly-once capture by keying files on the source's refresh time, with each run recovering any batch the previous run missed.",
      'Enforced least privilege (the function can only add files) and kept buyer and seller IDs out of storage by allowlist.',
      'Wrote 58 tests at 100% coverage, including policy tests that fail CI if any IAM role could exceed its permissions boundary.',
      'Monitored with four CloudWatch alarms, including a custom sales-volume metric, with email alerts verified end to end.',
    ],
    technologies: ['Python', 'AWS Lambda', 'EventBridge', 'S3', 'CloudWatch', 'pytest', 'AWS SAM', 'GitHub Actions'],
    repoUrl: 'https://github.com/DavidHuynh01/skyblock-market',
    liveUrl: '',
    images: [],
    placeholderIcon: LuChartCandlestick,
  },
  {
    slug: 'smart-glasses-streaming',
    title: 'Smart Glasses Streaming Measurement',
    kind: 'Research Project',
    period: 'Jul 2026 – Present',
    // Unpublished research: keep details off the site until the paper is out.
    // With no longDescription, the row shows only the note and has no details modal.
    description: '',
    note: 'Under wraps until the paper is published.',
    longDescription: '',
    highlights: [],
    technologies: [],
    repoUrl: '',
    liveUrl: '',
    images: [],
    placeholderIcon: LuGlasses,
  },
  {
    slug: 'vr-video',
    title: 'Bandwidth-Efficient VR Video',
    period: 'Apr 2026 – Jun 2026',
    description:
      "Tile-based 360° video streaming for Meta Quest that sends full quality only where you're looking, using up to 78% less bandwidth than full-sphere streaming.",
    longDescription:
      'Splits equirectangular 360° video into an 8×4 tile grid and streams full quality only inside the predicted viewport. A custom foveated-blur shader lets peripheral vision degrade smoothly instead of cutting to black.',
    highlights: [
      'Real-time viewport prediction from headset pose, with motion extrapolation and gaze-ranked tiered quality.',
      'Custom HLSL foveated-blur shader so the periphery softens instead of dropping out.',
      'Full-stack Flask tile server with ffmpeg multi-quality encoding, client-side chunk caching, and a REST metrics API for per-tile bitrate, throughput, and rebuffer events.',
      'Cut bandwidth by up to 78% versus full-sphere streaming.',
    ],
    technologies: ['Python', 'Flask', 'Unity', 'C#', 'HLSL', 'ffmpeg', 'Meta Quest'],
    repoUrl: 'https://github.com/DavidHuynh01/bandwidth-efficient-vr-video',
    liveUrl: '',
    images: [
      '/projects/vr-video/foveated-on.png',
      '/projects/vr-video/foveated-off.png',
      '/projects/vr-video/sample-360-frame.png',
    ],
  },
  {
    slug: 'levelup-workout',
    title: 'LevelUp Workout',
    period: 'Jan 2026 – Apr 2026',
    description:
      'An Android fitness app that turns workouts into competition, ranking users on real-time leaderboards by total volume, personal records, and consistency.',
    longDescription:
      "Log your exercises, sets, reps, and weights, and LevelUp ranks you on live leaderboards against your friends and everyone else, so every workout counts toward something.",
    highlights: [
      'Ranks users on real-time leaderboards based on total volume, personal records, and workout consistency.',
      'Designed a NoSQL data structure in Firebase Realtime Database for efficient leaderboard queries and live ranking updates across global and friends-only views.',
      'Integrated Firebase Authentication for secure accounts, personalized workout history, friend connections, and protected data access.',
      'Built an intuitive workout logging interface for exercises, sets, reps, and weights, with persistent cloud sync.',
    ],
    technologies: ['Java', 'Android Studio', 'Firebase Auth', 'Firebase Realtime Database'],
    repoUrl: 'https://github.com/DavidHuynh01/levelup-workout',
    liveUrl: '',
    images: [], // add emulator screenshots to /public/projects/levelup-workout/
    placeholderIcon: LuDumbbell,
  },
  {
    slug: 'foodie-app',
    title: 'Foodie',
    kind: 'Team Project',
    period: 'Sep 2025 – Dec 2025',
    description:
      'A team-built Android marketplace for buying and selling homemade food, with buyer, seller, and admin roles.',
    longDescription:
      'Built with a team of four for a class project, Foodie connects home cooks with local buyers in the Arlington community.',
    highlights: [
      'Role-based app supporting Buyer, Seller, and Admin accounts, with custom admin domain authentication.',
      'SQLite-backed login with password hashing, an 8-character minimum password policy, and 24-hour session token expiry.',
      'End-to-end commerce flow: listing CRUD, filtered search, shopping cart, wishlists, reviews, and mock payment validation.',
      'Designed the admin dashboard UI/UX, with full UML documentation (class, state, activity, and sequence diagrams).',
    ],
    technologies: ['Java', 'Kotlin', 'SQLite', 'Android Studio', 'Material'],
    repoUrl: 'https://github.com/DavidHuynh01/foodie-app',
    liveUrl: '',
    images: [], // add screenshots to /public/projects/foodie-app/
    placeholderIcon: LuUtensils,
  },
  {
    slug: 'spamguard',
    title: 'SpamGuard',
    period: 'Dec 2025 – Jan 2026',
    description:
      'A Discord moderation bot that catches hijacked accounts spreading phishing links, fake Steam gifts, and Nitro scams on their very first message.',
    longDescription:
      'Compromised Discord accounts spread scam links fast. SpamGuard sets up honeypot channels that real members never post in, so a hijacked account gives itself away the moment it starts spamming.',
    highlights: [
      'Honeypot detection flags a hijacked account on its first message, then auto-times out the user and purges their messages across every channel.',
      'Per-server configuration through admin slash commands, with custom DMs and color-coded moderation logs.',
      'Deployed on DigitalOcean as a systemd service for 24/7 uptime, with auto-restart on failure and persistent logging.',
    ],
    technologies: ['Python', 'discord.py', 'DigitalOcean', 'systemd', 'Linux'],
    repoUrl: 'https://github.com/DavidHuynh01/SpamGuard',
    liveUrl: '',
    images: [],
    placeholderIcon: LuShield,
  },
]

// Work experience, newest first. (Degree and graduation live in `about.facts`.)
export const experience = [
  {
    type: 'work',
    title: 'Undergraduate Research Assistant',
    org: 'MobiSec Lab, The University of Texas at Arlington',
    period: 'Sep 2026 – Present',
    location: 'Arlington, TX',
    // Keep this vague until the paper is published.
    description: 'Undergraduate research in the MobiSec Lab. More to share once our paper is published.',
  },
  {
    type: 'work',
    title: 'Server',
    org: 'Seven Mile Cafe',
    period: 'May 2020 – Present',
    location: 'Fort Worth, TX',
    description:
      'Front-of-house service in a busy café: juggling concurrent tables at peak hours, resolving customer issues on the spot, and coordinating with kitchen and bar teams to keep orders accurate and on time.',
  },
]

// Awards, scholarships, Dean's List, hackathon wins, etc. Newest first.
export const awards = [
  {
    title: 'College of Engineering REU Award',
    issuer: 'The University of Texas at Arlington',
    period: 'Oct 2026 – Jan 2027',
    description: 'Research Experience for Undergraduates (REU) funding for my research in the MobiSec Lab.',
  },
  {
    title: 'Departmental REU Award',
    issuer: 'The University of Texas at Arlington',
    period: 'Sep 2026',
    description: 'Department-level REU funding for my undergraduate research in the MobiSec Lab.',
  },
]

// Background music. Browsers block autoplay with sound, so it starts when the
// visitor presses the music button. Put a track you have the rights to in
// /public/audio/ and set src; the player stays hidden while src is empty.
export const music = {
  src: '/audio/sunrise-of-youth.mp3',
  title: 'Sunrise of Youth',
  volume: 0.15, // starting volume, 0 to 1 (kept low on purpose)
  // The track is CC BY 3.0, which requires crediting the artist. Shown in the footer.
  credit: {
    artist: 'Kuukiko',
    artistUrl: 'https://soundcloud.com/user-439868828',
    sourceUrl: 'https://breakingcopyright.com/song/kuukiko-sunrise-of-youth',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
}

// Draggable photo pile in About. Put images in /public/photos/ and set src.
// An empty src shows a placeholder card. `featured` starts on top of the pile.
// landscape: true for wide shots (4:3 polaroid); otherwise portrait (4:5).
export const photos = [
  {
    src: '/photos/japan-vs-sweden.webp',
    landscape: true,
    caption: 'Japan vs Sweden',
    alt: 'Sweden and Japan flags on the pitch before kickoff at the 2026 World Cup in Dallas',
  },
  {
    src: '/photos/samurai-blue.webp',
    caption: 'Me at Japan Game',
    alt: 'David in a Japan jersey at the 2026 World Cup in Dallas',
    featured: true,
  },
  {
    src: '/photos/spain-vs-portugal.webp',
    landscape: true,
    caption: 'Spain vs Portugal',
    alt: 'Spain flag and pyrotechnics before Spain vs Portugal at the 2026 World Cup in Dallas',
  },
  {
    src: '/photos/norway-vs-cote-divoire.jpg',
    caption: "Norway vs Côte d'Ivoire",
    alt: "Côte d'Ivoire and Norway flags on the pitch during the pre-match ceremony at the 2026 World Cup in Dallas",
  },
]

export const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: SiOpenjdk },
      { name: 'Go', icon: SiGo },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
      { name: 'C#', icon: TbBrandCSharp },
      { name: 'Kotlin', icon: SiKotlin },
      { name: 'SQL', icon: TbSql },
      { name: 'Lua', icon: SiLua },
      { name: 'HTML/CSS', icon: SiHtml5 },
      { name: 'HLSL', icon: LuSparkles },
    ],
  },
  {
    group: 'App & Web',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Vite', icon: SiVite },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Flask', icon: SiFlask },
      { name: 'REST APIs', icon: TbApi },
      { name: 'Android', icon: SiAndroid },
      { name: 'Jetpack Compose', icon: SiJetpackcompose },
      { name: 'Discord OAuth2', icon: SiDiscord },
    ],
  },
  {
    group: 'Cloud & DevOps',
    items: [
      { name: 'AWS Lambda', icon: TbLambda },
      { name: 'S3 + CloudFront', icon: TbBrandAws },
      { name: 'IAM & SSM', icon: LuKeyRound },
      { name: 'AWS SAM (IaC)', icon: LuFileCode },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'EventBridge', icon: LuCalendarClock },
      { name: 'CloudWatch', icon: LuActivity },
      { name: 'GitHub OIDC', icon: LuShieldCheck },
      { name: 'Unit Testing', icon: LuTestTube },
      { name: 'pytest', icon: SiPytest },
    ],
  },
  {
    group: 'Systems & Networking',
    items: [
      { name: 'TCP/IP', icon: LuNetwork },
      { name: 'RTMP', icon: LuRadio },
      { name: 'H.264 / MediaCodec', icon: LuVideo },
      { name: 'Wireshark', icon: SiWireshark },
      { name: 'Auth Security', icon: LuLock },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'Linux / systemd', icon: SiLinux },
      { name: 'Android Studio', icon: SiAndroidstudio },
      { name: 'Unity', icon: SiUnity },
      { name: 'ffmpeg', icon: SiFfmpeg },
    ],
  },
  {
    group: 'Databases',
    items: [
      { name: 'DynamoDB', icon: LuDatabase },
      { name: 'SQLite', icon: SiSqlite },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
]

// Section ids, titles, and the small Japanese labels next to each heading.
export const sections = [
  { id: 'about', title: 'About', jp: '自己紹介' },
  { id: 'projects', title: 'Projects', jp: '作品' },
  { id: 'experience', title: 'Experience', jp: '経歴' },
  { id: 'awards', title: 'Awards', jp: '受賞' },
  { id: 'skills', title: 'Skills', jp: '技術' },
  { id: 'contact', title: 'Contact', jp: '連絡' },
]

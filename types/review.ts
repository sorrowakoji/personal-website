export interface Review {
  id: number
  title: string
  game: string
  genre: string
  platform: string
  rating: number
  excerpt: string
  readTime: string
  date: string
  image: string
  featured?: boolean
  tags: string[]
}

export const reviews: Review[] = [
  {
    id: 1,
    title: "Elden Ring DLC is FromSoftware's Magnum Opus",
    game: 'Elden Ring: Shadow of the Erdtree',
    genre: 'RPG',
    platform: 'PC / PS5 / Xbox',
    rating: 5,
    excerpt:
      "Shadow of the Erdtree pushes every boundary FromSoftware set with the base game. Mesmer alone is worth the price of admission. I cried, I died 47 times to the final boss, and I'd do it all again.",
    readTime: '8 min read',
    date: 'Jun 8, 2026',
    image: '/images/game-elden.png',
    featured: true,
    tags: ['DLC', 'Soulslike', 'Must Play'],
  },
  {
    id: 2,
    title: 'Stardew Valley: Still the Best Comfort Game in 2026',
    game: 'Stardew Valley',
    genre: 'Cozy / Sim',
    platform: 'All Platforms',
    rating: 5,
    excerpt:
      "ConcernedApe keeps giving and we keep receiving. After three full playthroughs I'm still discovering new secrets. The 1.7 update brought co-op improvements that make it even better.",
    readTime: '5 min read',
    date: 'May 22, 2026',
    image: '/images/game-stardew.png',
    tags: ['Cozy', 'Co-op', 'Indie'],
  },
  {
    id: 3,
    title: 'RE4 Remake — How to Perfect a Classic',
    game: 'Resident Evil 4 Remake',
    genre: 'Survival Horror',
    platform: 'PC / PS5 / Xbox',
    rating: 4,
    excerpt:
      "Capcom's remake treatment hits different here. The knife parry system adds so much depth, and Ashley actually doesn't make me want to quit anymore. A near-perfect reimagining.",
    readTime: '7 min read',
    date: 'May 5, 2026',
    image: '/images/game-re4.png',
    tags: ['Horror', 'Action', 'Remake'],
  },
  {
    id: 4,
    title: 'Hollow Knight: The Metroidvania Benchmark',
    game: 'Hollow Knight',
    genre: 'Metroidvania',
    platform: 'PC / Switch / PS4 / Xbox',
    rating: 5,
    excerpt:
      "Team Cherry's masterpiece holds up perfectly in 2026. The atmosphere is unmatched, the combat is deeply satisfying, and Grimm is still the best boss fight in gaming history.",
    readTime: '6 min read',
    date: 'Apr 17, 2026',
    image: '/images/game-hollow.png',
    tags: ['Indie', 'Challenging', 'Masterpiece'],
  },
]
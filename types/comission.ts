import { Film, Clapperboard, Crown, Mic2, Code2, MessageSquareCode, Gamepad2 } from 'lucide-react'

export interface CommissionCategory {
  id: string
  title: string
  description: string
  tiers: CommissionTier[]
}

export interface CommissionTier {
  id: string
  name: string
  price: string
  priceIndo?: string
  priceNote?: string
  description: string
  icon: React.ElementType
  features: string[]
  notIncluded?: string[]
  popular?: boolean
  accent: string
  accentBg: string
}

export const commissionCategories: CommissionCategory[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    description:
      'Edited VOD for long-form content for VTubers, streamers, and content creators.',

    tiers: [
      {
        id: 'long-basic',
        name: 'Long Form Basic',
        price: '$15',
        priceIndo: 'Rp 150k',

        description:
          'Simple highlight videos and stream edits.',

        icon: Film,

        features: [
          '5-8 minute videos',
          '60 minute raw footage',
          'Simple subtitles',
          'Basic motion graphics',
          'Color grading',
          'Memes and effects',
          'Include source files',
          '2 rounds of revisions',
        ],

        accent: 'text-blue-400',
        accentBg: 'bg-blue-500/10 border-blue-500/20',
      },

      {
        id: 'long-standard',
        name: 'Long Form Standard',
        price: '$20',
        priceIndo: 'Rp 200k',

        description:
          'More advanced editing and pacing.',

        icon: Film,

        features: [
          '8-10 minute videos',
          '90 minute raw footage',
          'Simple subtitles',
          'Basic motion graphics',
          'Color grading',
          'Memes and effects',
          'Include source files',
          '2 rounds of revisions',
        ],

        accent: 'text-primary',
        accentBg: 'bg-primary/10 border-primary/20',
      },

      {
        id: 'long-premium',
        name: 'Long Form Premium',
        price: '$35',
        priceIndo: 'Rp 350k',

        description:
          'Heavy editing, motion graphics and priority queue.',

        icon: Crown,

        features: [
          '10-15 minute videos',
          '120 minute raw footage',
          'Simple subtitles',
          'Basic motion graphics',
          'Color grading',
          'Memes and effects',
          'Include source files',
          '2 rounds of revisions',
        ],

        accent: 'text-yellow-400',
        accentBg: 'bg-yellow-500/10 border-yellow-500/20',
      },
    ],
  },

  {
    id: 'short-form',
    title: 'Short Form Video',
    description:
      'TikTok, Shorts, Reels and clip editing.',

    tiers: [
      {
        id: 'basic-short',
        name: 'Basic Short Form',
        price: '$5',
        priceIndo: 'Rp 50k',

        description:
          'Simple clip editing and highlights.',

        icon: Clapperboard,

        features: [
          'Up to 60 seconds',
          'Subtitles',
          'Basic motion graphics',
          'Fast turnaround',
        ],

        accent: 'text-pink-400',
        accentBg: 'bg-pink-500/10 border-pink-500/20',
      },
    ],
  },

  {
    id: 'casting',
    title: 'Casting',
    description:
      'Tournament commentary and hosting services.',

    tiers: [
      {
        id: 'casting-service',
        name: 'Game Casting',
        price: 'Tentative',

        description:
          'Play-by-play and color commentary.',

        icon: Mic2,

        features: [
          'Valorant',
          'Dota 2',
          'Counter-Strike 2',
          'Brawl Stars',
          'Other Community tournaments based on demand',
        ],

        accent: 'text-orange-400',
        accentBg: 'bg-orange-500/10 border-orange-500/20',
      },
    ],
  },

  {
    id: 'programming',
    title: 'Programming - Coming Soon',
    description:
      'Small creator-focused software commissions. Contact for custom projects and inquiries.',

    tiers: [
      {
        id: 'widgets',
        name: 'Widgets',
        price: 'Tentative',

        description:
          'Website and stream widgets.',

        icon: Code2,

        features: [
          'Schedule widgets',
          'Live status widgets',
          'Fanart widgets',
          'Custom integrations',
        ],

        accent: 'text-cyan-400',
        accentBg: 'bg-cyan-500/10 border-cyan-500/20',
      },

      {
        id: 'simple-tournament-overlay',
        name: 'Simple Tournament Overlay',
        price: 'Tentative',

        description:
          'Custom simple overlay for tournaments.',

        icon: MessageSquareCode,

        features: [
          'Score overlays',
          'API integration',
        ],

        accent: 'text-green-400',
        accentBg: 'bg-green-500/10 border-green-500/20',
      },

      {
        id: 'mini-games',
        name: 'Mini Games',
        price: 'Tentative',

        description:
          'Interactive browser games and stream tools.',

        icon: Gamepad2,

        features: [
          'Guessing games',
          'Redeem games',
          'Viewer interaction',
          'Custom mechanics',
        ],

        accent: 'text-violet-400',
        accentBg: 'bg-violet-500/10 border-violet-500/20',
      },
    ],
  },
]

export const faqItems = [
  {
    q: 'How long does a commission take?',
    a: 'Chibi Clips: 1–2 weeks. Short Skits: 2–4 weeks. Full Production: 4–8 weeks. These estimates depend on queue length.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Stripe, PayPal, and Ko-fi. A 50% non-refundable deposit is required to start.',
  },
  {
    q: 'Can I request my own OC or VTuber model?',
    a: "Absolutely! Please provide a clear reference sheet. Additional fees may apply for complex character designs. I'll let you know in the quote.",
  },
  {
    q: 'Are commissions open right now?',
    a: 'Slots are limited — check the status badge above. I open new slots monthly, so follow on Twitter to be notified.',
  },
]
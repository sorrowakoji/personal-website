export interface ScheduleEvent {
  id: string
  description: string
  date: string
  time: string
  collaborator: Collaborator[]
  game: Game
  type: (typeof TYPE_CONFIG)[keyof typeof TYPE_CONFIG]
  inactive: boolean
}

export interface Collaborator {
    id: string
    name: string
    pfp: string
    url: string
}

export interface Game {
    id: string
    name: string
    pfp: string
}

export enum ScheduleType {
    Regular = 0,
    CoStream = 1,
    CollabOff = 2,
    CastOnStream = 3,
    CastOffStream = 4,
}

export const TYPE_CONFIG = {
  [ScheduleType.Regular]: {
    type: ScheduleType.Regular,
    label: 'REGULAR',
    classes: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },

  [ScheduleType.CoStream]: {
    type: ScheduleType.CoStream,
    label: 'COSTREAM',
    classes: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },

  [ScheduleType.CollabOff]: {
    type: ScheduleType.CollabOff,
    label: 'COLLAB OFFSTREAM',
    classes: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  },

  [ScheduleType.CastOnStream]: {
    type: ScheduleType.CastOnStream,
    label: 'CAST ON STREAM',
    classes: 'bg-green-500/15 text-green-400 border-green-500/30',
  },

  [ScheduleType.CastOffStream]: {
    type: ScheduleType.CastOffStream,
    label: 'CAST OFF STREAM', 
    classes: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
} as const
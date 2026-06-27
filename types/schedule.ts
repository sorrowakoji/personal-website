export interface ScheduleEvent {
  id: number;
  date: string;
  description: string | null;
  inactive: boolean;
  type: ScheduleType;

  game: {
    id: number;
    name: string;
    pfp: string | null;
  };

  collaborators: {
    id: number;
    name: string;
    pfp: string | null;
    socials: {
      id: number;
      platform: string;
      url: string;
    }[];
  }[];
}

export interface Collaborator {
  id: string;
  name: string;
  pfp: string;
  url: string;
}

export interface Game {
  id: number;
  name: string;
  pfp: string | null;
  icon: string | null;
}

export enum ScheduleType {
  Regular = 0,
  CoStream = 1,
  CollabOff = 2,
  CastOnStream = 3,
  CastOffStream = 4,
}

export function getScheduleTypeLabel(type: ScheduleType | "all") {
  switch (type) {
    case ScheduleType.Regular:
      return "Regular";

    case ScheduleType.CoStream:
      return "Co-Stream";

    case ScheduleType.CollabOff:
      return "Collab (Off Stream)";

    case ScheduleType.CastOnStream:
      return "Casting (On Stream)";

    case ScheduleType.CastOffStream:
      return "Casting (Off Stream)";

    default:
      return "All";
  }
}

export const TYPE_CONFIG = {
  [ScheduleType.Regular]: {
    type: ScheduleType.Regular,
    label: "REGULAR",
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    ribbon: "bg-blue-500",
  },

  [ScheduleType.CoStream]: {
    type: ScheduleType.CoStream,
    label: "COSTREAM",
    classes: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    ribbon: "bg-purple-500",
  },

  [ScheduleType.CollabOff]: {
    type: ScheduleType.CollabOff,
    label: "COLLAB OFFSTREAM",
    classes: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    ribbon: "bg-yellow-500",
  },

  [ScheduleType.CastOnStream]: {
    type: ScheduleType.CastOnStream,
    label: "CAST ON STREAM",
    classes: "bg-green-500/15 text-green-400 border-green-500/30",
    ribbon: "bg-green-500",
  },

  [ScheduleType.CastOffStream]: {
    type: ScheduleType.CastOffStream,
    label: "CAST OFF STREAM",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
    ribbon: "bg-red-500",
  },
} as const;

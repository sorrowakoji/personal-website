import { Game } from "./schedule";

export type EwcStream = {
  id: number;
  start: string;
  end: string;
};

export type EwcSchedule = {
  id: number;

  game: Game;

  start: string;
  end: string;

  streams: EwcStream[];
};

export function getEsportsIcon(id: number) {
  switch (id) {
    case 3:
      return "/icon/valorant.webp";
    case 4:
      return "/icon/chess.webp";
    case 13:
      return "/icon/dota2.webp";
    case 14:
      return "/icon/apex.webp";
    case 15:
      return "/icon/cs2.webp";
    case 16:
      return "/icon/freefire.webp";
    case 17:
      return "/icon/pubg.webp";
    case 18:
      return "/icon/mlbb.webp";
    case 19:
      return "/icon/hok.webp";
    case 20:
      return "/icon/pubgm.webp";
    case 21:
      return "/icon/rocketleague.webp";
    case 22:
      return "/icon/crossfire.webp";
    case 23:
      return "/icon/r6siege.webp";
    default:
      return undefined;
  }
}

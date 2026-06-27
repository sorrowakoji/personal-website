import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitch,
  faYoutube,
  faXTwitter,
  faTiktok,
  faInstagram,
  faKickstarter,
} from "@fortawesome/free-brands-svg-icons";

export function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "twitch":
      return <FontAwesomeIcon icon={faTwitch} />;

    case "youtube":
      return <FontAwesomeIcon icon={faYoutube} />;

    case "twitter":
    case "x":
      return <FontAwesomeIcon icon={faXTwitter} />;

    case "tiktok":
      return <FontAwesomeIcon icon={faTiktok} />;

    case "instagram":
      return <FontAwesomeIcon icon={faInstagram} />;

    case "kick":
      return <FontAwesomeIcon icon={faKickstarter} />;

    default:
      return null;
  }
}

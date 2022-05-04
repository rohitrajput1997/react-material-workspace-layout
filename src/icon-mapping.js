import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ExitIcon from "@mui/icons-material/ExitToApp"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import HelpIcon from "@mui/icons-material/Help"
import HotkeysIcon from "@mui/icons-material/Keyboard"
import BackIcon from "@mui/icons-material/KeyboardArrowLeft"
import NextIcon from "@mui/icons-material/KeyboardArrowRight"
import PauseIcon from "@mui/icons-material/Pause"
import PlayIcon from "@mui/icons-material/PlayArrow"
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext"
import SaveIcon from "@mui/icons-material/Save"
import SettingsIcon from "@mui/icons-material/Settings"

export const iconMapping = {
  back: BackIcon,
  prev: BackIcon,
  previous: BackIcon,
  next: NextIcon,
  forward: NextIcon,
  play: PlayIcon,
  pause: PauseIcon,
  settings: SettingsIcon,
  options: SettingsIcon,
  help: HelpIcon,
  fullscreen: FullscreenIcon,
  exit: ExitIcon,
  quit: ExitIcon,
  save: SaveIcon,
  done: ExitIcon,
  clone: QueuePlayNextIcon,
  hotkeys: HotkeysIcon,
  shortcuts: HotkeysIcon,
  submit: CheckCircleOutlineIcon,
  query: HelpIcon,
}

export default iconMapping


import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

interface Props {
  muted?: boolean;
  onClick?: () => void;
}

export default function MuteButton({ muted, onClick }: Props) {
  const Icon = muted ? IoVolumeMuteOutline : IoVolumeHighOutline;
  return (
    <button className="mute-button springy" onClick={onClick}>
      <Icon style={{ marginRight: "0.5em" }} /> FARTS
    </button>
  );
}

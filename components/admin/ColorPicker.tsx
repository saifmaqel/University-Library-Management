import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="font-ibm-plex-sans h-full flex-1 bg-transparent outline-none"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;

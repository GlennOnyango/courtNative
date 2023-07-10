import DropDown from "react-native-paper-dropdown";

type Props = {
  showDropDown: boolean;
  setShowDropDown: (value: boolean) => void;
  selectedData: string;
  setData: (value: string) => void;
  list: any[];
  label: string;
};

export default function SelectSpecial({
  showDropDown,
  setShowDropDown,
  selectedData,
  setData,
  list,
  label,
}: Props) {
  return (
    <DropDown
      label={label}
      mode={"outlined"}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={selectedData}
      setValue={setData}
      list={list}
    />
  );
}

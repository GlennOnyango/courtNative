import DropDown from "react-native-paper-dropdown";

export default function SelectSpecial({
  showDropDown,
  setShowDropDown,
  selectedData,
  setData,
  list,
  label

}) {
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

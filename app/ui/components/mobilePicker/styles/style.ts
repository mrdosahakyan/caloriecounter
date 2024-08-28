export const pickerStyles: React.CSSProperties = {
  width: "100%",
  lineHeight: "0px",
  textAlign: "center",
};

export const pickerItemStyles = (selected: boolean): React.CSSProperties => ({
  color: selected ? "#021533" : "#ccc",
  fontWeight: selected ? "bold" : "normal",
});

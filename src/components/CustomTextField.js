import {
  TextField,
  styled,
} from "@mui/material";


 const CustomTextField = styled(
  ({
    autoFocus = true,
    fullWidth = true,
    autoComplete = "off",
    noBorder = false,
    ...props
  }) => (
    <TextField
     
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      {...props}
    />
  )
)(({ noBorder }) => ({
  borderRadius: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    "& fieldset": {
      border: noBorder ? "none" : "1px solid #EBEBEB", 
      backgroundColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: noBorder ? "none" : "rgba(200, 200, 200, 1)", 
    },
    "&.Mui-focused fieldset": {
      borderColor: noBorder ? "none" : "rgba(255, 149, 0, 1)", 
    },
    "& input": {
      color: "#424242", 
      backgroundColor: "transparent", 
    },
    "& input::placeholder": {
      color: "#B7B7B7", 
    },
    "& input:focus": {
      backgroundColor: "transparent", 
    },
  },
}));

export  default CustomTextField;
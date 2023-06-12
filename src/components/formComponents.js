import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


import { useState } from "react";

export const AppTextInput = ({
  labelText,
  onChange,
  classes,
  value,
  error = false,
  disabled = false,
}) =>{

  return (
    <TextField
      value={value}
      onChange={onChange}
      classes={classes}
      fullWidth
      disabled={disabled}
      error = {error}
      id="filled-basic"
      label={labelText}
      variant="filled"
      sx={{
        marginBottom: "24px"
      }}
    />
  )
}

export const AppPasswordInput = ({
  labelText = "Password",
  onChange,
  classes,
  value,
  error = false,
  disabled = false,
}) =>{
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{width: '100%' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">{labelText}</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            value={value}
            classes={classes}
            error={error}
            disabled={disabled}
            sx={{
              marginBottom: "24px"
            }}
            endAdornment={
              <InputAdornment 
              position="end"
              sx={{
                margin: "0px"
              }}>
                <button
                style={{height: "58px", background: "#FFFFFF1A", borderBottom: "2px solid white", color: "#531eba"}}
                  type="button"
                  className="btn btn-link px-3 rounded-0 text-decoration-none"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  }
                </button>
              </InputAdornment>
            }
          />
        </FormControl>
  )
}

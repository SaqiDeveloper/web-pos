import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Iconify from "./Iconify";
import { FormHelperText, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { UserPasswordUpdate } from "src/DAL/Users/User";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function ChangePasswordModel({ open, setOpen, userId }) {
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = React.useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs?.new_password !== inputs?.confirm_password) {
      enqueueSnackbar("New password and confirm password does not match", {
        variant: "error",
      });
      return;
    }
    const data = {
      id: userId,
      new_password: inputs?.new_password,
      confirm_password: inputs?.confirm_password,
    };

    const resp = await UserPasswordUpdate(data);
    if (resp?.status == true) {
      setOpen(false);
      enqueueSnackbar(resp?.message, { variant: "success" });
    } else if (typeof resp?.message == "string") {
      enqueueSnackbar(resp?.message, { variant: "error" });
    } else {
      setError(resp?.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Change Password
          </Typography>
          <TextField
            label="New Password *"
            fullWidth
            name="new_password"
            onChange={handleChange}
            sx={{ marginTop: "15px" }}
            size="small"
          />
          {error?.new_password && (
            <FormHelperText sx={{ color: "red" }}>
              {error?.new_password[0]}
            </FormHelperText>
          )}
          <TextField
            label="Confirm Password *"
            fullWidth
            name="confirm_password"
            onChange={handleChange}
            sx={{ marginTop: "15px" }}
            size="small"
          />
          {error?.confirm_password && (
            <FormHelperText sx={{ color: "red" }}>
              {error?.confirm_password[0]}
            </FormHelperText>
          )}
          <Box
            sx={{
              textAlign: "end",
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              marginTop: "15px",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

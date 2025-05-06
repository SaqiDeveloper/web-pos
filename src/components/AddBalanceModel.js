import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Iconify from "./Iconify";
import { FormHelperText, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { AddUserBalance, UserPasswordUpdate } from "src/DAL/Users/User";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function AddBalanceModel({ open, setOpen, userId }) {
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const [balance, setBalance] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    setBalance(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: userId,
      balance: balance,
    };

    const resp = await AddUserBalance(data);
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
            Add Balance
          </Typography>
          <TextField
            label="Balance *"
            fullWidth
            onChange={handleChange}
            sx={{ marginTop: "15px" }}
            size="small"
          />
          {error?.balance && (
            <FormHelperText sx={{ color: "red" }}>
              {error?.balance[0]}
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

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Iconify from "./Iconify";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 3,
};

export default function Confirmation({ open, setOpen, onSubmit }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to delete?
          </Typography>
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
                backgroundColor: "#d32f2f",
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#d32f2f", // keep it red on hover too
                },
              }}
              onClick={onSubmit}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

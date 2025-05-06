import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 450,
  bgcolor: "background.paper",
};

export default function ImageModel({ open, setOpen, data }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={data} alt="" style={{ width: "100%", height: "100%" }} />
        </Box>
      </Modal>
    </div>
  );
}

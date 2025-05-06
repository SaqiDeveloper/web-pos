import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Iconify from "./Iconify";
import { FormHelperText, Input, TextField } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 3,
  borderRadius: "10px",
};

export default function ReasonModel({
  open,
  setOpen,
  onSubmit,
  setReason,
  status,
  setProof,
}) {
  const [imagePreview, setImagePreview] = React.useState("");
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleImageChange = (e) => {
    setProof(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {status == 1 ? (
            ""
          ) : (
            <TextField
              label="Enter Reason *"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
            />
          )}
          {status == 1 ? (
            <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
              <div className="row w-100 div-style ms-0 pt-0">
                <div className="col-4">
                  <p className="">Upload Image * </p>
                  <FormHelperText className="pt-0">
                    Supported Format ("JPG", "JPEG", "PNG", "WEBP")
                  </FormHelperText>
                </div>
                <div className="col-3">
                  {imagePreview && (
                    <img src={imagePreview} height="60" width={"150"} />
                  )}
                </div>
                <div className="col-5 text-end pt-2 ">
                  <label htmlFor="brand-logo-input">
                    <Input
                      accept="image/*"
                      id="brand-logo-input"
                      type="file"
                      name="image"
                      className="d-none"
                      onChange={handleImageChange}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<FileUploadIcon className="uploadIcon" />}
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            ""
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
                boxShadow: "none",
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

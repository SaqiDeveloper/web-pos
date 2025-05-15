import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Iconify, Page } from "src/components";
import { CreateRank, GetRankById, UpdateRankData } from "src/DAL/Rank/Rank";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  AddPromotionData,
  EditPromotionData,
  GetPromotionDataById,
} from "src/DAL/Promotion/Promotion";
import { AddMethodData } from "src/DAL/Methods/Method";

export const AddMethod = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formType, setFormType] = useState("add");
  const [imagePreview, setImagePreview] = useState("");
  const [qrcodePreview, setQRcodePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    method_name: "",
    currency_name: "",
    image: "",
    qr_code: "",
    account_address: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const value = e.target.files[0];
    setImagePreview(URL.createObjectURL(value));
    setInputs((prev) => ({ ...prev, ["image"]: value }));
  };
  const handleQRCodeImageChange = (e) => {
    const value = e.target.files[0];
    setQRcodePreview(URL.createObjectURL(value));
    setInputs((prev) => ({ ...prev, ["qr_code"]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    formData.append("image", inputs?.image);
    formData.append("qr_code", inputs?.qr_code);
    formData.append("method_name", inputs?.method_name);
    formData.append("account_address", inputs?.account_address);
    formData.append("currency_name", inputs?.currency_name);

    const resp = await AddMethodData(formData);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      navigate(-1);
    } else if (typeof resp?.message == "string") {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    } else {
      setLoading(false);
      setError(resp?.message);
    }
  };

  return (
    <>
      <Page title="Add Payment Method">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Iconify
              icon={"material-symbols:arrow-back-rounded"}
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h5" fontWeight={600}>
              {"Add Payment Method"}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Method Name *"
                name="method_name"
                value={inputs?.method_name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.method_name && error?.method_name[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Currency Name *"
                name="currency_name"
                value={inputs?.currency_name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.currency_name && error?.currency_name[0]}
              </FormHelperText>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Account Address *"
                name="account_address"
                value={inputs?.account_address}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.account_address && error?.account_address[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
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
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.image && error?.image[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                <div className="row w-100 div-style ms-0 pt-0">
                  <div className="col-4">
                    <p className="">QR Code Image * </p>
                    <FormHelperText className="pt-0">
                      Supported Format ("JPG", "JPEG", "PNG", "WEBP")
                    </FormHelperText>
                  </div>
                  <div className="col-3">
                    {qrcodePreview && (
                      <img src={qrcodePreview} height="60" width={"150"} />
                    )}
                  </div>
                  <div className="col-5 text-end pt-2 ">
                    <label htmlFor="brand-logo-input-1">
                      <Input
                        accept="image/*"
                        id="brand-logo-input-1"
                        type="file"
                        name="qr_code"
                        className="d-none"
                        onChange={handleQRCodeImageChange}
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
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.qr_code && error?.qr_code[0]}
              </FormHelperText>
            </Grid>

            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ textAlign: "end" }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading == true}
                sx={{ textTransform: "none" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

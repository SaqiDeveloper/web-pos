import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Iconify, Page } from "src/components";
import { AddBannerData, UpdateBannerData } from "src/DAL/Banner/Banner";

export const AddBanner = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    url: "",
    image: "",
    is_internal: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ImageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setInputs((prev) => ({ ...prev, ["image"]: file }));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("url", inputs?.url);
    formData.append("image", inputs?.image);
    formData.append("is_internal", inputs?.is_internal);

    const resp = await AddBannerData(formData);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      navigate(-1);
    } else if (typeof resp?.message == "string") {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    } else {
      setError(resp?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Page title="AddBanner">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Iconify
              icon={"material-symbols:arrow-back-rounded"}
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h5" fontWeight={600}>
              {"Add Banner"}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextField
                  label="Url *"
                  type="text"
                  name="url"
                  value={inputs?.url}
                  fullWidth
                  size="small"
                  onChange={handleChange}
                />
                {error?.url && (
                  <FormHelperText sx={{ color: "red" }}>
                    {error?.url[0]}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Is Internal *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputs?.is_internal}
                    name="is_internal"
                    label="Is Internal *"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>True</MenuItem>
                    <MenuItem value={0}>False</MenuItem>
                  </Select>
                </FormControl>
                {error?.is_internal && (
                  <FormHelperText sx={{ color: "red" }}>
                    {error?.is_internal[0]}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div
                  style={{
                    width: "60%",
                    height: "250px",
                    border: "1px dotted",
                    marginTop: "25px",
                    borderRadius: "5px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    position: "relative",
                  }}
                  className="g-0"
                >
                  {(ImageUrl == null ||
                    ImageUrl == undefined ||
                    ImageUrl == "") && (
                    <div className="d-flex justify-content-center align-items-center text-center h-100 w-100">
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          type="file"
                          multiple
                          name="image"
                          className="d-none"
                          onChange={handleImageUpload}
                        />

                        <Iconify
                          icon="zondicons:upload"
                          style={{
                            cursor: "pointer",
                            color: "#d49b42",
                            fontSize: "35px",
                          }}
                        />
                        <FormHelperText
                          className="pt-0"
                          style={{ color: "grey", cursor: "pointer" }}
                        >
                          Supported Format: JPG, JPEG, PNG, WEBP
                        </FormHelperText>
                      </label>
                    </div>
                  )}

                  {ImageUrl && (
                    <>
                      <p style={{ position: "absolute", right: 0 }}>
                        <Iconify
                          icon="maki:cross"
                          width={20}
                          style={{
                            cursor: "pointer",
                            color: "black",
                            backgroundColor: "white",
                            marginTop: "6px",
                          }}
                          onClick={() => setImageUrl("")}
                        />
                      </p>

                      <img
                        src={ImageUrl}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    </>
                  )}
                </div>
                <Box>
                  {error?.image && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error?.image[0]}
                    </FormHelperText>
                  )}
                </Box>
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
                  sx={{ textTransform: "none" }}
                  onClick={handleSubmit}
                  disabled={loading == true}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Page>
    </>
  );
};

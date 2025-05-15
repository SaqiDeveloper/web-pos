import {
  Box,
  Button,
  CircularProgress,
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

export const AddPromotion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [formType, setFormType] = useState("add");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
    image: "",
  });

  const FetchRankDetail = useCallback(async () => {
    setLoading(true);
    const resp = await GetPromotionDataById(id);
    if (resp?.status == true) {
      setInputs({ title: resp?.data?.title, body: resp?.data?.body });
      setImagePreview(resp?.data?.image);
      setFormType("edit");
      setLoading(false);
    } else {
      setFormType("edit");
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs?.title?.length > 41) {
      return enqueueSnackbar("Title should not be greater then 41 characters", {
        variant: "error",
      });
    }
    const formData = new FormData();
    setLoading(true);
    if (formType == "edit" && inputs?.image) {
      formData.append("image", inputs?.image);
    }
    if (formType == "add") {
      formData.append("image", inputs?.image);
    }
    formData.append("title", inputs?.title);
    formData.append("body", inputs?.body);
    if (formType == "edit") {
      formData.append("_method", "put");
    }
    const resp =
      formType == "add"
        ? await AddPromotionData(formData)
        : await EditPromotionData(id, formData);
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

  useEffect(() => {
    if (id) {
      FetchRankDetail();
    }
  }, [id]);
  return (
    <>
      {loading == true ? (
        <Box sx={{ position: "absolute", top: "50%", left: "45%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Page title={formType == "add" ? "Add Promotion" : "Edit Promotion"}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Iconify
                icon={"material-symbols:arrow-back-rounded"}
                sx={{ fontSize: "22px", cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              <Typography variant="h5" fontWeight={600}>
                {formType == "add" ? "Add Promotion" : "Edit Promotion"}
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Title *"
                  name="title"
                  value={inputs?.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                  {error?.title && error?.title[0]}
                </FormHelperText>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  label="Description *"
                  name="body"
                  rows={4}
                  multiline
                  value={inputs?.body}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />

                <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                  {error?.body && error?.body[0]}
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
      )}
    </>
  );
};

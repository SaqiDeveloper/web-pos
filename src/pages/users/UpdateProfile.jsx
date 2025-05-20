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
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Iconify, Page } from "src/components";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AddMethodData } from "src/DAL/Methods/Method";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UpdateUserProfile } from "src/DAL/Users/User";
import { fDate } from "src/utils";

export const UpdateProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    image: "",
    zip_code: "",
    address: "",
    phone_no: "",
    gender: "male",
    date_of_birth: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    if (inputs?.image) {
      formData.append("profile_image", inputs?.image);
    }
    formData.append("username", inputs?.username);
    formData.append("email", inputs?.email);
    formData.append("country", inputs?.country);
    formData.append("city", inputs?.city);
    formData.append("id", id);
    formData.append("address", inputs?.address);
    formData.append("date_of_birth", fDate(inputs?.date_of_birth));
    formData.append("zip_code", inputs?.zip_code);
    formData.append("gender", inputs?.gender);
    formData.append("phone", inputs?.phone_no);

    const resp = await UpdateUserProfile(formData);
    console.log(resp, "djkfgfjdkljgkjdfkl");
    if (resp?.status == true) {
      enqueueSnackbar("Profile update successfully", { variant: "success" });
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
    setInputs({
      username: state?.username,
      email: state?.email,
      country: state?.country,
      city: state?.city,
      zip_code: state?.zip_code,
      address: state?.address,
      gender: state?.gender,
      phone_no: state?.phone,
      date_of_birth: state?.date_of_birth,
    });
    setImagePreview(state?.profile_image);
  }, [state]);
  return (
    <>
      <Page title="Update Profile">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Iconify
              icon={"material-symbols:arrow-back-rounded"}
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h5" fontWeight={600}>
              {"Update Profile"}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="UserName "
                name="username"
                value={inputs?.username}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.username && error?.username[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Email "
                name="email"
                value={inputs?.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.email && error?.email[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Username "
                name="username"
                value={inputs?.username}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.username && error?.username[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Email "
                name="email"
                value={inputs?.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.email && error?.email[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Country "
                name="country"
                value={inputs?.country}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.country && error?.country[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="City "
                name="city"
                value={inputs?.city}
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
                label="Address "
                name="address"
                value={inputs?.address}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.address && error?.address[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Zip Code "
                name="zip_code"
                value={inputs?.zip_code}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.zip_code && error?.zip_code[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Phone No *"
                name="phone_no"
                type="text"
                value={inputs?.phone_no}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.phone && error?.phone[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputs?.gender}
                  name="gender"
                  label="Gender *"
                  onChange={handleChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.gender && error?.gender[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={inputs?.date_of_birth}
                  onChange={(newValue) =>
                    setInputs((prev) => ({
                      ...prev,
                      ["date_of_birth"]: newValue,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </LocalizationProvider>
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.date_of_birth && error?.date_of_birth[0]}
              </FormHelperText>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                <div className="row w-100 div-style ms-0 pt-0">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <p className="">Upload Image * </p>
                    <FormHelperText className="pt-0">
                      Supported Format ("JPG", "JPEG", "PNG", "WEBP")
                    </FormHelperText>
                  </div>
                  {imagePreview && (
                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                      <img src={imagePreview} height="60" width={"100%"} />
                    </div>
                  )}
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-end pt-2 ">
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
                {error?.profile_image && error?.profile_image[0]}
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

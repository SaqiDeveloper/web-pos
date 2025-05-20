import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "src/components";
import Confirmation from "src/components/ConfirmModel";
import {
  DeleteBanner,
  GetBannerList,
  UpdateBannerStatus,
} from "src/DAL/Banner/Banner";

export const BannerList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");

  const FetchAllanners = async () => {
    setLoading(true);
    const resp = await GetBannerList();
    if (resp?.status == true) {
      setData(resp?.data?.data);
      setLoading(false);
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleAddBanner = () => {
    navigate("/add-banner");
  };

  const handleOpenModel = (id) => {
    setBannerId(id);
    setOpen(true);
  };

  const handleEdit = (val) => {
    navigate(`/edit-banner/${val?.id}`, { state: val });
  };

  const UpdateStatus = async (status, id) => {
    const data = {
      status: status,
      _method: "put",
    };
    const resp = await UpdateBannerStatus(id, data);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      FetchAllanners();
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleStatusActive = (val) => {
    UpdateStatus(1, val?.id);
  };
  const handleStatusInActive = (val) => {
    UpdateStatus(0, val?.id);
  };

  const handleDelete = async () => {
    setOpen(false);
    const resp = await DeleteBanner(bannerId);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      FetchAllanners();
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    FetchAllanners();
  }, []);
  return (
    <>
      {loading == true ? (
        <>
          <Box sx={{ position: "absolute", top: "45%", left: "50%" }}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <Confirmation open={open} setOpen={setOpen} onSubmit={handleDelete} />
          <Page title="Banner">
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Banner List
                </Typography>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleAddBanner}
                >
                  Add Banner
                </Button>
              </Box>
              {data?.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "50vh",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Data Not Found
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ marginTop: "20px" }}>
                  <Grid container spacing={2}>
                    {data?.map((val, index) => {
                      return (
                        <>
                          <Grid item lg={3} md={4} sm={6} xs={12}>
                            <Card
                              sx={{ width: "100%" }}
                              className="card"
                              key={index}
                            >
                              <CardMedia
                                component="img"
                                image={val?.image}
                                sx={{ height: 180 }}
                                alt=""
                              />

                              <CardContent
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Chip
                                  label={
                                    val?.is_internal == 1 ? "True" : "False"
                                  }
                                  color={
                                    val?.is_internal == 0 ? "error" : "success"
                                  }
                                  sx={{
                                    height: "20px",
                                    cursor: "pointer",
                                    color: "white",
                                  }}
                                  variant={"contained"}
                                />
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Chip
                                    label={"In Active"}
                                    color={"error"}
                                    sx={{ height: "20px", cursor: "pointer" }}
                                    variant={
                                      val?.status == 0
                                        ? "contained"
                                        : "outlined"
                                    }
                                    onClick={() => handleStatusInActive(val)}
                                  />
                                  <Chip
                                    label={"Active"}
                                    color={"success"}
                                    sx={{ height: "20px", cursor: "pointer" }}
                                    variant={
                                      val?.status == 1
                                        ? "contained"
                                        : "outlined"
                                    }
                                    onClick={() => handleStatusActive(val)}
                                  />
                                </div>
                              </CardContent>
                              <CardActions
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    boxShadow: "none",
                                    backgroundColor: "#42a5f5",
                                    color: "white",
                                    "&:hover": {
                                      backgroundColor: "#42a5f5", // keep it red on hover too
                                    },
                                  }}
                                  onClick={() => handleEdit(val)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    backgroundColor: "#d32f2f",
                                    boxShadow: "none",
                                    color: "white",
                                    "&:hover": {
                                      backgroundColor: "#d32f2f", // keep it red on hover too
                                    },
                                  }}
                                  onClick={() => handleOpenModel(val?.id)}
                                >
                                  Delete
                                </Button>
                              </CardActions>
                            </Card>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Container>
          </Page>
        </>
      )}
    </>
  );
};

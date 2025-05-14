import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Iconify, Page } from "src/components";
import { CreateRank, GetRankById, UpdateRankData } from "src/DAL/Rank/Rank";

export const AddRank = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [formType, setFormType] = useState("add");
  const [inputs, setInputs] = useState({
    name: "",
    investment_required: "",
    level_1: "",
    level_2: "",
    level_3: "",
    level_4: "",
    level_5: "",
    daily_profit: "",
    open_level: "",
    reward: "",
  });

  const FetchRankDetail = useCallback(async () => {
    const resp = await GetRankById(id);
    if (resp?.status == true) {
      setInputs(resp?.data);
      setFormType("edit");
    } else {
      setFormType("edit");
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const data = {
      name: inputs?.name,
      investment_required: inputs?.investment_required,
      level_1: inputs?.level_1,
      level_2: inputs?.level_2,
      level_3: inputs?.level_3,
      level_4: inputs?.level_4,
      level_5: inputs?.level_5,
      daily_profit: inputs?.daily_profit,
      open_level: inputs?.open_level,
      reward: inputs?.reward,
    };
    const UpdateddData = {
      name: inputs?.name,
      investment_required: inputs?.investment_required,
      level_1: inputs?.level_1,
      level_2: inputs?.level_2,
      level_3: inputs?.level_3,
      level_4: inputs?.level_4,
      level_5: inputs?.level_5,
      daily_profit: inputs?.daily_profit,
      open_level: inputs?.open_level,
      reward: inputs?.reward,
      _method: "put",
    };

    const resp =
      formType == "add"
        ? await CreateRank(data)
        : await UpdateRankData(id, UpdateddData);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      navigate(-1);
    } else if (typeof resp?.message == "string") {
      enqueueSnackbar(resp?.message, { variant: "error" });
    } else {
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
      <Page title="Add Rank">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Iconify
              icon={"material-symbols:arrow-back-rounded"}
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h5" fontWeight={600}>
              {formType == "add" ? "Add Rank" : "Edit Rank"}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Name *"
                name="name"
                value={inputs?.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.name && error?.name[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Investment *"
                name="investment_required"
                value={inputs?.investment_required}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.investment_required && error?.investment_required[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Level 1 *"
                name="level_1"
                value={inputs?.level_1}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.level_1 && error?.level_1[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Level 2 *"
                name="level_2"
                value={inputs?.level_2}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.level_2 && error?.level_2[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Level 3 *"
                name="level_3"
                value={inputs?.level_3}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.level_3 && error?.level_3[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Level 4 *"
                name="level_4"
                value={inputs?.level_4}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.level_4 && error?.level_4[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Level 5 *"
                name="level_5"
                value={inputs?.level_5}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.level_5 && error?.level_5[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Daily Profit *"
                name="daily_profit"
                value={inputs?.daily_profit}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.daily_profit && error?.daily_profit[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Open Level *"
                name="open_level"
                value={inputs?.open_level}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.open_level && error?.open_level[0]}
              </FormHelperText>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Reward *"
                name="reward"
                value={inputs?.reward}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {error?.reward && error?.reward[0]}
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
                sx={{ textTransform: "none" }}
                onClick={handleSubmit}
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

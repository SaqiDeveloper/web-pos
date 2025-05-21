import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Iconify, Page } from "src/components";
import { FetchUserDetail } from "src/DAL/Users/User";

export const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const FetchUserDetailData = async () => {
    setLoading(true);
    const resp = await FetchUserDetail(id);
    if (resp?.status == true) {
      setData(resp?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDetailData();
  }, []);
  return (
    <>
      <Page title="User detail">
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Iconify
              icon={"material-symbols:arrow-back-rounded"}
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h5" fontWeight={600}>
              User Detail
            </Typography>
          </Box>
          {loading == true ? (
            <Box>
              <CircularProgress
                sx={{ position: "absolute", top: "40%", left: "50%" }}
              />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Typography>
                  <span style={{ fontWeight: 600 }}>Rank:</span> {data?.rank}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Deposit:</span>{" "}
                  {data?.total_deposit}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.total_commission}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Profit:</span>{" "}
                  {data?.total_profit}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Withdraw:</span>{" "}
                  {data?.total_withdraw}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 1
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_1?.total_commission_level_1}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_1?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 2
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_2?.total_commission_level_2}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_2?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 3
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_3?.total_commission_level_3}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_3?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 4
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_4?.total_commission_level_4}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_4?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 5
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_5?.total_commission_level_5}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_5?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 6
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_6?.total_commission_level_6}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_6?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 7
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_7?.total_commission_level_7}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_7?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Level 8
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 600 }}>Total Commission:</span>{" "}
                  {data?.level_8?.total_commission_level_8}
                </Typography>
                <hr />
                <Grid container spacing={2}>
                  {data?.level_8?.user?.map((val) => {
                    return (
                      <>
                        <Grid item lg={4}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Avatar
                              src={val?.profile_image}
                              alt={val?.username}
                              sx={{ height: "55px", width: "55px" }}
                            />
                            <div>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Username:
                                </span>{" "}
                                {val?.username}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>Rank:</span>{" "}
                                {val?.rank}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Profit Logs:
                                </span>{" "}
                                {val?.profit_logs}
                              </Typography>
                              <Typography>
                                <span style={{ fontWeight: 600 }}>
                                  Referral Commission:
                                </span>{" "}
                                {val?.referral_commission}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
            </>
          )}
        </Container>
      </Page>
    </>
  );
};

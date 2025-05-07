// @mui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  CardContent,
  Box,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
// components
import SummaryCard from "./components/SummaryCard";
import { Page } from "src/components";
//hooks
import { useAppContext } from "src/hooks";
import { useEffect, useState } from "react";
import { GetDashboardData } from "src/DAL/Dashboard/Dashboard";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const FetchDashboardStats = async () => {
    const resp = await GetDashboardData();
    if (resp?.status == true) {
      setData(resp?.data);
      setLoading(false);
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchDashboardStats();
  }, []);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome Back
        </Typography>

        {loading == true ? (
          <>
            <Box>
              <CircularProgress
                sx={{ display: "flex", marginTop: "20%", marginLeft: "50%" }}
              />
            </Box>
          </>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  title={"Total Users"}
                  count={data?.total_user}
                  icon={"fa6-solid:users"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/users")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  title={"Total Withdraw"}
                  count={data?.total_withdraw}
                  icon={"fluent-mdl2:product-variant"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/approve")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  title={"Total Deposit"}
                  count={data?.total_deposit}
                  icon={"dashicons:admin-users"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/approved-list")}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}

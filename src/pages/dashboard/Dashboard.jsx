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

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();
  const { _get_user_profile } = useAppContext();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
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
                  color={"success"}
                  title={"Users"}
                  count={10}
                  icon={"fa6-solid:users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"primary"}
                  title={"Products"}
                  count={20}
                  icon={"fluent-mdl2:product-variant"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"info"}
                  title={"Admin Order"}
                  count={20}
                  icon={"dashicons:admin-users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"warning"}
                  title={"Seller Order"}
                  count={20}
                  icon={"heroicons:currency-dollar-solid"}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}

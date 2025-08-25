// @mui
import {Box, CircularProgress, Container, Grid, Typography,} from "@mui/material";
// components
import SummaryCard from "./components/SummaryCard";
import {Page} from "src/components";
//hooks
import {useEffect, useState} from "react";
import {GetDashboardData} from "src/DAL/Dashboard/Dashboard";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

// ----------------------------------------------------------------------

export default function Dashboard() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const FetchDashboardStats = async () => {
        const resp = await GetDashboardData();

        try{
            setData(resp?.data);
            setLoading(false);
        }catch(err){
            enqueueSnackbar(err?.message, {variant: "error"});
            setLoading(false);
        }

    };

    useEffect(() => {
        FetchDashboardStats();
    }, []);

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, Welcome Back
                </Typography>

                {loading ? (
                    <>
                        <Box>
                            <CircularProgress
                                sx={{display: "flex", marginTop: "20%", marginLeft: "50%"}}
                            />
                        </Box>
                    </>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {(data ?? []).map(business => (
                                <Grid item xs={12} sm={6} md={3}>
                                    <SummaryCard
                                        title={business.businessName}
                                        count={business.users.length}
                                        icon={"fa6-solid:users"}
                                        sx={{cursor: "pointer"}}
                                        onClick={() => navigate(`/business/${business.id}`)}
                                    />
                                </Grid>
                            ))}
                        </Grid>


                        {/*  <Grid item xs={12} sm={6} md={3}>*/}
                        {/*    <SummaryCard*/}
                        {/*      title={"Total Withdraw"}*/}
                        {/*      count={data?.total_withdraw}*/}
                        {/*      icon={"ph:hand-deposit-fill"}*/}
                        {/*      sx={{ cursor: "pointer" }}*/}
                        {/*      onClick={() => navigate("/approve")}*/}
                        {/*    />*/}
                        {/*  </Grid>*/}
                        {/*  <Grid item xs={12} sm={6} md={3}>*/}
                        {/*    <SummaryCard*/}
                        {/*      title={"Total Deposits"}*/}
                        {/*      count={data?.total_deposit}*/}
                        {/*      icon={"hugeicons:reverse-withdrawal-01"}*/}
                        {/*      sx={{ cursor: "pointer" }}*/}
                        {/*      onClick={() => navigate("/approved-list")}*/}
                        {/*    />*/}
                        {/*  </Grid>*/}
                    </>
                )}
            </Container>
        </Page>
    );
}

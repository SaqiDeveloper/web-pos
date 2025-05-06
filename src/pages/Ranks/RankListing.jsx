import { useEffect, useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// components
import {
  Page,
  Label,
  Scrollbar,
  Iconify,
  SearchNotFound,
} from "src/components";
//
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import UserListToolbar from "src/components/UserListToolbar";
import UserListHead from "src/components/UserListHead";
import UserMoreMenu from "src/components/UserMoreMenu";
import { useSnackbar } from "notistack";
import { GetAllDeposits, UpdateDepositStatus } from "src/DAL/Deposit/Deposit";
import { WithDrawList } from "src/DAL/Withdraw/Withdraw";
import { DeleteRank, GetRankListing } from "src/DAL/Rank/Rank";
import Confirmation from "src/components/ConfirmModel";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "name",
    label: "Name",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "reward", label: "Reward", alignRight: false },
  { id: "daily_profit", label: "Daily Profit", alignRight: false },
  { id: "open_level", label: "Open Level", alignRight: false },
  { id: "investment_required", label: "Investment", alignRight: false },
  { id: "level_1", label: "Level 1", alignRight: false },
  { id: "level_2", label: "Level 2", alignRight: false },
  { id: "level_3", label: "Level 3", alignRight: false },
  { id: "level_4", label: "Level 4", alignRight: false },
  { id: "level_5", label: "Level 5", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function RankListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rankId, setRankId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState("");
  const [open, setOpen] = useState(false);

  const GetRanksListing = async () => {
    const resp = await GetRankListing(page, rowsPerPage, filterName);
    console.log(resp, "fkdgjklfjlkd");
    if (resp.status == true) {
      setRankList(resp?.data?.data);
      setRowsPerPage(resp?.data?.per_page);
      setTotal(resp?.data?.total);
      setCurrentPage(resp.data?.current_page);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleNavigateAdd = () => {
    navigate("/add-rank");
  };

  const handleDelete = (val) => {
    setRankId(val?.id);
    setOpen(true);
  };

  const handleEdit = (val) => {
    navigate(`/edit-rank/${val?.id}`);
  };

  const DeleteData = async () => {
    setOpen(false);
    const resp = await DeleteRank(rankId);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      GetRanksListing();
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const MENU_OPTIONS = [
    {
      icon: "material-symbols-light:delete-rounded",
      title: "Delete",
      handleClick: handleDelete,
    },
    {
      icon: "material-symbols-light:delete-rounded",
      title: "Edit",
      handleClick: handleEdit,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleSearch = () => {
    GetRanksListing();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rankList?.length) : 0;

  const isUserNotFound = rankList?.length === 0;

  useEffect(() => {
    GetRanksListing();
  }, [page, rowsPerPage]);
  return (
    <Page title="Ranks">
      <Confirmation open={open} setOpen={setOpen} onSubmit={DeleteData} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Ranks
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleNavigateAdd}
          >
            Add Rank
          </Button>
        </Stack>

        {loading == true ? (
          <>
            <Box>
              <CircularProgress
                sx={{ display: "flex", marginTop: "20%", marginLeft: "50%" }}
              />
            </Box>
          </>
        ) : (
          <Card
            sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", mb: 1 }}
          >
            <UserListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
              onSubmit={handleSearch}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {rankList?.map((row) => {
                      const {
                        id,
                        name,
                        reward,
                        open_level,
                        daily_profit,
                        investment_required,
                        level_1,
                        level_2,
                        level_3,
                        level_4,
                        level_5,
                        created_at,
                      } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{name}</TableCell>

                          <TableCell align="left">{reward}</TableCell>

                          <TableCell align="left">{daily_profit}</TableCell>

                          <TableCell align="left">{open_level}</TableCell>
                          <TableCell align="left">
                            {investment_required}
                          </TableCell>
                          <TableCell align="left">{level_1}</TableCell>
                          <TableCell align="left">{level_2}</TableCell>
                          <TableCell align="left">{level_3}</TableCell>
                          <TableCell align="left">{level_4}</TableCell>
                          <TableCell align="left">{level_5}</TableCell>
                          <TableCell align="left">
                            {moment(created_at).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell align="left">
                            <UserMoreMenu options={MENU_OPTIONS} data={row} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

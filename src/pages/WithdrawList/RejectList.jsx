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
import ImageModel from "src/components/ShowImageModel";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "user",
    label: "User Name",
    alignRight: false,
    ClassName: "text-center",
  },
  {
    id: "image",
    label: "User Image",
    alignRight: false,
    ClassName: "text-center",
  },
  {
    id: "amount",
    label: "Amount",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "proof", label: "Proof", alignRight: false },
  { id: "charge", label: "Charge", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function RejectedWithdraw() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [withdrawList, setWithDrawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);

  const GetRejectedWithdraw = async () => {
    const resp = await WithDrawList("2", page, rowsPerPage, filterName);
    if (resp.status == true) {
      setWithDrawList(resp?.data?.data);
      setCurrentPage(resp?.data?.current_page);
      setTotal(resp?.data?.total);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleShowImage = (val) => {
    setImage(val);
    setOpen(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleSearch = () => {
    GetRejectedWithdraw();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - withdrawList?.length) : 0;

  const isUserNotFound = withdrawList?.length === 0;

  useEffect(() => {
    GetRejectedWithdraw();
  }, [page, rowsPerPage]);
  return (
    <Page title="Rejected Withdraw">
      <ImageModel open={open} setOpen={setOpen} data={image} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Rejected Withdraw List
          </Typography>
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
            {withdrawList?.length > 0 && (
              <UserListToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
                onSubmit={handleSearch}
              />
            )}

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {withdrawList?.map((row) => {
                      const {
                        id,
                        amount,
                        proof,
                        charge,
                        created_at,
                        payable_amount,
                        comment,
                        user,
                        status,
                      } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{user?.username}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={user?.profile_image}
                              alt={""}
                              sx={{
                                height: "3rem",
                                width: "3rem",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleShowImage(user?.profile_image)
                              }
                            />
                          </TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={proof}
                              alt={""}
                              sx={{ height: "3rem", width: "3rem" }}
                              onClick={() => handleShowImage(proof)}
                            />
                          </TableCell>

                          <TableCell align="left">{charge}</TableCell>
                          <TableCell align="left">
                            <Chip
                              label={status == 2 && "Rejected"}
                              color={status == 2 && "error"}
                              sx={{ height: "20px" }}
                            />
                          </TableCell>

                          <TableCell align="left">{comment}</TableCell>
                          <TableCell align="left">
                            {moment(created_at).format("YYYY-MM-DD")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
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

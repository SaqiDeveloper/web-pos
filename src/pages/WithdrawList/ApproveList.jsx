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
    id: "index",
    label: "Sr. No.",
    alignRight: false,
    ClassName: "text-center",
  },
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
    id: "method",
    label: "Method Name",
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
  { id: "proof", label: "QR Code", alignRight: false },
  { id: "charge", label: "Charges", alignRight: false },
  { id: "account_address", label: "Account Address", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function ApproveWithdraw() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [withdrawList, setWithDrawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [image, setImage] = useState("");
  const [openModel, setOpenModel] = useState(false);

  const GetApproveWithdraw = async () => {
    const resp = await WithDrawList("1", page, rowsPerPage, filterName);
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
    setOpenModel(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSearch = () => {
    GetApproveWithdraw();
  };

  const isUserNotFound = withdrawList?.length === 0;

  useEffect(() => {
    GetApproveWithdraw();
  }, [page, rowsPerPage]);
  return (
    <Page title="Approved Withdraw">
      <ImageModel open={openModel} setOpen={setOpenModel} data={image} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Approved Withdraw List
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
                    {withdrawList?.map((row, index) => {
                      const {
                        id,
                        amount,
                        user,
                        method,
                        proof,
                        charges,
                        created_at,
                        status,
                        account_address,
                        qr_code,
                      } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell align="left">{index + 1}</TableCell>
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
                          <TableCell align="left">
                            {method?.method_name}
                          </TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={proof}
                              alt={""}
                              sx={{
                                height: "3rem",
                                width: "3rem",
                                cursor: "pointer",
                              }}
                              onClick={() => handleShowImage(proof)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={qr_code}
                              alt={""}
                              sx={{
                                height: "3rem",
                                width: "3rem",
                                cursor: "pointer",
                              }}
                              onClick={() => handleShowImage(qr_code)}
                            />
                          </TableCell>

                          <TableCell align="left">{charges}</TableCell>
                          <TableCell align="left">{account_address}</TableCell>
                          <TableCell align="left">
                            <Chip
                              label={status == 1 && "Approved"}
                              color={status == 1 && "success"}
                              sx={{ height: "20px" }}
                            />
                          </TableCell>

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
                        <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
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

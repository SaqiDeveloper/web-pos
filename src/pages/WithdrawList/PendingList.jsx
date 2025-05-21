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
import { UpdateStatusWithdraw, WithDrawList } from "src/DAL/Withdraw/Withdraw";
import ReasonModel from "src/components/ReasonModel";
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
    id: "username",
    label: "User Name",
    alignRight: false,
    ClassName: "text-center",
  },
  {
    id: "username",
    label: "User Image",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "proof", label: "QR Code", alignRight: false },
  { id: "amount", label: "Amount", alignRight: false },
  { id: "charge", label: "Charges", alignRight: false },
  { id: "method", label: "Method Name", alignRight: false },
  { id: "address", label: "Account Address", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function PendingWithdraw() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [withdrawList, setWithDrawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawId, setWithdrawId] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [proof, setProof] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [openModel, setOpenModel] = useState(false);

  const GetPendingWithdraw = async () => {
    const resp = await WithDrawList("0", page, rowsPerPage, filterName);
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

  const handleStatusChange = (e, id, status) => {
    if (e.target.value == status) {
      return;
    } else {
      setOpen(true);
      setWithdrawId(id);
      setStatus(e.target.value);
    }
  };

  const handleUpdateStatus = async () => {
    if (status == 1 && !proof) {
      return enqueueSnackbar("Image is required", { variant: "error" });
    }
    setOpen(false);
    const formData = new FormData();
    formData.append("id", withdrawId);
    formData.append("status", status);
    formData.append("_method", "put");
    if (status == 2) {
      formData.append("reason", comment);
    }
    if (status == 1) {
      formData.append("proof", proof);
    }
    const resp = await UpdateStatusWithdraw(formData);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      GetPendingWithdraw();
    } else {
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
    GetPendingWithdraw();
  };

  const isUserNotFound = withdrawList?.length === 0;

  useEffect(() => {
    GetPendingWithdraw();
  }, [page, rowsPerPage]);
  return (
    <Page title="Pending Withdraw">
      <ImageModel open={openModel} setOpen={setOpenModel} data={image} />
      <ReasonModel
        open={open}
        setOpen={setOpen}
        onSubmit={handleUpdateStatus}
        setReason={setComment}
        status={status}
        setProof={setProof}
      />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Pending Withdraw List
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
                        user,
                        amount,
                        qr_code,
                        charges,
                        account_address,
                        method,
                        status,
                        created_at,
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
                              sx={{ height: "3rem", width: "3rem" }}
                              onClick={() =>
                                handleShowImage(user?.profile_image)
                              }
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

                          <TableCell align="left">{amount}</TableCell>

                          <TableCell align="left">{charges}</TableCell>

                          <TableCell align="left">
                            {method?.method_name}
                          </TableCell>
                          <TableCell align="left">{account_address}</TableCell>
                          <TableCell align="left">
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label">
                                Status
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={(e) =>
                                  handleStatusChange(e, id, status)
                                }
                              >
                                <MenuItem value={0}>Pending</MenuItem>
                                <MenuItem value={1}>Approved</MenuItem>
                                <MenuItem value={2}>Rejected</MenuItem>
                              </Select>
                            </FormControl>
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

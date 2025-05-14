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
import { AllUsers, UpdateUserStatus } from "src/DAL/Users/User";
import moment from "moment/moment";
import { ClassNames } from "@emotion/react";
import UserListToolbar from "src/components/UserListToolbar";
import UserListHead from "src/components/UserListHead";
import UserMoreMenu from "src/components/UserMoreMenu";
import { useSnackbar } from "notistack";
import ImageModel from "src/components/ShowImageModel";
import ChangePasswordModel from "src/components/ChangePasswordModel";
import AddBalanceModel from "src/components/AddBalanceModel";
import ReasonModel from "src/components/ReasonModel";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "username",
    label: "User Name",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "image", label: "Image", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "is_mining", label: "Mining", alignRight: false },
  { id: "balance", label: "Balance", alignRight: false },
  { id: "rank", label: "Rank", alignRight: false },
  { id: "bonus", label: "Bonus", alignRight: false },
  { id: "referral_id", label: "Referral ID", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "reason", label: "Reason", alignRight: false },
  { id: "date_of_birth", label: "Date of Birth", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function Users() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [USERLIST, setUSERLIST] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openBalanceModel, setOpenBalanceModel] = useState(false);
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");
  console.log(reason, "kdfjgklfjdklgjkfl");
  const [reasonModel, setReasonModel] = useState(false);
  const [type, setType] = useState("Add");

  const getAllUsers = async () => {
    const resp = await AllUsers(page, rowsPerPage, filterName);
    if (resp.status == true) {
      setUSERLIST(resp?.data?.data);
      setTotal(resp?.data?.total);
      setCurrentPage(resp?.data?.current_page);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const UpdateStatus = async (val, id) => {
    const formData = new FormData();
    formData.append("status", val);
    formData.append("_method", "put");
    formData.append("reason", reason);
    const resp = await UpdateUserStatus(val == 1 ? id : userId, formData);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      getAllUsers();
    } else {
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleStatusChange = async (e, id) => {
    if (e.target.value == 0) {
      setReasonModel(true);
      setUserId(id);
      return;
    } else {
      UpdateStatus(e.target.value, id);
    }
  };

  const handleInActiveStatus = () => {
    setReasonModel(false);
    UpdateStatus(0);
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
    getAllUsers();
  };

  const handleViewReferral = (data) => {
    navigate(`/user-detail/${data?.id}`);
  };

  const handleChangePassword = (val) => {
    setUserId(val?.id);
    setOpenModel(true);
  };
  const handleAddBalance = (val) => {
    setUserId(val);
    setOpenBalanceModel(true);
  };
  const handleRemoveBalance = (val) => {
    setUserId(val);
    setType("Remove");
    setOpenBalanceModel(true);
  };

  const handleUpdateProfile = (val) => {
    navigate(`/update-profile/${val?.id}`, { state: val });
  };

  const MENU_OPTIONS = [
    {
      icon: "ix:contact-details-filled",
      title: "More Detail",
      handleClick: handleViewReferral,
    },
    {
      icon: "mdi:password-check",
      title: "Change Password",
      handleClick: handleChangePassword,
    },
    {
      icon: "iconamoon:profile-circle-fill",
      title: "Update Profile",
      handleClick: handleUpdateProfile,
    },
    {
      icon: "subway:add",
      title: "Add Balance",
      handleClick: handleAddBalance,
    },
    {
      icon: "el:remove-sign",
      title: "Remove Balance",
      handleClick: handleRemoveBalance,
    },
  ];

  const isUserNotFound = USERLIST?.length === 0;

  useEffect(() => {
    getAllUsers();
  }, [page, rowsPerPage, openBalanceModel]);
  return (
    <Page title="User">
      <ReasonModel
        open={reasonModel}
        setOpen={setReasonModel}
        onSubmit={handleInActiveStatus}
        setReason={setReason}
        status={0}
      />
      <AddBalanceModel
        open={openBalanceModel}
        setOpen={setOpenBalanceModel}
        userId={userId}
        type={type}
        setType={setType}
      />
      <ChangePasswordModel
        open={openModel}
        setOpen={setOpenModel}
        userId={userId}
      />
      <ImageModel open={open} setOpen={setOpen} data={image} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Users
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
                    {USERLIST?.map((row) => {
                      const {
                        id,
                        username,
                        email,
                        phone,
                        created_at,
                        profile_image,
                        address,
                        balance,
                        bonus,
                        country,
                        date_of_birth,
                        is_mining,
                        referred_by,
                        city,
                        status,
                        reason,
                        rank_name,
                      } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={profile_image}
                              alt={username}
                              sx={{
                                height: "3rem",
                                width: "3rem",
                                cursor: "pointer",
                              }}
                              onClick={() => handleShowImage(profile_image)}
                            />
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            <Chip
                              label={is_mining == 0 ? "In Active" : "Active"}
                              color={is_mining == 0 ? "error" : "success"}
                              sx={{ height: "20px" }}
                            />
                          </TableCell>
                          <TableCell align="left">{balance}</TableCell>
                          <TableCell align="left">{rank_name}</TableCell>
                          <TableCell align="left">
                            {" "}
                            <Chip
                              label={bonus == 0 ? "False" : "True"}
                              color={bonus == 0 ? "error" : "success"}
                              sx={{ height: "20px" }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            {referred_by?.username}
                          </TableCell>
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
                                onChange={(e) => handleStatusChange(e, id)}
                              >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>InActive</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="left">{reason}</TableCell>
                          <TableCell align="left">{date_of_birth}</TableCell>
                          <TableCell align="left">
                            {country == null || country == "null"
                              ? "-"
                              : country}
                          </TableCell>
                          <TableCell align="left">{city}</TableCell>
                          <TableCell align="left">{address}</TableCell>

                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            {created_at == null
                              ? "-"
                              : moment(created_at).format("YYYY-MM-DD")}
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
                        <TableCell
                          align="center"
                          colSpan={TABLE_HEAD?.length}
                          sx={{ py: 3 }}
                        >
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

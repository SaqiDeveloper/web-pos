import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { AllUsers } from "src/DAL/Users/User";
import moment from "moment/moment";
import { ClassNames } from "@emotion/react";
import UserListToolbar from "src/components/UserListToolbar";
import UserListHead from "src/components/UserListHead";
import UserMoreMenu from "src/components/UserMoreMenu";
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
  { id: "bonus", label: "Bonus", alignRight: false },
  { id: "referral_id", label: "Referral ID", alignRight: false },
  { id: "date_of_birth", label: "Date of Birth", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "created_at", label: "Created At" },
];

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [USERLIST, setUSERLIST] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const getAllUsers = async () => {
    setLoading(true);
    const resp = await AllUsers(page, rowsPerPage, filterName);
    if (resp.status == true) {
      setUSERLIST(resp?.data?.data);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSearch = () => {
    getAllUsers();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST?.length) : 0;

  const isUserNotFound = USERLIST?.length === 0;

  useEffect(() => {
    getAllUsers();
  }, [page, rowsPerPage]);
  return (
    <Page title="User">
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
                    {USERLIST?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )?.map((row) => {
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
                        referral_id,
                      } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              src={profile_image}
                              alt={username}
                              sx={{ height: "3rem", width: "3rem" }}
                            />
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            <Chip
                              label={is_mining == 0 ? "In Active" : "Active"}
                              color={is_mining == 0 ? "error" : "success"}
                              sx={{ height: "23px" }}
                            />
                          </TableCell>
                          <TableCell align="left">{balance}</TableCell>
                          <TableCell align="left">
                            {" "}
                            <Chip
                              label={bonus == 0 ? "In Active" : "Active"}
                              color={bonus == 0 ? "error" : "success"}
                              sx={{ height: "23px" }}
                            />
                          </TableCell>
                          <TableCell align="left">{referral_id}</TableCell>
                          <TableCell align="left">{date_of_birth}</TableCell>
                          <TableCell align="left">
                            {country == null || country == "null"
                              ? "-"
                              : country}
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            {moment(created_at).format("YYYY-MM-DD")}
                          </TableCell>

                          {/* <TableCell align="left">
                            <UserMoreMenu />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
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
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

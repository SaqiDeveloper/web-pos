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
import { DeletePromotion, GetPromotions } from "src/DAL/Promotion/Promotion";
import ImageModel from "src/components/ShowImageModel";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "title",
    label: "Title",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "image", label: "Image", alignRight: false },
  { id: "body", label: "Description", alignRight: false },

  { id: "created_at", label: "Created At" },
];

export default function PromotionListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState("");
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotionId, setPromotionId] = useState("");
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [image, setImage] = useState("");

  const GetPromotionListing = async () => {
    const resp = await GetPromotions(page, rowsPerPage, filterName);
    if (resp.status == true) {
      setRankList(resp?.data?.data);
      setTotal(resp?.data?.total);
      setCurrentPage(resp?.data?.current_page);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleNavigateAdd = () => {
    navigate("/add-promotion");
  };

  const handleDelete = (val) => {
    setPromotionId(val?.id);
    setOpen(true);
  };

  const handleEdit = (val) => {
    navigate(`/edit-promotion/${val?.id}`);
  };

  const DeleteData = async () => {
    setOpen(false);
    const resp = await DeletePromotion(promotionId);
    if (resp?.status == true) {
      enqueueSnackbar(resp?.message, { variant: "success" });
      GetPromotionListing();
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
      icon: "bxs:edit",
      title: "Edit",
      handleClick: handleEdit,
    },
  ];

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

  const handleSearch = () => {
    GetPromotionListing();
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isUserNotFound = rankList?.length === 0;

  useEffect(() => {
    GetPromotionListing();
  }, [page, rowsPerPage]);
  return (
    <Page title="Promotion">
      <ImageModel open={openModel} setOpen={setOpenModel} data={image} />
      <Confirmation open={open} setOpen={setOpen} onSubmit={DeleteData} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Promotions
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleNavigateAdd}
          >
            Add Promotion
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
                        title,
                        image,
                        body,

                        created_at,
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          sx={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{title}</TableCell>

                          <TableCell align="left">
                            <Avatar
                              src={image}
                              alt={title}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleShowImage(image)}
                            />
                          </TableCell>

                          <TableCell align="left">{body}</TableCell>

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

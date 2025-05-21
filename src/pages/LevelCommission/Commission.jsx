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
import UserListHead from "src/components/UserListHead";
import UserMoreMenu from "src/components/UserMoreMenu";
import { useSnackbar } from "notistack";

import { AllLevelsCommission } from "src/DAL/Commission/Commission";
import AddCommissionModel from "src/components/AddCommission";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "level",
    label: "Level",
    alignRight: false,
    ClassName: "text-center",
  },
  {
    id: "commission_percentage",
    label: "Commission Percentage",
    alignRight: false,
  },
  {
    id: "action",
    alignRight: false,
  },
];

export default function CommissionLevel() {
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
  const [image, setImage] = useState("");

  const GetLevelsCommission = async () => {
    const resp = await AllLevelsCommission(page, rowsPerPage);
    if (resp.status == true) {
      setRankList(resp?.data?.data);
      setCurrentPage(resp?.data?.current_page);
      setTotal(resp?.data?.total);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(resp?.message, { variant: "error" });
    }
  };

  const handleAddCommission = (val) => {
    setPromotionId(val);
    setOpen(true);
  };

  const MENU_OPTIONS = [
    {
      icon: "bxs:edit",
      title: "Update Commission",
      handleClick: handleAddCommission,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const isUserNotFound = rankList?.length === 0;

  useEffect(() => {
    GetLevelsCommission();
  }, [page, rowsPerPage, open]);
  return (
    <Page title="Commission">
      <AddCommissionModel open={open} setOpen={setOpen} data={promotionId} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h5" fontWeight={600}>
            Levels Commission
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
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {rankList?.map((row) => {
                      const { id, level, commission_percentage } = row;

                      return (
                        <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{level}</TableCell>

                          <TableCell align="left">
                            {commission_percentage}
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

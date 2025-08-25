import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Page, Scrollbar, SearchNotFound} from "../../components";
import {
    Box,
    Card,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import UserListToolbar from "../../components/UserListToolbar";
import UserListHead from "../../components/UserListHead";
import moment from "moment";
import UserMoreMenu from "../../components/UserMoreMenu";
import {AllBusinesses, UpdateBusiness} from "../../DAL/Business/Business";
import ActionModel from "../../components/ActionModel";

const TABLE_HEAD = [
    {
        id: "index",
        label: "Sr. No.",
        alignRight: false,
        ClassName: "text-center",
    },

    {
        id: "businesses",
        label: "Business Name",
        alignRight: false,
        ClassName: "text-center",
    },
    { id: "email", label: "Email", alignRight: false },
    { id: "status", label: "Status", alignRight: false },
    { id: "users", label: "No. of Users", alignRight: false },
    { id: "created_at", label: "Created At" },
];

export const Businesses = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openActionModel, setOpenActionModel] = useState(false);
    const [business, setBusiness] = useState("");

    const getAllBusinesses = async () => {
        const resp = await AllBusinesses(page, rowsPerPage, filterName);
        if (resp.statusCode=== 200) {
            setBusinessList(resp?.data);
            setTotal(resp?.pagination?.totalPages);
            setCurrentPage(resp?.pagination?.page);
            setLoading(false);
        } else {
            setLoading(false);
            enqueueSnackbar(resp?.message, { variant: "error" });
        }
    };

    const updateBusiness = async (val) => {
        const resp = await UpdateBusiness({...business, status:val === 0 ? 'inActive' : 'active'});
        if (resp?.statusCode === 200) {
            enqueueSnackbar(resp?.message, { variant: "success" });
            getAllBusinesses();
        } else {
            enqueueSnackbar(resp?.message, { variant: "error" });
        }
    };

    const handleStatusChange = async (e, business) => {
            updateBusiness(e.target.value, business);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const handleSearch = () => {
        getAllBusinesses();
    };

    const handleRemoveBusiness = (val) => {
        setBusiness(val);
        setOpenActionModel(true);
    };

    const MENU_OPTIONS = [
        {
            icon: "el:remove-sign",
            title: "Delete Business",
            handleClick: handleRemoveBusiness,
        },
    ];

    const isBusinessNotFound = businessList?.length === 0;

    useEffect(() => {
        getAllBusinesses();
    }, [page, rowsPerPage, openActionModel]);

    return (
        <Page title="User">

            <ActionModel
                open={openActionModel}
                setOpen={setOpenActionModel}
                business={business}
            />
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={4.5}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Businesses
                    </Typography>
                </Stack>

                {loading ? (
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
                                        {businessList?.map((row, index) => {
                                            const {
                                                id,
                                                businessName,
                                                email,
                                                created_at,
                                                users,
                                                status,
                                            } = row;

                                            return (
                                                <TableRow hover key={id} sx={{ whiteSpace: "nowrap" }}>
                                                    <TableCell padding="checkbox"></TableCell>

                                                    <TableCell align="left">{index + 1}</TableCell>
                                                    <TableCell align="left">{businessName}</TableCell>
                                                    <TableCell align="left">{email}</TableCell>
                                                    {/*<TableCell align="left">*/}
                                                    {/*    <Chip*/}
                                                    {/*        label={is_mining == 0 ? "In Active" : "Active"}*/}
                                                    {/*        color={is_mining == 0 ? "error" : "success"}*/}
                                                    {/*        sx={{ height: "20px" }}*/}
                                                    {/*    />*/}
                                                    {/*</TableCell>*/}


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
                                                                onChange={(e) => handleStatusChange(e, row)}
                                                            >
                                                                <MenuItem value={1}>Active</MenuItem>
                                                                <MenuItem value={0}>InActive</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>

                                                    <TableCell align="center">{users?.length}</TableCell>

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

                                    {isBusinessNotFound && (
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
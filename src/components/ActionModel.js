import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {FormHelperText} from "@mui/material";
import {useSnackbar} from "notistack";
import {DeleteBusiness} from "../DAL/Business/Business";


const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 3,
};

export default function ActionModel({
                                        open,
                                        setOpen,
                                        business
                                    }) {
    const handleClose = () => {
        setOpen(false);
    };
    const {enqueueSnackbar} = useSnackbar();
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await DeleteBusiness(business?.id);
        if (resp?.statusCode === 200) {
            setOpen(false);
            enqueueSnackbar(resp?.message, {variant: "success"});
        } else if (typeof resp?.message == "string") {
            enqueueSnackbar(resp?.message, {variant: "error"});
        } else {
            setError(resp?.message);
        }
    };
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" sx={{textAlign: "center"}}>
                        confirm to delete this Business ( {business?.businessName} )
                    </Typography>

                    {error && (
                        <FormHelperText sx={{color: "red"}}>
                            {error?.message}
                        </FormHelperText>
                    )}

                    <Box
                        sx={{
                            textAlign: "end",
                            display: "flex",
                            gap: "10px",
                            justifyContent: "end",
                            marginTop: "15px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{textTransform: "none"}}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                textTransform: "none",
                            }}
                            onClick={handleSubmit}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

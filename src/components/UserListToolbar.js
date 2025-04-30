import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "10px",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  paddingBottom: 3,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  "& legend": {
    display: "none",
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  filterName,
  onFilterName,
  onSubmit,
}) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user"
        sx={{ height: "2rem", marginTop: "5px" }}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 16, height: 16 }}
            />
          </InputAdornment>
        }
      />
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={onSubmit}
      >
        Search
      </Button>
    </RootStyle>
  );
}

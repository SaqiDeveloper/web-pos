import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Iconify from "./Iconify";
// component

// ----------------------------------------------------------------------

export default function UserMoreMenu({ options, data }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options?.map((val) => {
          return (
            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={() => {
                val?.handleClick(data);
                setIsOpen(false);
              }}
            >
              <ListItemIcon>
                <Iconify icon={val?.icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={val?.title}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

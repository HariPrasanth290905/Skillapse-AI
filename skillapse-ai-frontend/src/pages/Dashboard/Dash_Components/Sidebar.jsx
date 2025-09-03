import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MenuIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "./dash";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  
  return (
    <>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
        <MenuIcon size={40} />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#1e1e1e",
              color: "#fff",
            },
          },
        }}
      >
       <div className="dash-content">
         <h1>SKILLAPSE AI</h1>
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
       </div>
      </Drawer>
    </>
  );
}

export default Sidebar;

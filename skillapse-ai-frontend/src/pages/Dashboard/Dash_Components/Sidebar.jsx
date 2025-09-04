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
  Brain,
  Menu,
  MenuIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "./Dash";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  
  return (
    <>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
        <Menu size={35}/>
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
         <h1 className="pb-10">SKILLAPSE AI</h1>
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{<item.icon color='white'/>}</ListItemIcon>
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

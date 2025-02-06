import DarkLogo from "@/assets/Logo/DarkLogo";

import { Divider, List, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";

import MyRecent from "../ChatNew/MyRecent";
import Resources from "../ChatNew/Resources";
import AppContext from "../context/AppContext";
import NewChatButton from "../layout/SideBar/NewChatButton";
import SideBarListItemHeader from "../layout/SideBar/SideBarListItemHeader";

import { DrawerOpen_LocalKey } from "@/constants/storage.constant";
import LogoutButton from "../auth/LogoutButton";
import LucideIcon from "../Custom-UI/LucideIcon";
import TooltipNew from "./tooltipnew";
import UserResource from "../auth/UserResource";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 1),
  justifyContent: "flex-end",
}));
const Backdrop = styled("div")`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1200;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
`;
export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const { sideDrawerOpen, setSideDrawerOpen, sideDrawerWidth } =
    React.useContext(AppContext);

  const handleDrawerClose = () => {
    setSideDrawerOpen(false);
    localStorage.setItem(DrawerOpen_LocalKey, JSON.stringify(false));
  };
  
  const [isDropdownOpen, setDropdownOpen] = React.useState(true);
  const [activeDropdownIndex, setActiveDropdownIndex] = React.useState(null);
  const [recentData,setRecentData] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        activeDropdownIndex !== null &&
        !event.target.closest(".dropdown-container")
      ) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdownIndex]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {sideDrawerOpen && (isMobile || isTab) && (
        <Backdrop onClick={handleDrawerClose} />
      )}
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sideDrawerWidth,
            backgroundColor: "#F9F9F9",
            display: "flex",
            flexDirection: "column",
            maxHeight: "100vh",
            zIndex: 1300, // Ensure drawer is above backdrop
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideDrawerOpen}
      >
        <DrawerHeader
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "#F9F9F9",
          }}
        >
          <div className="flex w-full px-2 justify-between items-center">
            <div>
              <DarkLogo />
            </div>
            <div
              className="flex-none"
             
            >
              <TooltipNew title="Close Menu" placement="top-start">
              <button
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={handleDrawerClose}
              >
                <LucideIcon name={"PanelRightOpen"} size={24} />
                </button>
              </TooltipNew>
            </div>
          </div>
        </DrawerHeader>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingLeft: "7.6px",
            paddingRight: "7.6px",
          }}
        >
          <NewChatButton isMobile={isMobile} isTab={isTab} />
          <SideBarListItemHeader icon={"Layers"} title="Workspace" />
          <div className="w-full">
            <List>
              <div className="flex flex-col">
                <MyRecent
                  isDropdownOpen={isDropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  isMobile={isMobile}
                  isTab={isTab}
                  setRecentData={setRecentData}
                />
                {/* <div
                  className={`overflow-hidden transition-all duration-100 ease-in-out ${
                    isDropdownOpen && !recentData ? "mt-40" : "mt-8"
                  }`}
                ></div> */}
              </div>
            </List>
            <div>
              {/* <div className="flex items-center gap-2">
                <SideBarListItemHeader icon={"CloudCog"} title="Resources" />
              </div>
              <Divider />
              <div className="flex">
                <Resources isMobile={isMobile} isTab={isTab}/>
              </div> */}
            </div>
          </div>
        </Box>

        <Box
          sx={{
            padding: 1,
            position: "sticky",
            zIndex: 10,
            backgroundColor: "#F9F9F9",
            boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex", // Set display to flex
            justifyContent: "center", // Horizontally center items
            alignItems: "center", // Vertically center items
          }}
        >
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <UserResource />
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56 z-[1400] bg-white border-gray-200 rounded-lg shadow-xl" side="top" align="center"  portal>
    <DropdownMenuGroup>
      <DropdownMenuItem className="gap-3 cursor-pointer" onClick={()=>{ navigate(`/plans`)}}>
        <LucideIcon name="Wallet" size={14} color="black" />
        <span>Subscription</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator className="w-[95%] mx-auto h-[1px] bg-gray-200" />
    <DropdownMenuGroup>
      <DropdownMenuItem className="gap-3 cursor-pointer" onClick={()=>{ navigate(`/teams`)}}>
        <LucideIcon name="Users" size={14} color="black" />
        <span>Teams</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator className="w-[95%] mx-auto h-[1px] bg-gray-200"  />
    <DropdownMenuGroup>
      <DropdownMenuItem className="gap-3 cursor-pointer" onClick={()=>{ navigate(`/settings`)}}>
        <LucideIcon name="SquareUser" size={14} color="black" />
        <span>Profile</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

      
        </Box>
      </Drawer>
    </Box>
  );
}

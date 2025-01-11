import { useAuth } from "@/hooks/useAuth";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { User,Mail, Settings} from "lucide-react";
import TokenIcon from "./icons/token-icon";
import PlanIcon from "../ui/plan-icon";
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
// import LogoutIcon from "../ui/logout-icon";
export default function MyAccountDetails(){
    const {user,signOut}=useAuth();
    const navigate =useNavigate();
    const getInitials = (name) => {
        if (!name) return '?';
        const nameParts = name.trim().split(' ');
        return nameParts.length > 1
          ? nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
          : nameParts[0][0].toUpperCase();
      };
    
      const initials = getInitials(user?.name);
      function capitalizeFirstName(name) {
        if (!name) return ""; // Handle empty or null input
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }
      
      // Usage Example
      const userName = user?.name;
      const capitalizedName = capitalizeFirstName(userName);
    return(
        <>
        
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    className="cursor-pointer"
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                  >
                    {initials}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
  className="min-w-[200px] max-w-[300px] bg-white border-none shadow-[0_2px_4px_rgba(0,0,0,0.1),0_-1px_2px_rgba(0,0,0,0.1)] mr-2"
>
  <DropdownMenuLabel className="truncate">My Account</DropdownMenuLabel>
  <DropdownMenuSeparator className="w-[95%] mx-auto h-[1px] bg-gray-200" />

  <DropdownMenuGroup>
    <DropdownMenuItem>
      {/* <div className="flex gap-4 truncate">
        <User className="w-5 h-5" />
        <span>{capitalizedName}</span>
      </div> */}
        <span className="px-1 py-1">{capitalizedName}</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <div className="flex truncate">
  
        <span className="truncate px-1 py-1">{user?.email}</span>
      </div>
      
    </DropdownMenuItem>
    <DropdownMenuItem>
   
        <span className="px-1 py-1">{user?.tokenUsage} tokens used</span>
    </DropdownMenuItem>

  </DropdownMenuGroup>
 <DropdownMenuSeparator className="w-[95%] mx-auto h-[1px] bg-gray-200" />
 <DropdownMenuItem>
 <div className="flex gap-4 cursor-pointer items-center hover:bg-gray-200 w-full rounded-lg px-1 py-1" onClick={signOut}>
  <div>
  <LogOut size={20}/>
  </div>
 
  <span>Log out</span>
</div>

        </DropdownMenuItem>
 
</DropdownMenuContent>

              </DropdownMenu>
            </div>
         </>
     
    )
}
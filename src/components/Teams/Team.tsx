import { useTeamMembers } from "@/hooks/teams/useTeamMembers";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { InviteMemberDialog } from "./InviteMemberDialog";
import EnhancedTeamTable from "./TeamTable";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { styled } from "@mui/material";
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // [theme.breakpoints.down("md")]: {
  //   marginLeft: open ? "176px" : "0",
  // },
  [theme.breakpoints.up("md")]: {
    marginLeft: open ? "20px" : "0",
  },
}));
const Team = () => {
  const {
    teamMembers,
    loading,
    refetch,
    error,
    teamData,
    inviteMemberByEmail,
    cancelInvitationByEmail,
  } = useTeamMembers();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.message || ""}</AlertDescription>
      </Alert>
    );
  }
  const {open} = useContext(AppContext);
  return (
     <Main open={open}>
       <div className={`container mx-auto py-8 ${open ? "lg:max-w-screen-xl md:max-w-screen-md md:pl-36 lg:pl-52" : ""}`}>
      <div className="flex justify-between items-center mb-8 pt-16">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <InviteMemberDialog onInvite={inviteMemberByEmail} />
      </div>
      <EnhancedTeamTable
        teamMembers={teamData?.members || []}
        pendingInvites={teamData?.pendingInvites || []}
        loading={loading}
        refetch={refetch}
        hasTeamAccess
        onCancelInvite={cancelInvitationByEmail}
      />
    </div>
     </Main>
   
  );
};

export default Team;

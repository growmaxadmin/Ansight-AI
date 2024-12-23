import { TeamTableProps } from "@/types/team";
import {
  Clock,
  Coins,
  Lock,
  Mail,
  RotateCw,
  UserCircle,
  Users,
} from "lucide-react";

const TeamTable: React.FC<TeamTableProps> = ({
  teamMembers = [],
  loading = false,
  refetch = () => {},
  hasTeamAccess = false,
}) => {
  if (!hasTeamAccess) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="mb-4 p-4 bg-gray-50 rounded-full">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Team Access Required
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm">
            Upgrade to a team plan to manage multiple team members and
            collaborate together.
          </p>
          <button
            onClick={() => (window.location.href = "/settings/billing")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upgrade to Team Plan
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <RotateCw className="h-8 w-8 animate-spin text-gray-400" />
              <p className="text-sm text-gray-500">Loading team members...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (!teamMembers || teamMembers.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Users className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  No team members yet
                </p>
                <p className="text-sm text-gray-500">
                  Start by inviting your team members
                </p>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    return teamMembers.map((member) => (
      <tr key={member?.id || Math.random()} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member?.email || "N/A"}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            {member?.role || "N/A"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {member?.last_login
              ? new Date(member.last_login).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Never"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{
                  width: `${
                    member?.tokens_remaining
                      ? (member.current_token_usage / member.tokens_remaining) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {member?.current_token_usage?.toLocaleString() || 0} /{" "}
              {member?.tokens_remaining?.toLocaleString() || 0}
            </span>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        <button
          onClick={refetch}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Role
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last Login
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Token Usage
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
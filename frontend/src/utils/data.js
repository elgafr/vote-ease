import { LuBadgeCheck, LuBookmark, LuLayoutDashboard, LuLogOut, LuPenTool, LuVote } from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Create Vote",
        icon: LuVote,
        path: "/create-vote",
    },
    {
        id: "03",
        label: "My Votes",
        icon: LuPenTool,
        path: "/my-votes",
    },
    {
        id: "04",
        label: "Voted",
        icon: LuBadgeCheck,
        path: "/voted",
    },
    {
        id: "05",
        label: "Bookmarks",
        icon: LuBookmark,
        path: "/bookmarked-votes",
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    }
    
]
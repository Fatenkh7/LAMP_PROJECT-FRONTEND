import AccountRoundedIcon from "@mui/icons-material/AccountCircle";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import ScoreRoundedIcon from "@mui/icons-material/ScoreRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
export const mainNavbarItems = [
  {
    id: 0,
    icon: <AccountRoundedIcon />,
    label: "Admins",
    route: "admins",
  },
  {
    id: 1,
    icon: <CategoryRoundedIcon />,
    label: "Categories",
    route: "categories",
  },
  {
    id: 2,
    icon: <PaidRoundedIcon />,
    label: "Currencies",
    route: "currencies",
  },
  {
    id: 3,
    icon: <VpnKeyRoundedIcon />,
    label: "Fixed Keys",
    route: "fixedkeys",
  },
  {
    id: 4,
    icon: <EventRepeatRoundedIcon />,
    label: "Fixed Transactions",
    route: "fixedtransactions",
  },
  {
    id: 5,
    icon: <CurrencyExchangeRoundedIcon />,
    label: "Recurring Transactions",
    route: "recurringtransactions",
  },
  {
    id: 6,
    icon: <ScoreRoundedIcon />,
    label: "Profit Goal",
    route: "profitgoals",
  },
  {
    id: 7,
    icon: <SummarizeRoundedIcon />,
    label: "Reports",
    route: "reports",
  },
];

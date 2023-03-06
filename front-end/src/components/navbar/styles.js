export const navbarStyles = {
  drawer: {
    width: 320,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "10px 0px",
      overflow: "hidden",
      // width: 300,
      height: "95%",
      boxSizing: "border-box",
      backgroundColor: "#3d0066",
      color: "rgba(255, 255, 255, 0.7)",
      marginLeft: "20px",
      marginTop: "20px",
      marginBottom: "20px",
      borderRadius: "20px",
      transition: "0.5s ease",
    },
    "& .Mui-selected": {
      color: "red",
    },
  },
  icons: {
    color: "rgba(255, 255, 255, 0.7)!important",
    marginLeft: "20px",
  },
  text: {
    "& span": {
      marginLeft: "-10px",
      fontWeight: "600",
      fontSize: "16px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

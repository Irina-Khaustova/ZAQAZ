import React from "react";
import { Box, Typography } from "@mui/material";

function OrdersListItem({
  supplierName,
  orderDate,
  price,
  marketplace,
  status,
  number,
  fontSize,
  onClick,
}) {
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          height: "61px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(246, 248, 249, 1)",
        }}
      >
        <Box
          sx={{
            width: "14.5%",
          }}
        >
          <Typography variant={fontSize || "maintext"}>{number}</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: "1",
          }}
        >
          <Typography variant={fontSize || "maintext"}>
            {supplierName}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "17%",
          }}
        >
          <Typography variant={fontSize || "maintext"}>{orderDate}</Typography>
        </Box>
        <Box
          sx={{
            width: "18.5%",
          }}
        >
          <Typography variant={fontSize || "maintext"}>{price}</Typography>
        </Box>
        <Box
          sx={{
            width: "18%",
          }}
        >
          <Typography variant={fontSize || "maintext"}>
            {marketplace}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "6%",
          }}
        >
          <Typography variant={fontSize || "maintext"}>{status}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default OrdersListItem;

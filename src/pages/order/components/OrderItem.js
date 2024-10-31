import React from "react";
import { Box, Typography } from "@mui/material";
import InputSelectColor from "../../../components/InputSelectColor";

function OrderItem({
  title16,
  title18,
  columnOne,
  columnTwo,
  columnThree,
  columnFour,
  columnFive,
  columnOneText,
  columnTwoText,
  columnThreeText,
  columnFourText,
  columnFiveText,
  height,
  border,
  statusChange,
}) {
  return (
    <>
      <Box
        sx={{
          boxSizing: "border-box",
          height: height ? height : "64px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: border ? "space-between" : "center",
          borderBottom: border ? "none" : title18? "none" :"1px solid rgba(246, 248, 249, 1)",
          paddingLeft: "23px",
          paddingRight: "23px",
          marginBottom: title16 ? "-7px" : "none",
        }}
      >
        <Box
          sx={{
            boxSizing: "border-box",
            width: "25%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={
              title16 ? "text16Bold" : title18 ? "maintexttytle" : "text16Light"
            }
          >
            {columnOne ? columnOne : "--"}
          </Typography>
          {title16 && (
            <Typography sx={{ marginTop: "10px", wordBreak: 'break-word' }} variant={"text16Light"}>
              {columnOneText ? columnOneText : "--"}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            height: "100%",
            flexGrow: "1",
            paddingLeft: border ? "32px" : "20px",
            display: "flex",
            flexDirection: "column",
            borderLeft: border ? "1px solid #EBEBEB" : "none",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={
              title16 ? "text16Bold" : title18 ? "maintexttytle" : "text16Light"
            }
          >
            {columnTwo ? columnTwo : "--"}
          </Typography>
          {title16 && (
            <Typography sx={{ marginTop: "10px", wordBreak: 'break-word' }} variant={"text16Bold"}>
              {columnTwoText ? columnTwoText : "--"}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "20%",
            height: "100%",
            paddingLeft: border ? "32px" : "20px",
            display: "flex",
            flexDirection: "column",
            borderLeft: border ? "1px solid #EBEBEB" : "none",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={
              title16 ? "text16Bold" : title18 ? "maintexttytle" : "text16Light"
            }
          >
            {columnThree ? columnThree : "--"}
          </Typography>
          {title16 && (
            <Typography sx={{ marginTop: "10px", wordBreak: 'break-word' }} variant={"text16Bold"}>
              {columnThreeText ? columnThreeText : "--"}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "18.5%",
            height: "100%",
            // paddingLeft: "32px",
            display: "flex",
            flexDirection: "column",
            borderLeft: border ? "1px solid #EBEBEB" : "none",
            alignItems: "flex-start",
            paddingLeft: !border && !title16 ? "42px" : "32px",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={
              title16 ? "text16Bold" : title18 ? "maintexttytle" : "text16Light"
            }
          >
            {columnFour ? columnFour : "--"}
          </Typography>
          {title16 && (
            <Typography sx={{ marginTop: "10px", wordBreak: 'break-word' }} variant={"text16Bold"}>
              {columnFourText ? columnFourText : "--"}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "15%",
            height: "100%",
            paddingLeft: "10px",
            display: "flex",
            flexDirection: "column",
            borderLeft: border ? "1px solid #EBEBEB" : "none",
            alignItems: border ? "center" : "flex-end",
            justifyContent: "center",
          }}
        >
          {border || title18 ? (
            <Typography
              variant={
                title16
                  ? "text16Bold"
                  : title18
                  ? "maintexttytle"
                  : "text16Light"
              }
            >
              {columnFive ? columnFive : "--"}
            </Typography>
          ) : (
            <InputSelectColor inputValue={columnFive} statusChange={statusChange}></InputSelectColor>
          )}
          {title16 && (
            <Typography sx={{ marginTop: "10px", wordBreak: 'break-word' }} variant={"text16Bold"}>
              {columnFiveText ? columnFiveText : "--"}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default OrderItem;

import React, { useState, useEffect } from "react";
import { IconButton, Button, Box } from "@mui/material";
import {ReactComponent as MyIconArrowRight} from "../image/icon-arrows-right.svg";
import {ReactComponent as MyIconArrowLeft} from "../image/icon-arrows-left.svg"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pages, setPages] = useState([]);


  console.log(totalPages, currentPage)
  useEffect(() => {
    const generatePages = () => {
      let pageList = [];

      console.log(444, totalPages, currentPage)

      if (totalPages <= 6) {
        // Если страниц меньше 6, отображаем все
        for (let i = 1; i <= totalPages; i++) {
          pageList.push(i);
        }
      } else {
        if (currentPage <= 4) {
          pageList = [1, 2, 3, 4, 5, "...", totalPages];
        } else if (currentPage >= totalPages - 3) {
          pageList = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
          pageList = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
        }
      }

      setPages(pageList.length === 1? []: pageList);
    };

    generatePages();
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page !== currentPage && page !== "...") {
      onPageChange(page);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "13px" }}>
      {/* Стрелка назад */}
      <IconButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{ visibility: totalPages <= 1 ? "hidden" : "visible", padding: "0" }}
      >
        <MyIconArrowLeft />
      </IconButton>

      {/* Нумерация страниц */}
      {pages.map((page, index) => (
        <Button
        sx={{
            padding: "0",
            minWidth: '40px',
            border: 'none',
            background: 'none',
            fontWeight: page === currentPage ? '600' : '400',
            fontSize: page === currentPage ? '18px' : '16px',
            marginBottom: page === currentPage ? '5px' : 'none',
            color: 'rgba(33, 30, 29, 1)',
            '&:hover': {
              backgroundColor: 'none',
            },
            '&.Mui-disabled': {
                backgroundColor: 'none',  
                color: 'rgba(33, 30, 29, 1)',   
              },
          }}
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </Button>
      ))}

      {/* Стрелка вперед */}
      <IconButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{ visibility: totalPages <= 1 ? "hidden" : "visible", padding: "0" }}
      >
        <MyIconArrowRight />
      </IconButton>
    </Box>
  );
};

export default Pagination;
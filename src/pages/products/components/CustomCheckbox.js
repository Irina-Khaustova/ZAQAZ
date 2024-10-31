import { Box, Typography, Checkbox } from "@mui/material";


function CustomCheckbox({
    isCheckSortDate,
    isCheckSortName,
    handleCheckboxChange,
    text,
    name
}) {

    return (

<Box sx={{ 
            marginLeft: "10px", 
            boxSizing: "border-box", 
            width: name === "sortbydate" ? "225px" : "170px", 
            height: "38px", 
            border: "1px solid #EBEBEB", 
            borderRadius: "16px", 
            display: "flex", 
            alignItems: "center", 
            padding: "0 8px", 
            backgroundColor: "transparent",
            outline: "none", // Убирает обводку при фокусе
        boxShadow: "none", // Убирает тени рамки
        }}>
           
            <Box 
                sx={{ 
                    
                    color: '#000', 
                    lineHeight: '38px', 
                    paddingRight: "0",
                    marginLeft: "8px",
                }}
            >
                <Typography variant="main">
                {text}
                </Typography>
            </Box>
            <Checkbox
               checked={name === "sortbydate" ? isCheckSortDate : isCheckSortName}
               onChange={handleCheckboxChange}
               name={name}
               sx={{
                   padding: 0,
                   borderRadius: "2%",
                   marginLeft: "10px",
                   boxSizing: "border-box",
                // Цвет для состояния checked, без удаления галочки
               '& .MuiSvgIcon-root': {
        width: "28px",
        height: "28px",
        // Убираем обводку и заливку по умолчанию
        '& path': {
            stroke: "none",
            fill: "none",
        },
    },
    // Задаем стиль для unchecked состояния
    '&.MuiCheckbox-root': {
        border: "1px solid #EBEBEB", // Устанавливаем тонкую рамку
        borderRadius: "2px", // Радиус рамки
        width: "24px", // Ширина рамки
        height: "24px", // Высота рамки
    },
    // Цвет для состояния checked
    '&.Mui-checked': {
        color: 'orange', // Цвет галочки
        '& .MuiSvgIcon-root path': {
            fill: 'orange', // Заливка галочки
        },
        // Убираем рамку, если checkbox активен
        border: "none",
    },
               }}
            />
        </Box>
    )
}

export default CustomCheckbox;

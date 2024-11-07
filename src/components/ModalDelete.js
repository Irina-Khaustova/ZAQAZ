import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ModalDelete = ({ open, close, modalCategory, onhandleClickDelete, name }) => {

  const onhandleClick = (e) => {
    e.preventDefault();
  close();
  };

  console.log();

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      maxWidth={false} 
      fullWidth={true} 
      scroll="body"
      aria-labelledby="form-dialog-title"
      PaperProps={{
        sx: {
          width: "600px",
          height: "294px",
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      onClick={(e) => {
        e.stopPropagation(); 
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
          },
        },
        onClick: (e) => e.stopPropagation(),
      }}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "40px",
          position: "relative",
          overflow: "visible"
        },
      }}
    >
      <DialogTitle
        id="form-dialog-title"
        sx={{
            padding: "0",
            paddingLeft: '30px',
            paddingRight: "30px",
          marginBottom: "11px",
          textAlign: "center"
        }}
      >
        <Typography variant="text28Bold">{`Вы уверены, что хотите удалить выбранный ${name}?`}</Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          width: "100%",
          height: "40px",
          padding: "0",
          paddingLeft: "30px",
          paddingRight: "30px",
          boxSizing: "border-box",
          textAlign: 'center',
        }}
      >
       
       <Typography sx={{ marginTop: "15px", "& .MuiDialogTitle-root": {
              padding: 0, 
            }, }}>Удаленный продукт не подлежит восстановлению</Typography>
     
       
      </DialogContent>

      <DialogActions
        sx={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
         width: "100%"
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          boxshadow="none"
          name="cancel"
          onClick={onhandleClick}
          sx={{
            height: "40px",
            width: "240px",
            border: "1px solid rgba(246, 248, 249, 1)",
            borderRadius: "16px",
            marginLeft: "0 !important",
            margingTop: "0 !important",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none", 
            },
            "&:active": {
              boxShadow: "none", 
            },
            "&:focus": {
              boxShadow: "none", 
            },
          }}
        >
          <Typography variant="text16Bold">Отмена</Typography>
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          boxshadow="none"
          onClick={onhandleClickDelete}
          name="delete"
          sx={{
            height: "40px",
            width: "240px",
            border: "1px solid rgba(246, 248, 249, 1)",
            borderRadius: "16px",
            marginLeft: "0 !important",
            margingTop: "0 !important",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none", 
            },
            "&:active": {
              boxShadow: "none", 
            },
            "&:focus": {
              boxShadow: "none", 
            },
          }}
        >
          <Typography variant="text16Bold">Подтвердить</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Phone } from "../../typed";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  deleteContact,
  fetchPhonesFromDB,
} from "../../store/thunks/phoneBookThunk.ts";

const PhoneCard = ({ phone }: { phone: Phone }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    navigate(`/edit/${phone.id}`);
    handleClose();
  };

  const handleDelete = () => {
    if (phone.id) {
      dispatch(deleteContact(phone.id));
      handleClose();
      dispatch(fetchPhonesFromDB());
    }
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image={phone.photo || "default-contact-image.jpg"}
          alt="Contact"
        />
        <CardContent>
          <Typography variant="h6">{phone.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {phone.phone}
          </Typography>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: 500,
            maxHeight: 600,
            backgroundColor: "white",
            padding: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <img
              src={
                phone.photo ||
                "https://png.klev.club/uploads/posts/2024-05/png-klev-club-ezv6-p-kontakti-ikonka-png-1.png"
              }
              alt="Contact"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>

          <Typography variant="h5" align="center">
            {phone.name}
          </Typography>
          <Typography variant="body1" align="center">
            {phone.phone}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {phone.email}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <IconButton
              onClick={handleEdit}
              sx={{ marginRight: 2 }}
              color="primary"
            >
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} color="primary">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PhoneCard;

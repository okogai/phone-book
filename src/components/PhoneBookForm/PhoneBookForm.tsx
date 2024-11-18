import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  addNewContact,
  fetchContactById,
  updateContact,
} from "../../store/thunks/phoneBookThunk.ts";
import { Phone } from "../../typed";

const PhoneBookForm = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { contactToEdit, fetchLoading, addingLoading, updatingLoading, error } =
    useAppSelector((state) => state.phones);

  const [formData, setFormData] = useState<Phone>({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateContact(formData));
    } else {
      dispatch(addNewContact(formData));
      navigate("/");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchContactById(id));
    }
    if (contactToEdit !== null) {
      setFormData(contactToEdit);
    }
  }, [id, contactToEdit, dispatch]);

  const imagePreview =
    formData.photo ||
    "https://png.klev.club/uploads/posts/2024-05/png-klev-club-ezv6-p-kontakti-ikonka-png-1.png";

  if (fetchLoading && id) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h6">
        {id ? "Edit Contact" : "Add New Contact"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Photo URL"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Box
          sx={{
            marginBottom: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={addingLoading || updatingLoading}
        >
          {addingLoading ? (
            <CircularProgress size={24} />
          ) : id ? (
            "Update Contact"
          ) : (
            "Add Contact"
          )}
        </Button>
        {error && <Typography color="error">An error occurred</Typography>}
      </form>
    </Box>
  );
};

export default PhoneBookForm;

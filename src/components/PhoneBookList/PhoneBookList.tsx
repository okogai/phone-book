import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPhonesFromDB } from "../../store/thunks/phoneBookThunk";
import PhoneCard from "../PhoneCard/PhoneCard.tsx";

const PhoneBookList = () => {
  const dispatch = useAppDispatch();
  const { phones, fetchLoading } = useAppSelector((state) => state.phones);

  useEffect(() => {
    dispatch(fetchPhonesFromDB());
  }, [dispatch]);

  if (fetchLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Phone Book
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {phones.map((phone) => (
          <Box
            key={phone.id}
            sx={{
              width: "80%",
              maxWidth: 600,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PhoneCard phone={phone} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PhoneBookList;

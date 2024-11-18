import { useEffect } from "react";
import { Box } from "@mui/material";
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
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {phones.map((phone) => (
        <Box key={phone.id} sx={{ flex: "1 1 300px" }}>
          <PhoneCard phone={phone} />
        </Box>
      ))}
    </Box>
  );
};

export default PhoneBookList;

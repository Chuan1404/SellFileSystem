import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import {Receipt} from '../../components'

const UserReceipt = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const response = await userService.getReceipt();
      if (response.content) setData(response);
    })();
  }, []);
  return (
    <main id="user_info_page">
      <Container sx={{ pt: 7 }}>
        {Object.keys(data).length > 0 && data.content.map((item) => <Receipt sx={{mb: 2}} data={item}/>)}
      </Container>
    </main>
  );
};

export default UserReceipt;

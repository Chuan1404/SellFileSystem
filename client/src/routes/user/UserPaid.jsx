import { Container, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { FilePaid } from "../../components";

const UserPaid = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await userService.getPaid();
      if (response.content) setData(response);
    })();
  }, []);
  return (
    <main id="user_paid_page">
      <Container sx={{ pt: 7 }}>
        {Object.keys(data).length > 0 &&
          data.content.map((paid) => <FilePaid key={paid.id} data={paid} />)}
        <Pagination count={data.totalPages}></Pagination>
      </Container>
    </main>
  );
};

export default UserPaid;

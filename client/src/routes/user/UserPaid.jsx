import { Container, Pagination, Typography } from "@mui/material";
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
        {data.content?.length > 0 ? (
          data.content.map((paid) => paid.file != null && <FilePaid key={paid.id} data={paid} />)
        ) : (
          <Typography textAlign={"center"} variant="h5">Bạn chưa có sản phẩm nào</Typography>
        )}
        {data.totalPages > 0 && <Pagination count={data.totalPages} />}
      </Container>
    </main>
  );
};

export default UserPaid;

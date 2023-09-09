import React, { useMemo } from "react";
import { Authenticated, Table } from "../../components";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { fileService } from "../../services";
import { useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

const FileList = () => {
  const { search } = useLocation();
  const { data: fileData, fetching: isLoading } = useQuery(
    () => fileService.getFiles(search),
    [search]
  );
  const columns = useMemo(
    () => [
      {
        header: "Display",
        accessorKey: "display",
        Cell: ({ row }) => <img src={row.original.display} width={200} />,
      },
      {
        header: "Tiêu đề",
        accessorKey: "title",
        Cell: ({ row }) => (
          <Typography variant="h6" fontSize={15}>{row.original.title}</Typography>
        ),
      },
      {
        header: "Tags",
        accessorKey: "tag",
        Cell: ({ row }) => {
          let arr = row.original.tag.map((item) => item.name);

          return (
            <Stack spacing={1} direction={"row"}>
              {arr.map((tag, index) => (
                <Chip key={index} size="small" label={tag} />
              ))}
            </Stack>
          );
        },
      },
      {
        header: "Giá",
        accessorKey: "price", //simple accessorKey pointing to flat data
      },

      {
        header: "Người chỉnh sửa",
        Cell: ({ row }) => {
          let { avatar, id, name } = row.original.user;
          return (
            // <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Avatar src={avatar} />
              <Typography variant="h6">{name}</Typography>
            </Stack>
            // <Typography variant="body1">{`ID: ${id}`}</Typography>
            // </Stack>
          );
        },
      },
      {
        header: "Trạng thái",
        Cell: ({ row }) => {
          let isActive = row.original.isActive;
          return (
            <Chip
              size="small"
              label={isActive ? "Sẵn sàng" : "Chưa sẵn sàng"}
              color={isActive ? "success" : "error"}
            />
          );
        },
      },
    ],
    []
  );
  return (
    <Authenticated>
      <main id="file_page">
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h3">Danh sách File</Typography>
          <Button variant="contained">Thêm File</Button>
        </Stack>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Table
          columns={columns}
          data={fileData}
          isLoading={isLoading}
          // FormEdit={FormEdit}
          // handleOpenForm={handleOpenForm}
          // handleDelete={handleDelete}
          // handleEdit={handleEdit}
        />
      </main>
    </Authenticated>
  );
};

export default FileList;

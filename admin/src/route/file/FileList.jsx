import {
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Authenticated, InputTags, Table } from "../../components";
import useQuery from "../../hooks/useQuery";
import { fileService } from "../../services";
import { closeForm } from "../../store/slices/pageSlice";

const FileList = () => {
  const { search } = useLocation();
  const {
    data: fileData,
    fetching: isLoading,
    setData: setFileData,
  } = useQuery(() => fileService.getFiles(search), [search]);
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
          <Typography variant="h6" fontSize={15}>
            {row.original.title}
          </Typography>
        ),
      },
      {
        header: "Tags",
        accessorKey: "tags",
        Cell: ({ row }) => {
          return (
            <Stack spacing={1} direction={"row"}>
              {row.original.tags.map((tag, index) => (
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
      {
        header: "",
        accessorKey: "id",
        Cell: () => <div style={{ display: "none" }}></div>,
      },
    ],
    []
  );

  const handleEdit = (editedData) => {
    if (editedData.error) return alert(editedData.error);
    setFileData({
      ...fileData,
      content: fileData.content.map((item) => {
        return item.id == editedData.id ? editedData : item;
      }),
    });
  };

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
          FormEdit={FormEdit}
          // handleOpenForm={handleOpenForm}
          // handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
    </Authenticated>
  );
};
function FormEdit({ defaultValues = {}, handleEdit = () => {} }) {
  const dispatch = useDispatch();
  let tagRef = useRef(null);

  const {
    register,
    handleSubmit,
    getValues,
    // formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });


  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("tags", tagRef.current.value.split(","));
    let response = await fileService.updateFiles(data.id, formData);
    handleEdit(response);
    dispatch(closeForm());
  };
  return (
    <Stack width={400} sx={{ background: "white" }} padding={3}>
      <Typography variant="h4">Chỉnh sửa file</Typography>
      <TextField
        size="small"
        defaultValue={getValues("title")}
        label={"Tiêu đề"}
        {...register("title")}
        margin="normal"
      />

      <TextField
        size="small"
        defaultValue={getValues("price")}
        label={"Giá (VNĐ)"}
        {...register("price")}
        margin="normal"
      />

      <InputTags
        defaultValue={getValues("tags")}
        {...register("tags")}
        ref={tagRef}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        Xác nhận
      </Button>
    </Stack>
  );
}

export default FileList;

import {
  Avatar,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Authenticated, InputTags, Table } from "../../components";
import useQuery from "../../hooks/useQuery";
import { fileService } from "../../services";
import { closeForm, openAlert } from "../../store/slices/pageSlice";
import { ErrorMessage } from "@hookform/error-message";

const FileList = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const {
    data: fileData,
    fetching: isLoading,
    setData: setFileData,
  } = useQuery(() => fileService.getFiles(search), [search]);
  const { user } = useSelector((store) => store.auth);

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
          if (row.original.user != null) {
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
          } else {
            return <Typography>Đã xóa</Typography>;
          }
        },
      },
      {
        header: "Trạng thái",
        accessorKey: "isActive",
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

  const handleDelete = async (id) => {
    let res = await fileService.deleteFile(id);
    if (!res.error) {
      let filterData = fileData.content.filter((item) => item.id != id);
      setFileData({ ...fileData, content: filterData });
      dispatch(openAlert({ type: "success", message: "Xóa thành công" }));
    } else {
      dispatch(
        openAlert({
          type: "error",
          message: "Xóa không thành công do có khách hàng đã thanh toán",
        })
      );
    }
  };
  return (
    <Authenticated>
      <main id="file_page">
        <Typography textAlign={"center"} variant="h3">
          Danh sách File
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Table
          columns={columns}
          data={fileData}
          isLoading={isLoading}
          FormEdit={FormEdit}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          disableDelete={!user.userRoles?.includes("ROLE_ADMIN")}
        />
      </main>
    </Authenticated>
  );
};
function FormEdit({ defaultValues = {}, handleEdit = () => {} }) {
  const dispatch = useDispatch();
  let tagRef = useRef(null);
  const [isActive, setIsActive] = useState(defaultValues.isActive);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("tags", tagRef.current.value.split(","));
    formData.append("isActive", isActive);
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
        {...register("title", { required: "Không được để trống" })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"title"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />

      <TextField
        size="small"
        defaultValue={getValues("price")}
        label={"Giá (VNĐ)"}
        type="number"
        {...register("price", {
          min: { value: 10000, message: "Tối thiểu 10.000 VNĐ" },
        })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"price"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <FormControlLabel
        control={
          <Switch
            {...register("isActive")}
            checked={isActive}
            onChange={(e, value) => setIsActive(value)}
          />
        }
        label="Trạng thái"
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

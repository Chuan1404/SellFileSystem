import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Authenticated, Table } from "../components";
import useQuery from "../hooks/useQuery";
import { userService } from "../services";
import { closeForm } from "../store/slices/pageSlice";
import { ErrorMessage } from "@hookform/error-message";

export default function User({ role }) {
  const { search } = useLocation();
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id", //simple accessorKey pointing to flat data
      },
      {
        header: "Avatar",
        accessorKey: "avatar",
        Cell: ({ row }) => {
          return <Avatar src={row.original.avatar} />;
        },
      },
      {
        header: "Tên",
        accessorKey: "name", //simple accessorKey pointing to flat data
      },
      {
        header: "Email",
        accessorKey: "email", //simple accessorKey pointing to flat data
      },
      {
        header: "Vai trò",
        accessorKey: "userRoles",
        Cell: ({ row }) => {
          return (
            <Stack spacing={1}>
              {row.original.userRoles.map((role, index) => (
                <Chip
                  key={index}
                  size="small"
                  label={role.split("_")[1]}
                  color={
                    role === "ROLE_CUSTOMER"
                      ? "success"
                      : role === "ROLE_EDITOR"
                      ? "info"
                      : "error"
                  }
                />
              ))}
            </Stack>
          );
        },
      },
      {
        header: "Ngày tham gia",
        accessorKey: "createdDate", //simple accessorKey pointing to flat data

        Cell: ({ row }) => {
          let arr = row.original.createdDate;
          return (
            <span>{`${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}:${arr[5]}`}</span>
          );
        },
      },
      {
        header: "Trạng thái",
        accessorKey: "state", //simple accessorKey pointing to flat data
        Cell: ({ row }) => {
          let state = row.original.state;
          return (
            <Chip
              size="small"
              label={state}
              color={
                state === "VERIFIED"
                  ? "success"
                  : state === "BANNED"
                  ? "error"
                  : "default"
              }
            />
          );
        },
      },
    ],
    []
  );
  const {
    data: userData,
    fetching: isLoading,
    setData: setUserData,
  } = useQuery(() => userService.getUsers(search, role), [search, role]);

  const handleDelete = async (id) => {
    const res = await userService.deleteUser(id);
    console.log(res)
    if(!res.error) {
      let filterData = userData.content.filter((item) => item.id != id);
      setUserData({ ...userData, content: filterData });
    }
    else {
      alert(res.error)
    }
    
  };

  const handleEdit = (editedData) => {
    if (editedData.error) return alert(editedData.error);
    setUserData({
      ...userData,
      content: !editedData.userRoles.includes(role)
        ? userData.content.filter((item) => item.id != editedData.id)
        : userData.content.map((item) =>
            item.id == editedData.id ? editedData : item
          ),
    });
  };
  return (
    <Authenticated>
      <main id="user_page">
        <Typography textAlign={"center"} variant="h3">
          Danh sách tài khoản
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        <Table
          columns={columns}
          data={userData}
          isLoading={isLoading}
          FormEdit={FormEdit}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
    </Authenticated>
  );
}

function FormEdit({ defaultValues = {}, handleEdit = () => {} }) {
  const [avatar, setAvatar] = useState(defaultValues.avatar);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: defaultValues,
  });

  const handleChangeAvatar = (e) => {
    let file = e.currentTarget.files[0];
    setValue("avatar", file);
    setAvatar(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    if (data.userRoles.length < 1)
      return setError("userRoles", ["Không được để trống"]);

    let formData = new FormData();
    typeof data.avatar !== "string" &&
      data.avatar != null &&
      formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("state", data.state);
    formData.append("userRoles", data.userRoles);
    let response = await userService.updateUser(data.id, formData);
    handleEdit(response);
    dispatch(closeForm());
  };
  return (
    <Stack
      component={"form"}
      width={400}
      sx={{ background: "white" }}
      padding={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4">Chỉnh sửa tài khoản</Typography>
      <Button
        component="label"
        sx={{ margin: "auto", width: "fit-content", borderRadius: "50%" }}
      >
        <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
        <input
          type="file"
          multiple={false}
          hidden
          {...register("avatar")}
          onChange={handleChangeAvatar}
        />
      </Button>
      <TextField
        size="small"
        defaultValue={getValues("name")}
        label={"name"}
        {...register("name", { required: "This is required." })}
        margin="normal"
      />
      <ErrorMessage
        errors={errors}
        name={"name"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <Autocomplete
        disablePortal
        options={["VERIFIED", "BANNED"]}
        defaultValue={getValues("state")}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            margin="normal"
            label="state"
            {...register("state", { required: "This is required." })}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={"state"}
        render={({ message }) => (
          <Typography color="primary">{message}</Typography>
        )}
      />
      <Autocomplete
        disablePortal
        multiple={true}
        options={["ROLE_CUSTOMER", "ROLE_EDITOR", "ROLE_ADMIN"]}
        defaultValue={getValues("userRoles")}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        {...register("userRoles")}
        onChange={(e, values) => {
          setValue("userRoles", values);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            margin="normal"
            label="userRoles"
          />
        )}
        renderTags={(tagValues) => {
          return tagValues.map((option, index) => {
            // option = option.indexOf('ROLE_') == -1? option: option.split('_')[1]
            return (
              <Chip
                key={index}
                sx={{ marginY: 1, marginRight: 0.5 }}
                label={option}
                color={
                  option === "ROLE_CUSTOMER"
                    ? "success"
                    : option === "ROLE_EDITOR"
                    ? "info"
                    : "error"
                }
              />
            );
          });
        }}
      />
      <ErrorMessage
        errors={errors}
        name={"userRoles"}
        render={({ message }) => (
          <Typography color="primary">{errors.userRoles?.[0]}</Typography>
        )}
      />
      <Button type="submit" variant="contained">
        Xác nhận
      </Button>
    </Stack>
  );
}

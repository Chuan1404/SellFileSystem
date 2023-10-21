import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../assets/images/loading2.svg";
import queryLocation from "../utils/queryLocation";
import { useDispatch } from "react-redux";
import { openForm } from "../store/slices/pageSlice";

const Table = ({
  columns = [],
  data = {},
  handleEdit = (editedData) => {},
  handleDelete,
  FormEdit,
  isLoading,
  disableEdit = false,
  disableDelete = false,
  ...props
}) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [isDeleteBoxShow, setIsDeleteBoxShow] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditTableClick = (row) => {
    dispatch(
      openForm(<FormEdit defaultValues={row} handleEdit={handleEdit} />)
    );
  };

  const onDeleteTableClick = (row) => {
    setIsDeleteBoxShow(true);
    setSelectedID(row._valuesCache.id);
  };

  useEffect(() => {
    navigate(
      `?${queryLocation.toString({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      })}`
    );
  }, [pagination.pageIndex, pagination.pageSize]);

  return isLoading ? (
    <Stack>
      <img className="imgLoading" height={50} src={loading} />
    </Stack>
  ) : (
    <>
      <MaterialReactTable
        columns={columns}
        data={data.content || []}
        manualPagination
        rowCount={data?.totalElements || 5}
        // enableRowSelection //enable some features
        // enableColumnOrdering
        enableEditing
        // enableGlobalFilter
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {!disableEdit && (
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => onEditTableClick(row._valuesCache)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}

            {!disableDelete && (
              <Tooltip arrow placement="right" title="Delete">
                <IconButton onClick={() => onDeleteTableClick(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
        onPaginationChange={setPagination}
        state={{ pagination }}
        {...props}
      />
      <Dialog
        open={isDeleteBoxShow}
        keepMounted
        onClose={() => setIsDeleteBoxShow(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có chắc chắn rằng muốn xóa ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Sau khi xóa, bạn sẽ không thể khôi phục dữ liệu
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete(selectedID);
              setIsDeleteBoxShow(false);
            }}
          >
            Xác nhận
          </Button>
          <Button variant="outlined" onClick={() => setIsDeleteBoxShow(false)}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Table;

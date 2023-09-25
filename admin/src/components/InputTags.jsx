import { Close } from "@mui/icons-material";
import { Chip, Stack, TextField, Typography } from "@mui/material";
import React, { forwardRef, useRef, useState } from "react";

const InputTags = forwardRef(({ defaultValue, ...props }, inputRef) => {
  const [tags, setTags] = useState(defaultValue);
  const tagRef = useRef(null);

  //HandleSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      tagRef.current.value.trim() != "" &&
      !tags.includes(tagRef.current.value.trim())
    )
      setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };
  return (
    <Stack flexGrow={1} width={"100%"} bgcolor={"white"}>
      <form onSubmit={handleOnSubmit}>
        {tags.map((data, index) => (
          <Tag handleDelete={handleDelete} data={data} key={index} />
        ))}
        <TextField
          inputRef={tagRef}
          variant="standard"
          size="small"
          margin="none"
          placeholder="Enter tags here"
        />
      </form>
      <input
        {...props}
        ref={inputRef}
        readOnly
        value={tags.join(",")}
        hidden
        type="text"
      />
    </Stack>
  );
});

function Tag({ data, handleDelete }) {
  return (
    <Chip
      sx={{ margin: "0 0.5rem 0.5rem 0" }}
      label={
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography>{data}</Typography>
          <Close
            sx={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        </Stack>
      }
    />
  );
}
export default InputTags;

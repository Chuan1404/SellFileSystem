import {
  Avatar,
  Box,
  Button,
  Pagination,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { blue, deepOrange, grey } from "@mui/material/colors";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import commentService from "../services/commentService";
import useQuery from "../hooks/useQuery";

export default function CommnetBox({ fileId, user }) {
  const [content, setContent] = useState("");

  const {
    data: comments,
    setData: setComments,
    fetching: isLoading,
  } = useQuery(() => commentService.getCommentOfFile(fileId));
  const handleAddComment = async () => {
    const response = await commentService.addComment(fileId, content);

    console.log(response);

    if(!response.error) {
        setComments({...comments, content: [response, ...comments.content]})
        setContent('')
    }
  };

  return (
    <Box>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar src={user.avatar} />
        <StyledTextarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          minRows={3}
          placeholder="Leave your comment"
        />
        <Button onClick={handleAddComment}>Send</Button>
      </Stack>
      <Box marginY={3}>
        {!isLoading &&
          comments.content?.map((comment) => (
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              marginY={2}
              key={comment.id}
            >
              <Avatar src={comment.user.avatar} />
              <Box>
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  marginRight={2}
                >
                  {comment.user.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component={"span"}
                  sx={{ fontSize: 12, color: "#999" }}
                >
                  {`${comment.createdDate[3]}:${comment.createdDate[4]}:${comment.createdDate[5]} ${comment.createdDate[2]}-${comment.createdDate[1]}-${comment.createdDate[0]}`}
                </Typography>
                <Typography variant="body1" marginTop={2}>
                  {comment.content}
                </Typography>
              </Box>
            </Stack>
          ))}

       
      </Box>
      {comments.totalPages > 0 && <Pagination count={comments.totalPages} />}
    </Box>
  );
}
const StyledTextarea = styled(TextareaAutosize)(({ theme }) => {
  const mytheme = useTheme();
  return `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${grey[900]};
        background: '#fff';
        border: 1px solid ${grey[200]};
        box-shadow: 0px 2px 2px ${grey[50]};
        resize: none;
      
        &:hover {
          border-color: ${mytheme.palette.primary[400]};
        }
        &:focus {
            border-color: ${mytheme.palette.primary[400]};
            box-shadow: 0 0 0 3px ${mytheme.palette.primary[200]};
          }
        
          // firefox
          &:focus-visible {
            outline: 0;
          }
        `;
});

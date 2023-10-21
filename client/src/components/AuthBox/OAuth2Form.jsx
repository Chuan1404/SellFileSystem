import { Stack } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

export default function OAuth2Form({ ...props }) {
  const dispatcher = useDispatch();
  const handleSuccess = (credentialResponse) => {
    const data = jwt_decode(credentialResponse.credential);
    dispatcher({
      type: 'OAUTH2',
      payload: data
    })
  }
  return (
    <Stack
      {...props}
      direction={"row"}
      alignItems={"baseline"}
      justifyContent={"center"}
      spacing={2}
    >
      
      <GoogleOAuthProvider clientId="1072091574856-ohepmk122fqm9sch172c7tr0mfagb5oh.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credential => handleSuccess(credential)}
          onError={() => {console.log('Login Failed')}}
        />
      </GoogleOAuthProvider>
      {/* <IconButton>
        <img width={36} src={facebookLogo} />
      </IconButton> */}
    </Stack>
  );
}

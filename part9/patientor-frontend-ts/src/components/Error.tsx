import { Alert } from "@mui/material"

const Error = ({ error } : { error: string }) => {
  if (error) 
    return <Alert>{error}</Alert>
  return null
}

export default Error;
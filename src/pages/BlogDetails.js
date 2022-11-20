import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

export default function BlogDetails() {
  const { blogID } = useParams()
  const id = parseInt(blogID, 10)-1
  console.log("id:", id)
  console.log("blogID: ", blogID)
  console.log(POSTS[0])
  return (
    <>
      <Helmet>
        <title> `Blog | ${ POSTS[id].title }` </title>
      </Helmet>

      <Container>
        <Stack alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h2" gutterBottom>
          { POSTS[id].title}
          </Typography>
          <Typography variant="body1" gutterBottom 
            dangerouslySetInnerHTML={{ __html: POSTS[id].content  }}
          />
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button> */}
        </Stack>

      </Container>
    </>
  );
}

import { Link, NavLink, Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'yeni', label: 'En Yeni' },
  { value: 'populer', label: 'Populer' },
  { value: 'eski', label: 'En Eski' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  function handleSort() {
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Converter </title>
        <meta property="og:content" content="xml dönüştürme, xml bayiliği"/>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Outlet />
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button> */}
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} onSort={() => handleSort}/>
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

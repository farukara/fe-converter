import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Box, Paper, Typography, TextField, Button , FormControl, Input, InputLabel, InputAdornment, Snackbar, Alert, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
// import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import EuroIcon from '@mui/icons-material/Euro';
import PaidIcon from '@mui/icons-material/Paid';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../components/iconify';
// sections
import {
  /* AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates, */
  AppWebsiteVisits,
  CCRun
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [isUseEuroMB, setisUseEuroMB] = useState(false);
  const [isUseDolarMB, setisUseDolarMB] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const [urls, setUrls] = useState ("")
  const [kural, setKural] = useState ("")
  const [loading, setLoading] = useState (false)
  const [euro, setEuro] = useState ("")
  const [dolar, setDolar] = useState ("")
  const [euroMB, setEuroMB] = useState ("?")
  const [dolarMB, setDolarMB] = useState ("?")


  // local storage handling
  // +++++ urls
  useEffect (() => {
    if (localStorage.urls) {
      setUrls(localStorage.getItem("urls"))
    }
  }, [])
  useEffect (() => {
    localStorage.urls = urls
  }, [urls])
  // +++++ kural
  useEffect (() => {
    if (localStorage.kural) {
      setKural(localStorage.getItem("kural"))
    }
  }, [])
  useEffect (() => {
    localStorage.kural = kural
  }, [kural])
  // +++++ dolar
  useEffect (() => {
    if (localStorage.dolar) {
      setDolar(localStorage.getItem("dolar"))
    }
  }, [])
  useEffect (() => {
    localStorage.dolar = dolar
  }, [dolar])
  // +++++ euro
  useEffect (() => {
    if (localStorage.euro) {
      setEuro(localStorage.getItem("euro"))
    }
  }, [])
  useEffect (() => {
    localStorage.euro = euro
  }, [euro])
  // +++++ euroMB toggle
  useEffect (() => {
    if (localStorage.isUseEuroMB) {
      setisUseEuroMB(localStorage.getItem("isUseEuroMB"))
    }
  }, [])
  useEffect (() => {
    localStorage.isUseEuroMB = isUseEuroMB
  }, [isUseEuroMB])
  // +++++ dolarMB toggle
  useEffect (() => {
    if (localStorage.isUseDolarMB) {
      setisUseDolarMB(localStorage.getItem("isUseEuroMB"))
    }
  }, [])
  useEffect (() => {
    localStorage.isUseDolarMB = isUseDolarMB
  }, [isUseDolarMB])

  // getting currency from MB
  useEffect(() => {
    fetch("/api/getMB")
      .then(res => res.json())
      .then(data => {
        /* console.log(data)
        console.log("euro:", data.euro)
        console.log("dolar", data.dolar) */
        setEuroMB(data.euro)
        setDolarMB(data.dolar)
        enqueueSnackbar("Merkez Bankasi Kurlari alindi...", {variant: "success"});
        // FIX: handle errors
      })
  }, [])

  // handleRun starts to convert the input xml to a collection of files in zip
  function handleRun (e) {
    setLoading(true)
    e.preventDefault()
    enqueueSnackbar("Isleminiz yapiliyor...", {variant: "info"});
    fetch("/run", {
      method: "POST",
      body: JSON.stringify({"urls": e.target.urls.value, "kural": e.target.kural.value, "euro": e.target.euro.value, "dolar":e.target.dolar.value}),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => {
      // res.blob()) 
        if (res.status !== 200) {
          console.log("response is not 200")
          return
        }
        res.blob()
    })
    .then (files => {
      // console.log(struct.files)
      // const files = struct.files.blob()
      // const href = window.URL.createObjectURL(blob);
      const url = window.URL.createObjectURL(new Blob([files]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.zip'); // or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // console.log(struct.stats)
      setLoading(false)
      enqueueSnackbar("Isleminiz TAMAMLANDI...", {variant: "success"});
    })
    .catch(err => {
      // return Promise.reject("Error: Something Went Wrong", err );
      // Promise.reject(new Error('Something went wrong'));
      err.json()
        .then(errjson => {
          console.log(errjson)
          enqueueSnackbar("Bir hata olustu...", {variant: "error"});
        })
    })
  }

  return (
    <>
      <Helmet>
        <title> XML Converter </title>
      </Helmet>

      <Container maxWidth="xl"
        sx={{
          width: "90%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Merhaba, hosgeldin
        </Typography>

       { /* <Grid item xs={12} md={6} lg={8} sx={{mb:3,}}>
          <AppWebsiteVisits
            title="Yuklenen Urun Sayisi"
            subheader="Tekil Urun"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ]}
            chartData={[
              {
                name: 'Balik Tutulmasi',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Team B',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Team C',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </Grid> */ }
        <Paper>
        <form onSubmit={handleRun}>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={10} p={6} sx={{p:3}}>
              <LoadingButton 
                type="submit" 
                loading={loading} 
                variant="contained" 
                endIcon={<SendIcon sx = {{transform:{lg:"scale(2.0)"}, m:3}}/>} 
                size="large" 
                sx={{height: {md: 50, lg:100}, fontSize: 30, m:0}} fullWidth fullHeight>
                Calistir
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField value={urls} disabled={loading}
                  onChange={(e)=> setUrls(e.target.value)} id="urls" label="XML Listesi" variant="outlined" multiline required size="small" helperText="Her url ayri bir satirda olacak"/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField value={kural} disabled={loading}
                  onChange={(e) => setKural(e.target.value)} id="kural" label="Kurallar" variant="outlined" multiline required size="small"/>
            </Grid>
          <Grid>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>MB Kuru kullanilsin mi?</ListSubheader>}
          >
            <ListItem>
              <ListItemIcon>
                <EuroIcon />
              </ListItemIcon>
                <ListItemText id="euro" >
                  Euro { euroMB }
                </ListItemText>
              <Switch
                edge="end"
                onChange={() => setisUseEuroMB(!isUseEuroMB)}
                checked={isUseEuroMB}
                disabled={loading}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-euro',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-dolar" >
                Dolar { dolarMB }
              </ListItemText>
              <Switch
                edge="end"
                onChange={() => {setisUseDolarMB(!isUseDolarMB)}}
                checked={isUseDolarMB}
                disabled={loading}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-dolar',
                }}
              />
            </ListItem>
          </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              <Box >
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="euro">Euro</InputLabel>
                <Input
                  disabled={loading || isUseEuroMB}
                  id="euro"
                  value={isUseEuroMB ? euroMB : euro}
                  onChange={(e) => setEuro(e.target.value)}
                  startAdornment={<InputAdornment position="start">€</InputAdornment>}
                  variant="outlined"
                  sx={{m:1}}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="dolar">Dolar</InputLabel>
                <Input
                  disabled={loading || isUseDolarMB}
                  id="dolar"
                  value={isUseDolarMB ? dolarMB : dolar}
                  onChange={(e) => setDolar(e.target.value)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  variant="outlined"
                  sx={{m:1}}
                />
              </FormControl>
            </Box>
          </Grid>

          {/* <Grid onClick={handleRun} item xs={12} sm={6} md={3}>
            <CCRun title="Calistir" total={0} icon={'ant-design:android-filled'}  required/>
          </Grid> */}
         { /* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
        </form>
        </Paper>
      </Container>
    </>
  );
}

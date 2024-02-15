import Axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { StopList } from './interfaces/StopList';
import { StopData } from './interfaces/StopData';
import { AppBar, Box, Container, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function App() {

  const [stopList, setStopList] = useState<StopList>({});
  const [selectedStop, setSelectedStop] = useState<string>("");
  const [currentStopData, setCurrentStopData] = useState<StopData | null>(null);
  const [currentDisplayStop, setCurrentDisplayStop] = useState<string>("");

  useEffect(() => {
    Axios.get('https://data.foli.fi/siri/sm')
    .then((res) => {
      setStopList(res.data);
    })
  }, [])

  const getStopData = () => {
    Axios.get('https://data.foli.fi/siri/sm/' + selectedStop)
    .then((res) => {
      setCurrentStopData(res.data);
      console.log(res.data);
    })

    const selectedStopName = stopList[selectedStop]?.stop_name;
    setCurrentDisplayStop(`${selectedStop} - ${selectedStopName}`);
  }

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedStop(event.target.value)
  }

  const timeFormatter = (timestamp: number, separator: string = ':'): string => {
    const finnishDate = new Date(timestamp * 1000);
    const hours = finnishDate.getHours().toString().padStart(2, '0');
    const minutes = finnishDate.getMinutes().toString().padStart(2, '0');
    const seconds = finnishDate.getSeconds().toString().padStart(2, '0');
  
    return `${hours}${separator}${minutes}${separator}${seconds}`;
  }


  return (
    <>
      <CssBaseline />
      <Toolbar>
        <AppBar>
          <Container component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField 
              value={selectedStop ?? ''} 
              onChange={handleInputChange}
              placeholder='Syötä pysäkin numero'
              sx={{ 
                maxWidth: "50%",
                backgroundColor: "#fafafa",
                borderRadius: "3px"
              }}
              >
            </TextField>
            <IconButton onClick={getStopData} size="large" sx={{ color: "#fafafa" }}>
              <SearchIcon />
            </IconButton>
          </Container>
        </AppBar>
      </Toolbar>
        <TableContainer component={Paper} sx={{ m: "15px auto 0 auto", maxWidth: "900px" }}>
          <Typography variant='h4' sx={{ mt: "5px", textAlign: "center" }}>{currentDisplayStop}</Typography>
          <Table aria-label='simple-table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Linja
                    <DirectionsBusIcon fontSize='medium' />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Päätepysäkki
                    <PlaceIcon fontSize='medium' />
                  </Box>
                </TableCell>                
                <TableCell>                
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Arvioitu tuloaika
                    <AccessTimeIcon fontSize='medium' />
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              currentStopData?.result ? (
                currentStopData?.result.map((stop) => (
                  <TableRow key={stop.datedvehiclejourneyref} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{stop.lineref}</TableCell>
                    <TableCell>{stop.destinationdisplay}</TableCell>
                    <TableCell>{timeFormatter(stop.expectedarrivaltime)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Pysäkkiä ei löydy tai pysäkkiä ei ole olemassa</TableCell>
                </TableRow>
              )
            }
            </TableBody>
          </Table>
        </TableContainer>
    </>
  )
}

export default App

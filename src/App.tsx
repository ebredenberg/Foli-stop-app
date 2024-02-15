import Axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { StopList } from './interfaces/StopList';
import { StopData } from './interfaces/StopData';
import { AppBar, Container, CssBaseline, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function App() {

  const [stopList, setStopList] = useState<StopList>({})
  const [selectedStop, setSelectedStop] = useState<string>("")
  const [currentStopData, setCurrentStopData] = useState<StopData>({})

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
  }

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedStop(event.target.value)
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
      <TableContainer component={Paper} sx={{ maxWidth: "60%", m: "0 auto 0 auto" }}>
        <Table aria-label='simple-table'>
          <TableHead>
            <TableRow>
              <TableCell>Linja</TableCell>
              <TableCell>Päätepysäkki</TableCell>
              <TableCell>Arvioitu tuloaika</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            currentStopData.result ? (
            currentStopData.result.map((stop) => (
              <TableRow key={stop.datedvehiclejourneyref} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{stop.lineref}</TableCell>
                <TableCell>{stop.destinationdisplay}</TableCell>
                <TableCell>{new Date(stop.expectedarrivaltime * 100).toLocaleString()}</TableCell>
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

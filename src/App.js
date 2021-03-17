import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  wlNoHarm: {
    width: "100%",
    height: "80vh",
    padding: "10px",
    border: 0,
  },
  marginTop: {
    marginTop: "10px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  backdrop: {
    zIndex: 99,
  },
  paper: {
    marginTop: "10px",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Copyright() {
  const classes = useStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.marginTop}
    >
      Last update: 16/03/2021 18:49
    </Typography>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState(0);
  const classes = useStyles();
  const noharmUrl = process.env.REACT_APP_NOHARM_URL;

  const addPrescription = () => {
    setLoading(true);

    setTimeout(() => {
      setPrescriptionId(13);
      setLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <Typography variant="h4" component="h1">
              NoHarm - White Label Example
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Box display="flex" justifyContent="flex-end">
              <Fab variant="extended" color="primary" onClick={addPrescription}>
                <AddIcon className={classes.extendedIcon} />
                Adicionar
              </Fab>
            </Box>
          </Grid>
        </Grid>

        <Paper elevation={3} className={classes.paper}>
          {prescriptionId !== 0 && (
            <iframe
              src={`${noharmUrl}wl/prescricao/${prescriptionId}`}
              title="NoHarm"
              className={classes.wlNoHarm}
            ></iframe>
          )}
          {prescriptionId === 0 && (
            <Typography variant="h6" component="h1" align="center">
              Nenhuma prescrição encontrada
            </Typography>
          )}
        </Paper>

        <Copyright />

        <Backdrop open={loading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}

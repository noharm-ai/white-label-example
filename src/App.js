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
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  modalPaper: {
    padding: "15px",
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
  const [prescriptionLoaded, setPrescriptionLoaded] = useState(false);
  const [modalVisible, setModalVisibility] = useState(false);
  const [token, setToken] = useState("");
  const [inputError, setInputError] = useState(false);

  const classes = useStyles();
  const prescriptionId = 405; // define prescription id
  const noharmUrl = process.env.REACT_APP_NOHARM_URL;
  const apiUrl = process.env.REACT_APP_API_URL;

  const addPrescription = () => {
    setInputError(false);

    if (token === "") {
      setInputError(true);
      return;
    }

    setModalVisibility(false);
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json, text/plain, */*",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idPatient: 800,
        drugs: [
          { id: prescriptionId + 100, idDrug: 1, idFrequency: 8, dose: 10 },
          { id: prescriptionId + 101, idDrug: 2, idFrequency: 8, dose: 10 },
        ],
      }),
    };
    fetch(`${apiUrl}/prescriptions/static/${prescriptionId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
        setPrescriptionLoaded(true);
        setLoading(false);
      });
  };

  const openModal = () => {
    setModalVisibility(true);
  };

  const handleClose = () => {
    setModalVisibility(false);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
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
              <Fab variant="extended" color="primary" onClick={openModal}>
                <AddIcon className={classes.extendedIcon} />
                Add
              </Fab>
            </Box>
          </Grid>
        </Grid>

        <Paper elevation={3} className={classes.paper}>
          {prescriptionLoaded && (
            <iframe
              src={`${noharmUrl}wl/prescricao/${prescriptionId}/${token}`}
              title="NoHarm"
              className={classes.wlNoHarm}
            ></iframe>
          )}
          {!prescriptionLoaded && (
            <Typography variant="h6" component="h1" align="center">
              No prescription found.{" "}
              <a href="#" onClick={openModal}>
                {" "}
                Add a new prescription
              </a>
            </Typography>
          )}
        </Paper>

        <Copyright />

        <Backdrop open={loading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalVisible}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalVisible}>
            <Paper elevation={3} className={classes.modalPaper}>
              <Box display="flex" flexDirection="column">
                <TextField
                  required
                  label="Access Token"
                  helperText="Use the REST API to get this"
                  onChange={handleTokenChange}
                  error={inputError}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                  onClick={addPrescription}
                >
                  Add Prescription
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}

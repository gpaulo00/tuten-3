import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Gustavo Paulo. '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const columns = [
  { field: 'bookingId', headerName: 'BookingId', width: 120 },
  {
    field: 'client',
    headerName: 'Cliente',
    width: 200,
    filterable: false,
    sortable: false,
    valueGetter: (params) => {
      const user = params.getValue('locationId').tutenUser;
      return `${user.firstName || ''} ${user.lastName || ''}`;
    },
  },
  {
    field: 'bookingTime',
    headerName: 'Fecha de Creación',
    width: 175,
    valueGetter: (params) => {
      const time = new Date(params.row.bookingTime);
      return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
    },
  },
  {
    field: 'streetAddress',
    headerName: 'Dirección',
    width: 500,
    valueGetter: (params) => `${params.getValue('locationId').streetAddress || ''}`,
  },
  { field: 'bookingPrice', headerName: 'Precio' },
];

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      errorMsg: null,
      loading: true,
    };
  }

  componentDidMount() {
    const target = "contacto@tuten.cl";
    axios.get(`https://dev.tuten.cl:443/TutenREST/rest/user/${encodeURI(target)}/bookings?current=true`, {
      headers: {
        'Adminemail': 'testapis@tuten.cl',
        'App': 'APP_BCK',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': this.props.token,
      },
    }).then((res) => {
      this.setState({ items: res.data, loading: false, errorMsg: null });
    }).catch((err) => {
      this.setState({ items: [], loading: false, errorMsg: err.message });
    });
  }

  render() {
    const { classes } = this.props;
    const loading = this.state.loading && (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="secondary" />
      </Box>
    );
    const errMsg = (
      this.state.errorMsg &&
        <Alert severity="error">{this.state.errorMsg}</Alert>
    );

    return (
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Datos Requeridos
          </Typography>
          <form className={classes.form} noValidate>
            {loading}
            {errMsg}
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                autoHeight
                getRowId={(row) => row.bookingId}
                rows={this.state.items}
                columns={columns}
                pageSize={10}
              />
            </div>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Content);
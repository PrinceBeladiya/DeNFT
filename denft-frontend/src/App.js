import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider } from 'material-ui';

import Routes from './Routes';
import MUITheme from './assets/mui/muiTheme';
import './assets/styles/app.scss';

function App() {
  return (
    <MuiThemeProvider theme={MUITheme}>
      <div className="App">
        <ToastContainer id="forToast" />
        <Routes />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

import Router from "./routes/Router"
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./contexts/UserContext";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<UserProvider>
			<ToastContainer />
			<Router />
		</UserProvider>
	);
}

export default App;
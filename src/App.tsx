import { UserDataProvider } from './contexts/UserDataContext';
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <UserDataProvider>
      <AppRoutes/>
    </UserDataProvider>
  );
}

export default App;

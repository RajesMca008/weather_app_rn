import { Provider } from 'react-redux';
import { store } from './src/store/store';

import HomeScreen from './src/screens/homeScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* Calling Home screen */}
      <HomeScreen />
    </Provider>
  );
};

export default App;

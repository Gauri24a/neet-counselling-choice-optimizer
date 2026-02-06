import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Landing from './pages/Landing';
import InputDetails from './pages/InputDetails';
import ChoiceBuilder from './pages/ChoiceBuilder';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/input-details" element={<InputDetails />} />
        <Route path="/choice-builder" element={<ChoiceBuilder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

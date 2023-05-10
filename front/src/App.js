import { Toaster } from 'react-hot-toast';
import './App.css';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Guerreiro from './components/Guerreiro';
import Mago from './components/Mago';
import Search from './components/Search';
import Tanque from './components/Tanque';

function App() {
  return (
    <>
      <Toaster/>
      <div className='flex flex-wrap p-3 gap-10 justify-center'>
        <Search />
        <Create />
        <Edit/>
        <Delete/>
      </div>
      <div className='flex flex-col p-3'>
        <Guerreiro/>
        <Mago/>
        <Tanque/>
      </div>
    </>
  );
}

export default App;

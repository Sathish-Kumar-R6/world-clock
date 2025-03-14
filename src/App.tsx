import { useState } from 'react';
import './App.css';
import Clock from './clock/world-clock'
import SelectTimeZone from './select-timezone/select-timezone';

function App() {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [appZone, setAppzone] = useState(currentTimeZone)

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(e.target.value)
    setAppzone(e.target.value)
  }
  return (
    <>
    <SelectTimeZone value={appZone} handleOnChange={handleOnChange} />
    <Clock timeZone={appZone}/>
    </>
  );
}

export default App;

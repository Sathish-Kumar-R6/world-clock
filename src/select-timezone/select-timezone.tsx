import { getAllTimeZones } from "../helper"
import { Select } from 'verbose-uikit'

type Props = {
  value: string;
  handleOnChange: React.ChangeEventHandler<HTMLSelectElement>
  disabled?: boolean;
}

function SelectTimeZone({ value, handleOnChange, disabled }: Props) {

  const allZones = getAllTimeZones()

  return (  
    <Select value={value} options={allZones} handleOnChange={handleOnChange} disabled={disabled} />
  )
}

export default SelectTimeZone
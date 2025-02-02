import { getAllTimeZones } from "../helper"
import './select-timezone.css'

type Props = {
  value: string;
  handleOnChange: React.ChangeEventHandler<HTMLSelectElement>
  disabled?: boolean;
}

function SelectTimeZone({ value, handleOnChange, disabled }: Props) {

  const allZones = getAllTimeZones()

  return (
    <select onChange={handleOnChange} value={value} disabled={disabled} title={value}>
      {allZones.map((zone) => <option key={zone.timeZone} value={zone.timeZone}>{zone.timeZone} {zone.offset}</option>)}
    </select>
  )
}

export default SelectTimeZone
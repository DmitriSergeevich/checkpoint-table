import { getPersonData } from "../../utils/utils"

const PersonRow = ({data, styles}) => {
  return (
    <tr key={data.id}>
      <td key={data.id + 'name'}
        className={styles.stickyLeft}
      >
        {data.Fullname}
      </td>
      {getPersonData(data.Days, data.id)}
      <td key={data.id + 'total'}
        className={styles.stickyRight}
      >
        {data.total.utc}
      </td>
    </tr>
  )
}

export default PersonRow
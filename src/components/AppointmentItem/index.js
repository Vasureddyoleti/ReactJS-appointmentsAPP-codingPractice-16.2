// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarButton} = props

  const {id, title, date, isStarred} = appointmentDetails

  const starredButton = () => {
    onClickStarButton(id)
  }

  const starButton = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-list-container">
      <div className="list-item">
        <div className="heading-button">
          <p className="title">{title}</p>
          <button
            type="button"
            className="star-button"
            data-testid="star"
            onClick={starredButton}
          >
            <img src={starButton} alt="star" />
          </button>
        </div>
        <p className="date-time">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem

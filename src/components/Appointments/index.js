// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isStarButtonClicked: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return {...eachAppointment}
      }),
    }))
  }

  getStarredAppointments = () => {
    const {appointmentList} = this.state

    this.setState(prevState => ({
      isStarButtonClicked: !prevState.isStarButtonClicked,
      appointmentList: appointmentList.filter(
        eachItem => eachItem.isStarred === true,
      ),
    }))
  }

  render() {
    const {title, date, appointmentList, isStarButtonClicked} = this.state

    const starredButtonClass = isStarButtonClicked
      ? 'starredButtonActive'
      : 'starredButton'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <div className="form-cont">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-el" onSubmit={this.onClickSubmit}>
                <label className="label-text">
                  TITLE <br />
                  <input
                    className="inputEl"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </label>
                <br />
                <label className="label-text">
                  DATE <br />
                  <input
                    className="inputEl"
                    type="date"
                    name="date"
                    value={date}
                    onChange={this.onChangeDate}
                  />
                </label>
                <br />
                <button className="submit-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="img-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="middle-container">
            <h1 className="mini-heading">Appointments</h1>
            <button
              className={`${starredButtonClass}`}
              type="button"
              onClick={this.getStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {appointmentList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                onClickStarButton={this.onClickStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

import React from 'react';
import './profile.css';
import Footer from '../footer/footer';
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.receiveSearchStatus(false);
    let currentUserId = undefined;
    if (this.props.currentUser.token) {
      currentUserId = this.props.currentUser.token.id;
    } else {
      currentUserId = this.props.currentUser.id;
    }
    this.setState({});
    this.props.fetchUserBookings(currentUserId)
      .then(() => Object.values(this.props.bookings).forEach((booking) => {
        this.props.fetchSpot(booking.spot_id).then((response) => {
          this.setState({
            [booking._id]: response.spots.data[booking.spot_id]
          });
        });
      }));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.history.location.pathname !== this.props.history.location.pathname) {
      this.props.fetchUserBookings(this.props.currentUserId)
        .then(() => Object.values(this.props.bookings).forEach((booking) => {
  
          this.props.fetchSpot(booking.spot_id);
        }));
    }
  }

  render() {
    if (!this.props.bookings) return null;
    if (Object.keys(this.state).length < Object.keys(this.props.bookings).length) return null;
    const bookings = this.props.bookings;

    const bookingsLis = bookings.map( booking => {
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        const createdAt = new Date(booking.created_at);
        const imgUrl = this.state[booking._id].images[0].img_url;
        return (
          <li key={booking._id}>
            <div>
              <Link key={booking._id} to={`/spot/${booking.spot_id}`}>
                <img className="bookings-photo" src={imgUrl} alt="" />
              </Link>
              <div className="profile-booking-text">
                <h5>{this.state[booking._id].name}</h5>
                <p>
                  Booked on: {createdAt.getMonth() + 1}/
                  {createdAt.getDate()}/{createdAt.getFullYear()}
                </p>
                <p>
                  From: {startDate.getMonth() + 1}/{startDate.getDate()}
                  /{startDate.getFullYear()}
                </p>
                <p>
                  Until: {endDate.getMonth() + 1}/
                  {endDate.getDate() + 1}/{endDate.getFullYear()}
                </p>
                <p>Booked for {booking.guest_count} occupant(s)</p>
              </div>
            </div>
            <div className="profile-booking-delete-button-div">
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.deleteBooking(booking._id);
                }}
              >
                Delete booking
              </button>
            </div>
          </li>
        );
      })
    return (
      <div>
        <div className="profile">
          <h2>Upcoming plans</h2>
          {(this.props.bookings.length > 0) ? <ul>{bookingsLis}</ul> : <h3>You have no upcoming trips. Start exploring ideas for your next trip.</h3>}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
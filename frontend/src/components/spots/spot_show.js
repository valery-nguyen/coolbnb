import React from 'react';
import { withRouter } from 'react-router-dom';
import ReservationFormContainer from './reservation_form_container';
import Footer from '../footer/footer';

class SpotShow extends React.Component {
  componentDidMount() {
    if (!this.props.spot) {
      this.props.fetchSpot(this.props.spot_id);
    } 
    this.props.receiveSearchStatus(false);
  }

  render() {
    if (!this.props.spot) return (<div></div>)
    
    return (
      <div className="spotshow-main-container">
        <div className="spotshow-main">
          <div id="spotshow-photo-container">
            <img className="spotshow-photo-large" src={this.props.spot.images[0].img_url} alt="" />
            <img className="spotshow-photo-large" src={this.props.spot.images[1].img_url} alt="" />
          </div>
          <div id="outer">
            <div className="spotshow-info-column">
              <p className="spotshow-name">{this.props.spot.name}</p>
              <p className="spotshow-city">{this.props.spot.city} </p>
              <span className="spotshow-occupancy">Occupancy
                <p className="s">{this.props.spot.occupancy} guests</p>
              </span>
              <div className="spotshow-description">
                <p>
                  {this.props.spot.description}
                </p>
              </div>
              <br /><br />
              <div className="policies">
                <br />
                <p className="spotshow-name">Policies</p>
                <div className="spotshow-description">
                  <span className="spotshow-occupancy"> House Rules </span>
                  <p> Not safe or suitable for infants (under 2 years) and pets </p>
                  <p> No smoking, parties, or events </p>
                  <p> Check-in is anytime after 3PM and check out by 11AM </p>
                </div>
                
              </div>
              <br /><br />
              <div className="policies">
                <br />
                <span className="spotshow-occupancy"> Cancellations </span>
                <div className="spotshow-description">
                  <span className="spotshow-occupancy"> Strict - Free cancellation for 48 hours </span>
                  <p> After that, cancel up to 7 days before check-in and get a 50% refund, minus the service fee. </p>
                </div>
              </div>
            </div>
            <div className="check-in-box">
              <ReservationFormContainer spot={this.props.spot} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(SpotShow);
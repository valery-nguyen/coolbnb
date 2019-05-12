import React from 'react';
import { withRouter } from 'react-router-dom';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer">
          <p>2019 CoolBnb, a minimal clone of Airbnb.com </p>
            <div>
              <a href="https://www.linkedin.com/in/valeryn/" target="_blank">LinkedIn</a>|
              <a href="https://github.com/valery-nguyen" target="_blank">GitHub</a>|
              <a href="https://angel.co/valeryn" target="_blank">AngelList</a>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
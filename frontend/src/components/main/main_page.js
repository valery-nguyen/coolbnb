import React from 'react';
import Footer from '../footer/footer';
import './splash_page.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.rotateImage = this.rotateImage.bind(this);
  }
  componentDidMount() {
    this.rotateImage();
  }

  rotateImage() {
    const image = document.getElementById("splash-page-img");
    if (image) {
      setTimeout(() => {
        if (image.className === 'splash-page-img bg1') {
          image.setAttribute('class', 'splash-page-img bg2');
        } else {
          image.setAttribute('class', 'splash-page-img bg1');
        }
        this.rotateImage();
      }, 5000);
    }
  }

  render() {
    return (
      <div className="splash-page-container">
        <div className="splash-page">
          <h1 className="splash-page-title" >Book unique home and experiences.</h1>
          <h1 className="splash-page-description" >Welcome to CoolBnb!</h1>
          <img alt="" id="splash-page-img" className="splash-page-img bg1" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
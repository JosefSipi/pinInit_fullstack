import React from "react";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPhoto: 0,
      images: {
        0: window.gif_0,
        1: window.gif_1,
        2: window.gif_2,
        3: window.gif_3,
        4: window.gif_4,
      },
    };

    this.arrowClick = this.arrowClick.bind(this);
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  scrollEvent(e) {}

  arrowClick(e) {
    e.preventDefault();

    let arrows = document.getElementsByClassName("arrow-landing");
    arrows[0].classList.remove("pulse-animation");
    arrows[1].classList.remove("pulse-animation");

    let pNum = this.state.displayPhoto;

    if (e.currentTarget.id === "landing-left") {
      if (pNum === 0) {
        this.setState({ displayPhoto: 4 });
      } else {
        this.setState({ displayPhoto: pNum - 1 });
      }
    } else {
      if (pNum === 4) {
        this.setState({ displayPhoto: 0 });
      } else {
        this.setState({ displayPhoto: pNum + 1 });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="main-splash" onScroll={this.scrollEvent}>
          <div className="exp-pro">Explore Pininit</div>

          <div id="section-two-splash" className="section-two-splash">
            <img src={this.state.images[0]} alt="gif 0" />
            <div>
              Create a new pin with an optional title, description, and source
              link
            </div>
          </div>

          <div id="section-three-splash" className="section-three-splash">
            <div>Change user avatar to your desired image</div>
            <img src={this.state.images[1]} alt="gif 1" />
          </div>

          <div id="section-four-splash" className="section-four-splash">
            <img src={this.state.images[2]} alt="gif 2" />
            <div>Leave comments on pins from your home feed</div>
          </div>
        </div>

        <div className="footer-main-splash">
          <a
            target="_blank"
            href="https://josefsipi.github.io/"
            className="profile-pic"
          >
            <img src={window.profilePic} alt="profilepic" />
          </a>

          <a
            target="_blank"
            href="https://josefsipi.github.io/"
            className="portfolio-link-footer"
          >
            Joseph Sipiorski
          </a>
          <a
            target="_blank"
            href="https://github.com/JosefSipi"
            className="portfolio-link-footer"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/joseph-sipiorski-590452195/"
            className="portfolio-link-footer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;

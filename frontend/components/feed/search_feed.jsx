import React from "react";
import { Link } from "react-router-dom";
import { photoIsLoaded } from "../../utils/util_functions/pin_func";

class SearchFeed extends React.Component {
  constructor(props) {
    super(props);

    if (!props.history.location.params) {
      props.history.push("/feed");
    }

    this.state = {
      feed: null,
    };

    this.openTheLink = this.openTheLink.bind(this);
  }

  componentDidMount() {
    if (!!this.props.history.location.params) {
      this.props
        .searchFeedCall(this.props.history.location.params)
        .then((data) => {
          this.setState({ feed: data.pins });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.feed !== prevProps.feed) {
      this.setState({ feed: this.props.feed });
    }
  }

  openTheLink(e) {
    e.preventDefault();
    window.open(e.currentTarget.id);
  }

  render() {
    if (!this.props.history.location.params) {
      return null;
    }

    if (!this.state.feed) {
      return null;
    }

    let pins = Object.values(this.state.feed);

    if (pins.length === 0) {
      this.props.history.push("/feed");
    }

    return (
      <div className="search-feed-main-div">
        <div className="pin_container" id="pin_container">
          {pins.map((pin) => (
            <Link
              data-link_title={pin.title}
              to={`/pin/${pin.id}`}
              onLoad={photoIsLoaded}
              id={`card-card-card${pin.id}`}
              className="card-update"
              style={({ gridRowEnd: `span 45` }, { visibility: "hidden" })}
              key={pin.id}
            >
              <div className="outside-edit-pin-board-show"></div>

              <div className="outside-surrounding-pin-image-div">
                <img
                  loading="lazy"
                  className="pin-photo"
                  src={pin.photoUrl}
                  alt="pin photo"
                />

                <div
                  data-div_id={pin.id}
                  className="the-shade-over-pin"
                  id={`the-shade-over-pin${pin.id}`}
                >
                  <div
                    style={
                      pin.websiteURL.length < 3
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    className="website-url-div-hoverthing"
                    id={pin.websiteURL}
                    onClick={this.openTheLink}
                  >
                    <img
                      className="arr-in-website"
                      src={window.upRightArrowURL}
                      alt="up arrow"
                    />
                    {`${pin.websiteURL}`.slice(8, 16) + "...."}
                  </div>
                </div>
              </div>

              <div className="card-title-pin">{pin.title}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchFeed;

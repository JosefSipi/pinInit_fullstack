import React from "react";
import { Link } from "react-router-dom";
import { photoIsLoaded } from "../../utils/util_functions/pin_func";
import { ProfileAvatar } from "../../utils/util_components/image_components";

class BoardShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: null,
      backdropCreatePinActive: false,
      boardOptionsActive: false,
    };

    this.modalFunction = this.modalFunction.bind(this);
    this.isProfileUser = this.isProfileUser.bind(this);
    this.moreClickedDD = this.moreClickedDD.bind(this);
    this.backdropClick = this.backdropClick.bind(this);
    this.editPen = this.editPen.bind(this);
    this.openTheLink = this.openTheLink.bind(this);
  }

  openTheLink(e) {
    e.preventDefault();
    window.open(e.currentTarget.id);
  }

  editPen(e) {
    e.preventDefault();
    window.editingBoard = e.currentTarget.id;
    this.props.openModal("editBoard");

    this.setState({
      backdropCreatePinActive: false,
      boardOptionsActive: false,
    });
  }

  moreClickedDD(e) {
    e.preventDefault();

    this.setState({
      backdropCreatePinActive: !this.state.backdropCreatePinActive,
      boardOptionsActive: !this.state.boardOptionsActive,
    });
  }

  backdropClick(e) {
    e.preventDefault();

    this.setState({
      backdropCreatePinActive: false,
      boardOptionsActive: false,
    });
  }

  modalFunction(e) {
    e.preventDefault();
    window.editPin = e.currentTarget.id;
    this.props.openModal("editPin");
  }

  componentDidMount() {
    this.props.fetchBoard(Number(this.props.match.params.id)).then((data) => {
      this.props.fetchUserProfile(data.board.owner_id);
    });
    this.props.fetchPins(Number(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.setState({ userProfile: this.props.userProfile });
    }
  }

  isProfileUser(pins) {
    if (window.currentUser.id === this.props.boardProfile.owner_id) {
      return (
        <div>
          <div className="boards-grid-area-for-pins">
            <div className="top-section">
              {this.state.backdropCreatePinActive && (
                <div
                  className="backdrop-div-create-pin-show_board"
                  onClick={this.backdropClick}
                  id="backdrop-div-create-pin"
                ></div>
              )}

              <div>
                <h1 className="header-title-boards-show-123">
                  {this.props.boardProfile.title}

                  <span>
                    <div
                      className="board-duplicate-button-dd"
                      onClick={this.moreClickedDD}
                    >
                      <img
                        className="boards-123-1"
                        src={window.dotsBlackURL}
                        alt="more icon"
                      />
                    </div>

                    <div className="div-holder-helper-123">
                      {this.state.boardOptionsActive && (
                        <div
                          className="edit-dropdown-menue-1235"
                          id="edit-dropdown-menue-123-id"
                        >
                          <h1 className="title-dd">Board options</h1>
                          <div
                            onClick={this.editPen}
                            id={this.props.boardProfile.id}
                          >
                            Edit board
                          </div>
                        </div>
                      )}
                    </div>
                  </span>
                </h1>
              </div>

              <Link
                className="the-link-on-profilepic-on-board"
                to={`/profile/${this.props.userProfile.id}`}
              >
                <div className="profile-div-small-photo-div-123">
                  <ProfileAvatar
                    photoUrl={this.props.userProfile.photoUrl}
                    usersName={this.props.userProfile.f_name}
                  />
                </div>
              </Link>

              <div>
                <h2 className="h2-non-user-board-show">
                  {this.props.boardProfile.description}{" "}
                </h2>
                <div
                  className="is-private-board-show"
                  style={
                    this.props.boardProfile.is_private
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <img src={window.smallLockURL} alt="lock" />
                  secret board
                </div>
              </div>
            </div>
          </div>

          <div className="number-pins-bar-board-show">
            <div className="num-pins-show-board">
              {Object.keys(this.props.pins.pins).length === 1
                ? "1 Pin"
                : `${Object.keys(this.props.pins.pins).length} Pins`}
            </div>
          </div>

          <div className="pin-area-on-board-show">
            {pins.length === 0 ? (
              <div className="no-pins-txt">
                There aren't any Pins on this board yet
              </div>
            ) : (
              <div className="pin_container" id="pin_container">
                {pins.map((pin) => (
                  <Link
                    data-link_title={pin.title}
                    to={`/pin/${pin.id}`}
                    onLoad={photoIsLoaded}
                    id={`card-card-card${pin.id}`}
                    className="card-update"
                    style={
                      ({ gridRowEnd: `span 45` }, { visibility: "hidden" })
                    }
                    key={pin.id}
                  >
                    <div className="outside-edit-pin-board-show"></div>

                    <div className="outside-surrounding-pin-image-div">
                      <img
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
                          {" "}
                          <img
                            className="arr-in-website"
                            src={window.upRightArrowURL}
                            alt="up arrow"
                          />{" "}
                          {`${pin.websiteURL}`.slice(8, 16) + "...."}
                        </div>

                        <div
                          id={pin.id}
                          className="edit-pen-div-show-board"
                          onClick={this.modalFunction}
                        >
                          <img src={window.editPenURL} alt="edit pen" />
                        </div>
                      </div>
                    </div>

                    <div className="card-title-pin">{pin.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="boards-grid-area-for-pins">
            <div className="top-section">
              {this.state.backdropCreatePinActive && (
                <div
                  className="backdrop-div-create-pin-show_board"
                  onClick={this.backdropClick}
                  id="backdrop-div-create-pin"
                ></div>
              )}

              <div className="div-22-1">
                <h1 className="header-title-boards-show-123">
                  {this.props.boardProfile.title}
                </h1>
              </div>

              <Link
                to={`/profile/${this.props.userProfile.id}`}
                className="link-surrounding-profile-image"
              >
                <img
                  className="profile-photo-icon-22-22"
                  src={this.props.userProfile.photoUrl}
                  alt="profile photo"
                />
              </Link>

              <div className="div-22-22">
                <Link
                  to={`/profile/${this.props.userProfile.id}`}
                  className="board-username-link-to-profile"
                >
                  <p>
                    {this.props.userProfile.f_name}{" "}
                    {this.props.userProfile.l_name}
                  </p>
                </Link>

                <h2 className="h2-non-user-board-show">
                  · {this.props.boardProfile.description}{" "}
                </h2>
              </div>
            </div>
          </div>

          <div className="pin-area-on-board-show">
            {pins.length === 0 ? (
              <div className="no-pins-txt">
                There aren't any Pins on this board yet
              </div>
            ) : (
              <div className="pin_container" id="pin_container">
                {pins.map((pin) => (
                  <Link
                    data-link_title={pin.title}
                    to={`/pin/${pin.id}`}
                    onLoad={photoIsLoaded}
                    id={`card-card-card${pin.id}`}
                    className="card-update"
                    style={
                      ({ gridRowEnd: `span 45` }, { visibility: "hidden" })
                    }
                    key={pin.id}
                  >
                    <div className="outside-edit-pin-board-show"></div>

                    <div className="outside-surrounding-pin-image-div">
                      <img
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
                          {" "}
                          <img
                            className="arr-in-website"
                            src={window.upRightArrowURL}
                            alt="up arrow"
                          />{" "}
                          {`${pin.websiteURL}`.slice(8, 16) + "...."}
                        </div>
                      </div>
                    </div>

                    <div className="card-title-pin">{pin.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.props.pins.pins || !this.props.userProfile) {
      return null;
    }
    const pins = Object.values(this.props.pins.pins);

    return <div>{this.isProfileUser(pins)}</div>;
  }
}

export default BoardShow;

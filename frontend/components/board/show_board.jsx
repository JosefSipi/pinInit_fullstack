import React from "react";
import { Link } from "react-router-dom";
import { photoIsLoaded } from "../../utils/util_functions/pin_func";
import { ProfileAvatar } from "../../utils/util_components/image_components";

class BoardShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: null,
    };

    this.modalFunction = this.modalFunction.bind(this);
    this.isProfileUser = this.isProfileUser.bind(this);
    this.moreClickedDD = this.moreClickedDD.bind(this);
    this.backdropClick = this.backdropClick.bind(this);
    this.editPen = this.editPen.bind(this);
    this.openTheLink = this.openTheLink.bind(this);
    this.onMouseLeaveCall = this.onMouseLeaveCall.bind(this);
    this.onMouseEnterCall = this.onMouseEnterCall.bind(this);
  }

  onMouseLeaveCall(e) {
    e.preventDefault();
    let theId = Number(
      e.currentTarget.children[1].children[1].getAttribute("data-div_id")
    );
    let shadowCover = document.getElementById(`the-shade-over-pin${theId}`);
    shadowCover.style.display = "none";
  }

  onMouseEnterCall(e) {
    e.preventDefault();
    let theId = Number(
      e.currentTarget.children[1].children[1].getAttribute("data-div_id")
    );
    let shadowCover = document.getElementById(`the-shade-over-pin${theId}`);
    shadowCover.style.display = "block";
  }

  openTheLink(e) {
    e.preventDefault();
    window.open(e.currentTarget.id);
  }
  editPen(e) {
    e.preventDefault();
    window.editingBoard = e.currentTarget.id;
    this.props.openModal("editBoard");

    let dropDown = document.getElementById("edit-dropdown-menue-123-id");
    let backdrop = document.getElementById("backdrop-div-create-pin");
    if (dropDown.style.display === "none") {
      dropDown.style.display = "none";
      // backdrop.style.display = "block"

      backdrop.style.display = "none";
    } else {
      dropDown.style.display = "none";
      backdrop.style.display = "none";
    }
  }

  moreClickedDD(e) {
    e.preventDefault();
    let dropDown = document.getElementById("edit-dropdown-menue-123-id");
    let backdrop = document.getElementById("backdrop-div-create-pin");
    if (dropDown.style.display === "none" || dropDown.style.display === "") {
      dropDown.style.display = "flex";
      backdrop.style.display = "block";
    } else {
      dropDown.style.display = "none";
      backdrop.style.display = "none";
    }
  }

  backdropClick(e) {
    e.preventDefault();

    let dropDown = document.getElementById("edit-dropdown-menue-123-id");
    let backdrop = document.getElementById("backdrop-div-create-pin");
    if (dropDown.style.display === "none") {
      dropDown.style.display = "none";
      // backdrop.style.display = "block"

      backdrop.style.display = "none";
    } else {
      dropDown.style.display = "none";
      backdrop.style.display = "none";
    }

    // let ul = document.getElementById('board-dropdown-create-pin')
    // if (ul.style.display === "block") {
    //     ul.style.display = "none"
    // } else {
    //     // ul.style.display = "block"
    // }
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
    // if(prevProps.boardProfile !== this.props.boardProfile){
    //     this.props.fetchUser(this.props.boardProfile.owner_id)
    // }
  }

  isProfileUser(pins) {
    if (window.currentUser.id === this.props.boardProfile.owner_id) {
      return (
        <div>
          <div className="boards-grid-area-for-pins">
            <div className="top-section">
              <div
                className="backdrop-div-create-pin"
                onClick={this.backdropClick}
                id="backdrop-div-create-pin"
              ></div>

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

              {/* <p>45 followers</p> */}

              {/* <button>Share</button> */}
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
                {pins.map(
                  (pin) => (
                    //    <Link className="link-pin-on-board-pins" to={`/pin/${pin.id}`} key={pin.id + 'pin-key'}>
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
                      onMouseEnter={this.onMouseEnterCall}
                      onMouseLeave={this.onMouseLeaveCall}
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
                  )
                  // </Link>
                )}
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
              <div
                className="backdrop-div-create-pin"
                onClick={this.backdropClick}
                id="backdrop-div-create-pin"
              ></div>

              <div className="div-22-1">
                <h1 className="header-title-boards-show-123">
                  {this.props.boardProfile.title}
                  {/* <div className="board-duplicate-button-dd" onClick={this.moreClickedDD}>
                        <img className="boards-123-1" src={window.dotsBlackURL} alt="more icon"/>
                    </div>
                        <div className="div-holder-helper-123">
                            <div className="edit-dropdown-menue-1235" id="edit-dropdown-menue-123-id">
                                <h1 className="title-dd">Board options</h1>
                                <div id={this.props.boardProfile.id}>Follow</div>
                            </div>
                        </div> */}
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

              {/* <p>45 followers</p> */}

              {/* <button>Share</button> */}
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
                    onMouseEnter={this.onMouseEnterCall}
                    onMouseLeave={this.onMouseLeaveCall}
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
    // if (!this.props.boardProfile || !this.props.pins.pins || !this.props.userProfile){
    //     return null
    // }

    const pins = Object.values(this.props.pins.pins);

    // const theHeight = 45;

    return <div>{this.isProfileUser(pins)}</div>;
  }
}

export default BoardShow;

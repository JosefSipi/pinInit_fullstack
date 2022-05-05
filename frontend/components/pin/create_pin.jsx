import React from "react";
import LoadingIcon from "./loading";
import Compressor from "compressorjs";
import imageCompression from "browser-image-compression";
import { ProfileAvatar } from "../../utils/util_components/image_components";

class CreatePin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: {
        creator_id: window.currentUser.id,
        title: "",
        description: "",
        description2: "",
        websiteURL: "",
        board_id: null,
        photo: null,
      },
      isTrue: false,
      thePhotoURL: "",
      loading: false,
      boardTitle: false,
      boards: null,
      img_err: false,
      err_msg: "",
      showHelpDes: false,
      showHelpMount: false,
      addTxtButtonDisp: true,
      altTextAreaActive: false,
      backdropActive: false,
      dropDownActive: false,
      inputImgLabelPinActive: true,
      modalsPinDisplayActive: true,
      deleteDropDownMenueActive: false,
    };

    this.handelAddText = this.handelAddText.bind(this);
    this.handelUlClick = this.handelUlClick.bind(this);
    this.boardClickSelect = this.boardClickSelect.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.deletePreview = this.deletePreview.bind(this);
    this.deleteDropDownClick = this.deleteDropDownClick.bind(this);
    this.moreClicked = this.moreClicked.bind(this);
    this.backdropClick = this.backdropClick.bind(this);
    this.populateBoardField = this.populateBoardField.bind(this);
    this.createABoard = this.createABoard.bind(this);
    this.boardDropDownSelectCreate = this.boardDropDownSelectCreate.bind(this);
    this.helpDescription = this.helpDescription.bind(this);
    this.imgConvertToWebp = this.imgConvertToWebp.bind(this);
  }

  helpDescription() {
    if (this.state.showHelpMount) {
      this.setState({ showHelpDes: true });

      setTimeout(() => {
        this.setState({ showHelpDes: false });
        this.setState({ showHelpMount: false });
      }, 10000);
    }
  }

  boardDropDownSelectCreate() {
    const boardsFromState = this.state.boards;

    const boards = Object.values(boardsFromState);
    const objBoards = { ...boardsFromState };

    let displayBoardId = this.state.pin.board_id;

    let displayTitle = boardsFromState[displayBoardId];

    if (displayBoardId === null && boards.length === 0) {
      displayTitle = "Select";
    } else if (displayBoardId === null && boards.length > 0) {
      displayTitle = objBoards[Object.keys(objBoards)[0]].title;
    } else {
      displayTitle = objBoards[displayBoardId].title;
    }

    return (
      <div className="left-top-bar-createpindiv">
        <div
          placeholder="Select"
          id="board-dd-create-pin"
          className="board-dd-create-pin"
          onClick={this.handelUlClick}
        >
          <div>{displayTitle} </div>
        </div>

        <div className="down-arrow-div" onClick={this.handelUlClick}>
          <img
            src={window.downArrowURL}
            alt="down arrow icon"
            id="down-arrow-image-create-pin"
          />
        </div>

        <div className="save-button-create-pin" onClick={this.handelSubmit}>
          Save
        </div>

        {this.state.dropDownActive && (
          <div
            className="board-dropdown-create-pin"
            id="board-dropdown-create-pin"
          >
            <div className="arround-ul-dd">
              <ul className="board-dropdown-ol" id="board-dropdown-ol">
                {boards.map((board) => (
                  <div
                    className="this-list-children-pin"
                    key={board.id}
                    onClick={this.boardClickSelect}
                    id={board.id}
                    onMouseEnter={this.mouseHoverBoard}
                    onMouseLeave={this.mouseHoverBoard}
                  >
                    <div className="around-dd-board-pin-display">
                      <div className="rounded-border-for-img">
                        {board.pinPhotos.one && (
                          <img
                            className="photo-pin-in-board-opt"
                            src={board.pinPhotos.one}
                            alt=""
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      {board.title.length > 20
                        ? board.title.slice(0, 20).trim() + "..."
                        : board.title}
                    </div>

                    <div
                      className="logo-on-logged-in-header-board-lock-pin"
                      style={
                        board.is_private
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <img
                        id="logo-lock-icon-pin-page"
                        src={window.lockURL}
                        alt="lock-icon"
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div
              className="bottom-section-in-dd-pin"
              onClick={this.createABoard}
            >
              <div className="red-plus-icon-div">
                <img
                  className="red-plus-icon"
                  src={window.redPlusIcon}
                  alt="red +"
                />
              </div>
              <div className="d334">Create Board</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  createABoard() {
    this.props.openModal("createBoard");
  }

  handelSubmit(e) {
    e.preventDefault();

    if (!this.state.pin.board_id) {
      this.handelUlClick(e);
      return;
    }

    if (!this.state.pin.photo) {
      this.setState({
        img_err: true,
        err_msg: "An image is required to create a Pin.",
      });
      return;
    }

    let boards = Object.values(this.props.boards.boards);
    const objBoards = { ...this.props.boards.boards };

    let the_board_id;

    if (this.state.pin.board_id === null && boards.length === 0) {
    } else if (this.state.pin.board_id === null && boards.length > 0) {
      the_board_id = objBoards[Object.keys(objBoards)[0]].id;
    } else {
      the_board_id = this.state.pin.board_id;
    }

    const formData = new FormData();
    formData.append("pin[photo]", this.state.pin.photo);
    formData.append("pin[creator_id]", this.state.pin.creator_id);
    formData.append("pin[title]", this.state.pin.title);
    formData.append("pin[description]", this.state.pin.description);
    formData.append("pin[description2]", this.state.pin.description2);
    formData.append("pin[websiteURL]", this.state.pin.websiteURL);
    formData.append("pin[board_id]", the_board_id);

    this.setState({ loading: true });
    this.props.createNewPin(formData).then((data) => {
      this.props.history.push(`/board/${data.pin.board_id}`);
    });
  }

  populateBoardField() {
    let prevState = this.state.pin;
    prevState["board_id"] = firstBoard;
    this.setState({ pin: prevState });
  }

  componentDidMount() {
    this.props.fetchBoards(this.props.currentUser.id).then((data) => {
      this.setState({ boards: data.boards });

      if (window.currentUser.id === 5) {
        this.setState({ showHelpMount: true });
      } else {
        this.setState({
          showHelpMount: !Object.values(this.state.boards)[0].pinPhotos.one,
        });
      }
    });

    if (!window.currentUser) {
    } else {
      this.props.fetchUser(window.currentUser.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boards !== this.props.boards) {
      this.setState({ boards: this.props.boards.boards });
    }
  }

  handelAddText(e) {
    e.preventDefault();
    this.setState({
      addTxtButtonDisp: false,
      altTextAreaActive: true,
    });
  }

  handelUlClick(e) {
    e.preventDefault();

    this.setState({
      boards: this.props.boards.boards,
      backdropActive: !this.state.backdropActive,
      dropDownActive: !this.state.dropDownActive,
    });
  }

  inputChange(field) {
    let prevState = this.state.pin;
    return (e) => {
      prevState[field] = e.currentTarget.value;
      this.setState({ pin: prevState });
    };
  }

  boardClickSelect(e) {
    e.preventDefault();
    let prevState = this.state.pin;
    prevState["board_id"] = e.currentTarget.id;

    this.setState({
      pin: prevState,
      backdropActive: false,
      dropDownActive: false,
    });
  }

  deletePreview(e) {
    e.preventDefault();

    this.setState({
      img_err: false,
      inputImgLabelPinActive: true,
    });
  }

  imgConvertToWebp(e) {
    let file = e.currentTarget.files[0];

    if (file.type !== "image/jpeg" && file.type !== "image/webp") {
      this.setState({
        img_err: true,
        err_msg: "Your upload failed because it's the wrong format.",
      });

      return;
    }

    let name = file.name.split(".").shift().concat(".webp");
    let src = URL.createObjectURL(file);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let usersImg = new Image();
    usersImg.src = src;

    let qualityQuo = 1;
    if (file.size > 40000) qualityQuo = 40000 / file.size;

    const prevState = this.state.pin;

    usersImg.onload = () => {
      canvas.width = usersImg.width;
      canvas.height = usersImg.height;
      ctx.drawImage(usersImg, 0, 0);

      canvas.toBlob(
        (blob) => {
          let finalFile = new File([blob], name);
          const fileReader = new FileReader();
          fileReader.readAsDataURL(finalFile);
          fileReader.onloadend = () => {
            prevState["photo"] = finalFile;
            this.setState({
              pin: prevState,
              thePhotoURL: fileReader.result,
              isTrue: true,
              inputImgLabelPinActive: false,
              modalsPinDisplayActive: true,
            });
          };
        },
        "image/webp",
        qualityQuo
      );
    };
  }

  deleteDropDownClick(e) {
    this.setState({ deleteDropDownMenueActive: false });
    this.props.history.push(`/profile/${this.props.currentUser.id}`);
  }

  moreClicked(e) {
    e.preventDefault();
    this.setState({
      backdropActive: !this.state.backdropActive,
      deleteDropDownMenueActive: true,
    });
  }

  backdropClick(e) {
    e.preventDefault();

    this.setState({
      backdropActive: false,
      dropDownActive: false,
      deleteDropDownMenueActive: false,
    });
  }

  render() {
    if (
      !this.props.boards.boards ||
      this.props.boards.boards === undefined ||
      this.props.boards.boards.length === 0
    ) {
      return null;
    }

    const boardsFromProps = this.props.boards.boards;
    const boardsFromState = this.state.boards;

    let description1 = 500 - this.state.pin.description.length;

    return (
      <div className="create-pin-main-div">
        {this.state.backdropActive && (
          <div
            className="backdrop-div-create-pin-updated"
            onClick={this.backdropClick}
          ></div>
        )}

        {this.state.deleteDropDownMenueActive && (
          <div className="delete-dropdown-menue" id="delete-dropdown-menue-id">
            <div onClick={this.deleteDropDownClick}>Delete</div>
          </div>
        )}

        <div className="primary-createpin-card">
          {this.state.loading && <LoadingIcon />}

          <div className={this.state.loading ? "deactivate" : ""}>
            <div className="top-bar-create-pin">
              <div
                className="delete-duplicate-button-dd"
                onClick={this.moreClicked}
              >
                <img src={window.moreURL} alt="more icon" id="more-logo-icon" />
              </div>

              {!!this.state.boards && this.boardDropDownSelectCreate()}

              {/* ------------------ drop down part --------------- */}
            </div>

            <div className="bottom-create-pin">
              <div className="left-side-create-pin">
                {this.state.inputImgLabelPinActive && (
                  <label htmlFor="input-image-pin" id="input-image-label-pin">
                    <div
                      className={
                        this.state.img_err
                          ? "upload-img-container-err"
                          : "upload-img-container"
                      }
                    >
                      <div className="doted-border">
                        {this.state.img_err ? (
                          <img
                            src={window.redWarning}
                            alt="Alert icon"
                            id="up-arrow-icon"
                          />
                        ) : (
                          <img
                            src={window.upArrowURL}
                            alt="up Arrow"
                            id="up-arrow-icon"
                          />
                        )}

                        <div
                          className={
                            this.state.img_err
                              ? "drag-class-name red-txt"
                              : "drag-class-name"
                          }
                        >
                          {this.state.img_err
                            ? this.state.err_msg
                            : "Click to upload"}
                        </div>

                        <div
                          className={
                            this.state.img_err
                              ? "second-blerb-pin red-txt"
                              : "second-blerb-pin"
                          }
                        >
                          Recomendation: Use high-quality .jpg files less than
                          20MB
                        </div>
                      </div>
                    </div>

                    <input
                      type="file"
                      accept=".jpg"
                      autoComplete="off"
                      name="input-image-pin"
                      id="input-image-pin"
                      //  accept=".jpg, .jpeg, .png"
                      onChange={this.imgConvertToWebp}
                    />
                  </label>
                )}

                <div className="modals_pin" id="modals_pin-display">
                  <div className="pin_image" id="pin_image-create-pin-height">
                    <img
                      src={this.state.isTrue ? this.state.thePhotoURL : ""}
                      alt="pin_image"
                      id="preview-image-456"
                      className="preview-image"
                    />
                    <div
                      className="delete-icon-logo-div"
                      onClick={this.deletePreview}
                    >
                      <img
                        className="delete-icon-logo"
                        src={window.deleteURL}
                        alt="Delete icon"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-side-create-pin">
                <div className="input-div-top">
                  <input
                    type="text"
                    autoComplete="off"
                    className="input-for-title-pin"
                    placeholder="Add your title"
                    onChange={this.inputChange("title")}
                  />
                  <div
                    className="second-div-title-pininput-outer"
                    id="second-div-title-pininput"
                  >
                    <div
                      className="second-div-title-pininput-1"
                      id="second-div-title-pininput-1"
                    >
                      Your first 40 characters are what usually show up in feeds{" "}
                    </div>{" "}
                    <div
                      id="second-div-title-pininput-2"
                      className="second-div-title-pininput-2"
                    >
                      {100 - this.state.pin.title.length}
                    </div>
                  </div>
                </div>
                <div className="outer-div-for-profile-photo-pin">
                  {/* <img className="profile-photo-icon" src={this.props.user.photoUrl} alt="logo" /> */}
                  <div className="surrounding-avatar-on-create_pin">
                    <ProfileAvatar
                      // divImgClass='profile-div-small-pin'
                      textClass="profile-letter-default-search"
                      usersName={this.props.user.f_name}
                      // imgClass='profile-photo-icon'
                      photoUrl={this.props.user.photoUrl}
                    />
                  </div>

                  <div>
                    {this.props.user.f_name} {this.props.user.l_name}
                  </div>
                </div>

                <textarea
                  id="text-area-pin-create"
                  className="text-area-pin-create"
                  onChange={this.inputChange("description")}
                  name=""
                  cols="40"
                  rows="1"
                  placeholder="Tell everyone what your Pin is about"
                ></textarea>
                <div className="txt-create-p-fifty" id="txt-create-p-fifty">
                  <div className="char-fifty-txt-create-p">
                    People will usually see the first 50 characters when they
                    click on your Pin{" "}
                  </div>
                  <div className="description-char-count">{description1}</div>
                </div>

                {this.state.altTextAreaActive && (
                  <textarea
                    className="text-area-pin-create txt-area-create-p-moveup"
                    onChange={this.inputChange("description2")}
                    name=""
                    id="alt-text-area"
                    cols="40"
                    rows="1"
                    placeholder="Explain what people can see in the Pin"
                  ></textarea>
                )}

                {this.state.addTxtButtonDisp && (
                  <div
                    className="footer-create-pin-gray-button"
                    onClick={this.handelAddText}
                    id="alt-text-area-button"
                  >
                    Add alt text
                  </div>
                )}

                {this.state.showHelpDes && (
                  <div className="blue-info">
                    <div>
                      <img
                        onClick={() => {
                          this.setState({
                            showHelpDes: false,
                            showHelpMount: false,
                          });
                        }}
                        src={window.whiteX}
                        alt="X"
                      />
                    </div>
                    <p>
                      The destination link is where you can add a URL to direct
                      your followers to where on the internet you found this
                      pin, if applicable{" "}
                    </p>
                  </div>
                )}

                <input
                  type="text"
                  autoComplete="off"
                  className="text-area-pin-create last-in-556"
                  onFocus={this.helpDescription}
                  onChange={this.inputChange("websiteURL")}
                  placeholder="Add a destination link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePin;

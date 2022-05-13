import React from "react";
import { Link } from "react-router-dom";
import { ProfileAvatar } from "../../utils/util_components/image_components";
import { cloneDeep } from "lodash";

class PinShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentButtonsActive: false,
      inputBorderRadiusClass: "input-pin-show",
      pin: null,
      commentBody: "",
      comments: null,
      commentDDActive: false,
      ddStat: null,
      editComment: "",
      editingCommentId: null,
      dd_s: {},
      backDropActive: false,
      pinEditDropdownActive: false,
      commentsEdit: {},
    };

    this.editPin = this.editPin.bind(this);
    this.editComment = this.editComment.bind(this);
    this.inputTouched = this.inputTouched.bind(this);
    this.handelSubmitComment = this.handelSubmitComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.backdropClick = this.backdropClick.bind(this);
    this.handelEditChange = this.handelEditChange.bind(this);
    this.handelSubmitCommentEdit = this.handelSubmitCommentEdit.bind(this);
    this.createLike = this.createLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.elapsedTime = this.elapsedTime.bind(this);
    this.cancelEditComment = this.cancelEditComment.bind(this);
    this.goBackBtn = this.goBackBtn.bind(this);
    this.dd_display_tog = this.dd_display_tog.bind(this);
    this.commentsForPin = this.commentsForPin.bind(this);
    this.openCommentsDropDown = this.openCommentsDropDown.bind(this);
  }

  commentsForPin(comments) {
    return comments.map((comment) => (
      <div className="outside-comment-main" key={comment.id + "outside"}>
        <div className="one-comment-pin-show" key={comment.id}>
          <div className="outside-of-image-div">
            <div
              id="123 D"
              className="image-div-show-pin-page comment-list-2 C"
            >
              <ProfileAvatar
                photoUrl={comment.photoUrl}
                usersName={comment.name}
              />
            </div>
          </div>

          {!(
            this.state.commentsEdit[comment.id] !== undefined &&
            this.state.commentsEdit[comment.id].isActive
          ) && (
            <div
              className="right-txt-pin-show"
              id={`right-txt-pin-show` + comment.id}
            >
              <div className="outer-div-time-elapsed-comment">
                <Link to={`/profile/${comment.commenter_id}`}>
                  <div className="name-list-pin-show">{comment.name}</div>
                </Link>
                <div className="time-elapsed-comment">
                  {this.elapsedTime(comment.timeElapsed)}
                </div>
              </div>
              <div className="body-list-pin-show">{comment.body}</div>
            </div>
          )}

          {!!this.state.commentsEdit[comment.id] &&
            !!this.state.commentsEdit[comment.id].isActive && (
              <div
                className="edit-form-div-outter"
                id={"edit-form-div" + comment.id}
              >
                <textarea
                  placeholder="Add a comment"
                  className="blank-input-style"
                  type="text"
                  value={this.state.commentsEdit[comment.id].body}
                  onChange={(e) => this.handelEditChange(e, comment.id)}
                />
                <div className="edit-comment-btns">
                  <div
                    data-comment_id={comment.id}
                    onClick={(e) => this.cancelEditComment(e, comment.id)}
                    id="cancel-btn-show-pin"
                    className="button-show-pin-comment cancel-btn-show-pin cancel-124"
                  >
                    Cancel
                  </div>
                  <div
                    id="save-btn-show-pin"
                    className="button-show-pin-comment save-123"
                    onClick={(e) => this.handelSubmitCommentEdit(e, comment.id)}
                  >
                    Save
                  </div>
                </div>
              </div>
            )}
        </div>

        <div
          className="bottom-section-comment-pin-show"
          id={"bottom-section-comment-pin-show" + comment.id}
        >
          <h1 className="header-title-boards-show-123">
            <div className="like-icon-div">
              {comment.like.liked ? (
                <img
                  data-img_liker_id={this.props.currentUser.id}
                  data-img_comment={comment.id}
                  onClick={() => this.removeLike(comment.like.like.id)}
                  src={window.redHeartURL}
                  alt="red heart"
                />
              ) : (
                <img
                  onClick={() =>
                    this.createLike(this.props.currentUser.id, comment.id)
                  }
                  src={window.grayHeartURL}
                  alt="gray heart"
                />
              )}

              {comment.like.like_count > 0 && (
                <div className="like-count">{comment.like.like_count}</div>
              )}
            </div>

            {comment.commenter_id === this.props.currentUser.id && (
              <div
                className="pin-duplicate-button-dd comment-edition-div"
                id={comment.id}
                onClick={() => this.openCommentsDropDown(comment.id)}
              >
                <img
                  className="pin-123-1 comment-edition-dot"
                  src={window.dotsBlackURL}
                  alt="more icon"
                />
              </div>
            )}
            {!!this.state.dd_s[comment.id] && (
              <div className="div-holder-helper-123-pin-show">
                <div
                  className="edit-dropdown-menue-123-pin-show move-edit-delete-div"
                  id={`edit-dropdown-menue-124-id` + comment.id}
                >
                  <div
                    data-div_val={comment.body}
                    id={comment.id}
                    onClick={() => this.editComment(comment)}
                  >
                    Edit
                  </div>
                  <div id={comment.id} onClick={this.deleteComment}>
                    Delete
                  </div>
                </div>
              </div>
            )}
          </h1>
        </div>
      </div>
    ));
  }

  openCommentsDropDown(id) {
    let commentsDropDownActive = { ...this.state.dd_s };
    commentsDropDownActive[id] = true;

    this.setState({
      backDropActive: true,
      dd_s: commentsDropDownActive,
    });
  }

  cancelEditComment(e, id) {
    e.preventDefault();

    let comments = cloneDeep(this.state.commentsEdit);
    let comment = comments[id];
    delete comment.isActive;

    comment["body"] = this.state.comments[id].body;

    this.setState({ commentsEdit: comments });
  }

  handelEditChange(e, id) {
    e.preventDefault();

    let comments = cloneDeep(this.state.commentsEdit);
    let theComment = comments[id];
    theComment.body = e.currentTarget.value;

    this.setState({
      commentsEdit: comments,
    });
  }

  editComment(comment) {
    let newCommentsEdit = { ...this.state.commentsEdit };
    newCommentsEdit[comment.id] = comment;
    let theComment = newCommentsEdit[comment.id];
    theComment["isActive"] = true;

    this.backdropClick();
    this.setState({ commentsEdit: newCommentsEdit });
  }

  elapsedTime(time) {
    let retTime = null;

    while (retTime === null) {
      if (time.year > 0) {
        retTime = `${time.year}y`;
      } else if (time.month > 0) {
        retTime = `${time.month}M`; // need to look at
      } else if (time.day > 0) {
        retTime = `${time.day}d`;
      } else if (time.hours > 0) {
        retTime = `${time.hours}h`;
      } else if (time.min > 0) {
        retTime = `${time.min}m`;
      } else {
        retTime = "now";
      }
    }

    return retTime;
  }

  removeLike(id) {
    this.props.deleteLike(id).then(() => {
      this.props.fetchPin(Number(this.props.match.params.id));
    });
  }

  createLike(liker_id, commentId) {
    let info = { liker_id, comment_liked_id: commentId };

    this.props.createLike(info).then(() => {
      this.props.fetchPin(Number(this.props.match.params.id));
    });
  }

  handelSubmitCommentEdit(e, id) {
    e.preventDefault();

    let editedComments = cloneDeep(this.state.commentsEdit);
    let editedComment = editedComments[id];
    delete editedComment.isActive;

    let commentIds = {
      commentId: id,
      pinId: Number(this.props.match.params.id),
      commentForm: { body: editedComment.body },
    };

    this.setState({ commentsEdit: editedComments });

    this.props.editComment(commentIds).then(() => {
      this.props.fetchPin(Number(this.props.match.params.id));
    });
  }

  deleteComment(e) {
    let commentIds = {
      pinId: Number(this.props.match.params.id),
      commentId: e.currentTarget.id,
    };
    this.props.deleteComment(commentIds).then((data) => {
      this.backdropClick(),
        this.props.fetchPin(Number(this.props.match.params.id)),
        this.setState({ comments: this.props.pin.pin.comments });
    });
  }

  handelSubmitComment(e) {
    e.preventDefault();
    let pinId = Number(this.props.match.params.id);

    let comment = {
      commenter_id: this.props.currentUser.id,
      pin_id: pinId,
      body: this.state.commentBody,
    };

    if (comment.body.trim().length > 0) {
      this.props.newComment(comment).then(this.setState({ commentBody: "" }));
    }
  }

  inputTouched(e) {
    e.preventDefault();

    this.setState({
      commentButtonsActive: true,
      inputBorderRadiusClass: "input-pin-show change-input",
    });
  }

  editPin(e) {
    e.preventDefault();
    window.editPin = Number(this.props.match.params.id);
    this.props.openModal("editPin");
    this.backdropClick();
  }

  dd_display_tog() {
    this.setState({
      pinEditDropdownActive: true,
      backDropActive: true,
    });
  }

  backdropClick() {
    let commentsDropDownActive = { ...this.state.dd_s };

    for (const id in commentsDropDownActive) {
      commentsDropDownActive[id] = false;
    }

    this.setState({
      backDropActive: false,
      dd_s: commentsDropDownActive,
      pinEditDropdownActive: false,
    });
  }

  componentDidMount() {
    this.props.fetchPin(Number(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    if (this.props.pin !== prevProps.pin) {
      this.setState({ pin: this.props.pin.pin });
      this.setState({ comments: this.props.pin.pin.comments });
    }
  }

  goBackBtn() {
    this.props.history.goBack();
  }

  render() {
    if (!this.state.pin) {
      return null;
    }

    let comments;

    if (!!this.state.comments) {
      comments = Object.values(this.state.comments);
    } else {
      comments = null;
    }

    let pinShow;

    if (this.props.currentUser.id === this.props.pin.pin.creator_id) {
      pinShow = (
        <div className="background-div-pin-show">
          {this.state.backDropActive && (
            <div
              className="backdrop-div-create-pin-updated"
              onClick={this.backdropClick}
              id="backdrop-div-create-pin"
            ></div>
          )}
          <div className="main-div-pin-show">
            <div className="image-show-pin-1">
              <img
                className="image-show-pin"
                src={this.state.pin.photoUrl}
                alt="photo?"
              />
            </div>

            <div className="right-half-pin-show">
              <div className="top-bar-right-show-pin">
                <div>
                  <h1 className="header-title-boards-show-123">
                    <div
                      className="pin-duplicate-button-dd"
                      onClick={this.dd_display_tog}
                      id={`dd_id_pin${this.state.pin.id}`}
                    >
                      <img
                        className="pin-123-1"
                        src={window.dotsBlackURL}
                        alt="more icon"
                      />
                    </div>
                    {this.state.pinEditDropdownActive && (
                      <div
                        className="div-holder-helper-123"
                        id={`dd_id_pin${this.state.pin.id}`}
                      >
                        <div
                          className="edit-dropdown-menue-123 pin-show"
                          id="edit-dropdown-menue-123-id"
                        >
                          <div
                            className="edition-pin-show-div"
                            onMouseDown={this.editPin}
                          >
                            Edit Pin
                          </div>
                        </div>
                      </div>
                    )}
                  </h1>
                </div>
              </div>

              {!!this.state.pin.websiteURL && (
                <a
                  className="url-link-tag"
                  href={this.state.pin.websiteURL}
                  target="_blank"
                >
                  {this.state.pin.websiteURL.slice(0, 27) + "..."}
                </a>
              )}
              <div className="title-pin-show">{this.state.pin.title}</div>
              <p className="description-pin-show">
                {this.state.pin.description}
              </p>

              <div className="comments-section">
                <div className="comments-lable-pin-show">Comments</div>

                <div className="describing-comments">
                  Share feedback, ask a question or give a high five
                </div>
                <div className="outer-comment-pin-show-1">
                  {!!comments && (
                    <div className="comment-array-holding-div">
                      <div className="comment-array-pin-show">
                        {this.commentsForPin(comments)}
                      </div>

                      <div className="comment-count">
                        {comments.length === 1
                          ? `${comments.length} comment `
                          : `${comments.length} comments `}
                      </div>
                    </div>
                  )}
                  <div className="comments-in-section">
                    <div id="847428 A" className="image-div-show-pin-page C">
                      <ProfileAvatar
                        photoUrl={this.props.currentUser.photoUrl}
                        usersName={this.props.currentUser.f_name}
                      />
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      id="comment-input-pin-show"
                      className={this.state.inputBorderRadiusClass}
                      placeholder="Add a comment"
                      onClick={this.inputTouched}
                      onChange={(e) => {
                        e.preventDefault(),
                          this.setState({ commentBody: e.currentTarget.value });
                      }}
                      value={this.state.commentBody}
                    />
                  </div>

                  {this.state.commentButtonsActive && (
                    <div id="pin-show-btn" className="outer-comment-pin-show-2">
                      <div
                        id="cancel-btn-show-pin"
                        className="button-show-pin-comment cancel-btn-show-pin"
                        onClick={() => this.setState({ commentBody: "" })}
                      >
                        Cancel
                      </div>
                      <div
                        id="done-btn-show-pin"
                        className={
                          this.state.commentBody.trim().length > 0
                            ? "button-show-pin-comment done-123 done-red-btn"
                            : "button-show-pin-comment done-123"
                        }
                        onClick={this.handelSubmitComment}
                      >
                        Done
                      </div>
                    </div>
                  )}

                  <div className="bottom-info-outter-div">
                    <div
                      id="847428 B"
                      className="image-div-show-pin-page bottom-info-links C"
                    >
                      <ProfileAvatar
                        photoUrl={this.props.pin.pin.pinUser.photoUrl}
                        usersName={this.props.pin.pin.pinUser.f_name}
                      />
                    </div>

                    <div className="bottom-section-pin-show-links">
                      {this.state.pin.creator_id ===
                      this.props.currentUser.id ? (
                        <Link
                          className="pin-show-link"
                          to={`/profile/${this.state.pin.creator_id}`}
                        >
                          You
                        </Link>
                      ) : (
                        <Link
                          className="pin-show-link"
                          to={`/profile/${this.state.pin.creator_id}`}
                        >
                          {this.state.pin.pinUser.f_name}{" "}
                          {this.state.pin.pinUser.l_name}{" "}
                        </Link>
                      )}{" "}
                      saved to{" "}
                      <Link
                        className="pin-show-link"
                        to={`/board/${this.state.pin.board_id}`}
                      >
                        {this.state.pin.board.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      pinShow = (
        <div className="background-div-pin-show">
          {this.state.backDropActive && (
            <div
              className="backdrop-div-create-pin-updated"
              onClick={this.backdropClick}
              id="backdrop-div-create-pin"
            ></div>
          )}
          <div className="main-div-pin-show">
            <div className="image-show-pin-1">
              <img
                className="image-show-pin"
                src={this.state.pin.photoUrl}
                alt="photo?"
              />
            </div>

            <div className="right-half-pin-show">
              <div className="top-bar-right-show-pin"></div>

              {!!this.state.pin.websiteURL && (
                <a
                  className="url-link-tag"
                  href={this.state.pin.websiteURL}
                  target="_blank"
                >
                  {this.state.pin.websiteURL.slice(0, 27) + "..."}
                </a>
              )}
              <div className="title-pin-show">{this.state.pin.title}</div>
              <p className="description-pin-show">
                {this.state.pin.description}
              </p>
              <div className="comments-section">
                <div className="comments-lable-pin-show">Comments</div>

                <div className="describing-comments">
                  Share feedback, ask a question or give a high five
                </div>
                <div className="outer-comment-pin-show-1">
                  {!!comments && (
                    <div className="comment-array-holding-div">
                      <div className="comment-array-pin-show">
                        {this.commentsForPin(comments)}
                      </div>

                      <div className="comment-count">
                        {comments.length === 1
                          ? `${comments.length} comment `
                          : `${comments.length} comments `}
                      </div>
                    </div>
                  )}
                  <div className="comments-in-section">
                    <div id="847428 C" className="image-div-show-pin-page C">
                      <ProfileAvatar
                        photoUrl={this.props.currentUser.photoUrl}
                        usersName={this.props.currentUser.f_name}
                      />
                    </div>
                    <input
                      type="text"
                      autoComplete="off"
                      id="comment-input-pin-show"
                      className={this.state.inputBorderRadiusClass}
                      placeholder="Add a comment"
                      onClick={this.inputTouched}
                      onChange={(e) => {
                        e.preventDefault(),
                          this.setState({ commentBody: e.currentTarget.value });
                      }}
                      value={this.state.commentBody}
                    />
                  </div>

                  {this.state.commentButtonsActive && (
                    <div id="pin-show-btn" className="outer-comment-pin-show-2">
                      <div
                        id="cancel-btn-show-pin"
                        className="button-show-pin-comment cancel-btn-show-pin"
                        onClick={() => this.setState({ commentBody: "" })}
                      >
                        Cancel
                      </div>
                      <div
                        id="done-btn-show-pin"
                        className={
                          this.state.commentBody.trim().length > 0
                            ? "button-show-pin-comment done-123 done-red-btn"
                            : "button-show-pin-comment done-123"
                        }
                        onClick={this.handelSubmitComment}
                      >
                        Done
                      </div>
                    </div>
                  )}

                  <div className="bottom-info-outter-div">
                    <div className="image-div-show-pin-page bottom-info-links">
                      <ProfileAvatar
                        photoUrl={this.props.pin.pin.pinUser.photoUrl}
                        usersName={this.props.pin.pin.pinUser.f_name}
                      />
                    </div>

                    <div className="bottom-section-pin-show-links">
                      {this.state.pin.creator_id ===
                      this.props.currentUser.id ? (
                        <Link
                          className="pin-show-link"
                          to={`/profile/${this.state.pin.creator_id}`}
                        >
                          You
                        </Link>
                      ) : (
                        <Link
                          className="pin-show-link"
                          to={`/profile/${this.state.pin.creator_id}`}
                        >
                          {this.state.pin.pinUser.f_name}{" "}
                          {this.state.pin.pinUser.l_name}{" "}
                        </Link>
                      )}{" "}
                      saved to{" "}
                      <Link
                        className="pin-show-link"
                        to={`/board/${this.state.pin.board_id}`}
                      >
                        {this.state.pin.board.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="back-arrow-pin-show" onClick={this.goBackBtn}>
          <img
            className="img-back-arrow"
            src={window.backArrowFile}
            alt="back"
          />
        </div>
        {pinShow}
      </div>
    );
  }
}

export default PinShow;

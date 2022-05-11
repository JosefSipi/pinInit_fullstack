import React from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { ProfileAvatar } from "../../utils/util_components/image_components";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      searchInput: "",
      update: null,
      logedInUser: this.props.currentUser,
      readyToCheck: false,
      searchUsers: null,
      searchPins: null,
      seachActive: false,
      navBarSearchActive: false,
      backDropActive: false,
    };

    this.toggleContent = this.toggleContent.bind(this);

    this.prepSearch = this.prepSearch.bind(this);
    this.updateState = this.updateState.bind(this);
    this.searchingTime = this.searchingTime.bind(this);
    this.searchOver = this.searchOver.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
    this.pinSearchDisplay = this.pinSearchDisplay.bind(this);
    this.clickSearchOpt = this.clickSearchOpt.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.loggedOutNavBar = this.loggedOutNavBar.bind(this);
    this.loggedInNavBar = this.loggedInNavBar.bind(this);
  }

  keyPressed(e) {
    let displayWord = e.currentTarget.value;
    let input = { pathname: "/feed-search", params: { displayWord } };

    if (e.key === "Enter" && displayWord !== "") {
      this.setState({
        backDropActive: false,
        navBarSearchActive: false,
        searchInput: "",
      });

      this.props.history.push(input);
      this.props.searchFeedCall(input.params).then((data) => {
        if (
          document.getElementById("this-will-hold-search-list")
            .childElementCount !== 0
        ) {
          this.searchOver();
        }
      });
    } else if (e.key === "Enter" && displayWord === "") {
      this.setState({
        backDropActive: false,
        navBarSearchActive: false,
      });
    }
  }

  pinSearchDisplay(input) {
    let userInput = this.state.searchInput.toUpperCase();
    let displayWord = null;
    let check;

    if (input.title) {
      check = input.title;
    } else {
      check = input.description;
    }

    let retCheck = [...check.split(" ")].slice(0, 9);

    for (let i = 0; i < check.split(" ").length; i++) {
      if (
        userInput.toUpperCase() ===
        retCheck.slice(i).join(" ").slice(0, userInput.length).toUpperCase()
      ) {
        displayWord = retCheck.slice(i).join(" ");
        break;
      }
    }

    if (displayWord === "" || displayWord === null || displayWord === " ") {
      return null;
    } else {
      return (
        <div
          onMouseDown={() =>
            this.clickSearchOpt({
              pathname: "/feed-search",
              params: { displayWord },
            })
          }
          className="search_result_nav"
          key={"pin" + input.id}
        >
          {displayWord}
        </div>
      );
    }
  }

  clickSearchOpt(input) {
    this.props.history.push(input);
    this.props.searchFeedCall(input.params);
  }

  prepSearch = debounce(() => {
    this.props.updateSearch(this.state.searchInput).then((data) => {
      if (!!data.users.userSearched) {
        this.setState({ searchUsers: data.users.userSearched });
      } else {
        this.setState({ searchUsers: null });
      }

      if (!!data.users.pinSearched) {
        this.setState({ searchPins: data.users.pinSearched });
      } else {
        this.setState({ searchPins: null });
      }
    });
  }, 100);

  logoutFunction(e) {
    this.props.logout().then((data) => {
      this.toggleContent(e);
      this.props.history.push("/");
    });
  }

  redirectProfile(e) {
    this.props.history.push(
      `/profile/${e.currentTarget.getAttribute("data-user_id")}`
    );
  }

  searchingTime(e) {
    this.setState({
      navBarSearchActive: !this.state.navBarSearchActive,
      backDropActive: !this.state.backDropActive,
    });
  }

  searchOver(e) {
    this.setState({
      navBarSearchActive: false,
      backDropActive: false,
      searchInput: "",
    });
  }

  updateState(e) {
    e.preventDefault();
    if (e.currentTarget.value !== "") {
      this.setState({
        navBarSearchActive: true,
        backDropActive: true,
      });
    }
    this.setState({ searchInput: e.currentTarget.value });
    this.prepSearch(this.state.searchInput);
  }

  componentDidMount() {
    this.setState({ logedInUser: this.props.currentUser });

    if (!!window.currentUser || !!this.props.currentUser) {
      this.props.fetchUser(this.props.currentUser.id || window.currentUser.id);
    }
  }

  toggleContent(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  loggedInNavBar(showDropdown, theUsers, thePins, usersReady, pinsReady) {
    return (
      <div className="header">
        {this.state.backDropActive && (
          <div
            className="backdrop-div-create-search"
            id="backdrop-div-create-search"
            onClick={this.searchOver}
          ></div>
        )}
        <div className="header-logged-in-1">
          <div className="logo-on-logged-in-header">
            <Link id="logo-logged-in" to="/feed">
              <img id="logo-header-loggedin" src={window.logoURL} alt="logo" />
            </Link>
          </div>
        </div>

        <div className="header-left-home-btn-loggedin">
          <Link
            className={
              this.props.history.location.pathname === "/feed"
                ? "home-btn-loggedin onFeed-style"
                : "home-btn-loggedin"
            }
            to="/feed"
          >
            Home
          </Link>
        </div>

        <div className="search-bar-section-1">
          <input
            className="searchBar"
            id="search-bar-input"
            type="text"
            autoComplete="off"
            placeholder="Search"
            onClick={this.searchingTime}
            onKeyDown={this.keyPressed}
            onChange={this.updateState}
            onBlur={this.searchOver}
            value={this.state.searchInput}
          ></input>
          <div className="drop-down-holder-nav-bar">
            <img
              className="search-bar-icon"
              src={window.magnaURL}
              alt="search icon"
            />
            {this.state.navBarSearchActive && (
              <div
                className="the-dropdown-on-nav-bar-search"
                id="the-dropdown-on-nav-bar-search"
              >
                <div id="this-will-hold-search-list">
                  {pinsReady &&
                    thePins.map((pin) => this.pinSearchDisplay(pin))}
                </div>

                <div>
                  {usersReady ? (
                    theUsers.map((user) => (
                      <div
                        key={user.id}
                        className="list-search-user"
                        onMouseDown={this.redirectProfile}
                        data-user_id={user.id}
                      >
                        <div id="123 E" className="div-for-search-user-img">
                          {!(user.photoUrl === "false") ? (
                            <img
                              className="profile-photo-icon"
                              src={user.photoUrl}
                              alt="profile photo"
                            />
                          ) : (
                            <p className="profile-letter-default-search">
                              {user.username[0].toUpperCase()}
                            </p>
                          )}
                        </div>
                        <div className="last-div-1">{user.username}</div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="header-right-logged-in">
          <div className="link-logo-div">
            <img id="logo-dropdown" src={window.logoURL} alt="logo" />
          </div>

          <Link
            className="nav-bar-prof-icon"
            to={`/profile/${this.props.currentUser.id}`}
          >
            <div className="logo-on-logged-in-header">
              <div id="123 F" className="profile-div-small">
                <ProfileAvatar
                  usersName={this.props.currentUser.f_name}
                  photoUrl={this.props.currentUser.photoUrl}
                />
              </div>
            </div>
          </Link>

          <div className="the-outer-dropdown">
            <div
              className="logo-on-logged-in-header-dropdown"
              onClick={this.toggleContent}
            >
              <img
                id="logo-arrow"
                src={window.dropdownIcon}
                alt="dropdown-icon"
              />
            </div>

            <div
              className={`${
                showDropdown
                  ? "ul-logged-dropdown-active-background"
                  : "ul-logged-dropdown-background"
              }`}
              onClick={this.toggleContent}
            >
              {" "}
            </div>

            <ul
              className={`${
                showDropdown
                  ? "ul-logged-dropdown-active"
                  : "ul-logged-dropdown"
              }`}
            >
              <Link className="link-settings" to="/edit-profile">
                <li className="the-li-dropdown"> Settings</li>
              </Link>
              <li className="the-li-dropdown" onClick={this.logoutFunction}>
                <div className="logout-dropdown-btn">Log out</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  loggedOutNavBar() {
    return (
      <div className="header">
        <div className="header-left">
          <img id="logo-header-loggedout" src={window.logoURL} alt="logo" />
          <h4 className="pinlabel">Pininit</h4>
        </div>

        <div className="header-right">
          <a
            className="other-url"
            href="https://www.linkedin.com/in/joseph-sipiorski-590452195/"
            target="_blank"
          >
            linkedIn
          </a>
          <a
            className="other-url"
            href="https://github.com/JosefSipi"
            target="_blank"
          >
            github
          </a>
          <button
            className="login-btn"
            onClick={() => this.props.openModal("login")}
          >
            Log in
          </button>
          <button
            className="signup-btn"
            onClick={() => this.props.openModal("signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    );
  }

  render() {
    let { showDropdown } = this.state;

    let theUsers;
    let thePins;
    let usersReady = false;
    let pinsReady = false;

    if (this.state.searchInput === "") {
      usersReady = false;
      pinsReady = false;
    } else {
      if (
        !!this.state.searchUsers &&
        _.keys(this.state.searchUsers).length > 0
      ) {
        usersReady = true;
        theUsers = Object.values(this.state.searchUsers);
      }
      if (!!this.state.searchPins && _.keys(this.state.searchPins).length > 0) {
        pinsReady = true;
        thePins = Object.values(this.state.searchPins).slice(0, 8);
      }
    }

    return (
      <header className="nav-bar">
        <div className="nav-bar-sub-div-1">
          {!!this.props.currentUser
            ? this.loggedInNavBar(
                showDropdown,
                theUsers,
                thePins,
                usersReady,
                pinsReady
              )
            : this.loggedOutNavBar()}
        </div>
      </header>
    );
  }
}

export default NavBar;

class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      // id: this.id,
      // name: this.name,
      // about: this.about
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(name, about) {
    // if(data) {
    //   this.id = data._id;
    //   this.name = data.name;
    //   this.about = data.about;
    // }
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

export default UserInfo;

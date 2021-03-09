class Store {
  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  static getUsers() {
    let users;
    if (localStorage.getItem('users') === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem('users'));
    }
    return users;
  }

  static removeUser() {
    localStorage.removeItem('user');
  }

  static removeUsers() {
    localStorage.removeItem('users');
  }
}

export default Store;

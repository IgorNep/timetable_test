/* eslint-disable max-classes-per-file */
class User {
  constructor(name) {
    this.name = name;
  }
}

class Guest extends User {
  constructor(name) {
    super(name);
    this.isAdmin = false;
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
    this.isAdmin = true;
  }
}

class UserFactory {
  constructor() {
    this.list = {
      guest: Guest,
      admin: Admin,
    };
  }

  create(name, type = 'guest') {
    const MemberShip = this.list[type];
    const member = new MemberShip(name);
    return member;
  }
}
export default UserFactory;

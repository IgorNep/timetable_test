import User from './User';

class Admin extends User {
  constructor(name) {
    super(name);
    this.isAdmin = true;
  }
}
export default Admin;

import { formGroupSelect } from './templates';
import Store from '../Store';
const usersArr = Store.getUsers().map((item) => item.name);

export const formTemplate = (days, time, users = usersArr) => {
  return `    
    <div class="form-group">
        <label for="titleField">Title: </label>
        <input type="text" placeholder="Custom meeting name" id="titleField" class="custom-input"/>
    </div>    
   ${formGroupSelect(users, 'Participants', 'multiple')}
   ${formGroupSelect(days, 'Days')}
   ${formGroupSelect(time, 'Time')}
    <button type="submit" class="btn" id="submitBtn">Create</button>
    <button type="button" class="btn grey" id="cancelBtn">Cancel</button>
    `;
};

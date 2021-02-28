/* eslint-disable class-methods-use-this */
import Alert from '../../../modules/Alert';
// eslint-disable-next-line object-curly-newline
import { getApi, postApi, updateApi, deleteApi } from './api';

const DEFAULT_TARGET = document.querySelector('body');

function getConfig() {
  return {
    headers: {
      'Content-type': 'application/json',
    },
  };
}
function showError(error) {
  Alert.render(DEFAULT_TARGET, { msg: error, type: 'danger' });
}

class ApiMeetingsService {
  // eslint-disable-next-line consistent-return
  async getMeetings() {
    try {
      const res = await getApi('/events');
      return await res.data;
    } catch (error) {
      showError(error);
    }
  }

  // eslint-disable-next-line consistent-return
  async addMeetingToDataBase(meeting, cb) {
    try {
      const formData = {
        data: JSON.stringify(meeting),
      };
      const config = getConfig();
      Alert.render(DEFAULT_TARGET, {
        msg: 'Event was added!',
        type: 'success',
      });
      cb(null, true);
      const res = await postApi('/events', formData, config);
      return await res.data;
    } catch (error) {
      showError(error);
    }
  }

  async updateEvent(element) {
    const config = getConfig();
    const formData = {
      data: JSON.stringify({
        fieldId: element.fieldId,
        owner: element.owner,
        title: element.title,
      }),
    };
    await updateApi(`/events/${element.id}`, formData, config);
    Alert.render(DEFAULT_TARGET, {
      msg: 'Event time successfully updated!',
      type: 'success',
    });
  }

  async removeMeetingFromDataBase(meeting) {
    try {
      await deleteApi(`/events/${meeting.id}`);
      Alert.render(DEFAULT_TARGET, {
        msg: 'The event successfully deleted!',
        type: 'success',
      });
    } catch (error) {
      showError(error);
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export const apiServiceMeetings = new ApiMeetingsService();

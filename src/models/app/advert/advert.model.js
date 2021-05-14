import _ from 'lodash';

export const advertModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  name: _.get(_model, 'name'),
  image: _.get(_model, 'advert_image_url'),
  advertLink: _.get(_model, 'link'),
  advertAutoTimeOut: _.get(_model, 'advert_auto_close_time'),
});

import _ from 'lodash';

export const advertModel = (_advertModel = {}) => ({
  id: _.get(_advertModel, 'id'),
  name: _.get(_advertModel, 'name'),
  image: _.get(_advertModel, 'advert_image_url'),
  advertLink: _.get(_advertModel, 'link'),
});

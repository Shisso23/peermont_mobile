import app from '../../../app.json';

export default function buildActionType(reducerName = '', actionName = '') {
  const trimmedReducer = reducerName.toString().trim();
  if (!reducerName) {
    throw new Error('Reducer name cannot be blank');
  }
  const trimmedAction = actionName.toString().trim();
  if (!actionName) {
    throw new Error('Action name cannot be blank');
  }
  return `${app.name}/${trimmedReducer}/${trimmedAction}`;
}

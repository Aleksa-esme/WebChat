import { APIError } from 'api/types';

function hasError(response: any): response is APIError {
  return response && response.reason;
}
export default hasError;

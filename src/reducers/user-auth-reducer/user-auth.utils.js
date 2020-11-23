import { encryptionService } from '../../services';

export const encryptPin = (pin) => encryptionService.encryptPin(pin);

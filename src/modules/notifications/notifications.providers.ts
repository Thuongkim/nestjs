import { Notification } from "./notification.entity";
import { NOTIFICATION_REPOSITORY } from '../../core/constants';

export const notificationsProviders = [
  {
    provide: NOTIFICATION_REPOSITORY,
    useValue: Notification,
  },
];

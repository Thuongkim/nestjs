import { NotificationUser } from "./notificationUser.entity";
import { NOTIFICATION_USER_REPOSITORY } from '../../core/constants';

export const notificationUsersProviders = [
  {
    provide: NOTIFICATION_USER_REPOSITORY,
    useValue: NotificationUser,
  },
];

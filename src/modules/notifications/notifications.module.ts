import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module';
import { notificationsProviders } from './notifications.providers';
import { notificationUsersProviders } from './notificationUsers.providers';

@Module({
  imports: [UsersModule],
  providers: [
    NotificationsService,
    ...notificationsProviders,
    ...notificationUsersProviders,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}

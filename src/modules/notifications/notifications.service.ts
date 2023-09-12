import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationCreatedEvent } from './event/notificationCreated.event';
import { UsersService } from '../users/users.service';
import { NOTIFICATION_REPOSITORY, NOTIFICATION_USER_REPOSITORY } from 'src/core/constants';
import { Notification } from './notification.entity';
import { NotificationUser } from './notificationUser.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly userService: UsersService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepository: typeof Notification,
    @Inject(NOTIFICATION_USER_REPOSITORY) private readonly notificationUserRepository: typeof NotificationUser,
  ) {}

  emitEvent(title: string, body: string) {
    const notificationCreatedEvent = new NotificationCreatedEvent();
    notificationCreatedEvent.title = title;
    notificationCreatedEvent.body = body;
    this.eventEmitter.emit('notification.created', notificationCreatedEvent);
  }
  @OnEvent('notification.created', { async: true })
  async listentToEvent(notificationCreatedEvent: NotificationCreatedEvent) {
    const users = await this.userService.findAll();
    const notification = await this.notificationRepository.create(
      notificationCreatedEvent
    );
    let notificationUserData = [];
    users.forEach((user) => {
        const notificationUser = {
          userId: user.id,
          notificationId: notification.id,
        };
        notificationUserData = [...notificationUserData, notificationUser];
    });
    const notificationUser = await this.notificationUserRepository.bulkCreate(
      notificationUserData
    );

  }
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Notification } from './notification.entity';

@Table
export class NotificationUser extends Model<NotificationUser> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Notification)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  notificationId: number;

  @BelongsTo(() => Notification)
  notification: Notification;
}

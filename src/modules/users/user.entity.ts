import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Notification } from '../notifications/notification.entity';
import { NotificationUser } from '../notifications/notificationUser.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @BelongsToMany(() => Notification, {
    through: { model: () => NotificationUser },
  })
  notifications!: Notification[];
}

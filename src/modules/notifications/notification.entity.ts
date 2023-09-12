import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { NotificationUser } from './notificationUser.entity';

@Table
export class Notification extends Model<Notification> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @BelongsToMany(() => User, {
    through: { model: () => NotificationUser },
  })
  users!: User[];
}

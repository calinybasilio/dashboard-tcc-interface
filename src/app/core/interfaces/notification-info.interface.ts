import { ENotificationType } from '../enums/notification-type.enum';

export interface INotificationInfo {
    type: ENotificationType;
    from: string;
    align: string;
    message: string;
    icon: string;
}
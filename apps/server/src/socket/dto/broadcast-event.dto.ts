import { IsNotEmpty } from 'class-validator';

import { BaseDto } from '@common/base.dto';
import { SOCKET_EVENTS } from '@socket/socket.constant';

export class BroadcastEventDto extends BaseDto {
  @IsNotEmpty({ message: '데이터는 필수입니다.' })
  content: Record<any, any>;

  @IsNotEmpty({ message: '이벤트명은 필수입니다.' })
  event: (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
}

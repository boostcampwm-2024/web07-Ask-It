import { CreateSessionDto } from '../dto/create-session.dto';

export interface SessionCreateData extends CreateSessionDto {
  expiredAt: Date;
  user: {
    connect: {
      userId: number;
    };
  };
}

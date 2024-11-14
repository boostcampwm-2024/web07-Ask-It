import { CreateSessionDto } from '../dto/create-session.dto';

export interface SessionCreateData extends CreateSessionDto {
  expired_at: Date;
  user: {
    connect: {
      user_id: number;
    };
  };
}

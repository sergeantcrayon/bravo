import { Lfg } from '@shared/models/lfg';

export interface LfgRoomState {
  lfg: Lfg;
  loading: boolean;
  commentLoading: boolean;
}

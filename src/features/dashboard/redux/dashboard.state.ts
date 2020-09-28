import { Lfg } from '../../../shared/models/lfg';

export interface DashboardState {
  lfgs: Lfg[];
  loadingLfgs: boolean;
}

import { Lfg } from '@shared/models';

export interface DashboardState {
  lfgs: Lfg[];
  loadingLfgs: boolean;
}

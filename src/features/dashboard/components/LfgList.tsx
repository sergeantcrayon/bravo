import React, { Fragment, useCallback, useEffect } from 'react';
import './LfgList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLfgs } from '../redux/dashboard.reducer';
import { RootState } from '../../../store';
import { Card, Empty, Skeleton } from 'antd';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import LfgCard from './LfgCard';

const LfgList = () => {
  const dispatch = useDispatch();
  const lfgs = useSelector((state: RootState) => state.dashboard.lfgs);
  const loading = useSelector((state: RootState) => state.dashboard.loadingLfgs);
  const stableDispatch = useCallback(dispatch, []);
  useEffect(() => {
    stableDispatch(getLfgs({}));
  }, [stableDispatch]);

  TimeAgo.addLocale(en);
  const loadingCards = (
    <Fragment>
      <div className="lfg-item">
        <Card>
          <Skeleton loading={loading} avatar active></Skeleton>
        </Card>
      </div>
      <div className="lfg-item">
        <Card>
          <Skeleton loading={loading} avatar active></Skeleton>
        </Card>
      </div>
      <div className="lfg-item">
        <Card>
          <Skeleton loading={loading} avatar active></Skeleton>
        </Card>
      </div>
    </Fragment>
  );
  return (
    <div className="lfgs-container">
      {loading ? (
        loadingCards
      ) : lfgs && lfgs.length > 0 ? (
        lfgs.map((lfg) => (
          <div className="lfg-item" key={lfg._id}>
            <LfgCard lfg={lfg} />
          </div>
        ))
      ) : (
        <Empty description={'No Lfg found'} />
      )}
    </div>
  );
};

export default LfgList;

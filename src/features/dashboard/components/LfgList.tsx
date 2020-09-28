import React, { Fragment, useCallback, useEffect } from 'react';
import './LfgList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLfgs } from '../redux/dashboard.reducer';
import { RootState } from '../../../store';
import { Avatar, Card, Skeleton, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGlobe, faUsers, faCrosshairs, faTags, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { PlatformToIcon } from '../../../shared/helpers/icon-helper';

const LfgList = () => {
  const dispatch = useDispatch();
  const lfgs = useSelector((state: RootState) => state.dashboard.lfgs);
  const loading = useSelector((state: RootState) => state.dashboard.loadingLfgs);
  const stableDispatch = useCallback(dispatch, []);
  useEffect(() => {
    stableDispatch(getLfgs({}));
  }, [stableDispatch]);

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
      {loading
        ? loadingCards
        : lfgs.map((lfg) => (
            <div className="lfg-item" key={lfg._id}>
              <Card hoverable key={lfg._id}>
                <Meta avatar={<Avatar src={lfg.user.image} />} title={lfg.user.name} description={lfg.description} />
                <div className="meta-list">
                  <Meta avatar={<FontAwesomeIcon icon={faUser} />} description={lfg.ign} />
                  <Meta avatar={<FontAwesomeIcon icon={faGamepad} />} description={lfg.game.name} />
                  <Meta avatar={<FontAwesomeIcon icon={PlatformToIcon[lfg.platform]} />} description={lfg.platform} />
                  <Meta avatar={<FontAwesomeIcon icon={faGlobe} />} description={lfg.region} />
                  <Meta avatar={<FontAwesomeIcon icon={faUsers} />} description={'1/' + lfg.playerCount} />
                  <Meta
                    avatar={<FontAwesomeIcon icon={faCrosshairs} />}
                    description={
                      <div className="lfg-tags">
                        {lfg.gameModes.map((mode) => (
                          <Tag key={mode}>{mode}</Tag>
                        ))}
                      </div>
                    }
                  />
                  {lfg.tags && lfg.tags.length > 0 ? (
                    <Meta
                      avatar={<FontAwesomeIcon icon={faTags} />}
                      description={
                        <div className="lfg-tags">
                          {lfg.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                      }
                    />
                  ) : null}
                </div>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default LfgList;

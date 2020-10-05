import { getLfg, joinLfgRoom } from '@lfg-room/redux/lfg-room.reducer';
import { Avatar, Button, Card, Divider, Tooltip } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './LfgRoom.scss';
import { RootState } from 'store';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';

const LfgRoom = () => {
  const { id } = useParams<{ id: string }>();
  const stableDispatch = useCallback(useDispatch(), []);
  const lfg = useSelector((state: RootState) => state.lfgRoom.lfg);
  const loading = useSelector((state: RootState) => state.lfgRoom.loading);
  const user = useSelector((state: RootState) => state.core.user);
  useEffect(() => {
    stableDispatch(getLfg(id));
  }, [stableDispatch, id]);

  const handleJoin = () => {
    stableDispatch(joinLfgRoom({ lfgId: lfg._id, ign: 'SomeRandomIgn' }));
  };
  const header = (
    <div className="lfg-room-header">
      <div className="lfg-room-header-top">
        <span className="lfg-room-header-text">{lfg?.game.name}</span>
        <Divider type="vertical" />
        <span className="lfg-room-header-text">created by</span>
        <Avatar size="small" src={lfg?.owner.image}></Avatar>
        <span className="lfg-room-header-text">{lfg?.owner.name + ' ' + moment(lfg?.created).fromNow()}</span>
      </div>
      <div>{lfg?.description}</div>
    </div>
  );

  return (
    <div className="lfg-room-card">
      <Card loading={loading} title={lfg ? header : null}>
        {lfg ? (
          <div>
            <div className="lfg-room-users">
              {lfg.users.map((user) => (
                <Meta key={user._id} avatar={<Avatar src={user.image} />} title={user.name} description={'ign: ' + user.ign} />
              ))}
            </div>
          </div>
        ) : null}
        <div className="lfg-room-actions">
          <Tooltip title={user ? '' : 'Must be logged in to join.'}>
            <Button type="primary" onClick={handleJoin} disabled={user == null}>
              Join
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default LfgRoom;

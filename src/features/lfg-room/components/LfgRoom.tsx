import { getLfg } from '@lfg-room/redux/lfg-room.reducer';
import { Avatar, Card } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './LfgRoom.scss';
import { RootState } from 'store';
import Meta from 'antd/lib/card/Meta';

const LfgRoom = () => {
  const { id } = useParams<{ id: string }>();
  const stableDispatch = useCallback(useDispatch(), []);
  const lfg = useSelector((state: RootState) => state.lfgRoom.lfg);
  const loading = useSelector((state: RootState) => state.lfgRoom.loading);
  useEffect(() => {
    stableDispatch(getLfg(id));
  }, [stableDispatch, id]);

  useEffect(() => {}, []);
  return (
    <div>
      <Card loading={loading} title={lfg?.description}>
        {lfg ? (
          <div>
            <div className="users">
              {lfg.users.map((user) => (
                <Meta key={user._id} avatar={<Avatar src={user.image} />} title={user.name} description={'ign: ' + user.ign} />
              ))}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default LfgRoom;

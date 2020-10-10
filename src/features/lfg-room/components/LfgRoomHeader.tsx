import { Lfg } from '@shared/models';
import { Divider, Tag } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import './LfgRoomHeader.scss';

interface LfgRoomHeaderProps {
  lfg: Lfg;
}

const LfgRoomHeader = ({ lfg }: LfgRoomHeaderProps) => {
  return (
    <Fragment>
      <div className="lfg-room-header">
        <div className="lfg-room-header-top">
          <span className="lfg-room-header-text lfg-room-game-name">{lfg?.game.name}</span>
          <Divider type="vertical" />
          <span className="lfg-room-header-text">created by</span>
          <span className="lfg-room-header-text">{lfg?.owner.name + ' ' + moment(lfg?.created).fromNow()}</span>
          <Divider type="vertical" />
          <span className="lfg-room-header-text">
            <Fragment>
              <span>needs </span>
              <strong>{lfg.users.length + '/' + lfg.maxPlayers}</strong>
              <span> players</span>
            </Fragment>
          </span>
          <Divider type="vertical" />
          <span className="lfg-room-header-text">{lfg.platform.name}</span>
          <Divider type="vertical" />
          <span className="lfg-room-header-text">{lfg.region.name}</span>
          <Divider type="vertical" />
          <div className="lfg-room-tags">
            {lfg.gameModes.map((gm) => (
              <Tag key={gm._id}>{gm.name}</Tag>
            ))}
          </div>
          <Divider type="vertical" />
          <div className="lfg-room-tags">
            {lfg.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="lfg-room-description">{lfg?.description}</div>
      </div>
    </Fragment>
  );
};

export default LfgRoomHeader;

import { Avatar, Card, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faGamepad, faGlobe, faTags, faUsers } from '@fortawesome/free-solid-svg-icons';
import './LfgCard.scss';
import moment from 'moment';
import { Lfg } from '@shared/models';
import { PlatformToIcon } from '@shared/helpers/icon-helper';
interface LfgCardProps {
  lfg: Lfg;
}

const LfgCard = ({ lfg }: LfgCardProps) => {
  return (
    <Fragment>
      <Link to={`/lfg/${lfg._id}`}>
        <Card hoverable key={lfg._id} title={lfg.description} extra={moment(lfg.created).fromNow()}>
          <div className="meta-list">
            <Meta avatar={<Avatar src={lfg.owner.image} />} title={lfg.owner.name} description={'ign: ' + lfg.ign} />
            <Meta avatar={<FontAwesomeIcon icon={faGamepad} />} description={lfg.game.name} />
            <Meta avatar={<FontAwesomeIcon icon={PlatformToIcon[lfg.platform.name]} />} description={lfg.platform.name} />
            <Meta avatar={<FontAwesomeIcon icon={faGlobe} />} description={lfg.region.name} />
            <Meta avatar={<FontAwesomeIcon icon={faUsers} />} description={lfg.users.length + '/' + lfg.maxPlayers} />
            <Meta
              avatar={<FontAwesomeIcon icon={faCrosshairs} />}
              description={
                <div className="lfg-tags">
                  {lfg.gameModes.map((mode) => (
                    <Tag key={mode._id}>{mode.name}</Tag>
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
      </Link>
    </Fragment>
  );
};

export default LfgCard;

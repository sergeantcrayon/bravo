import { addLfgComment, getLfg, joinLfgRoom } from '@lfg-room/redux/lfg-room.reducer';
import { Avatar, Button, Card, Tooltip, Comment, Modal, Input, message, Empty } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './LfgRoom.scss';
import { RootState } from 'store';
import Meta from 'antd/lib/card/Meta';
import CommentArea from './CommentArea';
import LfgRoomHeader from './LfgRoomHeader';
import moment from 'moment';

const LfgRoom = () => {
  const { id } = useParams<{ id: string }>();
  const stableDispatch = useCallback(useDispatch(), []);

  const [ignModal, setIgnModal] = useState(false);
  const [ign, setIgn] = useState('');

  const lfg = useSelector((state: RootState) => state.lfgRoom.lfg);
  const loading = useSelector((state: RootState) => state.lfgRoom.loading);
  const commentLoading = useSelector((state: RootState) => state.lfgRoom.commentLoading);
  const user = useSelector((state: RootState) => state.core.user);

  useEffect(() => {
    stableDispatch(getLfg(id));
  }, [stableDispatch, id]);

  const handleJoin = () => {
    stableDispatch(joinLfgRoom({ lfgId: lfg._id, ign: ign }));
    setIgnModal(false);
  };

  const handleJoinModal = () => {
    if (lfg.users.findIndex((u) => u.googleId === user.googleId) > -1) {
      message.error('User already joined');
    } else {
      setIgnModal(true);
    }
  };

  const handleCommentSubmit = (comment) => {
    stableDispatch(addLfgComment({ lfgId: lfg._id, text: comment }));
  };

  return (
    <div className="lfg-room-card">
      <Card loading={loading} title={lfg ? <LfgRoomHeader lfg={lfg} /> : null}>
        <div className="lfg-room-card-content">
          <div className="lfg-room-users-container">
            {lfg ? (
              <div className="lfg-room-users">
                {lfg?.users.map((user) => (
                  <div key={user._id} className="lfg-room-user-row">
                    <Meta avatar={<Avatar src={user.image} />} title={user.name} description={'ign: ' + user.ign} />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="lfg-room-actions">
              <Tooltip title={user ? '' : 'Must be logged in to join.'}>
                <Button type="primary" onClick={handleJoinModal} disabled={user == null}>
                  Join
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="lfg-room-chat">
            <CommentArea user={user} loading={commentLoading} onSubmit={handleCommentSubmit} />
            {lfg?.comments.length > 0 ? (
              lfg?.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  author={comment.createdBy.name}
                  avatar={comment.createdBy.image}
                  content={comment.text}
                  datetime={moment(comment.created).fromNow()}
                />
              ))
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </Card>
      <Modal
        visible={ignModal}
        title="IGN"
        closable={false}
        footer={[
          <Button key="cancel" onClick={() => setIgnModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleJoin} disabled={ign.length < 1}>
            Okay
          </Button>,
        ]}
      >
        <Input placeholder="Enter In game name" value={ign} onChange={(e) => setIgn(e.target.value)} />
      </Modal>
    </div>
  );
};

export default LfgRoom;

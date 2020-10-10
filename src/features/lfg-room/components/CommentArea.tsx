import { User } from '@shared/models';
import { Avatar, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { Fragment, useState } from 'react';
import './CommentArea.scss';

interface CommentAreaProps {
  user: User;
  loading: boolean;
  onSubmit: (comment) => void;
}

const CommentArea = ({ user, loading, onSubmit }: CommentAreaProps) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      {user ? (
        <div>
          <span className="comment-as">
            Comment as
            {' ' + user?.name}
            {<Avatar size="small" src={user?.image}></Avatar>}
          </span>
          <TextArea rows={3} onChange={handleChange} value={value} />
          <Button
            htmlType="submit"
            loading={loading}
            onClick={() => {
              onSubmit(value);
              setValue('');
            }}
            type="primary"
            disabled={!value || value?.length === 0}
            className="add-comment-btn"
          >
            Add Comment
          </Button>
        </div>
      ) : (
        <div>
          <TextArea disabled={true} value={'Login to leave a comment'} />
        </div>
      )}
    </Fragment>
  );
};

export default CommentArea;

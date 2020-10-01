import { Button, Form, Input, InputNumber, Select, Tag, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateLfg.scss';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/Form';
import { Game } from '@shared/models';
import { RootState } from 'store';
import { createLfg } from '../redux/dashboard.reducer';

const { Option } = Select;

const CreateLfg = () => {
  const games = useSelector((state: RootState) => state.core.games);
  const user = useSelector((state: RootState) => state.core.user);
  const dispatch = useDispatch();
  const [form] = useForm();
  const [modalState, setModalState] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currTag, setCurrTag] = useState<string>();

  function gamesOnChange(name: string) {
    const game = games.find((g) => g.name === name);
    form.resetFields(['platform', 'region', 'gameModes']);
    setSelectedGame(game);
  }

  const handleCancel = () => {
    setModalState(false);
  };

  function handleReset() {
    form.resetFields();
    setSelectedGame(null);
    setTags([]);
  }

  function handleAddTag(event) {
    const tag: string = event.target.value;
    if (tag && tags.findIndex((t) => t.toLocaleLowerCase() === tag.toLocaleLowerCase()) < 0) {
      setTags([...tags, tag]);
      setCurrTag('');
    }
  }

  function handleRemoveTag(tag: string) {
    setTags([...tags.filter((t) => t !== tag)]);
  }

  function handleCurrTagChange(event) {
    setCurrTag(event.target.value);
  }

  function handleSubmit(values: any) {
    const newValues = {
      ...values,
      game: selectedGame,
      platform: selectedGame.platforms.find((p) => p.name === values.platform),
      region: selectedGame.regions.find((r) => r.name === values.region),
      gameModes: values.gameModes.map((gm) => selectedGame.gameModes.find((g) => g.name === gm)),
      tags,
    };
    dispatch(createLfg(newValues));
    setModalState(false);
  }

  return (
    <Fragment>
      <div className="header-area">
        <Tooltip title={user ? '' : 'Must be logged in to create.'}>
          <Button type="primary" onClick={() => setModalState(true)} disabled={user == null}>
            Create LFG
          </Button>
        </Tooltip>
      </div>
      <Modal
        title="Create LFG"
        visible={modalState}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="reset" onClick={handleReset}>
            Reset
          </Button>,
          <Button type="primary" key="submit" htmlType="submit" onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} name="create-lfg" className="create-lfg-form" onFinish={handleSubmit}>
          {/* GAME */}
          <Form.Item name="game" className="create-lfg-form-item" rules={[{ required: true, message: 'Game is required' }]}>
            <Select value={selectedGame ? selectedGame.name : null} placeholder="Game" showSearch style={{ width: 250 }} onChange={gamesOnChange}>
              {games?.map((game) => (
                <Option key={game.name} value={game.name}>
                  {game.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* PLATFORM */}
          <Form.Item name="platform" className="create-lfg-form-item" rules={[{ required: true, message: 'Platform is required' }]}>
            <Select disabled={selectedGame == null ? true : false} placeholder="Platform" showSearch style={{ width: 250 }}>
              {selectedGame?.platforms?.map((game) => (
                <Option key={game.name} value={game.name}>
                  {game.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Region */}
          <Form.Item name="region" className="create-lfg-form-item" rules={[{ required: true, message: 'Region is required' }]}>
            <Select disabled={selectedGame == null ? true : false} placeholder="Region" showSearch style={{ width: 250 }}>
              {selectedGame?.regions?.map((game) => (
                <Option key={game.name} value={game.name}>
                  {game.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* GAME MODE */}
          <Form.Item name="gameModes" className="create-lfg-form-item" rules={[{ required: true, message: 'Game mode is required' }]}>
            <Select mode="multiple" disabled={selectedGame == null ? true : false} placeholder="Game Modes" showSearch style={{ width: 250 }}>
              {selectedGame?.gameModes?.map((mode) => (
                <Option key={mode.name} value={mode.name}>
                  {mode.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* IGN */}
          <Form.Item name="ign" className="create-lfg-form-item">
            <Input placeholder="In game name" style={{ width: 250 }} />
          </Form.Item>
          {/* Player Count */}
          <Form.Item name="playerCount" className="create-lfg-form-item">
            <InputNumber min={1} max={200} placeholder="Players Needed" style={{ width: 250 }} type="number" />
          </Form.Item>
          {/* Description */}
          <Form.Item name="description" className="create-lfg-form-item" rules={[{ required: true, message: 'Description is required' }]}>
            <TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} style={{ width: 250 }} />
          </Form.Item>
          <div className="create-lfg-form-item">
            <Input
              type="text"
              style={{ width: 250 }}
              placeholder="Add Tags"
              value={currTag}
              onChange={handleCurrTagChange}
              onBlur={handleAddTag}
              onPressEnter={handleAddTag}
            />
          </div>
          <div>
            {tags.map((tag) => (
              <Tag closable={true} key={tag} onClose={() => handleRemoveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CreateLfg;

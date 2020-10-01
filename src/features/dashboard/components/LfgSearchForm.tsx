import { Game } from '@shared/models';
import { Button, Form, Input, Select, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getLfgs } from '@dashboard/redux/dashboard.reducer';
import './LfgSearchForm.scss';

const { Option } = Select;

const LfgSearchForm = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.core.games);
  const [selectedGame, setSelectedGame] = useState<Game>(null);
  const [form] = useForm();
  const [tags, setTags] = useState<string[]>([]);
  const [currTag, setCurrTag] = useState<string>();
  const gamesOnChange = (name: string) => {
    const game = games.find((g) => g.name === name);
    form.resetFields(['platform.name', 'region.name', 'gameModes.name']);
    setSelectedGame(game);
  };

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

  const handleFinish = (values) => {
    dispatch(
      getLfgs({
        ...values,
        tags: tags && tags.length > 0 ? tags : undefined,
        'gameModes.name': values['gameModes.name'] && values['gameModes.name'].length ? values['gameModes.name'] : undefined,
      })
    );
  };

  const handleReset = () => {
    dispatch(getLfgs({}));
    form.resetFields();
    setSelectedGame(null);
    setTags([]);
  };

  return (
    <Fragment>
      <div className="lfg-search-form-container">
        <Form form={form} name="create-lfg" className="lfg-search-form" onFinish={handleFinish}>
          <div className="lfg-search-form-row">
            <Form.Item name="game.name" className="lfg-search-form-item" rules={[{ required: true, message: 'Game is required' }]}>
              <Select
                value={selectedGame ? selectedGame.name : null}
                placeholder="Game"
                showSearch
                className="lfg-search-form-select"
                onChange={gamesOnChange}
                allowClear
              >
                {games?.map((game) => (
                  <Option key={game.name} value={game.name}>
                    {game.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="platform.name" className="lfg-search-form-item">
              <Select disabled={selectedGame == null ? true : false} placeholder="Platform" showSearch className="lfg-search-form-select" allowClear>
                {selectedGame?.platforms?.map((game) => (
                  <Option key={game.name} value={game.name}>
                    {game.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="region.name" className="lfg-search-form-item">
              <Select disabled={selectedGame == null ? true : false} placeholder="Region" showSearch className="lfg-search-form-select" allowClear>
                {selectedGame?.regions?.map((game) => (
                  <Option key={game.name} value={game.name}>
                    {game.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="gameModes.name" className="lfg-search-form-item">
              <Select mode="multiple" disabled={selectedGame == null ? true : false} placeholder="Game Modes" className="lfg-search-form-select" allowClear>
                {selectedGame?.gameModes?.map((mode) => (
                  <Option key={mode.name} value={mode.name}>
                    {mode.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="lfg-search-form-item">
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
            {tags && tags.length > 0 ? (
              <div className="lfg-search-form-item lfg-search-tags">
                {tags.map((tag) => (
                  <Tag closable={true} key={tag} onClose={() => handleRemoveTag(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            ) : null}
          </div>
          <div className="lfg-search-form-row lfg-search-form-action-row">
            <div className="lfg-search-form-item lfg-search-form-actions">
              <Button type="primary" onClick={form.submit}>
                Search
              </Button>

              <Button type="primary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default LfgSearchForm;

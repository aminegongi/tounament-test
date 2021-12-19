import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
} from 'antd'
import moment from 'moment'

export default function DreamAfricaAddMatchModal({
  visible,
  onCancel,
  groupStages,
  teams,
  onSave,
  onDelete,
  initData,
  onUpdate,
}) {
  const [isGroupStage, setGroupStage] = useState(true)
  const [data, setData] = useState({
    groupStage: '',
    team1: '',
    team2: '',
    date: moment(),
    title: '',
    status: 'planned',
    score: [0, 0],
  })
  useEffect(() => {
    setData({
      groupStage: '',
      team1: '',
      team2: '',
      date: moment(),
      title: '',
      status: 'planned',
      score: [0, 0],
    })
  }, [visible])
  useEffect(() => {
    if (initData) {
      if (initData.round.type === 'groupStages') {
        setGroupStage(true)
        setData({ ...initData, groupStage: initData.round.round_id })
      } else {
        setGroupStage(false)
        setData({ ...initData, title: initData.round.round_id })
      }
    }
  }, [initData])

  const onChangeGroupStage = (val) => {
    setData((v) => ({
      ...v,
      groupStage: val,
      team1: '',
      team2: '',
    }))
  }
  const groupStageTeams = () => {
    if (isGroupStage) {
      const gs = groupStages.find((el) => el.id === data.groupStage)
      if (gs) {
        return gs.teams.map((el) => {
          const team = teams.find((t) => t.id === el.id)
          return team
        })
      }
    }
    return teams
  }
  return (
    <Modal
      footer={
        <div className="">
          {initData && (
            <Button onClick={onDelete} type="danger">
              Delete
            </Button>
          )}
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            onClick={() =>
              initData
                ? onUpdate({ ...data, isGroupStage })
                : onSave({ ...data, isGroupStage })
            }
            type="primary"
          >
            Save
          </Button>
        </div>
      }
      title="Add match"
      visible={visible}
    >
      <Checkbox
        className="mb-4"
        checked={isGroupStage}
        onClick={() => setGroupStage((v) => !v)}
      >
        Group stage?
      </Checkbox>
      {isGroupStage && (
        <div className="w-full mb-3">
          <div htmlFor="">Group stage</div>
          <Select
            value={data.groupStage}
            onChange={onChangeGroupStage}
            placeholder="Group stage"
            className="w-full mt-2"
          >
            {groupStages.map((el) => (
              <Select.Option value={el.id}>{el.title}</Select.Option>
            ))}
          </Select>
        </div>
      )}
      {!isGroupStage && (
        <div className="w-full mb-3">
          <div htmlFor="">Title</div>
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full  mt-2"
          />
        </div>
      )}
      <div className="w-full mb-3">
        <div htmlFor="">Team 1</div>
        <Select
          value={data.team1}
          onChange={(e) => setData((v) => ({ ...v, team1: e }))}
          placeholder="team 1"
          className="w-full mt-2"
        >
          {groupStageTeams() &&
            groupStageTeams().map((el) => (
              <Select.Option value={el.id}>{el.title}</Select.Option>
            ))}
        </Select>
      </div>
      <div className="w-full mb-3">
        <div htmlFor="">Team 2</div>
        <Select
          value={data.team2}
          onChange={(e) => setData((v) => ({ ...v, team2: e }))}
          placeholder="team 2"
          className="w-full mt-2"
        >
          {groupStageTeams() &&
            groupStageTeams().map((el) => (
              <Select.Option value={el.id}>{el.title}</Select.Option>
            ))}
        </Select>
      </div>
      <div className="w-full mb-3">
        <div htmlFor="">Date</div>
        <input
          value={moment(data.date).format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          className="w-full border border-gray-300 rounded-sm mt-2"
          type="datetime-local"
        />
      </div>
      <div className="w-full mb-3">
        <div htmlFor="">Status</div>
        <Radio.Group
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
          buttonStyle="solid"
        >
          <Radio.Button value="planned">Planned</Radio.Button>
          <Radio.Button value="onGoing">On going</Radio.Button>
          <Radio.Button value="closed">Finished</Radio.Button>
        </Radio.Group>
      </div>
      <Divider>Score</Divider>
      <div className="w-full mb-3">
        <div htmlFor="">team1</div>
        <InputNumber
          type="number"
          value={data.score && data.score[0]}
          onChange={(e) =>
            setData({
              ...data,
              score: data.score
                ? data.score.map((el, index) => {
                    if (index === 0) {
                      return e
                    }
                    return el
                  })
                : [e, 0],
            })
          }
          className="w-full  mt-2"
        />
      </div>
      <div className="w-full mb-3">
        <div htmlFor="">Title</div>
        <InputNumber
          type="number"
          value={data.score && data.score[1]}
          onChange={(e) =>
            setData({
              ...data,
              score: data.score
                ? data.score.map((el, index) => {
                    if (index === 1) {
                      return e
                    }
                    return el
                  })
                : [0, e],
            })
          }
          className="w-full  mt-2"
        />
      </div>
    </Modal>
  )
}

import { Button, Input, Select, TimePicker } from 'antd'
import React, { useState } from 'react'
import IsporitModal from './IsporitModal/IsporitModal'

export default function BookingLocationModal({
  isVisible,
  onCancel,
  locations,
  selectedLocation,
  onChangeLocation,
  onSave,
  loading,
}) {
  const [values, setValues] = useState({})
  return (
    <IsporitModal isVisible={isVisible} onCancel={onCancel}>
      <div className="flex flex-col">
        <div className="mb-2">
          <div className="mb-1">Starts at</div>
          <Select
            className="w-full"
            value={selectedLocation}
            onChange={onChangeLocation}
          >
            {locations.map((location) => (
              <Select.Option key={location._id}>{location.name}</Select.Option>
            ))}
          </Select>
        </div>

        <div className="mb-2">
          <div className="mb-1">Starts at</div>
          <TimePicker
            onChange={(e) => setValues((v) => ({ ...v, startsAt: e }))}
            className="w-full"
            value={values.startsAt}
            minuteStep={30}
            format="HH:mm"
          />
        </div>
        <div className="mb-2">
          <div className="mb-1">Ends at</div>
          <TimePicker
            onChange={(e) => setValues((v) => ({ ...v, endsAt: e }))}
            className="w-full"
            value={values.endsAt}
            minuteStep={30}
            format="HH:mm"
          />
        </div>
        <Button
          onClick={() => onSave(values)}
          loading={loading}
          type="button"
          className="w-full bg-primary text-white text-xl"
        >
          Confirmer
        </Button>
      </div>
    </IsporitModal>
  )
}

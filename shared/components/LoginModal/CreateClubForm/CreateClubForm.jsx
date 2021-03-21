import { Button } from 'antd'
import React from 'react'
import './style.scss'

const CreateClubForm = ({ values, onChange, onSubmit, loading }) => {
  const onChangeInput = (e) =>
    onChange({
      ...values,
      [e.target.name]: e.target.value,
    })
  return (
    <form
      onSubmit={(e) => {
        onSubmit()
        e.preventDefault()
      }}
      className="create-club-form"
    >
      <div className="create-club-form__title">
        Informations sur l'organisation
      </div>
      <div className="create-club-form__input-container">
        <input
          type="text"
          placeholder="Nom de l'organisation"
          name="title"
          maxLength={49}
          className="isporit-input"
          onChange={onChangeInput}
          value={values.title}
          required
        />
        <input
          type="number"
          placeholder="Numéro de téléphone"
          name="phoneNumber1"
          maxLength={49}
          className="isporit-input"
          onChange={onChangeInput}
          value={values.phoneNumber1}
          required
        />
        <input
          type="text"
          placeholder="Adresse"
          name="address"
          maxLength={499}
          className="isporit-input"
          onChange={onChangeInput}
          value={values.address}
          required
        />
        <input
          type="text"
          placeholder="Ville"
          name="city"
          maxLength={49}
          className="isporit-input"
          onChange={onChangeInput}
          value={values.city}
          required
        />

        <input
          type="text"
          placeholder="Pays"
          name="country"
          maxLength={59}
          value={values.country}
          className="isporit-input"
          onChange={onChangeInput}
          required
        />
      </div>
      <center>
        <button type="submit" className="isporit-unset-button-css">
          <Button
            loading={loading}
            className="isporit-primary-button create-club-form__submit"
            type="submit"
          >
            S'inscrire
          </Button>{' '}
        </button>
      </center>
    </form>
  )
}

export default CreateClubForm

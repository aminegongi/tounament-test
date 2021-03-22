import Axios from 'axios'
import moment from 'moment'
import { API, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../constants'
import URL from './constants'
import { apiHeader } from '../../utils/apiHeader'
import { createUsernameForSignUp } from '../../utils/string.utils'

export const fetchUserProfile = async (setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.get(API + URL.auth.fetchUserProfile, apiHeader())
    setLoading(false)
    return {
      type: REQUEST_SUCCEEDED,
      data: result.data,
    }
  } catch (error) {
    setLoading(false)

    return {
      type: REQUEST_FAILED,
      data: error,
    }
  }
}

export const signIn = async (values, setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.post(API + URL.auth.login, {
      email: values.email,
      password: values.password,
    })
    setLoading(false)
    return {
      type: REQUEST_SUCCEEDED,
      data: result.data,
    }
  } catch (error) {
    setLoading(false)

    return {
      type: REQUEST_FAILED,
      data: error,
    }
  }
}

export const signUp = async (values, setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.post(API + URL.auth.signUp, {
      ...values,
      username: createUsernameForSignUp(values.firstName + values.lastName),
    })
    setLoading(false)
    return {
      type: REQUEST_SUCCEEDED,
      data: result.data,
    }
  } catch (error) {
    setLoading(false)

    return {
      type: REQUEST_FAILED,
      data: error.response.data,
    }
  }
}

export const createClub = async (values, setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.post(
      API + URL.club.create,
      {
        ...values,
        slug: createUsernameForSignUp(values.title),
      },
      apiHeader(values.token),
    )
    setLoading(false)
    return {
      type: REQUEST_SUCCEEDED,
      data: result.data,
    }
  } catch (error) {
    setLoading(false)

    return {
      type: REQUEST_FAILED,
      data: error.response.data,
    }
  }
}

export default fetchUserProfile

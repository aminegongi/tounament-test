import Axios from 'axios'
import moment from 'moment'
import { REQUEST_FAILED, REQUEST_SUCCEEDED } from '../constants'
import URL from './constants'
import { apiHeader } from '../../utils/apiHeader'

export const createCoachingRequest = async (values, setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.post(
      URL.baseApiUrl + URL.coachingRequest.create,
      {
        coach: values.coachId,
        note: values.note,
        requests: values.requests,
      },
      apiHeader(),
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

export const createRecruitmentRequest = async (values, setLoading) => {
  try {
    setLoading(true)
    const result = await Axios.post(
      URL.baseApiUrl + URL.recruitmentRequest.create,
      {
        coach: values.coachId,
        clubEmail: {
          emailBody: values.emailBody,
          emailDate: moment(),
        },
      },
      apiHeader(),
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

export default createCoachingRequest

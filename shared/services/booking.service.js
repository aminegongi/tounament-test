import Axios from 'axios'
import { REQUEST_SUCCEEDED, REQUEST_FAILED } from '../constants'
import URL from './constants'
import { apiHeader } from '../../utils/apiHeader'

export default async function createBookingApi(clubId, values, setLoading) {
  try {
    setLoading(true)
    const result = await Axios.post(
      `${URL.baseApiUrl + URL.booking.create}?clubId=${clubId}`,
      values,
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

export async function deleteBookingApi(clubId, values, setLoading) {
  try {
    setLoading(true)
    const result = await Axios.delete(
      `${URL.baseApiUrl + URL.booking.delete}?clubId=${clubId}`,
      {
        ...apiHeader(values.token),
        data: {
          _id: values._id,
        },
      },
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

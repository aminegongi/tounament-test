export const apiHeader = (token) => ({
  headers: {
    Authorization: token || `${localStorage.getItem('token') || ''}`,
    // 'Accept-Language': `en-US`,
  },
})

export default apiHeader

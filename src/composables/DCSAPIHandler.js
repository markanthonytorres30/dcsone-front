export async function api_fetch(location) {
  let loading = true
  let data = []
  let error = null

  return fetch(location, {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }

      return res.json()
    })
    .then((json) => {
      data = json
    })
    .catch((err) => {
      error = err
      if (err.json) {
        return err.json.then((json) => {
          error.message = json.message
        })
      }
    })
    .then(() => {
      loading = false
      return { loading: loading, data: data, error: error }
    })
}

export async function api_fetch2(location, param) {
  let loading = true
  let data = []
  let error = null

  return fetch(location, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(param)
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }

      return res.json()
    })
    .then((json) => {
      data = json
    })
    .catch((err) => {
      error = err
      if (err.json) {
        return err.json.then((json) => {
          error.message = json.message
        })
      }
    })
    .then(() => {
      loading = false
      return { loading: loading, data: data, error: error }
    })
}

export async function api_post_student_info(location, post_data) {
  let loading = true
  let data = []
  let error = null

  return fetch(location, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(post_data)
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }

      return res.json()
    })
    .then((json) => {
      data = json
    })
    .catch((err) => {
      error = err
      if (err.json) {
        return err.json.then((json) => {
          error.message = json.message
        })
      }
    })
    .then(() => {
      loading = false
      return { loading: loading, data: data, error: error }
    })
}

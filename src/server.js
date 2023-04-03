let options = {
  target: 'http://127.0.0.1:8000',
  changeOrigin: true,
  logLevel: 'debug',
  onError: function onError(err, req, res) {
    console.log('Server error.', err)
    res.end()
  }
}

export default options

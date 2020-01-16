function processError(e, res) {
  if (e.code === 'ECONNREFUSED') {
    res.status(500).json({
      status: 500,
      code: 'DB_CONNECTION_REFUSED',
      text: 'Database connection refused.'
    })
  } else {
    res.status(500).json({ status: 500, code: 'UNKNOWN_ERROR', error: e })
  }
}

module.exports = {
  processError
}

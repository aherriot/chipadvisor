export default async function recordError(action, details) {
  const resp = await fetch('/api/errors', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userId: parseInt(window.localStorage.getItem('userId'), 10) || null,
      location: window.location.pathname,
      action,
      details
    })
  })

  return resp
}

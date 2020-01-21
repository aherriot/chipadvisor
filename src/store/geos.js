import { store } from 'react-easy-state'

const geos = store({
  status: 'INIT',
  byId: {},

  async fetch() {
    if (geos.status === 'PENDING' || geos.status === 'SUCCESS') {
      return // already fetching
    }
    geos.status = 'PENDING'
    try {
      const resp = await fetch('/api/geos')
      const result = await resp.json()

      const geosMapping = {}
      result.data.forEach(geo => {
        geosMapping[geo.id] = geo
      })

      geos.byId = geosMapping
      geos.status = 'SUCCESS'
    } catch (e) {
      geos.status = 'ERROR'
    }
  }
})

export default geos

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImgThumbnail extends Component {
  state = {
    loading: false,
    thumb: undefined
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file || nextProps.file.length === 0) {
      return
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file } = this.props
    const { loading, thumb } = this.state

    if (!file) {
      return null
    }

    if (loading) {
      return <p>loading...</p>
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className='img-thumbnail mt-2'
        height={200}
        width={200}
      />
    )
  }
}

ImgThumbnail.propTypes = {
  file: PropTypes.object
}

export default ImgThumbnail

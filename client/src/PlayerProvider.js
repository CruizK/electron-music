import React from 'react'
import Sound from 'react-sound'

export const PlayerContext = React.createContext();

class PlayerProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      song: null,
      isPlaying: true,
    }
  }

  render() {
    return (
      <div>
        <PlayerContext.Provider value={{
          song: this.state.song,
          setSong: song => this.setState({song}),
          isPlaying: this.state.isPlaying,
          togglePlaying: () => this.setState({isPlaying: !this.state.isPlaying})
        }}>
          {this.props.children}
        </PlayerContext.Provider>
      </div>
    )
  }
}

export default PlayerProvider
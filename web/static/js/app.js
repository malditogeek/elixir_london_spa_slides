import { Socket } from 'phoenix'
import React, { Component } from 'react'
import { render } from 'react-dom'
import Mousetrap from 'mousetrap'
import styles from '../css/app.less'
import Highlight from 'react-highlight'

class Slide0 extends Component {
  render () {
    return <div>
      <h1>Phoenix's Asset Pipeline</h1>
    </div>
  }
}

class Slide1 extends Component {
  render () {
    return <div>
      <p>Mauro Pompilio</p>
      <p>@malditogeek</p>
    </div>
  }
}

class Slide2 extends Component {
  render () {
    return <div>
      <img src={require('../assets/images/javascript.jpg')}></img>
    </div>
  }
}

class Slide3 extends Component {
  render () {
    return <div>
      <h2>Phoenix + Brunch</h2>
      <p>Why did they choose Brunch?</p>
      <p>Dunno.</p>
      <p>What's wrong with Brunch?</p>
      <p>Not much. It'll probably do just ok.</p>
    </div>
  }
}

class Slide4 extends Component {
  render () {
    return <div>
      <h2>Modern history of asset bundling</h2>
      <Highlight className='shell'>cat *.js > bundle.js</Highlight>
      <p>Grunt tasks: transpilation, CSS pre-processing, etc.</p>
      <p>Gulp: same as Grunt but Stream-based</p>
      <p>Brunch-style bundlers</p>
      <p>Webpack: ASTs for your assets</p>
    </div>
  }
}

class Slide5 extends Component {
  render () {
    return <div>
      <h2>Webpack at Gitter.im</h2>

      <p>Single Page App, live chat</p>
      <p>~20K lines of JS</p>
      <p>Multiple entrypoints (Homepage, Explore, App itself, etc)</p>
    </div>
  }
}

class Slide6 extends Component {
  render () {
    return <div>
      <h2>Webpack Advantages</h2>
      <p>AST based dependencies</p>
      <p>Smarter code split</p>
      <p>Loaders</p>
    </div>
  }
}

class Slide7 extends Component {
  render () {
    return <div>
      <h2>What happens when your SPA grows?</h2>
      <p>Brunch generates the bundles everytime</p>
      <p>and writes them to disk.</p>
      <p>Phoenix file watcher swaps them using WS.</p>
    </div>
  }
}

class Slide8 extends Component {
  render () {
    return <div>
      <h2>webpack-dev-server</h2>
      <p>Support for Hot Module Replacement</p>
      <p>Doens't output assets, just for dev</p>
    </div>
  }
}

class Slide9 extends Component {
  render () {
    return <div>
      <h2>Phoenix Sockets + Webpack + React</h2>
      <p>Hot Module Replacement!</p>
      <p>You don't lose state</p>
      <p>Faster workflow</p>
    </div>
  }
}

class Slide10 extends Component {
  render () {
    return <div>
      <h2>Community Numbers</h2>
      <div className={styles.sideBySide}>
        <div>
          <h3>Brunch</h3>
          <p>Stars: 5.1K</p>
          <p>Forks: 368</p>
          <p>Dependent repos: 1.48K</p>
        </div>
        <div>
          <h3>Webpack</h3>
          <p>Stars: 13.6K</p>
          <p>Forks: 1.11K</p>
          <p>Dependent repos: 28.4K</p>
        </div>
      </div>
      <div className={styles.source}>
        <p>Source:</p>
        <p>https://libraries.io/npm/brunch</p>
        <p>https://libraries.io/npm/webpack</p>
      </div>
    </div>
  }
}

class Slide11 extends Component {
  render () {
    return <div>
      <h1>Thanks!</h1>
    </div>
  }
}

// Slideshow

class Slideshow extends Component {
  constructor (props) {
    super(props)
    this.state = {ping_count: 0, slide: 0}
  }

  componentDidMount () {
    let socket = new Socket('/socket', {
      // logger: (kind, msg, data) => console.debug(`${kind}: ${msg}`, data)
    })

    socket.connect()

    this.chan = socket.channel('rooms:lobby', {})

    this.chan.join()
      .receive('ignore', () => console.log('auth error'))
      .receive('ok', () => console.log('connected'))
      // .after(10000, () => console.log('Connection interruption'))

    this.chan.onError((e) => console.log('something went wrong', e))
    this.chan.onClose((e) => console.log('channel closed', e))

    this.chan.on('ping', (ping) => {
      this.setState({ping_count: this.state.ping_count += 1})
    })

    this.chan.on('slide', (msg) => {
      let state = this.state
      state.slide = msg.slide
      this.setState(state)
    })

    this.onStage()
  }

  onStage () {
    var hasToken = !!window.localStorage.getItem('token')

    if (hasToken) {
      Mousetrap.bind('right', this.nextSlide.bind(this))
      Mousetrap.bind('left', this.prevSlide.bind(this))
    }
  }

  nextSlide () {
    var token = window.localStorage.getItem('token')
    this.setState({state: this.state.slide += 1})
    this.chan.push('slide', {slide: this.state.slide, token: token})
  }

  prevSlide () {
    var token = window.localStorage.getItem('token')
    if (this.state.slide > 0) this.setState({state: this.state.slide -= 1})
    this.chan.push('slide', {slide: this.state.slide, token: token})
  }

  render () {
    // Pay no attention to the man behind the curtain.
    let CurrentSlide = eval(`Slide${this.state.slide}`)

    return <div>
      <div className={styles.slide}>
        <CurrentSlide />
      </div>

      <div className={styles.stats}>
        <p>Count: {this.state.ping_count}</p>
        <p>Slide: {this.state.slide}</p>
      </div>
    </div>
  }
}

class App extends Component {
  render () {
    return <div>
      <Slideshow />
    </div>
  }
}

render(<App />, document.getElementById('app'))

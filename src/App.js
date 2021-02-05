function App() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Documentation</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero is-warning is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Try Agora</h1>
          </div>
        </div>
      </header>
      <main>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <p>First column</p>
                <button id="join">▶️ Join</button>
              </div>
              <div className="column">
                <p>Second column</p>
                <button id="leave">⏹ Leave</button>
              </div>
              <div className="column">
                <p>Third column</p>
                <button id="publish">🔊 Publish(unmute)</button>
              </div>
              <div className="column">
                <p>Forth column</p>
                <button id="unpublish">🔇 Unpublish(mute)</button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <p>
              Your ID: <span id="userId"></span>
            </p>
          </div>
        </section>
        <section>
          <div className="container">
            <p>
              Participants (<span id="numOfParticipants">0</span>):
            </p>
            <ul id="participantList"></ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-multiline">
              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    <figure className="image">
                      <img
                        src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                        alt="cute dog"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <a href="https://console.agora.io/">https://console.agora.io/</a>
          </p>
          <p>
            <a href="https://docs.agora.io/en/Voice/start_call_audio_web_ng?platform=Web">
              <p>&gt;Agora Voice Call Overview</p>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

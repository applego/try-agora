import { useEffect, useState, FormEvent, BaseSyntheticEvent } from "react";
import { fetchImages } from "./api";

import BreedList from "./dataBreedList";

function Navbar() {
  return (
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
  );
}

function Header() {
  return (
    <header className="hero is-warning is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Try Agora</h1>
        </div>
      </div>
    </header>
  );
}

function Join() {
  return (
    <div>
      <button className="button is-link is-rounded" id="join">
        ▶️ Join
      </button>
    </div>
  );
}

function Leave() {
  return (
    <div>
      <button className="button is-link is-rounded is-light" id="leave">
        ⏹ Leave
      </button>
    </div>
  );
}

function Publish() {
  return (
    <div>
      <button className="button is-warning is-rounded" id="publish">
        🔊 Publish(unmute)
      </button>
      {/* <button className="button" title="Disabled button" disabled>Disabled</button> */}
    </div>
  );
}

function Unpublish() {
  return (
    <div>
      <button className="button is-warning is-rounded is-light" id="unpublish">
        🔇 Unpublish(mute)
      </button>
    </div>
  );
}

function UserId() {
  return (
    <p>
      Your ID: <span id="userId"></span>
    </p>
  );
}

function Participants() {
  return (
    <div>
      <p>
        Participants (<span id="numOfParticipants">0</span>):
      </p>
      <ul id="participantList"></ul>
    </div>
  );
}

interface PropsImage {
  src: string;
}

function Image(props: PropsImage) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <progress className="progress is-small is-primary" max="100">
        15%
      </progress>
      <progress className="progress is-danger" max="100">
        30%
      </progress>
      <progress className="progress is-medium is-dark" max="100">
        45%
      </progress>
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
    </div>
  );
}

function ImageNotFound() {
  return (
    <div>
      <section className="section is-medium">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column has-text-centered">
              <h1 className="title">Image Not Found</h1>
              <p className="subtitle">Sorry...</p>
            </div>
            <div className="column has-text-centered">
              <img src="./images/White Beauty Collection Logo.jpg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface PropsGallery {
  urls: string[] | null;
}

function Gallery(props: PropsGallery) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  if (!Array.isArray(urls)) {
    // alert("urls is not Array");
    return <ImageNotFound />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url: string) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Buttons() {
  return (
    <div className="columns">
      <div className="column">
        <Join />
      </div>
      <div className="column">
        <Leave />
      </div>
      <div className="column">
        <Publish />
      </div>
      <div className="column">
        <Unpublish />
      </div>
    </div>
  );
}

interface PropsBreedSelect {
  breedList: string[];
}

function BreedSelect(props: PropsBreedSelect) {
  return (
    <select name="breed" defaultValue="shiba">
      {/* <option value="shiba">Shiba</option>
                <option value="akita">Akita</option> */}
      {props.breedList.map((breed, index) => {
        return (
          <option key={index.toString()} value={breed}>
            {breed}
          </option>
        );
      })}
      ;
    </select>
  );
}

interface PropsForm {
  onFormSubmit: (str: string) => void;
}

function Form(props: PropsForm) {
  function handleSubmit(event: BaseSyntheticEvent) {
    event.preventDefault();
    console.log(event);
    console.log(typeof event);

    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <BreedSelect breedList={BreedList} />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// type TypeUrls = {
//   urls: string[];
// };
// interface Urls {
//   urls: string[];
//   prevState: null
// }

function Main() {
  const [imageNum, setImageNum] = useState<number>(12);
  const [urls, setUrls] = useState<any | null>(null); // todo refactor any
  useEffect(() => {
    fetchImages("shiba", imageNum).then((urls_) => {
      setUrls(urls_);
    });
  }, []);
  function reloadImages(breed: string) {
    fetchImages(breed, imageNum).then((urls_) => {
      setUrls(urls_);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
          <Buttons />
        </div>
      </section>
      <section>
        <div className="container">
          <UserId />
        </div>
      </section>
      <section>
        <div className="container">
          <Participants />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="https://console.agora.io/">https://console.agora.io/</a>
        </p>
        <p>
          <a href="https://docs.agora.io/en/Voice/start_call_audio_web_ng?platform=Web">
            <p>&gt; Agora Voice Call Overview</p>
          </a>
        </p>
      </div>
    </footer>
  );
}

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

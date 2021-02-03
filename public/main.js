import { appId, channel, token } from "./secrets.js";

/**
 * @typedef {import("agora-rtc-sdk-ng")["default"]} AgoraRTC
 */

/**
 * @typedef {import("agora-rtc-sdk-ng").IAgoraRTCClient} IAgoraRTCClient
 * @typedef {import("agora-rtc-sdk-ng").IMicrophoneAudioTrack} IMicrophoneAudioTrack
 * @typedef {import("agora-rtc-sdk-ng").IAgoraRTCRemoteUser} IAgoraRTCRemoteUser
 */

/** @type {AgoraRTC} */
// eslint-disable-next-line prefer-destructuring
const AgoraRTC = window.AgoraRTC;

const rtc = {
  /**
   * For the local client.
   * @type {IAgraRTCClient | null}
   */
  client: null,

  /**
   * For the local audio track.
   * @type {IMicrophoneAudioTrack | null
   */
  localAudioTrack: null,
};

const options = {
  // Pass your app ID here
  appId,
  // Set the channel name.
  channel,
  // Pass a token if your project enables the App Certificate.
  token,
};

// ----------------------------------------------------------------

/** @type {Set<IAgoraRTCRemoteUser>} */
const participants = new Set();

let joined = false;

main();

// ----------------------------------------------------------------

function main() {
  createLocalClient();
  startListening();
  renderButtons();
  renderUserId();
  renderParticipants();

  document.querySelector("#join").onclick = async () => {
    const uid = await joinChannel();
    renderUserId(uid);
    joined = true;
    renderButtons();
  };

  document.querySelector("#publish").onclick = async () => {
    await publishTracks();
  };

  document.querySelector("#leave").onclick = async () => {
    await leaveCall();
    joined = false;
    renderButtons();
  };
}

function createLocalClient() {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
}

async function joinChannel() {
  if (!rtc.client) {
    throw new Error("Client must be ready");
  }

  const uid = await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    null
  );
  return uid;
}

async function publishTracks() {
  // Create an audio track from the audio sampled by a microphone.
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  // Publish the local audio track to the channel.
  await rtc.client.publish([rtc.localAudioTrack]);
}

function startListening() {
  rtc.client.on("user-published", async (user, mediaType) => {
    participants.add(user);
    renderParticipants();

    // Subscribe to a remote user.
    await rtc.client.subscribe(user, mediaType);

    // If the subscribed track is audio.
    if (mediaType === "audio") {
      // Get `RemoteAudioTrack` in the `user` object.
      const remoteAudioTrack = user.audioTrack;
      // Play the audio track. No need to pass any DOM element.
      remoteAudioTrack.play();
    }
  });

  rtc.client.on("user-unpublished", (user) => {
    participants.delete(user);
    renderParticipants();

    // Get the dynamically created DIV container.
    const playerContainer = document.getElementById(user.uid);
    // Destroy the container.
    playerContainer.remove();
  });
}

async function leaveCall() {
  if (rtc.localAudioTrack) {
    // Destroy the local audio and track.
    rtc.localAudioTrack.close();
  }

  // Leave the channel.
  await rtc.client.leave();
}

function renderButtons() {
  /** @type {HTMLButtonElement} */
  const elJoin = document.querySelector("#join");
  /** @type {HTMLButtonElement} */
  const elPublish = document.querySelector("#publish");
  /** @type {HTMLButtonElement} */
  const elLeave = document.querySelector("#leave");

  if (joined) {
    elJoin.disabled = true;
    elPublish.disabled = false;
    elLeave.disabled = false;
  } else {
    elJoin.disabled = false;
    elPublish.disabled = true;
    elLeave.disabled = true;
  }
}

/**
 * @param {string} userId
 */
function renderUserId(userId) {
  document.querySelector("#userId").textContent = userId;
}

function renderParticipants() {
  const elNumber = document.querySelector("#numOfParticipants");
  elNumber.textContent = participants.size;

  const elList = document.querySelector("#participantList");
  elList.innerHTML = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const user of participants) {
    const el = document.createElement("LI");
    el.textContent = user.uid;
    elList.appendChild(el);
  }
}

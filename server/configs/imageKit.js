import ImageKit from "imagekit";

const pub = process.env.IMAGEKIT_PUBLIC_KEY?.trim();
const priv = process.env.IMAGEKIT_PRIVATE_KEY?.trim();
const endpoint = process.env.IMAGEKIT_URL_ENDPOINT?.trim();

let imagekit = null;
if (pub && priv && endpoint) {
  try {
    imagekit = new ImageKit({
      publicKey: pub,
      privateKey: priv,
      urlEndpoint: endpoint,
    });
  } catch {
    imagekit = null;
  }
}

export default imagekit;
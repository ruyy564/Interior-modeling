import { ImageLoader } from 'three/src/loaders/ImageLoader.js';
import { Texture } from 'three/src/textures/Texture.js';
import { Loader } from 'three/src/loaders/Loader.js';

class TLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const texture = new Texture();
    const loader = new ImageLoader(this.manager);
    loader.setCrossOrigin(this.crossOrigin);
    loader.setPath(this.path);
    loader.load(
      url,
      function (image) {
        texture.image = image;
        texture.needsUpdate = true;
        console.log('loader', texture);
        if (onLoad !== undefined) {
          onLoad(texture);
          console.log('loader', texture.source.data);
        }
      },
      onProgress,
      onError
    );

    return texture;
  }
}

export { TLoader };

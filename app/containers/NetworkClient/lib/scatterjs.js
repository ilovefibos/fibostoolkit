const checkForPlugin = (resolve, tries = 0) => {
  if (tries > 20) return;
  if (holder.scatter.isExtension) {
    resolve(true);
  }
  setTimeout(() => checkForPlugin(resolve, tries + 1), 100);
};

class Scatter {
  async connect(pluginName, options) {
    return new Promise(resolve => {
      if (!pluginName || !pluginName.length) throw new Error('You must specify a name for this connection');

      // Setting options defaults
      const newOptions = Object.assign({ initTimeout: 10000, linkTimeout: 30000 }, options);

      // Auto failer
      setTimeout(() => {
        resolve(false);
      }, newOptions.initTimeout);

      // Defaults to scatter extension if exists
      checkForPlugin(resolve);
    });
  }
}

class Holder {
  constructor(_scatter) {
    this.scatter = _scatter;
  }
}

const holder = new Holder(new Scatter());
if (typeof window !== 'undefined') {
  // Catching extension instead of Desktop
  if (typeof document !== 'undefined') {
    const bindScatterClassic = () => {
      holder.scatter = window.ironman;
      holder.scatter.isExtension = true;
      holder.scatter.connect = () => new Promise(resolve => resolve(true));
    };

    if (typeof window.ironman !== 'undefined') bindScatterClassic();
    else document.addEventListener('ironmanLoaded', () => bindScatterClassic());
  }
}

export default holder;

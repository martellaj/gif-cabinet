import sampleData from '../SampleData/sample-gifs';

export default class GifHelper {
    constructor(AppComponent) {
        this._app = AppComponent;

        this.createGif = this.createGif.bind(this);
        this.createSampleData = this.createSampleData.bind(this);
        this.deleteGif = this.deleteGif.bind(this);
        this.deleteSampleData = this.deleteSampleData.bind(this);
        this.getGif = this.getGif.bind(this);
        this.selectGif = this.selectGif.bind(this);
        this.unselectGif = this.unselectGif.bind(this);
        this.updateGif = this.updateGif.bind(this);
    }

    createGif(gif) {
        // Generate timestamp key.
        let timestamp = Date.now();

        this._app.setState({
            gifs: this._app.state.gifs.concat([{
                ...gif,
                timestamp: timestamp,
                key: timestamp
            }]),
            results: this._app.state.results.concat([{
                ...gif,
                timestamp: timestamp,
                key: timestamp
            }])
        });
    }

    getGif(key) {
        return this._app.state.gifs.filter(gif => {
            return gif.timestamp === key;
        })[0];
    }

    getIndexOfGifWithKey(key, collection) {
        return collection.findIndex(gif => {
            if (!gif) {
                return false;
            } else {
                return gif.timestamp === key;
            }
        });
    }

    updateGif(updatedGif) {
        let gifs = this._app.state.gifs.slice();
        gifs[this.getIndexOfGifWithKey(this._app.state.selectedGif, gifs)] = updatedGif;

        let results = this._app.state.results.slice();
        results[this.getIndexOfGifWithKey(this._app.state.selectedGif, results)] = updatedGif;

        this._app.setState({
            selectedGif: -1,
            gifs,
            results
        });
    }

    deleteGif() {
        let gifs = this._app.state.gifs.slice();
        delete gifs[this.getIndexOfGifWithKey(this._app.state.selectedGif, gifs)];

        let results = this._app.state.results.slice();
        delete results[this.getIndexOfGifWithKey(this._app.state.selectedGif, results)];

        this._app.setState({
            selectedGif: -1,
            gifs,
            results
        });
    }

    selectGif(timestamp) {
        this._app.setState({
            selectedGif: timestamp
        });
    }

    unselectGif() {
        this._app.setState({
            selectedGif: -1
        });
    }

    createSampleData() {
        let gifs = this._app.state.gifs.slice();
        let results = this._app.state.results.slice();
        let count = 0;

        Object.keys(sampleData).map((key) => {
            let sample = sampleData[key];
            let gifKey = parseInt(`${Date.now()}${count++}`, 10);

            gifs.push({
                ...sample,
                timestamp: gifKey,
                key: gifKey
            });
            results.push({
                ...sample,
                timestamp: gifKey,
                key: gifKey
            });

            // Just need to return anything.
            return null;
        });

        this._app.setState({
            gifs,
            results
        });
    }

    deleteSampleData() {
        let gifs = this._app.state.gifs.slice();
        gifs.map((gif, key) => {
            delete gifs[key];
            return gif;
        });

        let results = this._app.state.results.slice();
        results.map((result, key) => {
            delete results[key];
            return result;
        });

        this._app.setState({
            selectedGif: -1,
            gifs,
            results
        });
    }
}
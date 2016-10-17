import Rebase from 're-base';

let base = Rebase.createClass({
    apiKey: 'apiKey lives in a secret gist',
    authDomain: 'gif-cabinet.firebaseapp.com',
    databaseURL: 'https://gif-cabinet.firebaseio.com'
});

export default base;
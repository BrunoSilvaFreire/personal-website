import {MDCRipple} from '@material/ripple';

document.querySelectorAll('.mdc-button').forEach(function (el) {
    new MDCRipple(el);
});
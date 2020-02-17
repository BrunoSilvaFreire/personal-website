import {MDCRipple} from '@material/ripple';

document.querySelectorAll('.mdc-button').forEach(el => {
    new MDCRipple(el);
});


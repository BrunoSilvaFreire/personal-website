import {MDCRipple} from '@material/ripple';
document.querySelectorAll('.mdc-button, .mdc-card__primary-action').forEach(el => {
    new MDCRipple(el);
});


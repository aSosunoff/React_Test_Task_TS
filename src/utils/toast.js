export const info = (html) => window.M.toast({ html, classes: "info" });

export const warning = (html) => window.M.toast({ html, classes: "warning" });

export const danger = (html) => window.M.toast({ html, classes: "danger" });

export default (html) => window.M.toast({ html });

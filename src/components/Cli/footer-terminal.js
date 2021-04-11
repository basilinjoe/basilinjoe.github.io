import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'

export { setupTerminal as footerTerminal }
function setupTerminal(cb) {
    figlet.parseFont('Standard', standard);
    let term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    let doc = document.getElementById('terminal');
    term.open(doc);
    fitAddon.fit();
    term.focus();
    figlet.text("Basilin Joe", {
        font: 'Standard',
        whitespaceBreak: true
    }, (err, str) => {
        str.split('\n').forEach(x => term.writeln(x));
    });
    term.setOption('cursorBlink', true);
    let tprompt = () => term.write('\r\n$ ');
    tprompt();
    let cmd = '';
    term.onKey((e) => {
        const ev = e.domEvent;
        const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.keyCode === 13) {
            if (cmd === 'clear') {
                term.clear();
            }
            cb(cmd);
            cmd = '';
            tprompt();
        } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (term.buffer.active.cursorX > 2) {
                term.write('\b \b');
            }
        } else if (printable) {
            cmd += e.key;
            term.write(e.key);
        }
    });
}
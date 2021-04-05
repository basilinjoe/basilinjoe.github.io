import logo from './logo.svg';
import './App.css';
import "xterm/css/xterm.css";
import React, { useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'

function App() {
  useEffect(() => {
    figlet.parseFont('Standard', standard);
    let term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    let doc = document.getElementById('terminal');
    term.open(doc);
    fitAddon.fit();
    term.focus();
    figlet.text("Basilin Joe", {
      font:'Standard',
      whitespaceBreak: true
    }, (err, str) => {
      let res = str.split('\n').forEach(x=>term.writeln(x));
      console.log(str);
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
  });
  return (
    <div className="App">
      <header className="shrink">
        Header
      </header>
      <main className="grow">
      </main>
      <footer className="shrink">
        <div id="terminal"></div>
      </footer>
    </div>
  );
}

export default App;

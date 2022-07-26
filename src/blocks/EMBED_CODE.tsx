import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<pre><code class="language-javascript">${text}</code></pre>`;

export const EMBED_CODE: Block<string> = {
  Icon: () => <div>Embed Code</div>,
  initialValue: '<pre><code class="language-javascript">for (var i=1; i <= 20; i++){if (i % 15 == 0)console.log("FizzBuzz");</code></pre>',
  _fromString: parse,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import script from '../src/script';

const initHtml = fs.readFileSync(path.join('src', 'index.html')).toString();
document.documentElement.innerHTML = initHtml;
const textareaOutput = document.querySelector('.textareaOutput');

test('textareaOutput', () => {
  expect(textareaOutput).toHaveClass('form-control');
  expect(textareaOutput).toHaveAttribute('accesskey');
  expect(textareaOutput).toBeEmptyDOMElement();
});

test('debtPan', () => {
  const input = ['00500441749\n00500470359'];
  script.debt(input, textareaOutput);
  expect(textareaOutput).toHaveTextContent('3106470000500441749', '3106470000500470359');
  expect(textareaOutput.textContent.split()).toHaveLength(1);
});

test('debtClose', () => {
  const input = ['f9de6c6b-0d0f-431e-8b99-9534dc372d96\n3097ff3f-2919-4677-979c-26e36f8a0c2f'];
  script.debt(input, textareaOutput);
  const expected = ("SELECT db_admin.close_debt_transaction('f9de6c6b-0d0f-431e-8b99-9534dc372d96');",
  "SELECT db_admin.close_debt_transaction('3097ff3f-2919-4677-979c-26e36f8a0c2f');");
  expect(textareaOutput).toHaveTextContent(expected);
});

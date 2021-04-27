import '@testing-library/jest-dom'; // https://github.com/testing-library/jest-dom
import fs from 'fs';
import path from 'path';
import script from '../src/script';

let textareaOutput;
let input;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('src', 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  textareaOutput = document.querySelector('.textareaOutput');
});

test('textareaOutput', () => {
  expect(textareaOutput).toHaveClass('textareaOutput form-control');
  expect(textareaOutput).toHaveAttribute('accesskey');
  expect(textareaOutput).toBeEmptyDOMElement();
});

test('debtPan', () => {
  input = ['00500441749 \n 00500470359 '];
  script.debt(input, textareaOutput);
  const expected = ['3106470000500441749', '3106470000500470359'].join('\n');
  expect(textareaOutput).toHaveValue(expected);
  expect(textareaOutput.textContent.split()).toHaveLength(1);
});

test('debtClose', () => {
  input = [
    ' f9de6c6b-0d0f-431e-8b99-9534dc372d96 \n 3097ff3f-2919-4677-979c-26e36f8a0c2f ',
  ];
  script.debt(input, textareaOutput);
  const expected = [
    "SELECT db_admin.close_debt_transaction('f9de6c6b-0d0f-431e-8b99-9534dc372d96');",
    "SELECT db_admin.close_debt_transaction('3097ff3f-2919-4677-979c-26e36f8a0c2f');",
  ].join('\n');
  expect(textareaOutput).toHaveValue(expected);
  expect(textareaOutput.textContent.split()).toHaveLength(1);
});

test('driver', () => {
  input = [
    'ОАО ПАТП-4 (Новокузнецк),водитель,Ферг Нерман Сбербанкович,,123,1\nВан-Тин-Фан Александр Александрович 123456\nQwert Qwerty Qwertyvovich',
  ];
  script.addDriver(input, textareaOutput);
  const expected = [
    'ОАО ПАТП-4 (Новокузнецк),водитель,Ферг,Нерман,Сбербанкович,,123,1',
    'ОАО ПАТП-4 (Новокузнецк),водитель,Ван-Тин-Фан,Александр,Александрович,,123456,1',
    'ОАО ПАТП-4 (Новокузнецк),водитель,Qwert,Qwerty,Qwertyvovich,,,1',
  ].join('\n');
  expect(textareaOutput.textContent).toMatch(expected);
  expect(textareaOutput.textContent.split('\n')).toHaveLength(4);
});

test('grz', () => {
  input = ['АУ234 42\nАР923 42\nАХ519 42ё'];
  script.grz(input, textareaOutput);
  const expected = ['Нет русских букв', 'AY23442', 'AP92342', 'AX51942E'].join('\n');
  expect(textareaOutput).toHaveValue(expected);
});

test('term', () => {
  input = [
    '22223333,123,1234,1,3,,true,321,111111111111,2222,22223333,3333,4111,643,J1,Q,1,TKP000000001\n12345678',
  ];
  script.addTerm(input, textareaOutput);
  const expected = [
    '22223333,123,1234,1,3,,true,321,111111111111,2222,22223333,3333,4111,643,J1,Q,1,TKP000000001',
    '12345678,123,1234,1,3,,true,321,111111111111,1234,12345678,5678,4111,643,J1,Q,1,TKP000000001',
  ].join('\n');
  expect(textareaOutput.textContent).toMatch(expected);
  expect(textareaOutput.textContent.split('\n')).toHaveLength(3);
});

test('sql', () => {
  input = ['one\ntwo\n3\nчетыре'];
  script.getSql(input, textareaOutput);
  const expected = "IN ('one','two','3','четыре')";
  expect(textareaOutput.textContent).toMatch(expected);
});

'use strict';


const $ = require('jquery');


const charactersInfo = [
  {
    n: '1',
    characterBegin: 'א',
    characterEnd: '',
    name: 'А́леф',
    transliteration: '\', а, е'
  },
  {
    n: '2',
    characterBegin: 'ב',
    characterEnd: '',
    name: 'Бет (вет)',
    transliteration: 'б, в'
  },
  {
    n: '3',
    characterBegin: 'ג',
    characterEnd: '',
    name: 'Ги́мел',
    transliteration: 'г'
  },
  {
    n: '4',
    characterBegin: 'ד',
    characterEnd: '',
    name: 'Да́лет',
    transliteration: 'д'
  },
  {
    n: '5',
    characterBegin: 'ה',
    characterEnd: '',
    name: 'hе',
    transliteration: 'ґ (h), х, г'
  },
  {
    n: '6',
    characterBegin: 'ו',
    characterEnd: '',
    name: 'Вав',
    transliteration: 'в, о, у'
  },
  {
    n: '7',
    characterBegin: 'ז',
    characterEnd: '',
    name: 'За́ин',
    transliteration: 'з'
  },
  {
    n: '8',
    characterBegin: 'ח',
    characterEnd: '',
    name: 'Хет',
    transliteration: 'х'
  },
  {
    n: '9',
    characterBegin: 'ט',
    characterEnd: '',
    name: 'Тет',
    transliteration: 'т'
  },
  {
    n: '10',
    characterBegin: 'י',
    characterEnd: '',
    name: 'Йод',
    transliteration: 'и, й'
  },
  {
    n: '11',
    characterBegin: '‭כ',
    characterEnd: 'ך',
    name: 'Каф (хаф)',
    transliteration: 'к, х'
  },
  {
    n: '12',
    characterBegin: 'ל',
    characterEnd: '',
    name: 'Ла́мед',
    transliteration: 'л'
  },
  {
    n: '13',
    characterBegin: '‭מ',
    characterEnd: 'ם',
    name: 'Мем',
    transliteration: 'м'
  },
  {
    n: '14',
    characterBegin: '‭נ',
    characterEnd: 'ן',
    name: 'Нун',
    transliteration: 'н'
  },
  {
    n: '15',
    characterBegin: 'ס',
    characterEnd: '',
    name: 'Са́мех',
    transliteration: 'с'
  },
  {
    n: '16',
    characterBegin: 'ע',
    characterEnd: '',
    name: 'А́ин',
    transliteration: '`, а, е'
  },
  {
    n: '17',
    characterBegin: '‭פ',
    characterEnd: 'ף',
    name: 'Пе (фе)',
    transliteration: 'п, ф'
  },
  {
    n: '18',
    characterBegin: '‭צ',
    characterEnd: 'ץ',
    name: 'Ца́ди',
    transliteration: 'ц'
  },
  {
    n: '19',
    characterBegin: 'ק',
    characterEnd: '',
    name: 'Коф',
    transliteration: 'к'
  },
  {
    n: '20',
    characterBegin: 'ר',
    characterEnd: '',
    name: 'Реш',
    transliteration: 'р'
  },
  {
    n: '21',
    characterBegin: 'ש',
    characterEnd: '',
    name: 'Шин (син)',
    transliteration: 'ш, с'
  },
  {
    n: '22',
    characterBegin: 'ת',
    characterEnd: '',
    name: 'Тав',
    transliteration: 'т'
  }
];


function fillAnswers(count, correct) {
  let answers = [ correct ];

  while (answers.length < count) {
    let answer = charactersInfo[Math.floor(Math.random() * charactersInfo.length)];

    if (answers.indexOf(answer) === -1) {
      answers.push(answer);
    }
  }

  // Shuffle answers
  for (let i = answers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answers[i];

    answers[i] = answers[j];
    answers[j] = temp;
  }

  return answers;
}


function rndQuestion() {
  let $q = $('.alphabet-test-question');
  let answerButtons = [
    $('.alphabet-test-answer-1'),
    $('.alphabet-test-answer-2'),
    $('.alphabet-test-answer-3'),
    $('.alphabet-test-answer-4')
  ];

  if (Math.random() > 0.5) {
    // Find character name by character
    let ci = charactersInfo[Math.floor(Math.random() * charactersInfo.length)];
    let char = ci.characterBegin;
    let imgName = ci.n;

    if (ci.characterEnd && Math.random() > 0.5) {
      char = ci.characterEnd;
      imgName = ci.n + '_';
    }

    $q.html(`${char} <img class="alphabet-handwriting-char" src="img/handwriting/${imgName}.svg" />`);

    let answers = fillAnswers(answerButtons.length, ci);

    answerButtons.forEach(($btn, i) => {
      $btn.data('correct', false);
      $btn.text(answers[i].name);

      if (answers[i] === ci) {
        $btn.data('correct', true);
      }
    });
  } else {
    // Find character by character name
    let ci = charactersInfo[Math.floor(Math.random() * charactersInfo.length)];

    $q.text(ci.name);

    let answers = fillAnswers(answerButtons.length, ci);

    answerButtons.forEach(($btn, i) => {
      $btn.data('correct', false);
      $btn.text(answers[i].characterBegin);

      if (answers[i].characterEnd && Math.random() > 0.5) {
        $btn.text(answers[i].characterEnd);
      }

      if (answers[i] === ci) {
        $btn.data('correct', true);
      }
    });
  }
}


// Init page
//
$(() => {
  let $alphabetBody = $('.alphabet-table-body');

  charactersInfo.forEach(ci => {
    let $tr = $('<tr></tr>');

    $tr.append(`<td class="alphabet-table-n-cell">${ci.n}</td>`);
    $tr.append(`<td>${ci.characterBegin} <img class="alphabet-handwriting-char" src="img/handwriting/${ci.n}.svg" /></td>`);
    if (ci.characterEnd) {
      $tr.append(`<td>${ci.characterEnd} <img class="alphabet-handwriting-char" src="img/handwriting/${ci.n}_.svg" /></td>`);
    } else {
      $tr.append(`<td></td>`);
    }
    $tr.append(`<td>${ci.name}</td>`);
    $tr.append(`<td class="alphabet-transliteration">${ci.transliteration}</td>`);

    $alphabetBody.append($tr);
  });

  $('.alphabet-test-answer').click(function () {
    let $btn = $(this);

    if ($btn.data('correct')) {
      $btn.addClass('btn-success');
      setTimeout(() => {
        $('.alphabet-test-answer').removeClass('btn-success').removeClass('btn-danger');
        rndQuestion();
      }, 200);
    } else {
      $btn.addClass('btn-danger');
    }
  });

  rndQuestion();
});

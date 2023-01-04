// 'Game with ID: 1B9J4M3JIbsNXfnHvmVq added.'
// CPxigm7hasQ5RkhAz8Il added.'

const user = document.querySelector('.user');
const score = document.querySelector('.Score');

const renderData = (elements) => {
  const scores = document.querySelector('.scores');
  const score = document.createElement('p');
  score.classList.add('m-0', 'p-2', 'score');
  score.innerHTML = `${elements.user}: ${elements.score}`;
  scores.appendChild(score);
};

const getdata = async () => {
  const scores = document.querySelector('.scores');
  scores.innerHTML = '';
  const res = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1B9J4M3JIbsNXfnHvmVq/scores/',
  );
  const data = await res.json();
  data.result.forEach((elements) => {
    renderData(elements);
  });
};
const removemessage = () => {
  const message = document.querySelector('.message');

  message.style.opacity = 0;
};

const addMessage = () => {
  const message = document.querySelector('.message');
  message.innerHTML = 'Added record !!';
  message.style.opacity = 2;
  setTimeout(removemessage, 1100);
};

const postdata = async () => {
  const information = {
    user: user.value,
    score: score.value,
  };
  const res = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1B9J4M3JIbsNXfnHvmVq/scores/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(information),
    },
  );
  const data = await res.json();
  addMessage(data.result);
};

const implement = () => {
  const refresh = document.querySelector('.refresh');
  refresh.addEventListener('click', () => {
    getdata();
  });

  const submit = document.querySelector('.submit-btn');
  submit.addEventListener('click', (e) => {
    e.preventDefault();

    if (user.value && score.value) {
      postdata();
    }
    user.value = '';
    score.value = '';
  });
};
export default implement;
